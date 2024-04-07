package com.example.crab.transport;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record ContainersListDto(
    @Schema(description = "Список стендов")
    List<ContainerDto> containers) {
  @JsonCreator
  public ContainersListDto(
      @JsonProperty("containers")
      List<ContainerDto> containers
  ) {
    this.containers = containers;
  }
}
