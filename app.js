var formContainer = document.getElementById("formContainer");
var signupForm = document.getElementById("signupForm");
var signinForm = document.getElementById("signinForm");
var signupEmail = document.getElementById("signupEmail");
var signupPassword1 = document.getElementById("signupPassword1");
var signupPassword2 = document.getElementById("signupPassword2");
var signupStorage = [];
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var signinStorage = [];
var activeUser = "";
var welcome = document.getElementById("welcome");
var NameHeading = document.getElementById("userHeading");
var task_list = document.getElementById("task-list");

function showSignup() { // signup form open karne kay liye
  signinForm.style.display = "none";
  signupForm.style.display = "block";
  reset();
}

function showSignin() { // signin form open karne kay liye
  signupForm.style.display = "none";
  signinForm.style.display = "block";
  localStorage.removeItem("SigninValue");
  reset();
}

function reset() { // tamam input values ko blank karne kay liye
  signupEmail.value = "";
  signupPassword1.value = "";
  signupPassword2.value = "";
  signinEmail.value = "";
  signinPassword.value = "";
}

function logout() { // user ko application se exit kar ne kay liye
  activeUser = "";
  localStorage.removeItem("SigninValue");
  formContainer.style.display = "block";
  welcome.style.display = "none";
  reset();
  NameHeading.innerText = "";
}

function memoryClear() { // local storage me mojod tamam values ko nill karne kay liye.
  welcome.style.display = "none";
  formContainer.style.display = "block";
  localStorage.clear();
  NameHeading.innerText = "";
}

function welcomeScreen() { // application ko continue open rakhne kay liye ta kay browser refresh bi ho tab bi application screen band na ho.
  if (localStorage.getItem("SigninValue")) {
    welcome.style.display = "flex";
    formContainer.style.display = "none";
    NameHeading.innerText = localStorage.getItem('SigninValue');
    }
    // listDown()
    }
welcomeScreen();
// =========================Signup Form Start=====================
function saveSignup() { // signup ki value value save karwane kay liye.
        if (signupEmail.value &&
            signupPassword1.value &&
            signupPassword2.value &&
            signupPassword1.value === signupPassword2.value) {
                if (checkSignup() === false) {
                newSignUp();
                var emailShow = signupEmail.value;
                reset();
                showSignin();
                signinEmail.value = emailShow;
                } else {
                }
        } else {
            alert("Password not matched");
        }
}
function checkSignup() {  // email check karwane kay liye ta kay email id duplicate na ho.
  if (localStorage.getItem("SignupValue") === null) {
    newSignUp();
    console.log("1st User");
    var emailShow = signupEmail.value;
    reset();
    showSignin();
    signinEmail.value = emailShow;
  } else {
    console.log("New User");
    signupStorage = JSON.parse(localStorage.getItem("SignupValue"));
    var checkUser = false;
    for (var i = 0; i < signupStorage.length; i++) {
      if (signupEmail.value === signupStorage[i].signupEmail) {
        console.log("Username already available");
        checkUser = true;
        alert("Username already available");
        return checkUser;
      }
    }
    return checkUser;
  }
}
function newSignUp() { // new user email or password uodate karwane kay liye.
  var obj = {
    signupEmail: signupEmail.value,
    signupPassword: signupPassword1.value,
  };
  signupStorage.push(obj);
  localStorage.setItem("SignupValue", JSON.stringify(signupStorage));
}

// =========================Signup Form End=====================
// =========================Signin Form Start===================

function saveSignin() { // user ko signin karwane kay liye.
  var checkSignupEmail = false;
    if (localStorage.getItem("SigninValue") === null) {
        localStorage.setItem("SigninValue", "");
        var temp = JSON.parse(localStorage.getItem("SignupValue"));
        for (var i = 0; i < temp.length; i++) {
            if (
                signinEmail.value === temp[i].signupEmail &&
                signinPassword.value === temp[i].signupPassword
            ) {
                checkSignupEmail = true;
                console.log("ID Available");
                break;
            }
        }
    }
                        console.log(checkSignupEmail);
                        if (checkSignupEmail) {
                            activeUser = signinEmail.value;
                            console.log(activeUser);
                            newSignIn();
                            console.log("Welcome to Todo App");
                            welcome.style.display = "flex";
                            formContainer.style.display = "none";
                            console.log("User login");
                        } else {
                            console.log("Incorrect Email or Password");
                            localStorage.removeItem("SigninValue");
                            alert("Incorrect Email or Password");
                            signinPassword.value = "";
                        }
  console.log(activeUser);
  welcomeScreen();
  listDown()
}
function newSignIn() { // user ka data signup data se match karwane kay bad signin karwane kay liye.
  var obj = {
    loginEmail: signinEmail.value,
    loginPassword: signinPassword.value,
  };
  signinStorage.push(obj);
  localStorage.setItem("SigninValue", activeUser);
  return;
}

