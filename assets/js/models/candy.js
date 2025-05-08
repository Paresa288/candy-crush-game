class Candy {
  constructor() {
    
    this.color; 
    this.mode;
  }

  draw(tile) {
    const randomNumber = Math.floor(Math.random() * candyColors.length);
    tile.style.backgroundImage = candyColors[randomNumber].regular;
    this.color = candyColors[randomNumber].color;
    this.mode = candyModes[0];
  }

  leaveBlank(tile) {
    tile.style.backgroundImage = blankSquare;
  }

  move() {

  }
}