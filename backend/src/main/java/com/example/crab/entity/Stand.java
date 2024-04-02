package com.example.crab.entity;

import java.util.Optional;

public class Stand {

  private Long id;
  private String host;
  private StandState state;
  private Optional<String> takenBy;

  public Stand(Long id, String host, StandState state, Optional<String> takenBy) {
    this.id = id;
    this.host = host;
    this.state = state;
    this.takenBy = takenBy;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getHost() {
    return host;
  }

  public void setHost(String host) {
    this.host = host;
  }

  public StandState getState() {
    return state;
  }

  public void setState(StandState state) {
    this.state = state;
  }

  public Optional<String> getTakenBy() {
    return takenBy;
  }

  public void setTakenBy(Optional<String> takenBy) {
    this.takenBy = takenBy;
  }

}