// =========================Signin Form End=====================
// =====================Todo Application Start=====================

var listContainer = document.getElementById('listContainer');
var input = document.getElementById('new-task');
var add_btn = document.getElementById("add-task-btn");

var todoStorage = [];
var myTodos = [];


add_btn.addEventListener('click', function(){
    if(localStorage.getItem('ToDos')){
        todoStorage = JSON.parse(localStorage.getItem('ToDos'))
            newTodo()
            console.log('Next Todo')
            listDown()
        } else{

        newTodo();
        console.log('1st Todo')
        listDown()
    }
    
});
function newTodo() {
    var now = new Date();
    var nowDate = now.toLocaleDateString();
    if (input.value) {
        var obj = {
        emailID: localStorage.getItem('SigninValue'),
        toDo: input.value,
        date: nowDate,
        }

        if(todoStorage!==null){

        todoStorage.push(obj);
        input.value = "";
        localStorage.setItem('ToDos', JSON.stringify(todoStorage))
    } else{
      console.log('ab batao kia karna hai newTodo me')
      todoStorage.push(obj);
      input.value = "";
      console.log('ab batao kia karna hai newTodo me')
      localStorage.setItem('ToDos', '')

      // localStorage.setItem('ToDos', JSON.stringify(todoStorage))
    }      
  } 
    return myTodos;
}


function listDown(){
    var myID = localStorage.getItem('SigninValue');
    todoStorage = JSON.parse(localStorage.getItem('ToDos'));
    var myTodos = [];
    var newEntries = '';  // Temporary string to hold HTML
    task_list.innerHTML = '';   
    console.log(typeof todoStorage)

    if(todoStorage!==null){
    todoStorage.forEach(function(data, ind) {
        if(myID === data.emailID){
            myTodos.push(data);  
            var new_Entry = `
            <li class="task-item">
                <span class="userName" style="display: none;">${data.emailID}</span>
                <span class="task-text">${data.toDo}</span>
                <span class="number" id="number">${data.date}</span>
                <div class="task-buttons">
                    <span class="task-date"></span>
                    <button class="edit-btn" onclick="edit_btn(this)">✎</button>
                    <button class="delete-btn" onclick="delete_btn(this)">&times;</button>
                </div>
            </li>`;
            
            newEntries += new_Entry;  // Append to temporary string
        task_list.innerHTML = newEntries;  // Assign once after loop
        }
        });       
        } 
        // else{
        //   console.log('ab kia karna hai')

        //   localStorage.setItem('ToDos', JSON.stringify(todoStorage))
        //       todoStorage = JSON.parse(localStorage.getItem('ToDos'));

        
        
        //   }
      return task_list.innerHTML;
}

function edit_btn(element) {
  var email = element.parentElement.parentElement.children[0].innerText
  var text = element.parentElement.parentElement.children[1].innerText
  
  var previousDate = element.parentElement.parentElement.children[2].innerHTML


  todoStorage = JSON.parse(localStorage.getItem('ToDos'));
  
  var checkData = false
  
  todoStorage.forEach(function(data,ind){
    if(email === data.emailID && text === data.toDo && previousDate===data.date){
      console.log('value available for change')
      console.log(data.toDo)
      var now = new Date();
      var currentDate = now.toLocaleDateString();
      var updatedText = prompt("Enter updated value",  data.toDo);
      var obj = {
        emailID: email,
        toDo: updatedText,
        date : currentDate,
            }
            todoStorage.splice((ind), 1, obj)
            console.log(todoStorage)
            localStorage.setItem('ToDos', JSON.stringify(todoStorage))
      
      console.log('value updated')
      listDown()
      checkData = true;
      } 
      })
}
function delete_btn(element) {
var email = element.parentElement.parentElement.children[0].innerText
var text = element.parentElement.parentElement.children[1].innerText
var date = element.parentElement.parentElement.children[2].innerHTML
todoStorage = JSON.parse(localStorage.getItem('ToDos'));
  
  var checkData = false

  todoStorage.forEach(function(data,ind){
    if(email === data.emailID && text === data.toDo && date===data.date){
      console.log('value available')
      todoStorage.splice(ind, 1)
      console.log('value delete')
      localStorage.setItem('ToDos', JSON.stringify(todoStorage))
      listDown()
      checkData = true;
      } 
      })
}


// =====================Todo Application End=====================