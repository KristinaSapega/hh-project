package com.example.crab.service;

import com.example.crab.entity.Stand;
import com.example.crab.exception.controller.ResourceNotFoundException;
import com.example.crab.persistence.StandRepository;
import com.example.crab.transport.ContainerDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.InputStream;
import java.util.List;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ContainerServiceImpl implements ContainerService {
  private final ObjectMapper mapper;
  private final StandRepository standRepository;

  public ContainerServiceImpl(ObjectMapper objectMapper, StandRepository standRepository) {
    this.mapper = objectMapper;
    this.standRepository = standRepository;
  }


  public List<ContainerDto> getContainers(Integer standId) {
    List<ContainerDto> containers;
    try (InputStream inputStream = ContainerServiceImpl.class.getResourceAsStream("/containers.json")) {
      containers = mapper.readValue(inputStream, new TypeReference<>() {
      });
    } catch (Exception ex) {
      throw new RuntimeException(ex);
    }
    return containers;
  }

  public ContainerDto getContainerById(Integer standId, String containerId) {
    List<ContainerDto> containers = getContainers(standId);
    return containers.stream()
        .filter(container -> containerId.equals(container.getId()))
        .findFirst().orElse(null);
  }

  public String getLogByContainerId(Integer standId, String containerId) {
    Stand stand = standRepository.findById(standId).orElseThrow(() -> {
      throw new ResourceNotFoundException();
    });
    ContainerDto container = getContainerById(standId,containerId);
    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<String> response =
        restTemplate.exchange(
            "http://"+ stand.getHost() +":2376/containers/" + containerId +"/logs?stderr=1&stdout=1",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<String>() {
            });

    String logs = response.getBody();
    return logs;
  }

}
