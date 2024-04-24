package com.example.crab.service;

import java.util.List;
import java.util.Optional;

import com.example.crab.transport.container.ContainerDto;

public interface ContainerService {
  List<ContainerDto> getContainers(Integer standId);
  Optional<ContainerDto> getContainerById(Integer standId, String containerId);
  String getLogByContainerId(Integer standId, String containerId);
}
