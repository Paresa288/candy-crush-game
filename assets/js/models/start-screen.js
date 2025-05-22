class StartScreen {
  constructor() {
    this.startButtonNode = document.querySelector("#startBtn");
    this.startOverlayNode = document.querySelector("#startOverlay");
    this.startScreenNode = document.querySelector("#startScreen");

    this.startButtonNode.addEventListener("click", () => {
      const game = new Game();
      game.start();
      this.kill();
    });
    this.draw();
  }

  draw() {
    this.startOverlayNode.style.visibility = "visible";
    this.startScreenNode.style.visibility = "visible";
    this.startOverlayNode.style.opacity = "1";
    this.startScreenNode.style.opacity = "1";
  }
  
  kill() {
    this.startOverlayNode.style.visibility = "hidden";
    this.startScreenNode.style.visibility = "hidden";
    this.startOverlayNode.style.opacity = "0";
    this.startScreenNode.style.opacity = "0";
  }
}