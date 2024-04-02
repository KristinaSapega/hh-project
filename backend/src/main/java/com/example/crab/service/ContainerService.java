package com.example.crab.service;

import com.example.crab.dto.ContainerDto;
import java.net.MalformedURLException;
import java.util.List;

public interface ContainerService {
  List<ContainerDto> getContainers(long id) throws MalformedURLException;
  ContainerDto getContainersById(long standId, String containerId) throws MalformedURLException;
}
