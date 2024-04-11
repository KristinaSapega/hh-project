package com.example.crab.service;

import java.util.Optional;
import org.springframework.stereotype.Service;

import com.example.crab.exception.controller.ResourceNotFoundException;
import com.example.crab.persistence.InventoryFileStandRepository;
import com.example.crab.transport.StandDto;
import com.example.crab.transport.StandListDto;
import com.example.crab.entity.Stand;

@Service
public class StandsService {

  private final InventoryFileStandRepository standRepository;

  public StandsService(InventoryFileStandRepository standRepository) {
    this.standRepository = standRepository;
  }

  public StandListDto getAllStands() {
    var stands = standRepository.findAll();
    var dtoStands = stands.stream()
        .map(StandDto::fromEntity)
        .toList();
    return new StandListDto(dtoStands);
  }

  public StandDto getStand(long standId) {
    return standRepository.findById(standId)
        .map(StandDto::fromEntity)
        .orElseThrow(() -> {
          throw new ResourceNotFoundException();
        });
  }

  public StandDto updateStandTakenBy(long standId, String username) {
    Stand stand = standRepository.findById(standId).orElseThrow(() -> new ResourceNotFoundException());
    stand.setTakenBy(Optional.of(username));
    return StandDto.fromEntity(standRepository.save(stand));
  }
}
