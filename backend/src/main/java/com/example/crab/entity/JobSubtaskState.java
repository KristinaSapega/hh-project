package com.example.crab.entity;

import com.fasterxml.jackson.annotation.JsonValue;

public enum JobSubtaskState {
  OK("ok"),
  CHANGED("changed"),
  FAILED("failed"),
  FATAL("fatal");

  private final String name;

  JobSubtaskState(String name) {
    this.name = name;
  }

  @JsonValue
  public String getName() {
    return name;
  }
}
