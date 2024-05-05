package com.example.crab.service.job;

import com.example.crab.entity.Job;
import java.util.List;

public interface JobToCommandConverter {

  String toCommand(List<Job> jobs);

}
