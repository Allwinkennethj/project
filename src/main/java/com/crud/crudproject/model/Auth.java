package com.crud.crudproject.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;

@Builder
@Entity
@Table(name="auth")
public class Auth {

    @Id
    @Column
    private String email;
    @Column
    private String password;

    public Auth() {

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Auth(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
