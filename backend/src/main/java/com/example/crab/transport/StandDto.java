package com.example.crab.transport;

import com.example.crab.entity.Stand;
import io.swagger.v3.oas.annotations.media.Schema;

public record StandDto(
    @Schema(description = "id стенда", example = "12")
    Long id,
    @Schema(description = "Адрес стенда", example = "255.255.255.0")
    String host,
    @Schema(description = "Статус стенда", example = "running")
    String status,
    @Schema(description = "Текущий владелец стена", example = "user@test.ru")
    String takenBy) {

  public static StandDto fromEntity(Stand stand) {
    return new StandDto(stand.getId(), stand.getHost(), stand.getState().toString(), stand.getTakenBy().orElse(""));
  }
}
