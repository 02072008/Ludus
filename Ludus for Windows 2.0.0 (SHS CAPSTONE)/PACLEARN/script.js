document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const questionBox = document.getElementById('questionBox');
    const questionText = document.getElementById('questionText');
    const optionButtons = document.querySelectorAll('.optionBtn');
    const arrowUp = document.getElementById('arrowUp');
    const arrowDown = document.getElementById('arrowDown');
    const arrowLeft = document.getElementById('arrowLeft');
    const arrowRight = document.getElementById('arrowRight');
    canvas.width = 800;
    canvas.height = 600;

    let points = 0;
    let applesEaten = 0;
    let questionIndex = 0;
    let questionsAnswered = 0;
    let gamePaused = false;
    let appleTimer;
    let remainingTime = 5; // Time limit in seconds
    const appleTimeLimit = 5; // Time limit in seconds

    // List of 7 questions
    let questions = [
        {question: "Anong wikang ginagamit sa Pilipinas bilang wikang pambansa", options: ["Ingles", "Tagalog", "Filipino"], answer: "Filipino"},
        {question: "Anong wikang ginagamit sa mga paaralan sa pilipinas bilang wikang pang-edukasyon?", options: ["Espanyol at pilipino", "Ingles at Tagalog", "Ingles at Filipino"], answer: "Ingles at Filipino"},
        {question: "Kailan ipinahayag ang Wikang Filipino bilang wikang pambansa", options: ["1934", "1936", "1935"], answer: "1935"},
        {question: "Ito ay isang wikang magiging daan ng pagkakaisa at pag-unlad bilang simbolo ng kaunlaran ng isang bansa", options: ["Wikang panturo", "Wikang pambansa", "Wikang tagalog"], answer: "Wikang pambansa"},
        {question: "Sino ang itinuring na 'Ama ng Wikang Pambansa'? ", options: ["Francisco Balagtas", "Manuel L. Quezon", "Jose Rizal"], answer: "Manuel L. Quezon"},
        {question: "Ano ang ibig sabihin ng 'Wikang Pambansa'? ", options: ["Wikang ginagamit ng mga banyaga sa Pilipinas", "Wikang ginagamit sa negosyo", "Wikang ginagamit ng buong bansa bilang opisyal ng wika"], answer: "Wikang ginagamit ng buong bansa bilang opisyal ng wika"},
    ];

    // Shuffle questions array
    function shuffleQuestions(array) {
        for (let i = array.length - 1; i > 7; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffleQuestions(questions);

    const pacMan = {
        x: 50,
        y: 50,
        size: 20,
        dx: 5.3,
        dy: 0
    };

    const redApple = {
        x: Math.floor(Math.random() * (canvas.width - 20)),
        y: Math.floor(Math.random() * (canvas.height - 20)),
        size: 20
    };

    let walls = [
        { x: 200, y: 200, width: 100, height: 20 },
        { x: 400, y: 100, width: 20, height: 100 },
        { x: 600, y: 300, width: 20, height: 100 },
        { x: 100, y: 400, width: 200, height: 20 },
        { x: 300, y: 500, width: 20, height: 100 },
        { x: 250, y: 250, width: 100, height: 20 },
        { x: 450, y: 150, width: 20, height: 100 },
        { x: 550, y: 350, width: 20, height: 100 },
        { x: 150, y: 450, width: 200, height: 20 },
        { x: 350, y: 550, width: 20, height: 100 },
        { x: 300, y: 100, width: 100, height: 20 },
        { x: 500, y: 200, width: 20, height: 100 },
        { x: 700, y: 300, width: 20, height: 100 },
        { x: 200, y: 350, width: 200, height: 20 },
        { x: 100, y: 550, width: 20, height: 100 }
    ];

    function drawPacMan() {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(pacMan.x, pacMan.y, pacMan.size, -0.25 * Math.PI, 1.75 * Math.PI);
        ctx.lineTo(pacMan.x, pacMan.y);
        ctx.fill();
    }

    function drawRedApple() {
        ctx.fillStyle = 'red';
        ctx.fillRect(redApple.x, redApple.y, redApple.size, redApple.size);
    }

    function drawWalls() {
        ctx.fillStyle = 'Blue';
        walls.forEach(wall => {
            ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
        });
    }

    function drawTimerAndPoints() {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Time: ' + remainingTime, canvas.width - 100, 30);
        ctx.fillText('Points: ' + points, 10, 30);
    }

    function checkCollisionWithWalls(newX, newY) {
        for (let wall of walls) {
            if (newX < wall.x + wall.width && newX + pacMan.size > wall.x &&
                newY < wall.y + wall.height && newY + pacMan.size > wall.y) {
                return true;
            }
        }
        return false;
    }

    function movePacMan() {
        if (!gamePaused) {
            let newX = pacMan.x + pacMan.dx;
            let newY = pacMan.y + pacMan.dy;

            if (newX + pacMan.size > canvas.width || newX - pacMan.size < 0) {
                pacMan.dx = 0;
            }

            if (newY + pacMan.size > canvas.height || newY - pacMan.size < 0) {
                // Continuing from the previous JavaScript code
                pacMan.dy = 0;
            }

            if (!checkCollisionWithWalls(newX, newY)) {
                pacMan.x = newX;
                pacMan.y = newY;
            } else {
                pacMan.dx = 0;
                pacMan.dy = 0;
            }

            const dist = Math.hypot(pacMan.x - redApple.x, pacMan.y - redApple.y);
            if (dist < pacMan.size + redApple.size) {
                eatApple();
            }
        }
    }

    function handleKeyDown(event) {
        if (!gamePaused) {
            switch(event.key) {
                case 'ArrowUp':
                    pacMan.dy = -5.3;
                    pacMan.dx = 0;
                    break;
                case 'ArrowDown':
                    pacMan.dy = 5.3;
                    pacMan.dx = 0;
                    break;
                case 'ArrowLeft':
                    pacMan.dx = -5.3;
                    pacMan.dy = 0;
                    break;
                case 'ArrowRight':
                    pacMan.dx = 5.3;
                    pacMan.dy = 0;
                    break;
            }
        }
    }

    // Add event listeners for arrow buttons
    arrowUp.addEventListener('click', function() {
        if (!gamePaused) {
            pacMan.dy = -5.3;
            pacMan.dx = 0;
        }
    });

    arrowDown.addEventListener('click', function() {
        if (!gamePaused) {
            pacMan.dy = 5.3;
            pacMan.dx = 0;
        }
    });

    arrowLeft.addEventListener('click', function() {
        if (!gamePaused) {
            pacMan.dx = -5.3;
            pacMan.dy = 0;
        }
    });

    arrowRight.addEventListener('click', function() {
        if (!gamePaused) {
            pacMan.dx = 5.3;
            pacMan.dy = 0;
        }
    });

    function startAppleTimer() {
        remainingTime = appleTimeLimit;
        appleTimer = setInterval(() => {
            remainingTime--;
            if (remainingTime <= 0) {
                clearInterval(appleTimer);
                playSound('incorrect');
                alert('Naubos na ang oras! Ang iyong laro ay natapos na! Ang iyong puntos ay: ' + points);
                location.reload();
            }
        }, 1000);
    }

    function resetAppleTimer() {
        clearInterval(appleTimer);
        startAppleTimer();
    }

    function eatApple() {
        applesEaten++;
        points += 10;
        playSound('eat');

        // Relocate the apple and reset timer
        redApple.x = Math.floor(Math.random() * (canvas.width - 20));
        redApple.y = Math.floor(Math.random() * (canvas.height - 20));
        resetAppleTimer();

        if (applesEaten === 5) {
            showQuestion();
        }
    }

    function showQuestion() {
        gamePaused = true;
        questionIndex = Math.floor(Math.random() * questions.length);
        const question = questions[questionIndex];
        questionText.textContent = question.question;
        optionButtons.forEach((btn, index) => {
            btn.textContent = question.options[index];
        });
        questionBox.classList.remove('hidden');
        clearInterval(appleTimer); // Stop the timer
    }

    function checkAnswer(selectedOption) {
        const question = questions[questionIndex];
        if (selectedOption === question.answer) {
            points += 50;
            playSound('correct');
            gamePaused = false;
            questionsAnswered++;
            if (questionsAnswered >= 10) {
                alert('Binabati kita, Ikaw ay nagwagi! Natapos mo ang laro! Ang iyong puntos ay: ' + points);
                location.reload();
            } else {
                randomizeObstacles(); // Randomize obstacles after answering
                resetAppleTimer(); // Restart the timer
            }
        } else {
            playSound('incorrect');
            alert('Ikaw ay Nabigo! ang iyong puntos ay: ' + points);
            location.reload();
        }
        applesEaten = 0;
        questionBox.classList.add('hidden');
    }

    function randomizeObstacles() {
        walls = walls.map(wall => {
            return {
                x: Math.floor(Math.random() * (canvas.width - wall.width)),
                y: Math.floor(Math.random() * (canvas.height - wall.height)),
                width: wall.width,
                height: wall.height
            };
        });
    }

    function playSound(type) {
        let audio;
        switch(type) {
            case 'eat':
                audio = new Audio('eat_sound.mp3');
                break;
            case 'correct':
                audio = new Audio('correct_sound.mp3');
                break;
            case 'incorrect':
                audio = new Audio('incorrect_sound.mp3');
                break;
        }
        audio.play();
    }

    optionButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            checkAnswer(btn.textContent);
        });
    });

    document.addEventListener('keydown', handleKeyDown);

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPacMan();
        drawRedApple();
        drawWalls();
        drawTimerAndPoints();
        movePacMan();
        requestAnimationFrame(gameLoop);
    }

    startAppleTimer(); // Start the timer when the game begins
    gameLoop();
});

function pacmanExit() {
    alert("Paalam!");
}