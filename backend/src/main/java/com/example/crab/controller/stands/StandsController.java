package com.example.crab.controller.stands;

import org.springframework.web.bind.annotation.RestController;

import com.example.crab.controller.stands.transport.StandDto;
import com.example.crab.controller.stands.transport.StandListDto;
import com.example.crab.exceptions.controller.ResourceNotFoundException;
import com.example.crab.persistence.InventoryFileStandRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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
