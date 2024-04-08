package com.example.crab.transport;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ContainerDto implements Serializable {

  private String id;

  private List<ContainerNameDto> name;

  private String state;

  @Override
  public String toString(){
    return id +" "+ name +" "+ state;
  }

  @JsonGetter("id")
  @Schema(
      description = "id контейнера",
      example = "ds213sda21312312as21dsa123sads1212"
  )
  public String getId() {
    return id;
  }

  @JsonSetter("Id")
  public void setId(String id) {
    this.id = id;
  }

  @JsonGetter("state")
  @Schema(
      description = "Текущий статус контейнера",
      example = "RUNNING"
  )
  public String getState() {
    return state;
  }

  @JsonSetter("State")
  public void setState(String state) {
    this.state = state;
  }

  @JsonGetter("name")
  @Schema(
      description = "Имя контейнера",
      example = "service1"
  )
  public String getName() {
    return name.get(0).getName();
  }

  @JsonSetter("Names")
  public void setName(List<ContainerNameDto> name) {
    this.name = name;
  }
}
