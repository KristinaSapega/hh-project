package com.example.crab.service;

import com.example.crab.transport.ContainerDto;
import java.util.List;

public interface ContainerService {
  List<ContainerDto> getContainers(long standId);
  ContainerDto getContainerById(long standId, String containerId);
}
