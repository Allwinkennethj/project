let page=0;
let psize;

var currentpage=document.getElementById("currentpage");
function nextPage(){
    if(psize-1>page){
        page=page+1;
        console.log(page);
        getusers();
        currentpage.innerHTML="Page "+(page+1)+" of "+(psize-1);
    }
}
function prevPage(){
    if(page>=1) {
        page = page - 1;
        console.log(page);
        getusers();
        currentpage.innerHTML="Page "+(page+1)+" of "+(psize-1);
    }
}
// edit button code

const table = document.getElementById("datatable");

table.addEventListener("click", function(event) {
    if (event.target.classList.contains("editbutton")) {
        const buttonId = event.target.id;
        getuser(buttonId)
    }
});

const getuser = async (buttonId)=>{
    const response = await fetch("http://localhost:8080/home/getoneUser/"+buttonId);
    const data=await response.json();
    const table = document.getElementById("datatable");
    sessionStorage.setItem("firstName",data.firstName);
    sessionStorage.setItem("lastName",data.lastName);
    sessionStorage.setItem("emailId",data.emailId);
    sessionStorage.setItem("mobileNum",data.mobileNum);
    sessionStorage.setItem("dob",data.dob);
    sessionStorage.setItem("address",data.address);
    sessionStorage.setItem('root','edit');
    location.href='registeration.html';
};


//

// delete button code

table.addEventListener("click", function(event) {
    if (event.target.classList.contains("deletebutton")) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        // body.backgroundColor=white;
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ).then(()=>{
                    const buttonId = event.target.id;
                    event.preventDefault();
                    const response=deleteapicall(buttonId);
                    if(response){
                        console.log(response);
                    }
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'No Files are Deleted :)',
                    'error'
                )
            }
        })
    }
});

function deleteapicall(emailId) {
    const response = deleteuser(emailId);
    console.log(response);
    return true
}
const deleteuser = async (emailId)=>{

    const response = await fetch("http://localhost:8080/home/deleteuser/"+emailId,{
        method:"DELETE",
        headers:{
            'Content-type':'application/json'
        }
    });
    location.reload();
    return response;
};

// end of delete button

//get all users
const getusers = async ()=>{
    var loginuser=sessionStorage.getItem('loginuser');

    await fetch((`http://localhost:8080/home/countUser`+loginuser))
        .then(response => response.json())
        .then(responseCount => {
            psize = Math.ceil(responseCount / 10);
        })
        .catch(err => {
        })
    const table = document.getElementById("datatable");
    table.innerHTML="";
    const newHeading=table.insertRow(table.rows.length);
    const newHeadingHtml = "<th>Email</th>" +
        "                <th>First Name</th>\n" +
        "                <th>Last Name</th>\n" +
        "                <th>Mobile</th>\n" +
        "                <th>D.O.B</th>\n" +
        "                <th>Address</th>\n" +
        "                <th>Actions</th>";
    newHeading.insertAdjacentHTML('beforeend',newHeadingHtml);
    var loginuser=sessionStorage.getItem('loginuser');
    const response = await fetch("http://localhost:8080/home/page/"+loginuser+"/"+page+"/10");
    const data=await response.json();

    // console.log(data);
    data.forEach(user=>{
        const newRow = table.insertRow(table.rows.length);
        const newRowHtml = "<td>"+ user.emailId + "</td><td>"+ user.firstName+"</td><td>"+user.lastName+"</td><td>"+user.mobileNum+"</td><td>"+user.dob+"</td><td>"+(user.address).substring(0,30   )+"</td><td class='editanddelete'><button class='editbutton' id="+user.emailId+">EDIT</button><button class='deletebutton' id="+user.emailId+">DELETE</button></td>";
        newRow.insertAdjacentHTML('beforeend',newRowHtml);
    })
    currentpage.innerHTML="Page "+(page+1)+" of "+(psize);
};

getusers();

//
function register(){
    sessionStorage.setItem('root','register');
    location.href='registeration.html';
}

function logout(){
    sessionStorage.clear()
    location.href="Login.html";
}

if(sessionStorage.getItem('loginuser')===null){
    location.href='Login.html';
}