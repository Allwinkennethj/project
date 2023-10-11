package com.crud.crudproject.review.api.Service;

import com.crud.crudproject.model.Registration;
import com.crud.crudproject.repository.JpaRepo;
import com.crud.crudproject.service.HomeService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class ServiceTest {

    @InjectMocks
    private HomeService homeService;

    @Mock
    private JpaRepo jpaRepo;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddData() {
        Registration registration = new Registration();
        when(jpaRepo.save(any(Registration.class))).thenReturn(registration);
        Registration result = homeService.addData(registration);
        verify(jpaRepo, times(1)).save(any(Registration.class));
        assertEquals(registration, result);
    }

    @Test
    public void testGetUsers() {
        List<Registration> userList = new ArrayList<>();
        when(jpaRepo.findFirst10Entries()).thenReturn(userList);
        List<Registration> result = homeService.getusers();
        verify(jpaRepo, times(1)).findFirst10Entries();
        assertEquals(userList, result);
    }

    @Test
    public void testGetUser() {
        String emailId = "test@example.com";
        Optional<Registration> userOptional = Optional.of(new Registration());
        when(jpaRepo.findById(emailId)).thenReturn(userOptional);
        Optional<Registration> result = homeService.getuser(emailId);
        verify(jpaRepo, times(1)).findById(emailId);
        assertEquals(userOptional, result);
    }

    @Test
    public void testDeleteUser() {
        String emailId = "test@example.com";
        homeService.deleteUser(emailId);
        verify(jpaRepo, times(1)).deleteById(emailId);
    }

    @Test
    public void testCheckEmail() {
        String emailId = "test@example.com";
        when(jpaRepo.existsById(emailId)).thenReturn(true);
        boolean result = homeService.checkemail(emailId);
        verify(jpaRepo, times(1)).existsById(emailId);
        assertTrue(result);
    }

    @Test
    public void service_createuser_returnuser(){
        Registration user= Registration.builder().firstName("Prasanth").lastName("Khan").emailId("khanPras").Address("Khan home").DOB("2002-02-02").mobileNum("1231231231").build();
        Registration user2= Registration.builder().firstName("Kavi").lastName("Khan").emailId("khanKavi@gmail.com").Address("Khan homek").DOB("2002-02-02").mobileNum("1231231233").build();
        when(jpaRepo.save(Mockito.any(Registration.class))).thenReturn(user);
        Registration saved= homeService.create(user2);
        Assertions.assertThat(saved).isNotNull();
    }

}


