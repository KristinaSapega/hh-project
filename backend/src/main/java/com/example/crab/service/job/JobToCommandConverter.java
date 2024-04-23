package com.example.crab.service.job;

import java.util.List;

public interface JobToCommandConverter {

  String toCommand(List<Job> jobs);

}
