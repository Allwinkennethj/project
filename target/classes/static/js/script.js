const firstname=document.getElementById("firstName");
const lastname=document.getElementById("lastName");
const emailId=document.getElementById("emailId");
const mobileNum=document.getElementById("mobileNum");
const address=document.getElementById("Address");
const form=document.getElementById("form");
var headingelement=document.getElementById("regiheading");
var validationcount=false;



function clearAllandchanebackground(){
    firstname.value="";
    firstname.style.boxShadow = "";
    lastname.value="";
    lastname.style.boxShadow = "";
    emailId.value="";
    emailId.style.boxShadow = "";
    dob.value="";
    mobileNum.value="";
    mobileNum.style.boxShadow = "";
    address.value="";
}
// Date checking is done in these 3 lines 
var dob=document.getElementById("DOB");
var today=new Date().toISOString().slice(0,10);
dob.setAttribute("max",today);
//

// check the email if it exists

const checkemailifexists= async (emailId)=>{
    const response = await fetch("http://localhost:8080/home/checkemail/"+emailId);
    const data=await response.json();
    if((data)===true && sessionStorage.getItem('root')=="register"){
        var error=document.getElementById("emailerror");
        error.textContent="Email ID already exists";
    }
};

//

function apicall() {
    const response = adduser();
    // console.log(response);
    return true
}
const adduser = async ()=>{
    var loginuser=sessionStorage.getItem('loginuser');
    const dt = JSON.stringify({
        firstName:firstname.value,
        lastName:lastname.value,
        dob:dob.value,
        mobileNum:mobileNum.value,
        address:address.value,
        emailId:emailId.value,
        loginuser:loginuser
    });
  const response = await fetch("http://localhost:8080/home/adduser",{
      method:"POST",
      body:dt,
      headers:{
          'Content-type':'application/json'
      }
  });
  return response;
};

function finalvalidation(){
    if(
        (document.getElementById("First nameerror").textContent==="") &&
        (document.getElementById("Last nameerror").textContent==="") &&
        (document.getElementById("emailerror").textContent==="") &&
        (document.getElementById("mobileerror").textContent==="")

    ){
        // console.log("inside true finalvalidation")
        validationcount=true;
    }
    else{
        // console.log("inside false finalvalidation")
        validationcount=false;
    }
}

function validname(nameval,nn){
    var name=nameval.value;
    var nameregex=/^[a-zA-Z]+$/;
    var error = document.getElementById((nn+"nameerror"));
    if(name === "" || name === null){
        nameval.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent=nn+"Name is empty";
    }
    else if(!name.match(nameregex)){
        nameval.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent=nn+"Name is not valid";
    }
    else{
        nameval.style.boxShadow = "0 0 0 4px green";
        error.textContent="";
    }
}

function emailvalidation(emaill){
    var email=emaill.value;
    var emailregex=/^[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,63}\.){1,127}[a-zA-Z]{2,}$/;
    var error=document.getElementById("emailerror");
    if(email === "" || email === null){
        emaill.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent="Email ID is empty";
    }
    else if(!email.match(emailregex)){
        emaill.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent="Not a valid Email ID";
    }
    else{
        emaill.style.boxShadow = "0 0 0 4px green";
        error.textContent="";
    }
}

function mobilevalidation(mobilee){
    var mobile=mobilee.value;
    var mobileregex=/^[0-9]{10,}$/;
    var error=document.getElementById("mobileerror");
    if(mobile===""){
        mobilee.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent="Mobile Number Should Not Be Empty";
    }
    else if((mobile.match(mobileregex))){
        mobilee.style.boxShadow = "0 0 0 4px green";
        error.textContent="";
    }
    else{
        mobilee.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent="Enter a valid Mobile Number"
    }
}

firstname.addEventListener('input',()=>{
    if(firstname.value.length>20){
        firstname.value=firstname.value.substring(0,firstname.value.length-1);
    }
    else{
        validname(firstname,"First ");
    }
})

lastname.addEventListener("input",()=>{
    if(lastname.value.length>20){
        lastname.value=lastname.value.substring(0,lastname.value.length-1);
    }
    else{
        validname(lastname,"Last ");
    }
})
emailId.addEventListener("input",()=>{
    emailvalidation(emailId);
    if(emailId.value.length>0)
        checkemailifexists(emailId.value);
})
mobileNum.addEventListener("input",()=>{
    if((""+(mobileNum.value)).length>10){
        mobileNum.value=(""+(mobileNum.value)).substring(0,10);
    }
    else{
        mobilevalidation(mobileNum);
    }
})

//


var clearbutton=document.getElementById("clear");

clearbutton.addEventListener("click",()=>{

    // console.log("Clear clicked");
   clearAllandchanebackground()
})

//

form.addEventListener("submit",(event)=>{
    finalvalidation();
    event.preventDefault();

    if(validationcount===true){
        // console.log("inside validation true");
        const response=apicall();
        if(response){
            // console.log(response);
        }
        clearAllandchanebackground()
        if(sessionStorage.getItem('root')=="register"){
            showMessage("Values are added successfully", 3000);
        }
        else{
            showMessage("Values are edited successfully", 3000);
        }
        validationcount=false;
    }
    else{
        showMessage("Values are not entered correctly", 3000);
    }
})

function register(){
    sessionStorage.setItem('root','register');
    location.href='index.html';
}
function logout(){
    sessionStorage.clear()
    location.href="Login.html";
}

if(sessionStorage.getItem('root')=='edit'){
    firstname.value=sessionStorage.getItem('firstName');
    lastname.value=sessionStorage.getItem('lastName');
    mobileNum.value=sessionStorage.getItem('mobileNum');
    dob.value=sessionStorage.getItem('dob');
    address.value=sessionStorage.getItem('address');
    emailId.value=sessionStorage.getItem('emailId');
    emailId.readOnly=true;
    headingelement.innerHTML="Edit Details";
}
else if(sessionStorage.getItem('root')=='register'){
    headingelement.innerHTML="Add Values";
}


function showMessage(message, duration) {
    const messageDiv = document.getElementById("finalerror");
    messageDiv.textContent = message;
    setTimeout(function () {
        messageDiv.textContent = "";
    }, duration);
}

if(sessionStorage.getItem('loginuser')===null){
    location.href='Login.html';
}
// Test start

(function () {
    'use strict';
    var $myapp = {};
    self.$myapp = $myapp;
    $myapp.isValidDate = function (dateString) {
        let todayDate = new Date();
        if (new Date(dateString).getTime() >= todayDate.getTime()) {
            return false;
        }
        return true;
    };
    $myapp.isValidMobile = function (mobileNum) {
        let numRegex = /^[6-9]\d{9}$/;
        return (numRegex.test(mobileNum))
    }
    $myapp.isValidFName=function(name){
        let nameregex=/^[a-zA-Z]+$/;
        return (name.match(nameregex));
    }
    $myapp.isValidLName=function(name){
        let nameregex=/^[a-zA-Z]+$/;
        return (name.match(nameregex));
    }
    $myapp.isValidEmail=function(email){
        var emailregex=/^[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,63}\.){1,127}[a-zA-Z]{2,}$/;
        return (email.match(emailregex));
    }
})();

//Test end
