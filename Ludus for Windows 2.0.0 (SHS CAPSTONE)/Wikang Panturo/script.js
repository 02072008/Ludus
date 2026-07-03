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
    question: "Ano ang ibig sabihin ng wikang panturo?",
    options: ["Wikang ginagamit sa opisyal na komunikasyon", "Wikang ginagamit bilang medium ng pagtuturo", "Wikang ginagamit sa panitikang Pilipino", "Wikang ginagamit sa mga batas"],
    correct: "Wikang ginagamit bilang medium ng pagtuturo",
  },
  {
    id: "1",
    question: "Anong mga wika ang karaniwang ginagamit bilang wikang panturo sa Pilipinas?",
    options: ["Filipino at Ingles", "Tagalog at Bisaya", "Filipino at Cebuano", "Ilocano at Ingles"],
    correct: "Filipino at Ingles",
  },
  {
    id: "2",
    question: "Sa ilalim ng patakaran sa bilingguwalismo, ano ang layunin ng paggamit ng Filipino at Ingles bilang wikang panturo?",
    options: ["Upang alisin ang regional na wika", "Upang mas mapadali ang komunikasyon sa mga guro", "Upang mapabuti ang kasanayan sa parehong wika", "Upang maalis ang impluwensya ng ibang bansa"],
    correct: "Upang mapabuti ang kasanayan sa parehong wika",
  },
  {
    id: "3",
    question: "Anong ahensya ang nagtatakda ng pamantayan sa paggamit ng wikang panturo?",
    options: ["DepEd", "Komisyon sa Wikang Filipino", "CHED", "NCCA"],
    correct: "DepEd",
  },
  {
    id: "4",
    question: "Sa anong antas ng edukasyon kadalasang ginagamit ang Filipino bilang pangunahing wikang panturo?",
    options: ["Pang-elementarya", "Sekundarya", "Kolehiyo", "Graduate studies"],
    correct: "Pang-elementarya",
  },
  {
    id: "5",
    question: "Anong wikang panturo ang karaniwang ginagamit sa mga asignaturang agham at matematika?",
    options: ["Filipino", "Ingles", "Tagalog", "Bisaya"],
    correct: "Ingles",
  },
  {
    id: "6",
    question: "Ano ang layunin ng Mother Tongue-Based Multilingual Education (MTB-MLE)?",
    options: ["Gamitin ang Filipino bilang tanging wikang panturo", "Gamitin ang wika ng rehiyon bilang wikang panturo", "Gamitin ang Ingles sa lahat ng asignatura", "Palakasin ang kasanayan sa banyagang wika"],
    correct: "Gamitin ang wika ng rehiyon bilang wikang panturo",
  },
  {
    id: "7",
    question: "Anong probisyon sa 1987 Konstitusyon ang nagtatakda ng wikang panturo?",
    options: ["Artikulo XIV, Seksyon 6", "Artikulo XIV, Seksyon 7", "Artikulo XIII, Seksyon 5", "Artikulo XV, Seksyon 4"],
    correct: "Artikulo XIV, Seksyon 7",
  },
  {
    id: "8",
    question: "Ano ang pangunahing hamon sa paggamit ng regional na wika bilang wikang panturo?",
    options: ["Kakulangan sa mga guro", "Kakulangan ng materyal na pang-edukasyon", "Hindi malinaw na probisyon ng batas", "Kakulangan ng interes ng mag-aaral"],
    correct: "Kakulangan ng materyal na pang-edukasyon",
  },
  {
    id: "9",
    question: "Paano nakakatulong ang MTB-MLE sa mga mag-aaral?",
    options: ["Mas nauunawaan ang mga konsepto", "Mas natututo sa banyagang wika", "Mas nagiging bihasa sa matematika", "Mas naalis ang impluwensya ng Filipino"],
    correct: "Mas nauunawaan ang mga konsepto",
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
