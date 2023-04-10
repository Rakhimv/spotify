const authObserver = {
  currentValue: null,
  observers: [],
  get: function (target, property) {
    return target[property];
  },
  set: function (target, property, value) {
    target[property] = value;
    if (property === 'auth') {
      this.currentValue = value;
      this.notifyObservers();
    }
    return true;
  },
  addObserver: function (observer) {
    this.observers.push(observer);
  },
  notifyObservers: function () {
    const currentValue = this.currentValue;
    this.observers.forEach(function (observer) {
      observer(currentValue);
    });
  }
};

const auth = new Proxy({
  auth: false
}, authObserver);


let authFalse = document.querySelector(".authFalse")
let authTrue = document.querySelector(".authTrue")
let MyProfile = document.querySelector(".MyProfile")
let MyProfile_img = document.querySelector(".MyProfile img")
let MyProfileUrl = 'none'
let My_name = "user"

auth.auth = false
window.addEventListener('load', () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const user = JSON.parse(currentUser);
    console.log(user);
    auth.auth = user.auth
    MyProfileUrl = user.avatar
    My_name = user.name
    profile(user.avatar, user.name, MyProfile, MyProfile_img)
  }
});




function authes(currentValue) {
  if (currentValue) {
    authFalse.style.display = "none"
    authTrue.style.display = "flex"
    control_authFalse.style.display = "none"
    control_authTrue.style.display = "flex"
  } else {
    authTrue.style.display = "none"
    authFalse.style.display = "flex"
    control_authFalse.style.display = "flex"
    control_authTrue.style.display = "none"   
  }
}

authObserver.addObserver(authes);





function login() {
  window.location.href = 'login.html'
}

function signup() {
  window.location.href = 'signup.html'
}





