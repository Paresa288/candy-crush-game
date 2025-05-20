class GameOverScreen {
  constructor(score) {
    this.finalScore = score;
    this.maxScore = window.localStorage.getItem("maxScore");
    this.gameOverOverlayNode = document.querySelector("#gameOverOverlay");
    this.gameOverScreenNode = document.querySelector("#gameOverScreen");
    this.finalScoreNode = document.querySelector("#finalScore");
    this.maxScoreNode = document.querySelector("#maxScore");
    this.retryButtonNode = document.querySelector("#retryBtn");
    this.nextButtonNode = document.querySelector("#nextBtn");


    this.retryButtonNode.addEventListener("click", () => window.location.reload());
  }

  draw() {
    this.gameOverOverlayNode.style.visibility = "visible";
    this.gameOverScreenNode.style.visibility = "visible";
  }

  setScore() {
    this.finalScoreNode.innerText = `${this.finalScore}`;
    
    if (!window.localStorage.getItem("maxScore")) {
      window.localStorage.setItem("maxScore", `${this.finalScore}`);
      this.maxScoreNode.innerText = window.localStorage.getItem("maxScore");
    } else if (window.localStorage.getItem("maxScore") < this.finalScore) {
      window.localStorage.setItem("maxScore", `${this.finalScore}`);
      this.maxScoreNode.innerText = window.localStorage.getItem("maxScore");
    } else {
      this.maxScoreNode.innerText = window.localStorage.getItem("maxScore");
    }
  }
  
  kill() {
    this.gameOverOverlayNode.style.visibility = "hidden";
    this.gameOverScreenNode.style.visibility = "hidden";
  }
}