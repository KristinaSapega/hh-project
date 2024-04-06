package com.example.crab.service;

import com.example.crab.transport.ContainerDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.InputStream;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ContainerServiceImpl implements ContainerService {
  private final ObjectMapper mapper;

  public ContainerServiceImpl(ObjectMapper objectMapper) {
    this.mapper = objectMapper;
  }


  public List<ContainerDto> getContainers(long standId) {
    List<ContainerDto> containers;
    try (InputStream inputStream = ContainerServiceImpl.class.getResourceAsStream("/containers.json")) {
      containers = mapper.readValue(inputStream, new TypeReference<>() {
      });
    } catch (Exception ex) {
      throw new RuntimeException(ex);
    }
    return containers;
  }

  public ContainerDto getContainerById(long standId, String containerId) {
    List<ContainerDto> containers = getContainers(standId);
    return containers.stream()
        .filter(container -> containerId.equals(container.getId()))
        .findFirst().orElse(null);
  }

}
