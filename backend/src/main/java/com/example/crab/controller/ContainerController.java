package com.example.crab.controller;

import com.example.crab.exception.controller.ResourceNotFoundException;
import com.example.crab.service.ContainerService;
import com.example.crab.transport.container.ContainerDto;
import com.example.crab.transport.container.ContainersListDto;
import com.example.crab.service.ContainerServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SecurityRequirement(name = "basicAuth")
@Tag(
    name = "API для получения информации о контейнерах"
)
public class ContainerController {
  private final ContainerService dockerAPIService;

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
  public ContainersListDto getContainers(@PathVariable Integer standId) {
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
  public ContainerDto getContainersById(@PathVariable Integer standId, @PathVariable String containersId) {
    Optional<ContainerDto> container = dockerAPIService.getContainerById(standId, containersId);
    if (container.isEmpty())
      throw new ResourceNotFoundException();
    else
      return container.get();
  }

  @Operation(
      summary = "Получение логов контейнера"
  )
  @ApiResponse(
      responseCode = "200",
      description = "Логи получены",
      content = {@Content(mediaType = "text/plain", schema = @Schema(implementation = String.class))}
  )
  @ApiResponse(responseCode = "404", description = "Не найден standId или containersId", content = @Content)
  @ApiResponse(responseCode = "400", description = "Ошибка в standId или containersId", content = @Content)
  @GetMapping("/api/stands/{standId}/containers/{containersId}/logs")
  public String getLogsByContainerId(@PathVariable Integer standId, @PathVariable String containersId) {
    return dockerAPIService.getLogByContainerId(standId, containersId);
  }

  @Operation(
      summary = "Остановить контейнер на стенде"
  )
  @ApiResponse(
      responseCode = "200",
      description = "Контейнер остановлен (на паузе)"
  )
  @ApiResponse(responseCode = "404", description = "Не найден standId или containersId", content = @Content)
  @ApiResponse(responseCode = "400", description = "Ошибка в standId или containersId", content = @Content)
  @ResponseStatus(HttpStatus.OK)
  @PostMapping("/api/stands/{standId}/containers/{containersId}/stop")
  public void postStopContainer(@PathVariable Integer standId, @PathVariable String containersId) {
    dockerAPIService.stopContainer(standId, containersId);
  }

  @Operation(
      summary = "Заупстить контейнер на стенде после паузы"
  )
  @ApiResponse(
      responseCode = "200",
      description = "Контейнер запущен"
  )
  @ApiResponse(responseCode = "404", description = "Не найден standId или containersId", content = @Content)
  @ApiResponse(responseCode = "400", description = "Ошибка в standId или containersId", content = @Content)
  @ResponseStatus(HttpStatus.OK)
  @PostMapping("/api/stands/{standId}/containers/{containersId}/restart")
  public void postStartContainer(@PathVariable Integer standId, @PathVariable String containersId) {
    dockerAPIService.startContainer(standId, containersId);
  }
}
