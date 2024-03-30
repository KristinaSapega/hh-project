package com.example.crab.domain;

public enum StandState {
  RUNNING("running"),
  MAINTAINING("maintaining"),
  STOPPED("stopped");

  private String stringValue;

  private StandState(String value) {
    this.stringValue = value;
  }

  @Override
  public String toString() {
    return stringValue;
  }

}
