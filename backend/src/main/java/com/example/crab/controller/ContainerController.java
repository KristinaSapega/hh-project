package com.example.crab.controller;

import com.example.crab.transport.ContainerDto;
import com.example.crab.transport.ContainersListDto;
import com.example.crab.service.ContainerServiceImpl;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContainerController {
  ContainerServiceImpl dockerAPIService;

  @Autowired
  public ContainerController(ContainerServiceImpl dockerAPI) {
    this.dockerAPIService =dockerAPI;
  }

  @GetMapping("/api/stands/{standId}/containers")
  public ContainersListDto getContainers(@PathVariable long standId) {
    return new ContainersListDto(dockerAPIService.getContainers(standId));
  }

  @GetMapping("/api/stands/{standId}/containers/{containersId}")
  public ContainerDto getContainersById(@PathVariable long standId,@PathVariable String containersId) {
    return dockerAPIService.getContainerById(standId, containersId);
  }
}
