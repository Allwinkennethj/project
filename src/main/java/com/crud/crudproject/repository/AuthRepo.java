package com.crud.crudproject.repository;

import com.crud.crudproject.model.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepo extends JpaRepository<Auth,String> {

}
