package com.example.crab.transport;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
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
  public String getId() {
    return id;
  }

  @JsonSetter("Id")
  public void setId(String id) {
    this.id = id;
  }

  @JsonGetter("state")
  public String getState() {
    return state;
  }

  @JsonSetter("State")
  public void setState(String state) {
    this.state = state;
  }

  @JsonGetter("name")
  public String getName() {
    return name.get(0).getName();
  }

  @JsonSetter("Names")
  public void setName(List<ContainerNameDto> name) {
    this.name = name;
  }
}
