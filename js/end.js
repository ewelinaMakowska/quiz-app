const saveHighScoreBtn = document.getElementById("save-score-btn");
const usernameInput = document.getElementById("username");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("score-end");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;


finalScore.innerText = mostRecentScore;

saveHighScoreBtn.addEventListener("click", (event) => {
    if (!usernameInput.value) {
        alert("Please, insert your name!")
    }
        console.log("Clicked save btn");
    
    const score = {
        score: mostRecentScore,
        name: usernameInput.value
    };
    
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    
    console.log(score);
    
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("./index.html");
});

