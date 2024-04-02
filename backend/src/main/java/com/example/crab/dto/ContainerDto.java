package com.example.crab.dto;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import java.io.Serializable;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ContainerDto implements Serializable {

  private String id;
  private List<ContainerNamesDto> names;
  private String state;

  @Override
  public String toString(){
    return id +" "+ names +" "+ state;
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

  @JsonGetter("names")
  public String getNames() {
    return names.get(0).getNames();
  }

  @JsonSetter("Names")
  public void setNames(List<ContainerNamesDto> names) {
    this.names = names;
  }
}
