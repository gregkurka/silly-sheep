const form = document.querySelector("form");
const numSheepToAdd = document.querySelector("#numSheep");
const start = document.querySelector("#startingBank");
const river = document.querySelector(".river");
const targetBank = document.querySelector("#targetBank");
const scoreKeeper = document.querySelector(".score-display");

let score = 0;

function updateScore() {
  scoreKeeper.innerHTML = score;
}

function addToStart(num) {
  for (let i = 0; i < num; i++) {
    const button = document.createElement("button");
    Object.assign(button.style, {
      left: `${Math.random() * 200}px`,
      top: `${Math.random() * 500}px`,
    });
    button.textContent = "🐑";
    button.classList.add("sheep");
    start.append(button);
    console.log(window.getComputedStyle(button).left);
  }
}

addToStart(1);
updateScore();
console.log(start.getBoundingClientRect());

setInterval(() => {
  const starterSheepList = document.querySelectorAll("#startingBank .sheep");
  const riverSheepList = document.querySelectorAll(".river .sheep");

  starterSheepList.forEach((sheep) => {
    const minMove = -21;
    const maxMove = 21;
    const range = maxMove - minMove;
    let currentX = parseFloat(window.getComputedStyle(sheep).left);
    let currentY = parseFloat(window.getComputedStyle(sheep).top);

    let newX = currentX + Math.random() * range + minMove;
    let newY = currentY + Math.random() * range + minMove;

    newX = Math.max(0, Math.min(newX, 195));
    newY = Math.max(0, Math.min(newY, 495));

    Object.assign(sheep.style, {
      left: `${newX}px`,
      top: `${newY}px`,
    });
  });

  riverSheepList.forEach((sheep) => {
    const minMove = 3;
    const maxMove = 21;
    const range = maxMove - minMove;
    let currentX = parseFloat(window.getComputedStyle(sheep).left);
    let currentY = parseFloat(window.getComputedStyle(sheep).top);

    let newY = currentY + Math.random() * range + minMove;
    newY = Math.max(0, Math.min(newY, 510));

    if (newY >= 510) {
      sheep.remove();
    }

    Object.assign(sheep.style, {
      left: `${currentX}px`,
      top: `${newY}px`,
    });
  });
}, 50);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addToStart(parseInt(numSheepToAdd.value));
});

start.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("sheep")) {
    river.appendChild(e.target);
    Object.assign(e.target.style, {
      left: `${Math.random() * 200}px`,
      top: `${Math.random() * 200}px`,
    });
  }
});

river.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("sheep")) {
    targetBank.appendChild(e.target);
    Object.assign(e.target.style, {
      left: `${Math.random() * 200}px`,
      top: `${Math.random() * 500}px`,
    });
    gratitudeMessages = [
      "THANK YOU!",
      "BLESS YOUR SOUL!",
      "WE LOVE YOU!",
      "YOU SAVED ME!",
      "THANKS, KING!",
    ];
    randomizedMessage =
      gratitudeMessages[Math.floor(Math.random() * gratitudeMessages.length)];
    e.target.textContent = `🐑 - ${randomizedMessage}`;
    score++;
    updateScore();
  }
});
