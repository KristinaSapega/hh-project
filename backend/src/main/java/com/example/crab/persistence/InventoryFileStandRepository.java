package com.example.crab.persistence;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.example.crab.domain.Stand;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

@Repository
public class InventoryFileStandRepository {

  private List<Stand> stands;

  public List<Stand> findAll() throws IOException {
    if(stands == null) {
      ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
      Map<String, Map<String, Map<String, Map<String, String>>>> inventoryData = 
        mapper.readValue(Path.of("ansible", "config", "inventory.yml").toFile(), Map.class);
      stands = inventoryData.get("stands").get("hosts").keySet().stream()
        .map(Stand::new)
        .toList();
    }
    return stands;
  }

}
