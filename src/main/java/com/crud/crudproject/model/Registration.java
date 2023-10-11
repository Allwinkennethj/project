package com.crud.crudproject.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;

import java.util.Date;

@Builder
@Entity
@Table(name="user")
public class Registration {

    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String DOB;
    @Column
    private String mobileNum;
    @Column
    private String Address;
    @Column
    private String loginuser;

    public Registration(String firstName, String lastName, String DOB, String mobileNum, String address, String loginuser, String emailId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.DOB = DOB;
        this.mobileNum = mobileNum;
        Address = address;
        this.loginuser = loginuser;
        this.emailId = emailId;
    }

    public String getLoginuser() {
        return loginuser;
    }

    public void setLoginuser(String loginuser) {
        this.loginuser = loginuser;
    }

    public Registration(String firstName, String lastName, String DOB, String mobileNum, String address, String emailId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.DOB = DOB;
        this.mobileNum = mobileNum;
        Address = address;
        this.emailId = emailId;
    }

    public Registration() {

    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDOB() {
        return DOB;
    }

    public void setDOB(String DOB) {
        this.DOB = DOB;
    }

    public String getMobileNum() {
        return mobileNum;
    }

    public void setMobileNum(String mobileNum) {
        this.mobileNum = mobileNum;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    @Id
    @Column
    private String emailId;

}
