import "./styles.css"

const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");
let currentGame;
let up = false;
let down = false;
const lastControls = { up: false, down: false };
let lastSentControls = 0;

requestAnimationFrame(render);

function render() {
  requestAnimationFrame(render);
  if (currentGame) {
    ctx.save();
    ctx.scale(5,5);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,100,100);

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(0, currentGame.y);
    ctx.lineTo(100, currentGame.y);
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(50, currentGame.y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = "4px Arial";
    ctx.fillText("W/S = Up/Down", 2, 5);
    ctx.fillText(Math.floor(currentGame.y)+"", 90, 5);
    ctx.fillText(Rune.gameTime()+"", 50, 5);
    ctx.restore();
  }
}

function sendControls() {
  if (Date.now() - lastSentControls > 100) {
    if (lastControls.up !== up || lastControls.down !== down) {
      lastSentControls = Date.now();
      lastControls.up = up;
      lastControls.down = down;
      Rune.actions.controls({ up, down });
    }
  }
}

setInterval(() => {
  sendControls();
}, 100);

window.addEventListener("keydown", (event) => {
  if (event.key === "w") {
    up = true;
    sendControls();
  }
  if (event.key === "s") {
    down = true;
    sendControls();
  }
})

window.addEventListener("keyup", (event) => {
  if (event.key === "w") {
    up = false;
    sendControls();
  }
  if (event.key === "s") {
    down = false;
    sendControls();
  }
})

Rune.initClient({
  onChange: ({ game }) => {
    currentGame = game;
  },
})
