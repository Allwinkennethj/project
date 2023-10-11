var email=document.getElementById("emailforlogin");
var password=document.getElementById("passwordforlogin");
var form=document.getElementById("loginform");
var emailverified=false;
var passwordverified=false;
function switchtosignup(){
    location.href="SignUp.html";
}

function clearbutton(){
    email.value="";
    password.value="";
    document.getElementById("emailerrorlogin").textContent="";
    document.getElementById("passworderrorlogin").textContent="Eg:Allwin123 ";
    email.style.boxShadow="";
    password.style.boxShadow="";
}

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    checkemailifexists(email.value);
    // console.log(checkemailifexists().json);
})

//validations

email.addEventListener("input",()=>{
    emailvalidation(email);
})

const checkemailifexists= async (emailId)=>{
    const response = await fetch("http://localhost:8080/auth/checkemail/"+emailId);
    const data=await response.json();
    if((data)===false){
        var error=document.getElementById("emailerrorlogin");
        email.style.boxShadow="0 0 0 4px #b54747"
        error.textContent="Email ID does not exists";
    }
    else{
        const response = await fetch("http://localhost:8080/auth/getauth/"+(emailId));
        const data=await response.json();
        if(data.password===(password.value)){
            sessionStorage.setItem('loginuser',(data.email));
            sessionStorage.setItem('root','register');
            location.href='registeration.html';
        }
        else{
            var perror=document.getElementById("passworderrorlogin");
            password.style.boxShadow="0 0 0 4px #b54747";
            perror.textContent="Wrong Password";
        }
    }
};

function emailvalidation(emaill){
    var email=emaill.value;
    var emailregex=/^[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,63}\.){1,127}[a-zA-Z]{2,}$/;
    var error=document.getElementById("emailerrorlogin");
    if(email === "" || email === null){
        emaill.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent="Email ID is empty";
    }
    else if (email.match(emailregex)) {
        emaill.style.boxShadow = "0 0 0 4px green";
        error.textContent = "";
    } else {
        emaill.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent = "Not a valid Email ID";
    }
}

//end of email validation

// password validation

password.addEventListener("input",()=>{
    passvalidation(password);
})
function passvalidation(passw){
    var pass=passw.value;
    var passregex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/;
    var error=document.getElementById("passworderrorlogin");
    if(pass === "" || pass === null){
        passw.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent="Password is empty";
    }
    else if (pass.match(passregex)) {
        passw.style.boxShadow = "0 0 0 4px green";
        error.textContent = "";
    } else {
        passw.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent = "Not a valid Password";
    }
}

//end of password validation
