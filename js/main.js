const comList = document.querySelectorAll("#com ul li");
const playerList = document.querySelectorAll("#player ul li");
const result = document.querySelector("#result ul");
const cover = document.querySelector("#cover");
const resultTxt = cover.querySelector("h1 strong");
const btnRestart = cover.querySelector("#btnRestart");

let random = 0;
let gameCount = 0;
let clearComChoice = 0;
let clearReset = 0;
let winCount = 0;
let drawCount = 0;
let loseCount = 0;

function playerChoice() {
  playerList.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      gameCount++;

      document.body.classList.add("blocking");
      clearInterval(clearComChoice);
      const selectedId = parseInt(this.dataset.id);
      decide(selectedId, random);
      restartFunc();
      if (gameCount >= 3) {
        cover.classList.add("on");
        clearInterval(clearComChoice);
        clearTimeout(clearReset);
        if (drawCount === 3 || (winCount >= 1 && drawCount >= 1 && loseCount >= 1)) {
          resultTxt.textContent = "DRAW";
        } else if (winCount >= 2 || (winCount >= 1 && drawCount >= 2)) {
          resultTxt.textContent = "WIN";
        } else {
          resultTxt.textContent = "DRAW";
        }
      }
    });
  });
}

function decide(playerNum, comNum) {
  const li = document.createElement("li");
  if (playerNum === comNum) {
    li.textContent = "D";
    li.classList.add("draw");
    drawCount++;
  } else if ((comNum === 0 && playerNum === 1) || (comNum === 1 && playerNum === 2) || (comNum === 2 && playerNum === 0)) {
    li.textContent = "W";
    li.classList.add("win");
    winCount++;
  } else {
    li.textContent = "L";
    li.classList.add("lose");
    loseCount++;
  }
  result.append(li);
}

function comChoice() {
  random = Math.floor(Math.random() * 3);
  comList.forEach(function (item, idx) {
    if (idx === random) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
function restart() {
  cover.classList.remove("on");
  gameCount = 0;
  winCount = 0;
  drawCount = 0;
  loseCount = 0;
  result.innerHTML = "";
  restartFunc();
}
function restartFunc() {
  clearReset = setTimeout(function () {
    clearComChoice = setInterval(comChoice, 20);
    document.body.classList.remove("blocking");
  }, 1000);
}
btnRestart.addEventListener("click", restart);
playerChoice();
restart();
