package com.crud.crudproject.controller;

import com.crud.crudproject.model.Auth;
import com.crud.crudproject.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authservice;

    @PostMapping("/adduser")
    @CrossOrigin()
    public Auth addValues(@RequestBody Auth user){
        return this.authservice.addData(user);
    }


    @GetMapping("/getauth/{email}")
    @CrossOrigin()
    public Optional<Auth> getValue(@PathVariable String email){
        return authservice.getOneAuth(email);
    }

    @GetMapping("/checkemail/{email}")
    @CrossOrigin()
    public boolean checkemail(@PathVariable String email){
        return this.authservice.ifemailexists(email);
    }

}
