package com.example.crab.service;

import com.example.crab.transport.ContainerDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ContainerServiceImpl implements ContainerService {

  public List<ContainerDto> getContainers(long id) {
    try {
      ObjectMapper mapper = new ObjectMapper();
      Path json = Paths.get("src/main/resources/containers.json");
      List<ContainerDto> containers = mapper.readValue(json.toFile(), new TypeReference<List<ContainerDto>>() {
      });
      return containers;
    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return null;
  }

  public ContainerDto getContainerById(long standId, String containerId) {
    List<ContainerDto> containers = getContainers(standId);
    return containers.stream()
        .filter(container -> containerId.equals(container.getId()))
        .findFirst().orElse(null);
  }

}
