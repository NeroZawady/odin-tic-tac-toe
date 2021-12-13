const characterSelectionContainer = document.querySelector("#characterSelectionContainer");
const buttonSubmit = document.querySelector("#submit");
const nameInput = document.querySelector("#nameInput");
const buttonCharacterX = document.querySelector("#characterX");
const buttonCharacterO = document.querySelector("#characterO");
const nameForm = document.querySelector("#name");
const gameContainer = document.querySelector("#gameContainer");

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

nameForm.addEventListener("submit", () => {
  event.preventDefault();
  player.name = nameInput.value;
  nameInput.value = null;

  nameForm.style.display = "none";
  characterSelectionContainer.style.display = "block";
})

nameInput.addEventListener("keyup", (event) => {
  if(event.keyCode === 13) {
    event.preventDefault();
    nameForm.submit();
  }
})

buttonCharacterX.addEventListener("click", () => setPlayerComputerCharacters("X", "O"));

buttonCharacterO.addEventListener("click", () => setPlayerComputerCharacters("O", "X"));

function setPlayerComputerCharacters(playerCharacter, computerCharacter) {
  player.character = playerCharacter;
  computer.character = computerCharacter;

  characterSelectionContainer.style.display = "none";
  gameContainer.style.display = "block";
}