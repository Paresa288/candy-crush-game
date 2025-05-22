class Game {

  constructor() {
    this.board;
  }

  start() {
    this.board = new Board(9, 2500);
    this.board.draw();
    this.board.checkLines();
    
    /* this.board.setInterval(); */
  }
}