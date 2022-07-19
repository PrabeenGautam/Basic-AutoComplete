let textarea = document.querySelector("#textarea-container");
let prediction = document.querySelector("#predict");

const suggestionWord = ["Prabin Gautam", "Prabin Gautam", "Gaming", "meet you"];

const suggestionActivation = [
  "My name is",
  "My name is Prabin Gautam. My name is",
  "My name is Prabin Gautam. I love",
  "Nice to",
];

let tabKeyPressed = false;
let showSuggestions = false;
let suggestedWord = "";

document.addEventListener("keydown", (event) => {
  tabKeyPressed = event.key === "Tab";
  if (tabKeyPressed) {
    textarea.focus();
    event.preventDefault();
    return;
  }
});

document.addEventListener("keyup", predict);

function setCursor() {
  const selection = window.getSelection();
  const range = document.createRange();
  selection.removeAllRanges();
  range.selectNodeContents(textarea);
  range.collapse(false);
  selection.addRange(range);
  textarea.focus();
}

function addSuggedtedWord(event, suggestedWord) {
  let textContents = event.target.childNodes[0].textContent;

  event.target.childNodes[0].textContent = `${textContents} ${suggestedWord}`;
  textarea.focus();
}

const findSuggestionWord = function (userText) {
  let index = suggestionActivation.findIndex((value) => value == userText);
  return suggestionWord[index];
};

function predict(event) {
  const data = event.target.textContent
    ? event.target.childNodes[0].textContent
    : "";

  showSuggestions = suggestionActivation.some((value) => data == value);
  suggestedWord = findSuggestionWord(data);

  const contains = document.body.contains(document.getElementById("predict"));
  const resetSuggestions = function () {
    suggestedWord = "";
    showSuggestions = false;
  };

  if (showSuggestions) {
    temp_element = `<span id="predict" class="predict" contenteditable="false">
          <span class="predict-word">${suggestedWord}</span>
          <span class="predict-word tab">TAB</span>
        </span>`;

    if (!contains) {
      textarea.insertAdjacentHTML("beforeend", temp_element);
    }
  } else {
    if (contains) {
      document.getElementById("predict").remove();
      resetSuggestions();
    }
  }

  if (tabKeyPressed) {
    setCursor();
    if (contains) {
      document.getElementById("predict").remove();
    }
    if (suggestedWord) {
      addSuggedtedWord(event, suggestedWord);
      resetSuggestions();
    }
  }
}
