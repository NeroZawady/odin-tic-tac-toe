const namePromptContainer = document.querySelector("#namePromptContainer");
const characterSelectionContainer = document.querySelector("#characterSelectionContainer");
const buttonSubmit = document.querySelector("#submit");
const nameInput = document.querySelector("#namePromptContainer input");
const buttonCharacterX = document.querySelector("#characterX");
const buttonCharacterO = document.querySelector("#characterO");

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

buttonSubmit.addEventListener("click", () => {
  player.name = nameInput.value
  nameInput.value = null;
  namePromptContainer.style.display = "none";
  characterSelectionContainer.style.display = "block";

});

nameInput.addEventListener("keyup", (event) => {
  if(event.keyCode === 13) {
    buttonSubmit.click();
  }
})

buttonCharacterX.addEventListener("click", () => setPlayerComputerCharacters("X", "O"));

buttonCharacterO.addEventListener("click", () => setPlayerComputerCharacters("O", "X"));

function setPlayerComputerCharacters(playerCharacter, computerCharacter) {
  player.character = playerCharacter;
  computer.character = computerCharacter;
}