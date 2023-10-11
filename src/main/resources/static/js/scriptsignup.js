var email=document.getElementById("emailidforregister");

var password=document.getElementById("passwordforregister");

var confpass=document.getElementById("passwordforregisterconfirm");
const form=document.getElementById("signupform");
var validationcount=false;

function finalvalidation(){
    if((document.getElementById("emailerrorregister").textContent==="") &&
        (document.getElementById("passworderrorregister").textContent==="Eg:Allwin123 " || document.getElementById("passworderrorregister").textContent==="") &&
        (document.getElementById("cpassworderrorregister").textContent===""))
    {
        validationcount=true;
    }
}
function switchtologin(){
    location.href="Login.html";
}

// add values to database
form.addEventListener("submit",(event)=>{
    finalvalidation();
    event.preventDefault();

    if(validationcount===true){
        // console.log("inside validation true");
        const response=apicall();
        // console.log(response);
        clearbutton();
        // if(sessionStorage.getItem('login')=="register"){
        //     showMessage("Values are added successfully", 3000);
        // }
        // else{
        //     showMessage("Values are edited successfully", 3000);
        // }
        validationcount=false;
    }
    // else{
        // showMessage("Values are not entered correctly", 3000);
    // }
})

function apicall() {
    const response = adduser();
    console.log(response);
    return true
}

const adduser = async ()=>{
    const dt = JSON.stringify({
        email:email.value,
        password:password.value
    });
    const response = await fetch("http://localhost:8080/auth/adduser",{
        method:"POST",
        body:dt,
        headers:{
            'Content-type':'application/json'
        }
    });
    return response;
};

//end of adding values to database

// email validation

email.addEventListener("input",()=>{
    emailvalidation(email);
})

const checkemailifexists= async (emailId)=>{
    const response = await fetch("http://localhost:8080/auth/checkemail/"+emailId);
    const data=await response.json();
    if((data)===true){
        var error=document.getElementById("emailerrorregister");
        email.style.boxShadow="0 0 0 4px #b54747"
        error.textContent="Email ID already exists";
    }
};

function emailvalidation(emaill){
    var email=emaill.value;
    var emailregex=/^[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,63}\.){1,127}[a-zA-Z]{2,}$/;
    var error=document.getElementById("emailerrorregister");
    if(email === "" || email === null){
        emaill.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent="Email ID is empty";
    }
    else if (email.match(emailregex)) {
        emaill.style.boxShadow = "0 0 0 4px green";
        error.textContent = "";
        checkemailifexists(email);
    } else {
        emaill.style.boxShadow = "0 0 0 4px #b54747";
        error.textContent = "Not a valid Email ID";
    }
}

//end of email validation

// password validation

password.addEventListener("input",()=>{
    passvalidation(password,"");
})

confpass.addEventListener("input",()=>{
    passvalidation(confpass,"c")
    var error=document.getElementById("cpassworderrorregister");
    if((password.value)!==(confpass.value)){
        error.textContent="Password and Confirm should be same"
    }
    else if((password.value)===(confpass.value)){
        error.textContent="";
    }
})

function passvalidation(passw,x){
    var pass=passw.value;
    var passregex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/;
    var error=document.getElementById(x+"passworderrorregister");
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

function clearbutton(){
    email.value="";
    password.value="";
    confpass.value="";
    document.getElementById("emailerrorregister").textContent="";
    document.getElementById("passworderrorregister").textContent="Eg:Allwin123 ";
    document.getElementById("cpassworderrorregister").textContent="";
    email.style.boxShadow="";
    password.style.boxShadow="";
    confpass.style.boxShadow="";
}

