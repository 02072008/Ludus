//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 16;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "Ano ang opisyal na wika ng Pilipinas ayon sa 1987 Konstitusyon?",
    options: ["Filipino", "Ingles", "Filipino at Ingles", "Tagalog"],
    correct: "Filipino at Ingles",
  },
  {
    id: "1",
    question: "Kailan ginawang opisyal na wika ng Pilipinas ang Filipino?",
    options: ["1935", "1987", "1973", "1946"],
    correct: "1987",
  },
  {
    id: "2",
    question: "Sa anong artikulo ng 1987 Konstitusyon matatagpuan ang probisyon tungkol sa wika?",
    options: ["Artikulo XIII", "Artikulo XIV", "Artikulo XV", "Artikulo XVI"],
    correct: "Artikulo XIV",
  },
  {
    id: "3",
    question: "Anong wika ang karaniwang ginagamit sa opisyal na transaksyon ng pamahalaan?",
    options: ["Filipino", "Ingles", "Tagalog", "Bisaya"],
    correct: "Ingles",
  },
  {
    question: "Alin ang wika na itinatag bilang batayan ng wikang pambansa noong 1937?",
    options: ["Cebuano", "Ilocano", "Tagalog", "Kapampangan"],
    correct: "Tagalog",
  },
  {
    id: "5",
     question: "Sa ilalim ni pangulong Manuel L. Quezon, kailan idineklara ang Tagalog bilang batayan ng wikang pambansa?",
    options: ["1935", "1937", "1940", "1954"],
    correct: "1937",
  },
  {
    id: "6",
    question: "Anong ahensya ng gobyerno ang nangangasiwa sa pagpapalaganap ng Filipino bilang opisyal na wika?",
    options: ["DepEd", "Komisyon sa Wikang Filipino", "NCCA", "CHED"],
    correct: "Komisyon sa Wikang Filipino",
  },
  {
    id: "7",
     question: "Ano ang layunin ng Seksyon 7 ng Artikulo XIV ng 1987 Konstitusyon?",
    options: ["Magtatag ng bagong wika", "Itakda ang opisyal na wika", "Itinatakda na ang mga wikang panrehiyon ay pantulong na mga wika", "Gumamit ng Tagalog lamang sa opisyal na komunikasyon"],
    correct: "Itinatakda na ang mga wikang panrehiyon ay pantulong na mga wika",
  },
  {
    id: "8",
    question: "Aling wika ang ginagamit sa pagtuturo bilang medium of instruction sa mga paaralan?",
    options: ["Filipino", "Ingles", "Filipino at Ingles", "Tagalog"],
    correct: "Filipino at Ingles",
  },
  {
    id: "9",
    question: "Ano ang layunin ng patakaran sa bilingguwalismo sa Pilipinas?",
    options: ["Magturo ng dalawang wika nang sabay", "Palaganapin ang Filipino sa lahat ng paaralan", "Mapalaganap ang mahusay na paggamit ng Filipino at Ingles", "Gumamit ng regional na wika sa opisyal na komunikasyon"],
    correct: "Mapalaganap ang mahusay na paggamit ng Filipino at Ingles",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 16;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 16;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
