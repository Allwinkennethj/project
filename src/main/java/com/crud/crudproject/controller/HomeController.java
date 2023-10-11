package com.crud.crudproject.controller;

import com.crud.crudproject.model.Registration;
import com.crud.crudproject.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/home")
public class HomeController {

    @Autowired
    HomeService userservice;

    @GetMapping("/countUser/{loginuser}")
    @CrossOrigin
    public long countValues(@PathVariable String loginuser){
        return this.userservice.getcountValues(loginuser);
    }

    @PostMapping("/adduser")
    @CrossOrigin()
    public Registration addValues(@RequestBody Registration user){
        return this.userservice.addData(user);
    }

    @GetMapping("/page/{loginuser}/{page}/{size}")
    @CrossOrigin()
    public List<Registration> displayPaging(@PathVariable String loginuser,@PathVariable int page,@PathVariable int size){
        Pageable pageable= (Pageable) PageRequest.of(page,size);
        return userservice.findByModifiedDate(pageable,loginuser);
    }

    @GetMapping("/getallUser")
    @CrossOrigin()
    public List<Registration> getAll(){
        return this.userservice.getusers();
    }

    @GetMapping("/getoneUser/{id}")
    @CrossOrigin()
    public Optional<Registration> getUser(@PathVariable (value="id") String identity){
        return this.userservice.getuser(identity);
    }

    @DeleteMapping("/deleteuser/{id}")
    @CrossOrigin()
    public void deleteUser(@PathVariable (value="id") String identity){
        this.userservice.deleteUser(identity);
    }


    @CrossOrigin()
    @GetMapping("/checkemail/{id}")
    public boolean checkemail(@PathVariable (value="id") String identity){
        System.out.println(this.userservice.checkemail(identity));
        return this.userservice.checkemail(identity);
    }

}
