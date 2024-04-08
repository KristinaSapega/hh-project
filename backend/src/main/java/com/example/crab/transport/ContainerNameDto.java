package com.example.crab.transport;

import io.swagger.v3.oas.annotations.media.Schema;

public class ContainerNameDto {
  @Schema(
      description = "Имя контейнера",
      example = "service1"
  )
  public String name;

  public ContainerNameDto() {
  }

  public ContainerNameDto(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
