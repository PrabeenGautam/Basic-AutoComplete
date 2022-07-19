let textarea = document.querySelector("#textarea-container");
let prediction = document.querySelector("#predict");

const suggestion = {
  name: "Prabin Gautam",
  love: "Gaming",
  nice: "meet you ✪ ω ✪",
};

const suggestionActivation = [
  "My name is",
  "My name is Prabin Gautam. My name is",
  "My name is Prabin Gautam. I love",
  "Nice to",
];

let tabKeyPressed = false;
let showSuggestions = false;
let suggestedWord = "";
let spaceCount = 0;

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
  let textContents = event.target.childNodes[0].textContent.split(" ");

  const lastText = textContents[textContents.length - 1].trim();
  textContents.pop();
  textContents = [...textContents, lastText].join(" ");

  event.target.childNodes[0].textContent = `${textContents} ${suggestedWord}`;
  textarea.focus();
}

const findSuggestionWord = function (data) {
  if (data == "My name is" || data == "My name is Prabin Gautam. My name is") {
    suggestedWord = suggestion["name"];
  } else if (data == "My name is Prabin Gautam. I love") {
    suggestedWord = suggestion["love"];
  } else if (data == "Nice to") {
    suggestedWord = suggestion["nice"];
  } else {
    suggestedWord = "";
  }
};

function predict(event) {
  const data = event.target.textContent
    ? event.target.childNodes[0].textContent
    : "";

  showSuggestions = suggestionActivation.some((value) => data == value);
  findSuggestionWord(data);

  const contains = document.body.contains(document.getElementById("predict"));
  const resetSuggestions = function () {
    suggestedWord = "";
    showSuggestions = false;
    spaceCount = 0;
  };

  if (contains && event.code == "Space") {
    spaceCount = spaceCount + 1;

    if (spaceCount >= 2) {
      suggestedWord = "";
      showSuggestions = false;
    }
  }

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
