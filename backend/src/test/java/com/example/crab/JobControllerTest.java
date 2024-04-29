package com.example.crab;

import com.example.crab.controller.JobController;
import com.example.crab.entity.Stand;
import com.example.crab.entity.StandState;
import com.example.crab.entity.User;
import com.example.crab.service.job.Job;
import com.example.crab.service.job.JobService;
import com.example.crab.transport.job.BatchJobStartRequest;
import com.example.crab.transport.job.JobTaskRequest;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = JobController.class)
@AutoConfigureMockMvc(addFilters = false)
public class JobControllerTest {

  @MockBean
  private JobService jobService;

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void testRunJobsAndGet() throws Exception{
    Stand stand = new Stand();
    stand.setId(1);
    stand.setHost("176.123.165.242");
    stand.setState(StandState.RUNNING);
    User user1= new User();
    user1.setEmail("user1@mail.ru");
    user1.setId(1);
    user1.setPassword("password");
    stand.setTakenBy(user1);
    JobTaskRequest jobTaskRequest = new JobTaskRequest("removeServices", null);
    BatchJobStartRequest req = new BatchJobStartRequest(List.of(stand.getId()), List.of(jobTaskRequest));
    mockMvc.perform(post("/api/jobs")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
            {
                "stands": [1],
                "tasks": [
                {
                  "type": "removeServices"
                  }
                ]
            }
            """))
        .andExpect(status().isCreated());

    when(jobService.getStandJobs(1)).thenReturn(Collections.singletonList(new Job(1, "176.123.165.242", "removeServices", null, null)));
    mockMvc.perform(get("/api/jobs?standId=1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].standAddress").value("176.123.165.242"))
        .andExpect(jsonPath("$[0].taskType").value("removeServices"));
  }
}
