package com.example.crab.controller;

import com.example.crab.transport.job.JobInfoRequest;
import com.example.crab.transport.job.JobInfoResponse;
import com.example.crab.transport.job.JobShortInfoResponse;
import com.example.crab.service.AnsibleJobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnsibleJobController {

  private final AnsibleJobService jobService;

  public AnsibleJobController(AnsibleJobService jobService) {
    this.jobService = jobService;
  }

  @PostMapping("/api/jobs/queue")
  public ResponseEntity<JobShortInfoResponse> runJob(@RequestBody JobInfoRequest request){
    JobShortInfoResponse response = jobService.runJob(request);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/api/jobs/queue/{jobId}")
  public ResponseEntity<JobInfoResponse> getJobInfo(@PathVariable Long jobId){
    JobInfoResponse response = jobService.getJob(jobId);
    return ResponseEntity.ok(response);
  }

}
