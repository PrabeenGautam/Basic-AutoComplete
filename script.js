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
  const selection = window.getSelection();
  const range = document.createRange();
  selection.removeAllRanges();
  range.selectNodeContents(textarea);
  range.collapse(false);
  selection.addRange(range);
  textarea.focus();
}

function addSuggestions(event, suggestedWord) {
  let textContents = event.target.childNodes[0].textContent;
  event.target.childNodes[0].textContent = `${textContents} ${suggestedWord}`;
  textarea.focus();
}

const getSuggestedWord = function (userText) {
  let index = suggestionActivation.findIndex((value) => value == userText);
  return suggestionWord[index];
};

function showSuggestionWord(suggestedWord) {
  temp_element = `<span id="predict" class="predict" contenteditable="false">
          <span class="predict-word">${suggestedWord}</span>
          <span class="predict-word tab">TAB</span>
        </span>`;
  textarea.insertAdjacentHTML("beforeend", temp_element);
  hasPredictContainer = true;
}

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
