// Get inputs data from user
let userName = document.querySelector("#userName");
let userEmail = document.querySelector("#userEmail");
let userPassword = document.querySelector("#userPassword");
let email = document.querySelector("#emailLogin");
let password = document.querySelector("#passwordLogin");

// console.log(email)
// console.log(userName, userEmail, userPassword)


// Btns
let btnRegister = document.querySelector("#btnRegister");
let btnLogin = document.querySelector("#btnLogin");

// Errors Handler p
let userNameErr = document.querySelector(".userNameErr");
let userEmailErr = document.querySelector(".userEmailErr");
let userPasswordErr = document.querySelector(".userPasswordErr");
let globalErr = document.querySelector(".globalErr");

const currentUser = {
    name:null,
    email:null,
    i:null,
    password:null,
}



// Check if user already exists
if (localStorage.getItem('users') == null) {
    var users = []
    var emails=[]


}else{
    var users = JSON.parse(localStorage.getItem('users'));
    var emails = getEmails(users);
    // console.log(emails)
}

// Register
try{
    
    btnRegister.addEventListener("click",()=>{
        checkValuesR();
    });
}catch(e){
    console.log("Not Register page")
}



// Validate on register
let checkValuesR = function(){
    // success values
    username = userName.value;
    useremail = userEmail.value;
    userpassword = userPassword.value;

    // Validate all function 
    const res = globalValidate(ValidateName(),ValidateEmail(userEmail),ValidatePassword());
    if(!res){
        if(!checkUser){
        alert("Please check errors and enter valid data to register.")
        }
    }else{
        // create object of user with it's valid data
        user = {
            username : userName.value.toLowerCase(),
            useremail : userEmail.value,
            userpassword : userPassword.value,
        }

        users.push(user);
        updateIndex();
        console.log(users);
        localStorage.setItem("users", JSON.stringify(users));
        
        // redirect him to login
        window.location.assign("login.html");
    }

}
// Update indecies in main list
let updateIndex = function (){
    for (const [index, user] of users.entries()){
        user.i = index;
    
    }

}



// Realtime Validation 
// Username

let ValidateName = function (){
    let name = userName.value;
    const res =/^\w[a-zA-Z0-9_]{1,8}$/;
    const valid = res.test(name);
    if(!valid){
        // if exist before else this
        userNameErr.innerHTML= `<i class="fa-solid fa-circle-exclamation"></i>Please Enter Valid username,chars,digit or _ only , not more than 8 characters.`;
    }else{
        userNameErr.innerHTML= "";
        return true;
    }
}

// Email
let ValidateEmail = function (){
    try{
        globalErr.innerHTML= "";
    }catch(e){}

    let e = userEmail? userEmail.value : email.value;
    const res =  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const valid = res.test(e);
    if(emails.includes(e)){
        userEmailErr.innerHTML= `<i class="fa-solid fa-circle-exclamation"></i>Email already exist before , Try another one `;
    }
    else if(!valid){
        // if exist before else this
        userEmailErr.innerHTML= `<i class="fa-solid fa-circle-exclamation"></i>Please Enter Valid email,must have @ and ex:.com `;
        
    }else{
        userEmailErr.innerHTML= "";
        return true;
    }
}



// password

var ValidatePassword = function (){
    let pass = userPassword? userPassword.value :password.value;
    const res = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const valid = res.test(pass);
    if(!valid){
        // if exist before else this
        userPasswordErr.innerHTML= `<i class="fa-solid fa-circle-exclamation"></i>Please Enter Valid password start with capital letter and more than 8 chars,number and must have a special character.`;
    }else{
        userPasswordErr.innerHTML= "";
        return true;
    }
}




// Global check if exists before
// input > which type key and it's value
var globalValidate = function (name,email,pass){
    if(!checkUser()){
        alert("user with same email already exists!")
        
    }else{
        if(name&email&pass)
            return true;
        else
            return false;
    }

}


// check if user registered before
function getEmails (users){
    let emails=[]
    for (const user of users) {
        emails.push(user.useremail);
    }
    return emails;
}

let checkUser = function(){
    if(!emails.isEmpty){
        let ee = userEmail.value.toLowerCase();
        console.log(ee);
        let check = emails.includes(ee);
        console.log(check);
        if(!check )
            return true; //you can add
        else
        return false; //exists can't add again
    }else{
        return true;
    }
}


// Login
try{
    
    btnLogin.addEventListener("click",()=>{
        checkValuesL();
    });
}catch(e){
    console.log("Not Login page")
}





// Login 
// fuction validate password 

let checkValuesL = function(){
    if(email.value.length != 0  && password.value.length != 0){
        let e = email.value;
        let p = password.value;
        console.log(e,p);
        
        for (const [index,user] of users.entries()){
            if(user.useremail == e){
                if(user.userpassword == p){
                    currentUser.name = user.username;
                    currentUser.password = user.userpassword;
                    currentUser.email = user.useremail;

                    // Add current user to local storage and call a function to display then logout
                // redirect him to Home Page
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                localStorage.setItem("flag", "true");
                redirectToHome();
                return ;
            }
        }
        else{
            globalErr.innerHTML= `<i class="fa-solid fa-circle-exclamation"></i> Wrong Email or Password , register if not signed up `;
                currentUser.i = null;
                currentUser.name = null;
                currentUser.email = null;
                currentUser.password = null;  
            localStorage.setItem("currentUser",JSON.stringify(currentUser));
            localStorage.setItem("flag","false");
        }
    }
    
}else{
    alert("Please add data !");
}
}

let redirectToHome = function(){
    let f = JSON.parse(localStorage.getItem("flag"));

    if(f){
        window.location.assign("home.html")
    }
}


// Check if email already exists 