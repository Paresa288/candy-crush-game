class Candy {
  constructor(color, candyId, mode) {
    this.color = color;
    this.candyId = candyId,
    this.mode = mode;
  }

  draw(square) {
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];
  }

  move() {

  }
}