package com.example.crab.persistence;

import com.example.crab.entity.StandEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StandRepository extends JpaRepository<StandEntity, Long> {
  Optional<StandEntity> findById(Integer id);
}
