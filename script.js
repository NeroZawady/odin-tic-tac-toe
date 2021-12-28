const MAX_POINTS = 3;
const SKIP_NAME_FORM = false;
const SKIP_CHARACTER_SELECTION = false;

const gameContainer = document.querySelector("#gameContainer");
const score = document.querySelector("#score");
const form = document.querySelector("form");
const nameInput = document.querySelector("form input");
const buttonSubmit = document.querySelector("form button");
const characterSelectionContainer = document.querySelector("#characterSelectionContainer");
const buttonCharacterX = document.querySelector("#characterX");
const buttonCharacterO = document.querySelector("#characterO");
const gameOverBanner = document.querySelector("#gameOverBanner");
const buttonPlayAgain = document.querySelector("#playAgain");
const buttonRestart = document.querySelector("#restart");

let boolGameOver = false;

const game = (() => {
  
})();

const gameBoard = (() => {
  const cells = Array.from(document.querySelectorAll("#boardContainer button"));
  let emptyCells = 9;

  const reset = () => {
    for(let cell in cells) cell.textContent = "";
    emptyCells = 9;
  }

  return {
    cells,
    emptyCells,
    reset,
  }

})();

const player = (() => {
  let name = "";
  let character = "";
  let score = 0;

  return {
    name,
    character,
    score,
  }

})();

const computer = (() => {
  const name = "Computer";
  let character = "";
  let score = 0;

  return {
    name,
    character,
    score,
  }

})();

for(let cell of gameBoard.cells) {
  cell.addEventListener("click", () => {
    if(cell.textContent === "" && !boolGameOver) {
      cell.textContent = player.character;
      gameBoard.emptyCells--;

      if(gameBoard.emptyCells < 5 && findWinner() === player.character) {
        player.score++;
        score.style.color = "green";
        score.textContent = player.score + " - " + computer.score;

        if(player.score === MAX_POINTS) {
          gameOver(true);
        } else{
          gameBoard.emptyCells = 9;
          gameBoard.cells = gameBoard.cells.map(x => {x.textContent = ""; return x;});
        }
      } else if(gameBoard.emptyCells === 0) {
        score.style.color = "white";

        gameBoard.emptyCells = 9;
        gameBoard.cells = gameBoard.cells.map(x => {x.textContent = ""; return x;});

      } else {
        if(gameBoard.emptyCells > 0) {
          let cellIndex = Math.floor(Math.random() * gameBoard.cells.filter(x => x.textContent === "").length);
          gameBoard.cells.filter(x => x.textContent === "")[cellIndex].textContent = computer.character;
          gameBoard.emptyCells--;

          if(gameBoard.emptyCells < 4 && findWinner() === computer.character) {
            computer.score++;
            score.style.color = "red";
            score.textContent = player.score + " - " + computer.score;

            if(computer.score === MAX_POINTS) {
              gameOver(false);
            } else{
              gameBoard.emptyCells = 9;
              gameBoard.cells = gameBoard.cells.map(x => {x.textContent = ""; return x;});
            }
          }
        }
      }
    }
  });
}

function gameOver(playerWon) {
  if(playerWon) {
    gameOverBanner.querySelector("div").textContent = "You Won!";
    gameOverBanner.style.backgroundColor = "green";
  } else {
    gameOverBanner.querySelector("div").textContent = "You Lost...";
    gameOverBanner.style.backgroundColor = "red";
  }
  gameOverBanner.style.display = "block";
  boolGameOver = true;
}

buttonPlayAgain.addEventListener("click", () => {
  player.score = 0;
  computer.score = 0;
  score.textContent = "0 - 0";
  score.style.color = "white";
  gameBoard.emptyCells = 9;
  gameBoard.cells = gameBoard.cells.map(x => {x.textContent = ""; return x;});
  boolGameOver = false;
  gameOverBanner.style.display = "none";
})

buttonRestart.addEventListener("click", () => {
  if(!boolGameOver) {
    player.score = 0;
    computer.score = 0;
    score.textContent = "0 - 0";
    score.style.color = "white";
    gameBoard.emptyCells = 9;
    gameBoard.cells = gameBoard.cells.map(x => {x.textContent = ""; return x;});
  }
})


function findWinner() {
  if(checkHorizontal() !== null) {
    return checkHorizontal();
  } else if(checkVertical() !== null) {
    return checkVertical();
  } else if(checkDiagonal() !== null) {
    return checkDiagonal();
  } else {
    return "None";
  }

  // return (checkHorizontal() || checkVertical() || checkDiagonal || 0);
}

function checkHorizontal() {
  for(let i = 0; i < 9; i += 3) {
    if(gameBoard.cells[i].textContent === gameBoard.cells[i+1].textContent && gameBoard.cells[i+1].textContent === gameBoard.cells[i+2].textContent && gameBoard.cells[i].textContent !== "") {
      return gameBoard.cells[i].textContent;
    }
  }

  return null;
}

function checkVertical() {
  for(let i = 0; i < 3; i++) {
    if(gameBoard.cells[i].textContent === gameBoard.cells[i+3].textContent && gameBoard.cells[i+3].textContent === gameBoard.cells[i+6].textContent && gameBoard.cells[i].textContent !== "") {
      return gameBoard.cells[i].textContent;
    }
  }

  return null;
}

function checkDiagonal() {
  if(gameBoard.cells[0].textContent === gameBoard.cells[4].textContent && gameBoard.cells[4].textContent === gameBoard.cells[8].textContent && gameBoard.cells[0].textContent !== "") {
      return gameBoard.cells[0].textContent;
  } else if(gameBoard.cells[2].textContent === gameBoard.cells[4].textContent && gameBoard.cells[4].textContent === gameBoard.cells[6].textContent && gameBoard.cells[2].textContent !== "") {
      return gameBoard.cells[2].textContent;
  }

  return null;
}

form.addEventListener("submit", () => {
  event.preventDefault();
  player.name = nameInput.value;
  document.querySelector("#playerName").textContent = player.name;
  nameInput.value = null;

  form.style.display = "none";
  characterSelectionContainer.style.display = "flex";
})

nameInput.addEventListener("keyup", (event) => {
  if(event.keyCode === 13) {
    form.submit();
  }
})

buttonCharacterX.addEventListener("click", () => setPlayerAndComputerCharacters("X", "O"));

buttonCharacterO.addEventListener("click", () => setPlayerAndComputerCharacters("O", "X"));

function setPlayerAndComputerCharacters(playerCharacter, computerCharacter) {
  player.character = playerCharacter;
  computer.character = computerCharacter;

  characterSelectionContainer.style.display = "none";
  gameContainer.style.display = "flex";
}

if(SKIP_NAME_FORM) {
  form.querySelector("input").value = "Player";
  form.requestSubmit();
}

if(SKIP_CHARACTER_SELECTION)
  buttonCharacterX.click();