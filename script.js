let textarea = document.querySelector("#textarea-container");

const suggestionWord = [
  "Prabin Gautam",
  "Prabin Gautam",
  "Gaming",
  "meet you",
  "one",
];

const suggestionActivation = [
  "My name is",
  "My name is Prabin Gautam. My name is",
  "My name is Prabin Gautam. I love",
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
  range.selectNodeContents(textarea); //To apply selection on

  selection.addRange(range); //To set new range for cursor
  range.collapse(false); //Remove whole text selection
  textarea.focus();
}
//To add suggestions to user text
function addSuggestions(event, suggestedWord) {
  let textContents = event.target.childNodes[0].textContent;
  event.target.childNodes[0].textContent = `${textContents} ${suggestedWord}`;
  textarea.focus();
}

//To get suggestion
//Use machine learning model to get suggested word. I had hardcorded right now.
const getSuggestedWord = function (userText) {
  let index = suggestionActivation.findIndex((value) => value == userText);
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
  const data = event.target.textContent
    ? event.target.childNodes[0].textContent
    : "";

  showSuggestions = suggestionActivation.some((value) => data == value);

  let predictContainer = document.getElementById("predict");
  hasPredictContainer = Boolean(predictContainer);

  if (showSuggestions && !hasPredictContainer) {
    //Implement ML model here
    suggestedWord = getSuggestedWord(data);
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
