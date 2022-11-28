const comList = document.querySelectorAll("#com ul li");
const playerList = document.querySelectorAll("#player ul li");
const result = document.querySelector("#result ul");
let winCount = 0;
let drawCount = 0;
let loseCount = 0;

function comChoice() {
  const randomNum = Math.floor(Math.random() * 3);
  comList.forEach(function (item, idx) {
    if (idx === randomNum) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

let clearComChoice = setInterval(comChoice, 20);

function playerChoice() {
  playerList.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      clearInterval(clearComChoice);
      document.body.classList.add("blocking");
      setTimeout(function () {
        clearComChoice = setInterval(comChoice, 20);
        document.body.classList.remove("blocking");
      }, 1000);
      decide(playerNum, comNum);
      const playerNum = parseInt(this.dataset.id);
    });
  });
}

playerChoice();

function decide(playerNum, comNum) {
  const li = document.createElement("li");
  if (playerNum === comNum) {
    li.textContent = "D";
    console.log("D");
    li.classList.add("draw");
    drawCount++;
  } else if ((comNum === 0 && playerNum === 1) || (comNum === 1 && playerNum === 2) || (comNum === 2 && playerNum === 0)) {
    li.textContent = "W";
    console.log("W");
    li.classList.add("win");
    winCount++;
  } else {
    li.textContent = "L";
    console.log("L");
    li.classList.add("lose");
    loseCount++;
  }
  result.append(li);
}
