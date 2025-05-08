class Game {

  constructor(lvl) {
    
    
    this.lvl = lvl;
    
    
    this.candyBeingDragged;
    this.candyBeingReplaced;
    this.tileIdBeingReplaced;
    this.tileIdBeingDragged;
    this.candyModeBeingDragged;
    this.candyModeBeingReplaced;

    this.board;
  }

  start() {
    this.board = new Board(9);
    this.board.createBoard(); 
    this.move();
  }
  
  move() {
    this.board.tiles.forEach(tile => tile.addEventListener('dragstart', this.dragStart.bind(this)))
    this.board.tiles.forEach(tile => tile.addEventListener('dragenter', this.dragEnter))
    this.board.tiles.forEach(tile => tile.addEventListener('dragover', this.dragOver))
    this.board.tiles.forEach(tile => tile.addEventListener('dragleave', this.dragLeave))
    this.board.tiles.forEach(tile => tile.addEventListener('drop', this.dragDrop))
    this.board.tiles.forEach(tile => tile.addEventListener('dragend', this.dragEnd))
  }
  
  dragStart(e) {
    this.candyBeingDragged = e.target.attributes.color.value;
    this.tileIdBeingDragged = parseInt(e.target.id);
    this.candyModeBeingDragged = e.target.attributes.mode.value;
    console.log(e, e.target.id, e.target.attributes.color.value, e.target.attributes.mode.value);
    console.log(this.candyBeingDragged, this.candyModeBeingDragged, this, this.tileIdBeingDragged);
  }
  
  dragEnter(e) {
    e.preventDefault();
  }
  
  dragOver(e) {
    e.preventDefault();
  }
  
  dragLeave() {
    this.style.backgroundImage = "";
  }
  
  dragDrop() {
     
  }

  dragEnd() {
    
  }

}