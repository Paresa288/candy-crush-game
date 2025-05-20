class Score {
  constructor() {
    this.scoreNode = document.querySelector("#score");
    this.score = 0;
    this.scoreNode.innerHTML = "0";
    this.targetScore = this.score;
  }

  addScore(scoreIncrement) {
    this.targetScore += scoreIncrement;
    console.log(scoreIncrement);
    const addScoreInterval = setInterval(() => {
      if (this.targetScore <= 0) {
        clearInterval(addScoreInterval);
      } else {
        this.score++;
        this.targetScore--;
        this.scoreNode.innerText = this.score;
      }
    }, 20);
    
  }
}