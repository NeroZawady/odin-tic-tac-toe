const gameContainer = document.querySelector("#gameContainer");
const playerName = document.querySelector("#playerName");
const score = document.querySelector("#score");
const form = document.querySelector("form");
const nameInput = document.querySelector("form input");
const buttonSubmit = document.querySelector("form button");
const characterSelectionContainer = document.querySelector("#characterSelectionContainer");
const buttonCharacterX = document.querySelector("#characterX");
const buttonCharacterO = document.querySelector("#characterO");

const gameBoard = (() => {
  const cells = Array.from(document.querySelectorAll("#boardContainer button"));
  let emptyCells = 9;

  return {
    cells,
    emptyCells,
  }

})();

const player = (() => {
  let name = null;
  let character = null;

  return {
    name,
    character,
  }

})();

const computer = (() => {
  const name = "Computer";
  let character = null;

  return {
    name,
    character,
  }

})();

for(let cell of gameBoard.cells) {
  cell.addEventListener("click", () => {
    cell.textContent = player.character;
    gameBoard.emptyCells--;
    if(gameBoard.emptyCells < 1) {
      
    } else {
      gameBoard.cells.filter(x => x.textContent === "")[Math.floor(Math.random() * gameBoard.cells.filter(x => x.textContent === "").length)].textContent = computer.character;
      gameBoard.emptyCells--;
    }
  })
}

form.addEventListener("submit", () => {
  event.preventDefault();
  player.name = nameInput.value;
  nameInput.value = null;

  form.style.display = "none";
  characterSelectionContainer.style.display = "block";
})

nameInput.addEventListener("keyup", (event) => {
  if(event.keyCode === 13) {
    event.preventDefault();
    form.submit();
  }
})

buttonCharacterX.addEventListener("click", () => setPlayerAndComputerCharacters("X", "O"));

buttonCharacterO.addEventListener("click", () => setPlayerAndComputerCharacters("O", "X"));

function setPlayerAndComputerCharacters(playerCharacter, computerCharacter) {
  player.character = playerCharacter;
  computer.character = computerCharacter;

  characterSelectionContainer.style.display = "none";
  gameContainer.style.display = "block";
}