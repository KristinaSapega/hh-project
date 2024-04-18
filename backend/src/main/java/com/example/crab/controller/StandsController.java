package com.example.crab.controller;

import com.example.crab.transport.ContainersListDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.crab.service.StandsService;
import com.example.crab.transport.StandDto;
import com.example.crab.transport.StandListDto;

@RestController
@SecurityRequirement(name = "basicAuth")
@Tag(
    name = "API для получения информации о стендах"
)
public class StandsController {

  private final StandsService standsService;

  public StandsController(StandsService standsService) {
    this.standsService = standsService;
  }

  @Operation(
      summary = "Получение списка стендов"
  )
  @ApiResponse(
      responseCode = "200",
      content = {@Content(mediaType = "application/json", schema = @Schema(implementation = StandListDto.class))}
  )
  @GetMapping("/api/stands")
  public StandListDto getAllStands() {
    return standsService.getAllStands();
  }

  @Operation(
      summary = "Получение списка стендов"
  )
  @ApiResponse(
      responseCode = "200",
      content = {@Content(mediaType = "application/json", schema = @Schema(implementation = StandDto.class))}
  )
  @ApiResponse(responseCode = "404", description = "Не найден standId", content = @Content)
  @ApiResponse(responseCode = "400", description = "Ошибка в standId", content = @Content)
  @GetMapping("/api/stands/{standId}")
  public StandDto getStand(@PathVariable Integer standId) {
    return standsService.getStand(standId);
  }

  /*@Operation(
      summary = "Обновление takenBy стенда"
  )
  @ApiResponse(
      responseCode = "200",
      content = {@Content(mediaType = "application/json", schema = @Schema(implementation = StandDto.class))}
  )
  @ApiResponse(responseCode = "404", description = "Не найден standId", content = @Content)
  @ApiResponse(responseCode = "400", description = "Ошибка в standId", content = @Content)
  @PatchMapping("/api/stands/{standId}")
  public StandDto updateStandTakenBy(@PathVariable Integer standId, @RequestBody StandDto standDto) {
    return standsService.updateStandTakenBy(standId, standDto.takenBy());
  }*/
}
