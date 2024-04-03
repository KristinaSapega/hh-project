package com.example.crab.transport;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record ContainersListDto(List<ContainerDto> containers) {
  @JsonCreator
  public ContainersListDto(@JsonProperty("containers") List<ContainerDto> containers) {
    this.containers = containers;
  }
}
