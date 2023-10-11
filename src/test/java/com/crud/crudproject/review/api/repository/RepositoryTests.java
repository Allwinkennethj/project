package com.crud.crudproject.review.api.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.crud.crudproject.model.Registration;
import com.crud.crudproject.repository.JpaRepo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace=AutoConfigureTestDatabase.Replace.NONE)
public class RepositoryTests {

    @Autowired
    private JpaRepo repo;

    // Repo Test Start
    @Test
    public void User_SaveAll_ReturnSavedUsers(){

        //Arrange
        Registration user= Registration.builder()
                .firstName("Prasanth")
                .lastName("Khan")
                .emailId("khanPras")
                .Address("Khan home")
                .DOB("2002-02-02")
                .mobileNum("1231231231").build();
        //Act
        Registration savedUser=repo.save(user);
        //Assert
        Assertions.assertThat(savedUser).isNotNull();
//        Assertions.assertThat(savedUser.getEmailId());
//        Assertions.assertThat(savedUser.getDOB());
    }

    @Test
    public void User_GetAll_ReturnMorethanOne(){
        //Arrange
        List<Registration> usersprev=repo.findAll();
        int val=usersprev.size();
        Registration user1= Registration.builder().firstName("Gopi").lastName("Khan").emailId("khanGopi@gmail.com").Address("Khan homeg").DOB("2002-02-02").mobileNum("1231231232").build();
        Registration user2= Registration.builder().firstName("Kavi").lastName("Khan").emailId("khanKavi@gmail.com").Address("Khan homek").DOB("2002-02-02").mobileNum("1231231233").build();
        repo.save(user1);
        repo.save(user2);
        //Act
        List<Registration> users=repo.findAll();
        //Assert
        Assertions.assertThat(users).isNotNull();
        Assertions.assertThat(val+2).isEqualTo(users.size());
    }

    @Test
    public void User_FindById_ReturnsUser(){
        //Arrange
        Registration user1= Registration.builder().firstName("Surya").lastName("K").emailId("khanSurya@gmail.com").Address("Khan homes").DOB("2002-02-02").mobileNum("1231231234").build();
        repo.save(user1);
        //Act
        Registration user=repo.findById(user1.getEmailId()).get();
        //Assertion
        Assertions.assertThat(user).isNotNull();
    }

    @Test
    public void User_DeleteById_ReturnEmpty(){
        //Arrange
        Registration user1= Registration.builder().firstName("Surya").lastName("K").emailId("khanSurya@gmail.com").Address("Khan homes").DOB("2002-02-02").mobileNum("1231231234").build();
        repo.save(user1);
        //Act
        repo.deleteById(user1.getEmailId());
        Optional<Registration> regis=repo.findById(user1.getEmailId());
        //Assertion
        Assertions.assertThat(regis).isEmpty();
    }
    //Repo Test End
}
