package com.crud.crudproject.review.api.controller;

import com.crud.crudproject.controller.HomeController;
import com.crud.crudproject.model.Registration;
import com.crud.crudproject.service.HomeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(HomeController.class)
public class HomeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HomeService userService;

    @Test
    public void testAddValues() throws Exception {
        Registration user = new Registration("Allwin","Kord","2022-07-07","9090909090","mainaddress","alldare19@gmail.com");
        when(userService.addData(any(Registration.class))).thenReturn(user);
        mockMvc.perform(MockMvcRequestBuilders.post("/home/adduser")
                        .content("{}")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Allwin"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Kord"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.mobileNum").value("9090909090"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.address").value("mainaddress"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.emailId").value("alldare19@gmail.com"));
    }

    @Test
    public void testDeleteUser() throws Exception {
        doNothing().when(userService).deleteUser(anyString());
         mockMvc.perform(MockMvcRequestBuilders.delete("/home/deleteuser/{id}", "testId"))
                .andExpect(status().isOk());
    }

    @Test
    public void testCheckEmail() throws Exception {
        when(userService.checkemail(anyString())).thenReturn(true);
        mockMvc.perform(MockMvcRequestBuilders.get("/home/checkemail/{id}", "testEmail"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));
    }
}
