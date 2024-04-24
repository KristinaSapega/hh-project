package com.example.crab.service;

import com.example.crab.entity.Stand;
import com.example.crab.exception.controller.ResourceNotFoundException;
import com.example.crab.persistence.StandRepository;
import com.example.crab.transport.container.ContainerDto;
import java.util.List;
import java.util.Optional;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ContainerServiceImpl implements ContainerService {
  private final StandRepository standRepository;
  private final RestTemplate restTemplate;

  public ContainerServiceImpl(StandRepository standRepository, RestTemplate restTemplate) {
    this.standRepository = standRepository;
    this.restTemplate = restTemplate;
  }


  public List<ContainerDto> getContainers(Integer standId) {
    Stand stand = standRepository.findById(standId).orElseThrow(() -> {
      throw new ResourceNotFoundException();
    });
    ResponseEntity<List<ContainerDto>> response =
        restTemplate.exchange(
            "http://" + stand.getHost() + ":2376/containers/json",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<ContainerDto>>() {
            });

    List<ContainerDto> containers = response.getBody();
    return containers;
  }

  public Optional<ContainerDto> getContainerById(Integer standId, String containerId) {
    List<ContainerDto> containers = getContainers(standId);
    return containers.stream()
        .filter(container -> containerId.equals(container.getId()))
        .findFirst();
  }

  public String getLogByContainerId(Integer standId, String containerId) {
    Stand stand = standRepository.findById(standId).orElseThrow(() -> {
      throw new ResourceNotFoundException();
    });
    Optional<ContainerDto> container = getContainerById(standId, containerId);
    if (container.isEmpty()) {
      throw new ResourceNotFoundException();
    }
    ResponseEntity<String> response =
        restTemplate.exchange(
            "http://" + stand.getHost() + ":2376/containers/" + containerId +"/logs?stderr=1&stdout=1",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<String>() {
            });

    String logs = response.getBody();
    return logs;
  }

}
