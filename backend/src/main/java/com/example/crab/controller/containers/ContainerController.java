package com.example.crab.controller.containers;

import com.example.crab.dto.ContainersListDto;
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
  public ContainersListDto getContainersById(@PathVariable long standId,@PathVariable String containersId) {
    return new ContainersListDto(Arrays.asList(dockerAPIService.getContainersById(standId, containersId)));
  }
}
