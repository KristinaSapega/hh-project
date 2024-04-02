package com.example.crab.service;

import com.example.crab.dto.ContainerDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ContainerServiceImpl implements ContainerService {

  public List<ContainerDto> getContainers(long id) {
    return getContainersPrivate(id);
  }

  public ContainerDto getContainersById(long standId, String containerId) {
    List<ContainerDto> containers = getContainers(standId);
    return containers.stream()
        .filter(container -> containerId.equals(container.getId()))
        .findFirst().orElse(null);
  }

  private List<ContainerDto> getContainersPrivate(long id){
    /*добавить логику поиска контейнера по айди
    WebClient.builder()
        .baseUrl("http://192.168.1.83:2376")
        .defaultCookie("cookie-name", "cookie-value")
        .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
        .build();

    Flux<DockerModel> dockerFlux = webClient.get()
        .uri("/containers/json")
        .retrieve()
        .bodyToFlux(DockerModel.class);

    List<DockerModel> dockers = dockerFlux
        .collect(Collectors.toList())
        .share().block();
    return dockers;*/
    try {
      ObjectMapper mapper = new ObjectMapper(new com.fasterxml.jackson.core.JsonFactory());
      Path json = Paths.get("src/main/resources/containers.json");
      List<ContainerDto> containers = mapper.readValue(json.toFile(), new TypeReference<List<ContainerDto>>() {
      });
      return containers;
    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return null;
  }
}
