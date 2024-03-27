package com.example.crab.controller.stands;

import org.springframework.web.bind.annotation.RestController;

import com.example.crab.controller.stands.transport.StandDto;
import com.example.crab.domain.Stand;
import com.example.crab.persistence.InventoryFileStandRepository;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.stream.IntStream;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class StandsController {

  private final InventoryFileStandRepository standRepository;

  public StandsController(InventoryFileStandRepository standRepository) {
    this.standRepository = standRepository;
  }
  
  @GetMapping("/api/stands")
  List<StandDto> getAllStands() {
    List<Stand> allStands;
    try {
      allStands = standRepository.findAll();
    } catch (IOException e) {
      throw new RuntimeException("IOException on reading inventory file", e);
    }
    return IntStream.range(0, allStands.size())
      .mapToObj(i -> new StandDto(Long.valueOf(i + 1), allStands.get(i).getHost(), "ok", Instant.now()))
      .toList();
  }
}
