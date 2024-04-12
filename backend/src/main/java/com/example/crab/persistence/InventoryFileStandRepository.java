package com.example.crab.persistence;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.stereotype.Repository;

import com.example.crab.entity.Stand;
import com.example.crab.entity.StandState;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

@Repository
public class InventoryFileStandRepository {

  private final Map<Long, Stand> stands;

  public InventoryFileStandRepository() {
    stands = load(Path.of("ansible", "config", "inventory.yml"));
  }

  public List<Stand> findAll() {
    return new ArrayList<>(stands.values());
  }

  public Optional<Stand> findById(long id) {
    return Optional.ofNullable(stands.get(id));
  }

  public Stand save(Stand stand) {
    Stand standSave = stands.get(stand.getId());
    standSave.setHost(stand.getHost());
    standSave.setTakenBy(stand.getTakenBy());
    standSave.setState(stand.getState());
    return standSave;
  }

  private Map<Long, Stand> load(Path inventoryFile) {
    Map<String, Map<String, Map<String, Map<String, String>>>> inventoryData;
    try {
      ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
      inventoryData = mapper.readValue(inventoryFile.toFile(), Map.class);
    } catch (IOException e) {
      throw new RuntimeException("IOException on read inventory", e);
    }
    var hosts = new ArrayList<>(inventoryData.get("stands").get("hosts").keySet());
    return IntStream.range(0, hosts.size())
        .mapToObj(i -> new Stand(Long.valueOf(i + 1L), hosts.get(i), StandState.RUNNING, Optional.empty()))
        .collect(Collectors.toMap(Stand::getId, stand -> stand));
  }

}
