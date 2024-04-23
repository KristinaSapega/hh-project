package com.example.crab.transport.stand;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;

public record StandListDto(
    @Schema(description = "Список стендов")
    List<StandDto> stands) {

  @JsonCreator
  public StandListDto(@JsonProperty("stands") List<StandDto> stands) {
    this.stands = stands;
  }

}
