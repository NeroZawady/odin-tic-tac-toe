const namePromptContainer = document.querySelector("#namePromptContainer");
const characterSelectionContainer = document.querySelector("#characterSelectionContainer");
const buttonSubmit = document.querySelector("#submit");
const nameInput = document.querySelector("#namePromptContainer input");

const player = (() => {
  const name = null;

  return {
    name,
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

