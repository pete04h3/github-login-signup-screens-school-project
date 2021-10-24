const fname = document.getElementById("logfname");
const lname = document.getElementById("loglname");
const email = document.getElementById("logemail");
const password = document.getElementById("logpass");
const login = document.querySelector(".btn");
const ptxt = document.getElementById("pword-txt");
const etxt = document.getElementById("email-txt");
const fnametxt = document.getElementById("fname-txt");
const lnametxt = document.getElementById("lname-txt");
const Eerror = document.getElementById("email-error");
const perror = document.getElementById("password-error");
const fnameerror = document.getElementById("fname-error");
const lnameerror = document.getElementById("lname-error");
const input = document.querySelector(".form-style");
const container = document.querySelector(".container");
const esearch = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const psearch = /[a-z]{8,32}/g;

login.addEventListener('click', (e) => {

  if(!password.value.match(psearch) && !email.value.match(esearch)){
    password.focus();
    e.preventDefault();
     password.style.borderColor = "#ec4846";
     password.style.backgroundColor = "rgb(91 53 53 / 57%)";
     ptxt.style.color = "#ec4846";
     perror.innerText = " - Password should be between 8 and 32 characters";
 
     email.focus();
     e.preventDefault();
     email.style.borderColor = "#ec4846";
     email.style.backgroundColor = "rgb(91 53 53 / 57%)";
     etxt.style.color = "#ec4846";
     Eerror.innerText = " - Please provide an email";
     
   }


  if(!password.value.match(psearch) && !email.value.match(esearch) && !fname.value.match(psearch) && !lname.value.match(psearch)){
   password.focus();
   e.preventDefault();
    password.style.borderColor = "#ec4846";
    password.style.backgroundColor = "rgb(91 53 53 / 57%)";
    ptxt.style.color = "#ec4846";
    perror.innerText = " - Password should be between 8 and 32 characters";

    email.focus();
    e.preventDefault();
    email.style.borderColor = "#ec4846";
    email.style.backgroundColor = "rgb(91 53 53 / 57%)";
    etxt.style.color = "#ec4846";
    Eerror.innerText = " - Please provide an email";

    fname.focus();
    e.preventDefault();
    fname.style.borderColor = "#ec4846";
    fname.style.backgroundColor = "rgb(91 53 53 / 57%)";
    fnametxt.style.color = "#ec4846";
    fnameerror.innerText = " - Please provide a first name";

    lname.focus();
    e.preventDefault();
    lname.style.borderColor = "#ec4846";
    lname.style.backgroundColor = "rgb(91 53 53 / 57%)";
    lnametxt.style.color = "#ec4846";
    lnameerror.innerText = " - Please provide a last name";
    
  }
  else if(email.value === "" || !email.value.match(esearch)){
    email.focus();
    e.preventDefault();
    email.style.borderColor = "#ec4846";
    etxt.style.color = "#ec4846";
    Eerror.innerText = " - This is not a valid email address";
  }else{
    email.value = "";
    password.value = "";
    fname.value = "";
    lname.value = "";
    container.style.animation = "jump .3s linear";
    container.addEventListener('animationend', () => {
      container.style.display = "none";
      canvas.style.transform = "translate(0vw)";
     // setTimeout(() => {
        user.login = true;
      //}, 1000)
    })
  }
  setTimeout(() => {
    ptxt.style.color = "#919296";
    etxt.style.color = "#919296";
    fnametxt.style.color = "#919296";
    lnametxt.style.color = "#919296";
    perror.innerText = "";
    Eerror.innerText = "";
    fnameerror.innerText = "";
    lnameerror.innerText = "";
    email.style.borderColor = "";
    password.style.borderColor = "";
    fname.style.borderColor = "";
    lname.style.borderColor = "";
    fname.style.backgroundColor = "";
    lname.style.backgroundColor = "";
    password.style.backgroundColor = "";
    email.style.backgroundColor = "";
  }, 2500)
});

const canvas = document.getElementById('svgBlob');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let numParticles = 20;
let particles = [];

const colors = ["#1d1e22", "#7d8087", "#5f6988"];

const mouse = {
  x: null
}

let user= {
  login: false
}

class Particle {
    constructor(){
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + (Math.random() * 200);
      this.radius = (Math.random() * 2) + 2;
      this.speedX = (Math.random() * 2);
      this.moveRight = this.x + this.speedX;
      this.moveLeft = this.x - this.speedX;
      this.speedY =  Math.random() * 0.5;
      this.color = colors[Math.floor(Math.random() * 3)];
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
    update(){
      this.draw();
      if(!user.login){
        this.y -= this.speedY; 
      }else {
        this.y -= 10;
      }
      if(this.y <= canvas.height){
          if(mouse.x > canvas.width/2){
              this.x = this.moveRight;
          }else {
              this.x = this.moveLeft; 
          }
      }
    }
}

function setup(){
    for (let i = 0; i < numParticles; i++){
        particles.push(new Particle());
    }
}

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
})

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    if(particle.y + particle.radius < 0){
      setTimeout(() => {
        particles.splice(index, 1);
      },0)
      if(!user.login){
       particles.push(new Particle()); 
      }
    }
  })
}
setup();
animate();

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

var qr;
(function() {
qr = new QRious({
element: document.getElementById('qr-code'),
size: 170,
value: 'Paste a link or text over here to create a QR Code for it'
});
})();