package com.crud.crudproject.service;

import com.crud.crudproject.model.Auth;
import com.crud.crudproject.model.Registration;
import com.crud.crudproject.repository.AuthRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    AuthRepo authjpa;


    public Optional<Auth> getOneAuth(String email){
        return authjpa.findById(email);
    }
    public boolean ifemailexists(String email){
        return authjpa.existsById(email);
    }
    public Auth addData(Auth user) {
        return this.authjpa.save(user);
    }
}
