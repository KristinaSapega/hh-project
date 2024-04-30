package com.example.crab.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "tasks")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Column
  private String name;
  @Column
  private String description;
  @Column(name = "playbook_path")
  private String playbookPath;
  @Column(name = "params_schema_path")
  private String paramsSchemaPath;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getPlaybookPath() {
    return playbookPath;
  }

  public void setPlaybookPath(String playbookPath) {
    this.playbookPath = playbookPath;
  }

  public String getParamsSchemaPath() {
    return paramsSchemaPath;
  }

  public void setParamsSchemaPath(String playbookRequestPath) {
    this.paramsSchemaPath = playbookRequestPath;
  }
}
