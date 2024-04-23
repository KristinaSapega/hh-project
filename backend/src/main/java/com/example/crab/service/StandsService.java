package com.example.crab.service;

import com.example.crab.entity.Stand;
import com.example.crab.entity.User;
import com.example.crab.exception.controller.UserNotAllowedException;
import com.example.crab.persistence.StandRepository;
import com.example.crab.persistence.UserRepository;
import java.util.Objects;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.example.crab.exception.controller.ResourceNotFoundException;
import com.example.crab.persistence.StandRepository;
import com.example.crab.transport.stand.StandDto;
import com.example.crab.transport.stand.StandListDto;

@Service
public class StandsService {

  private final StandRepository standRepository;
  private final UserRepository userRepository;

  public StandsService(StandRepository standRepository, UserRepository userRepository) {
    this.standRepository = standRepository;
    this.userRepository = userRepository;
  }

  public StandListDto getAllStands() {
    var stands = standRepository.findAll();
    var dtoStands = stands.stream()
        .map(StandDto::fromEntity)
        .toList();
    return new StandListDto(dtoStands);
  }

  public StandDto getStand(Integer standId) {
    return standRepository.findById(standId)
        .map(StandDto::fromEntity)
        .orElseThrow(() -> {
          throw new ResourceNotFoundException();
        });
  }

  public StandDto updateStandTakenBy(Integer standId, String emailFromBody, String emailAuthUser) {
    Stand stand = standRepository.findById(standId).orElseThrow(() -> new ResourceNotFoundException());
    if (stand.getTakenBy() == null)
      if (Objects.equals(emailFromBody, emailAuthUser))
        stand.setTakenBy(userRepository.findByEmail(emailAuthUser).orElseThrow(() -> new ResourceNotFoundException()));
      else
        throw new UserNotAllowedException();
    else
      if (stand.getTakenBy().getEmail().equals(emailAuthUser) && emailFromBody == null)
        stand.setTakenBy(null);
      else
        throw new UserNotAllowedException();
    return StandDto.fromEntity(standRepository.save(stand));
  }
}
