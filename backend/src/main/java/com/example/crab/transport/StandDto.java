package com.example.crab.transport;

import com.example.crab.entity.Stand;

public record StandDto(Long id, String host, String status, String takenBy) {

  public static StandDto fromEntity(Stand stand) {
    return new StandDto(stand.getId(), stand.getHost(), stand.getState().toString(), stand.getTakenBy().orElse(""));
  }
}
