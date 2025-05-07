class Game {

  constructor(lvl) {
    
    
    this.lvl = lvl;
    
    
    this.colorBeingDragged;
    this.colorBeingReplaced;
    this.squareIdBeingReplaced;
    this.squareIdBeingDragged;
  }

  start() {
    const board = new Board(8);
    board.createBoard(); 
  }

  dragStart(square) {
    console.log(square);
    this.colorBeingDragged = square.style.backgroundImage;
    this.squareIdBeingDragged = parseInt(square.id);
  }
  
  dragOver(e) {
    e.preventDefault();
  }
  
  dragEnter(e) {
    e.preventDefault();
  }
  
  dragLeave() {
    square.style.backgroundImage = "";
  }
  
  dragDrop(square) {
    this.colorBeingReplaced = square.style.backgroundImage;
    this.squareIdBeingReplaced = parseInt(square.id);
    square.style.backgroundImage = this.colorBeingDragged;
    this.squares[this.squareIdBeingDragged].style.backgroundImage = this.colorBeingReplaced;
  }

  dragEnd(square) {
    let validMoves = [this.squareIdBeingDragged -1, this.squareIdBeingDragged -this.gridSize,
       this.squareIdBeingDragged +1, this.squareIdBeingDragged +this.gridSize];
    let validMove = validMoves.includes(this.squareIdBeingReplaced);

    if (this.squareIdBeingReplaced && validMove) {
      this.squareIdBeingReplaced = null;
    } else if (this.squareIdBeingReplaced && !validMove) {
      this.squares[this.squareIdBeingReplaced].style.backgroundImage = this.colorBeingReplaced;
      this.squares[this.squareIdBeingDragged].style.backgroundImage = this.colorBeingDragged;
    } else {
      this.squares[this.squareIdBeingDragged].style.backgroundImage = this.colorBeingDragged;
    }
  }

  move() {
    this.squares.forEach(square => square.addEventListener('dragstart', this.dragStart(square)))
    this.squares.forEach(square => square.addEventListener('dragend', this.dragEnd))
    this.squares.forEach(square => square.addEventListener('dragover', this.dragOver))
    this.squares.forEach(square => square.addEventListener('dragenter', this.dragEnter))
    this.squares.forEach(square => square.addEventListener('drageleave', this.dragLeave))
    this.squares.forEach(square => square.addEventListener('drop', this.dragDrop))
  }
}