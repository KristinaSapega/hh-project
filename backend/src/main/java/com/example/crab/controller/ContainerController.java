package com.example.crab.controller;

import com.example.crab.transport.ContainerDto;
import com.example.crab.transport.ContainersListDto;
import com.example.crab.service.ContainerServiceImpl;
import com.example.crab.transport.job.JobShortInfoResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SecurityRequirement(name = "basicAuth")
@Tag(
    name = "API для получения информации о контейнерах"
)
public class ContainerController {
  ContainerServiceImpl dockerAPIService;

  @Autowired
  public ContainerController(ContainerServiceImpl dockerAPI) {
    this.dockerAPIService = dockerAPI;
  }

  @Operation(
      summary = "Получение списка контейнеров на указанном стенде"
  )
  @ApiResponse(
      responseCode = "200",
      content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ContainersListDto.class))}
  )
  @ApiResponse(responseCode = "404", description = "Не найден standId", content = @Content)
  @ApiResponse(responseCode = "400", description = "Ошибка в standId", content = @Content)
  @GetMapping("/api/stands/{standId}/containers")
  public ContainersListDto getContainers(@PathVariable long standId) {
    return new ContainersListDto(dockerAPIService.getContainers(standId));
  }

  @Operation(
      summary = "Получение информации о конкретном контейнере"
  )
  @ApiResponse(
      responseCode = "200",
      description = "Задача была поставлена на выполнение",
      content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ContainerDto.class))}
  )
  @ApiResponse(responseCode = "404", description = "Не найден standId или containersId", content = @Content)
  @ApiResponse(responseCode = "400", description = "Ошибка в standId или containersId", content = @Content)
  @GetMapping("/api/stands/{standId}/containers/{containersId}")
  public ContainerDto getContainersById(@PathVariable long standId, @PathVariable String containersId) {
    return dockerAPIService.getContainerById(standId, containersId);
  }
}
