package com.example.crab.service;

import com.example.crab.transport.ContainerDto;
import java.util.List;
import java.util.Optional;

public interface ContainerService {
  List<ContainerDto> getContainers(Integer standId);
  Optional<ContainerDto> getContainerById(Integer standId, String containerId);
  String getLogByContainerId(Integer standId, String containerId);
}
