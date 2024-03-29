package com.example.crab.persistence;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.stereotype.Repository;

import com.example.crab.domain.Stand;
import com.example.crab.domain.StandState;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

@Repository
public class InventoryFileStandRepository {

  private Map<Long, Stand> stands;

  public List<Stand> findAll() {
    if (stands == null) {
      Map<String, Map<String, Map<String, Map<String, String>>>> inventoryData;
      try {
        ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
        inventoryData = mapper.readValue(Path.of("ansible", "config", "inventory.yml").toFile(), Map.class);
      } catch (IOException e) {
        throw new RuntimeException("IOException on read inventory", e);
      }
      var hosts = new ArrayList<>(inventoryData.get("stands").get("hosts").keySet());
      stands = IntStream.range(0, hosts.size())
          .mapToObj(i -> new Stand(Long.valueOf(i + 1L), hosts.get(i), StandState.RUNNING, Optional.empty()))
          .collect(Collectors.toMap(Stand::getId, stand -> stand));
    }
    return new ArrayList<>(stands.values());
  }

  public Optional<Stand> findById(Long id) {
    return Optional.ofNullable(stands.get(id));
  }

}
