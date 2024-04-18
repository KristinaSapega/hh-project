package com.example.crab.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "stands")
public class Stand {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false, unique = true)
  private String host;
  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private StandState state;

  @ManyToOne
  @JoinColumn(name = "taken_by")
  private User takenBy;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
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

  public User getTakenBy() {
    return takenBy;
  }

  public void setTakenBy(User takenBy) {
    this.takenBy = takenBy;
  }
}
