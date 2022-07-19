let textarea = document.querySelector("#textarea-container");
let prediction = document.querySelector("#predict");

const predictionValue = [
  "मेरो",
  "नाम",
  "प्रविन",
  "गौतम",
  "हो",
  "म",
  "अहिले",
  "येतिकै",
  "बसी",
  "रहेको",
  "क्षु",
];

const length = predictionValue.length;
let randomValue = Math.floor(Math.random() * length);

let tabKeyPressed = false;

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
  if (tabKeyPressed) {
    data = event.target.textContent.slice(-1);
    textarea.textContent =
      data == " " || data == ""
        ? event.target.textContent + `${predictionValue[randomValue]} `
        : event.target.textContent + ` ${predictionValue[randomValue]} `;

    randomValue = Math.floor(Math.random() * length);
    prediction.textContent = predictionValue[randomValue];
  }
}
