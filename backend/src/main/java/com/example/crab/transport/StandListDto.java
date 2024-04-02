package com.example.crab.transport;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record StandListDto(List<StandDto> stands) {

  @JsonCreator
  public StandListDto(@JsonProperty("stands") List<StandDto> stands) {
    this.stands = stands;
  }

}
