class Board {

  constructor(gridSize) {
    
    this.tiles = [];
    this.gridSize = gridSize;
    this.grid = document.querySelector("#grid");
    this.candy;
  }
  
  createBoard() {
    this.grid.style.minWidth = (`${this.gridSize * 71}px`);
    this.grid.style.width = (`${this.gridSize * 71}px`);
    for(let i = 0; i < this.gridSize * 9; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      this.grid.appendChild(square);
      this.tiles.push(square);
      this.candy = new Candy();
      this.candy.draw(square);
      square.setAttribute("color", `${this.candy.color}`);
      square.setAttribute("mode", "regular(0)");
    }
  }
}