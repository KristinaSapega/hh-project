package com.example.crab.persistence;

import com.example.crab.entity.Stand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StandRepository extends JpaRepository<Stand, Integer> {

}
