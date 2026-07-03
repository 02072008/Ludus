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
    question: "Ano ang itinakda bilang batayan ng wikang pambansa noong 1937?",
    options: ["Cebuano", "Tagalog", "Ilocano", "Kapampangan"],
    correct: "Tagalog",
  },
  {
    id: "1",
    question: "Sino ang nagdeklara ng Tagalog bilang batayan ng wikang pambansa?",
    options: ["Manuel Roxas", "Sergio Osmeña", "Manuel L. Quezon", "Jose P. Laurel"],
    correct: "Manuel L. Quezon",
  },
  {
    id: "2",
    question: "Kailan idineklara ang Tagalog bilang batayan ng wikang pambansa?",
    options: ["1935", "1937", "1940", "1946"],
    correct: "1937",
  },
  {
    id: "3",
    question: "Saang batas itinadhana ang pagbuo ng wikang pambansa?",
    options: ["Batas Komonwelt Blg. 184", "Batas Komonwelt Blg. 185", "Batas Komonwelt Blg. 186", "Batas Komonwelt Blg. 187"],
    correct: "Batas Komonwelt Blg. 184",
  },
  {
    id: "4",
    question: "Ano ang layunin ng Batas Komonwelt Blg. 184?",
    options: ["Magtatag ng opisyal na wika", "Magbuo ng isang Surian ng Wikang Pambansa", "Gawing Ingles ang wikang pambansa", "Ipatupad ang bilingual na edukasyon"],
    correct: "Magbuo ng isang Surian ng Wikang Pambansa",
  },
  {
    id: "5",
    question: "Kailan ipinahayag ang Filipino bilang wikang pambansa?",
    options: ["1940", "1959", "1973", "1987"],
    correct: "1987",
  },
  {
    id: "6",
    question: "Aling artikulo ng 1987 Konstitusyon ang nagtatakda ng Filipino bilang wikang pambansa?",
    options: ["Artikulo XIII", "Artikulo XIV", "Artikulo XV", "Artikulo XVI"],
    correct: "Artikulo XIV",
  },
  {
    id: "7",
    question: "Anong ahensya ang responsable sa pagpapalaganap ng wikang Filipino?",
    options: ["DepEd", "Komisyon sa Wikang Filipino", "CHED", "NCCA"],
    correct: "Komisyon sa Wikang Filipino",
  },
  {
    id: "8",
    question: "Anong wika ang naging saligan ng wikang pambansa noong panahon ng Komonwelt?",
    options: ["Ilocano", "Tagalog", "Hiligaynon", "Cebuano"],
    correct: "Tagalog",
  },
  {
    id: "9",
    question: "Ano ang layunin ng pagkakaroon ng wikang pambansa?",
    options: ["Upang magkaisa ang mga Pilipino", "Upang palitan ang regional na wika", "Upang gawing banyaga ang wika ng bansa", "Upang tanggalin ang mga lokal na diyalekto"],
    correct: "Upang magkaisa ang mga Pilipino",
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
