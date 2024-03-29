package com.example.crab.controller.stands.transport;

import com.example.crab.domain.Stand;

public record StandDto(Long id, String host, String status, String takenBy) {

  public static StandDto fromEntity(Stand stand) {
    return new StandDto(stand.getId(), stand.getHost(), stand.getState().toString(), stand.getTakenBy().orElse(""));
  }
}
