let textarea = document.querySelector("#textarea-container");

const suggestionWord = ["Prabin Gautam", "Gaming", "meet you", "one"];

const suggestionActivation = [
  "My name is",
  "I love",
  "Nice to",
  "Two are better than",
];

let tabKeyPressed = false;
let showSuggestions = false;
let suggestedWord = "";
let hasPredictContainer = false;

function setCursor() {
  const selection = window.getSelection(); //Create selection
  const range = document.createRange(); //To create range of text

  selection.removeAllRanges(); //Remove any existing range of cursor
  range.selectNodeContents(textarea); //To apply new range  on

  selection.addRange(range); //Set new range for cursor
  range.collapse(false); //Remove whole text selection
  textarea.focus();
}
//To add suggestions to user text
function addSuggestions(event, suggestedWord) {
  let textContents = event.target.childNodes[0].textContent;
  event.target.childNodes[0].textContent = `${textContents.trim()} ${suggestedWord}`;
  textarea.focus();
}

//To get suggestion
//Use machine learning model to get suggested word. I had hardcorded right now.
const getSuggestedWord = function (text) {
  const endText = text.split(".").pop().trim();
  let index = suggestionActivation.findIndex((value) => value == endText);

  return suggestionWord[index];
};

//To show suggestions Word after user text
function showSuggestionWord(suggestedWord) {
  temp_element = `<span id="predict" class="predict" contenteditable="false">
          <span class="predict-word">${suggestedWord}</span>
          <span class="predict-word tab">TAB</span>
        </span>`;
  textarea.insertAdjacentHTML("beforeend", temp_element);
  hasPredictContainer = true;
}

//To reset the suggestions
const resetSuggestions = function () {
  suggestedWord = "";
  showSuggestions = false;
  hasPredictContainer = false;
};

document.addEventListener("keydown", (event) => {
  tabKeyPressed = event.key === "Tab";
  if (tabKeyPressed) {
    textarea.focus();
    event.preventDefault();
    return;
  }
});

document.addEventListener("keyup", predict);

function predict(event) {
  const text = event.target.textContent
    ? event.target.childNodes[0].textContent
    : "";

  const endText = text.split(".").pop().trim();

  showSuggestions = suggestionActivation.some((value) => endText == value);

  let predictContainer = document.getElementById("predict");
  hasPredictContainer = Boolean(predictContainer);

  if (showSuggestions && !hasPredictContainer) {
    //Implement ML model here
    suggestedWord = getSuggestedWord(text);
    showSuggestionWord(suggestedWord);
  }

  if (!showSuggestions && hasPredictContainer) {
    predictContainer.remove();
    resetSuggestions();
  }

  if (tabKeyPressed && hasPredictContainer) {
    setCursor();
    predictContainer.remove();
    addSuggestions(event, suggestedWord);
    resetSuggestions();
  }
}
