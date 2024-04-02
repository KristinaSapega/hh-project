package com.example.crab.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.crab.exception.controller.ResourceNotFoundException;
import com.example.crab.persistence.InventoryFileStandRepository;
import com.example.crab.transport.StandDto;
import com.example.crab.transport.StandListDto;

@RestController
public class StandsController {

  private final InventoryFileStandRepository standRepository;

  public StandsController(InventoryFileStandRepository standRepository) {
    this.standRepository = standRepository;
  }

  @GetMapping("/api/stands")
  public StandListDto getAllStands() {
    var stands = standRepository.findAll();
    var dtoStands = stands.stream()
        .map(StandDto::fromEntity)
        .toList();
    return new StandListDto(dtoStands);
  }

  @GetMapping("/api/stands/{standId}")
  public StandDto getStand(@PathVariable long standId) {
    return standRepository.findById(standId)
        .map(StandDto::fromEntity)
        .orElseThrow(() -> {
          throw new ResourceNotFoundException();
        });
  }
}
