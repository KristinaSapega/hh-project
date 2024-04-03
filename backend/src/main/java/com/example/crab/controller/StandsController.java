package com.example.crab.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.crab.service.StandsService;
import com.example.crab.transport.StandDto;
import com.example.crab.transport.StandListDto;

@RestController
public class StandsController {

  private final StandsService standsService;

  public StandsController(StandsService standsService) {
    this.standsService = standsService;
  }

  @GetMapping("/api/stands")
  public StandListDto getAllStands() {
    return standsService.getAllStands();
  }

  @GetMapping("/api/stands/{standId}")
  public StandDto getStand(@PathVariable long standId) {
    return standsService.getStand(standId);
  }
}
