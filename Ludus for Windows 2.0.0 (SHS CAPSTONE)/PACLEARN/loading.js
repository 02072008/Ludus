window.onload = function() {
    // Simulate loading time
    setTimeout(function() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-menu').style.display = 'block';
    }, 2000); // Change the value to adjust loading time
};

function startGame() {
    alert('Starting the game...');
    // Add your game initialization code here
}

function showTutorial() {
    // Show the tutorial modal
    document.getElementById('tutorial-modal').style.display = 'flex';
}

function closeTutorial() {
    // Hide the tutorial modal
    document.getElementById('tutorial-modal').style.display = 'none';
}

function downloadGame() {
    // Create a download link for the game file
    const link = document.createElement('a');
    link.href = 'path_to_your_game_file.zip'; // Replace this with the actual path to your game file
    link.download = 'PacmanGame.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Downloading the game...');
}
