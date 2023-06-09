// ------------ Setup ------------
window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = SCREENHEIGHT;
gameCanvas.width = SCREENWIDTH;
let gameover = document.getElementById("gameover");
let start = document.getElementById("start");
let siffra = document.getElementById("siffra");
let tryagain = document.getElementById("tryagain");
let wasd = document.getElementById("WASD")

// -------------------------------------
// Player variables
let playerWidth = 100;
let playerHeight = 130;
let playerX = 500;
let playerY = SCREENHEIGHT-playerHeight;
let dx = 12;
let dy = 0; // initial vertical velocity
const gravity = 0.45; // gravitational force
const moving = 1;

let hasDoubleJumped = false

let directions = {
  left: false,
  right: false,
  up: false,
  down: false,
};

let img = new Image();
img.onload = function () {};
img.src = "media/apa.png";

function Init() {
  sten3 = document.getElementById("sten3");
  spaceW = SCREENHEIGHT - sten3.height;
  spaceH = SCREENWIDTH - sten3.width;

  moveIt();
}


function moveIt() {
  var canvasRect = gameCanvas.getBoundingClientRect();
  var canvasTop = canvasRect.top;
  var canvasLeft = canvasRect.left;

  var sten3Rect = sten3.getBoundingClientRect();
  var sten3Width = sten3Rect.width;
  
  var randomX = Math.round(Math.random() * (SCREENWIDTH - sten3Width));
  var randomY = canvasTop-15;

  sten3.style.top = randomY + "px";
  sten3.style.left = randomX + "px";
}

// -------------------------------------
// ------------ Player movement ------------


// ------------- Ducka ------------------

document.addEventListener("keypress", (e) =>{
  if (e.repeat) return;
  switch (e.key) { 
    case "ArrowDown":
      directions.down = true;
      break
  }
})

// -----Keydown------------------------


document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  switch (e.key) {
    case "a":
      directions.left = true;
      break;

    case "ArrowLeft":
      directions.left = true;
      break;
    case "ArrowRight":
      directions.right = true;
      break


    



    case "d":
      directions.right = true;
      break;
    case "w":
      directions.up = true;
      if (playerY + playerHeight >= SCREENHEIGHT) {
        dy = -10;
      } else if (hasDoubleJumped == false && playerY + playerHeight < SCREENHEIGHT) {
        console.log(innerHeight)
        console.log(playerY)
        console.log("And")
        dy = -10;
        hasDoubleJumped = true
      }
      break;

    case "ArrowUp":
      directions.up = true;
      if (playerY + playerHeight >= SCREENHEIGHT) {
        dy = -10;
      } else if (hasDoubleJumped == false && playerY + playerHeight < SCREENHEIGHT) {
        console.log(innerHeight)
        console.log(playerY)
        console.log("And")
        dy = -10;
        hasDoubleJumped = true
      }
      break;

    default:
      break;
  }
});



document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      directions.left = false;
      break;
    case "d":
      directions.right = false;
      break;

    case "ArrowLeft":
      directions.left = false;
      break;
    case "ArrowRight":
      directions.right = false;
      break


    case "ArrowDown":
      directions.down = false;
      break



    case " ":
      directions.up = false;
      break;
    default:
      break;
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------FUNKTIONER-------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------
// ---------------Stop Function-----------------

function stanna() {
  dx = 0;
  dy = 0;
}

// ---------------------------------------------
// ------------ Wait function --------------------

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

// -------------------------------------
// ------------ Animation ------------
async function animate() {
  requestAnimationFrame(animate);
  sten3.style.display = "block"

  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  c.drawImage(img, playerX, playerY, playerWidth, playerHeight);

  playerY += dy;
  playerX -= dx / 4;


  
  dy += gravity;

  // ----------- Spelarens horisontella rörelser -------------------------

  if (directions.right) {
    playerX += dx;
  }

  if (directions.left) {
    playerX -= dx;
  }

  if (directions.down) {
    playerHeight =- 5
  }




  // -------- Hoppfunktion / Dubbelhopp funktion ---------------

  if (directions.up) {
    
  }

  if (playerY + playerHeight > SCREENHEIGHT) {
    playerY = SCREENHEIGHT - playerHeight;
    dy = 0;
    hasDoubleJumped = false
  }

  // ------------------------------------------------------------

  

  // if (playerX - playerWidth/2 > SCREENWIDTH) {
  //     playerX = +playerWidth
  //     gameCanvas.style.background = "url('media/stad.png') no-repeat"
  // }


  if (playerX + playerWidth / 2 < 0) {
    gameCanvas.style.animation = "back 0s infinite linear";
    gameover.style.display = "block";
    stanna();
    tryagain.style.display = "flex";
    
  }
}

async function countdown() {
  start.style.display = "none";
  wasd.style.display = "none"
  siffra.innerHTML = "3";
  siffra.style.display = "block";

  await delay(1000);

  siffra.innerHTML = "2";

  await delay(1000);

  siffra.innerHTML = "1";

  await delay(1000);

  siffra.innerHTML = "GO!";

  await delay(1000);

  siffra.style.display = "none";
  animate();
}

function game() {
  start.onclick = function () {
    countdown();
  };
}




// -------------------------------------
// ------------ Start game ------------
game();
