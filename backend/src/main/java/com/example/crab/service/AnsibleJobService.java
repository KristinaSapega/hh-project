package com.example.crab.service;

import com.example.crab.transport.job.JobInfoRequest;
import com.example.crab.transport.job.JobInfoResponse;
import com.example.crab.transport.job.JobShortInfoResponse;
import com.example.crab.transport.job.JobSubtaskInfo;
import com.example.crab.transport.job.JobSubtaskResult;
import com.example.crab.transport.job.JobTaskInfo;
import com.example.crab.entity.JobSubtaskState;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AnsibleJobService {
  public JobShortInfoResponse runJob(JobInfoRequest request){
    System.out.println(request);
    //TODO добавить логику
    return new JobShortInfoResponse(12L);
  }

  public JobInfoResponse getJob(Long jobId){
    //TODO добавить логику
    JobSubtaskResult jobSubtaskResult = new JobSubtaskResult(
        "vm",
        JobSubtaskState.OK,
        null
    );

    JobSubtaskInfo jobSubtaskInfo = new JobSubtaskInfo(
        "name",
        List.of(jobSubtaskResult)
    );

    JobTaskInfo taskInfo = new JobTaskInfo(
        "deployServices",
        List.of(jobSubtaskInfo)
    );

    return new JobInfoResponse(
        jobId,
        true,
        List.of(taskInfo)
    );
  }
}
