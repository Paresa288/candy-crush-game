class Board {

  constructor(gridSize) {
    
    this.tiles = [];
    this.gridSize = gridSize;
    this.grid = document.querySelector("#grid");

  }
  
  createBoard() {
    this.grid.style.width = (`${this.gridSize * 71}px`);
    for(let i = 0; i < this.gridSize * this.gridSize; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      this.grid.appendChild(square);
      this.tiles.push(square);
      const candy = new Candy();
      candy.draw(square);
    }
  }
}