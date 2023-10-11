package com.crud.crudproject.service;

import com.crud.crudproject.model.Registration;
import com.crud.crudproject.repository.JpaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HomeService {
    @Autowired
    JpaRepo jpa;

    public long getcountValues(String loginuser){
        return jpa.countValues(loginuser);
    }
    public List<Registration> findByModifiedDate(Pageable pageable, String loginuser){
        return jpa.findAllByModifiedDate(pageable,loginuser);
    }
    public Registration addData(Registration user){
        return this.jpa.save(user);
    }

//    public List<Registration> getusers(){
//        return this.jpa.findAll();
//    }
    public List<Registration> getusers(){
        return this.jpa.findFirst10Entries();
    }
    public Optional<Registration> getuser(String emailId){
        return this.jpa.findById(emailId);
    }

    public void deleteUser(String emailId){
        this.jpa.deleteById(emailId);
    }
    public boolean checkemail(String user){
        return this.jpa.existsById(user);
    }


    public Registration create(Registration regi){
        Registration reg=new Registration();
        reg.setFirstName(regi.getFirstName());
        reg.setEmailId(regi.getEmailId());
        reg.setAddress(regi.getAddress());
        reg.setDOB(regi.getDOB());
        reg.setLastName(regi.getLastName());
        reg.setMobileNum(regi.getMobileNum());
        Registration setted=jpa.save(reg);
        return setted;
    }
}
