package com.example.crab.persistence;

import com.example.crab.entity.Job;
import com.example.crab.entity.Stand;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
  List<Job> findByStand(Stand stand);
  void deleteJobByStand(Stand stand);
}
