package com.example.crab;

import com.example.crab.controller.DictionaryController;
import com.example.crab.service.DictionaryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = DictionaryController.class)
@AutoConfigureMockMvc(addFilters = false)
public class DictionaryControllerTest {

  @MockBean
  private DictionaryService dictionaryService;

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void testGetDictionary() throws Exception{
    mockMvc.perform(get("/api/dictionaries"))
        .andExpect(status().isOk())
        .andDo(MockMvcResultHandlers.print());
  }
}
