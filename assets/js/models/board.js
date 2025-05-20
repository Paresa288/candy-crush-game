class Board {

  constructor(gridSize, requiredScore) {
    this.gridSize = gridSize;
    this.grid = document.querySelector("#grid");
    this.candies = [];
    this.clickedCandy = undefined;
    this.score = new Score();
    this.requiredScore = requiredScore; 
    this.build();
  }
  
  build() {
    this.candies = [];
    this.grid.style.minWidth = (`${this.gridSize * 71}px`);
    this.grid.style.width = (`${this.gridSize * 71}px`);

    for (let i = 0; i < this.gridSize * 9; i++) {
      const candy = new Candy(i);
      this.candies.push(candy);
    }
  }

  onCandyClick(candy) {
    if (!this.clickedCandy) {
      this.clickedCandy = candy;
      candy.select()
    } else {
      this.swap(this.clickedCandy, candy);
      this.checkLines();
      this.clickedCandy = undefined;
      this.draw();
      this.checkFinishedGame();
    }
  }

  swap(candy1, candy2) {
    const candy1Index = candy1.index;
    const candy1Color = candy1.color;
    
    candy1.index = candy2.index;
    candy1.color = candy2.color;
    
    candy2.index = candy1Index;
    candy2.color = candy1Color;

  }

  draw() {
    this.grid.innerHTML = "";
    this.candies.forEach(candy => {
      const candyNode = candy.toHTML();
      this.grid.appendChild(candyNode);
      candyNode.addEventListener("click", () => this.onCandyClick(candy));
    });
  }

  getCandiesByColor() {
    const candiesByColor = this.candies.reduce((candiesByColor, candy) => {
      if (!candiesByColor[candy.color]) {
        candiesByColor[candy.color] = [];
      } 
      candiesByColor[candy.color].push(candy);

      return candiesByColor;
    }, {});

    return candiesByColor;
  }

  getCandiesByColorAndRow(sameColorCandies) {
    return sameColorCandies.reduce((candiesByColorAndRow, candy) => {
      if (!candiesByColorAndRow[candy.getRow()]) {
        candiesByColorAndRow[candy.getRow()] = [];
      }
      candiesByColorAndRow[candy.getRow()].push(candy);
      return candiesByColorAndRow;
    }, {});
  }

  getCandiesByColorAndColumn(sameColorCandies) {
    return sameColorCandies.reduce((candiesByColorAndColumn, candy) => {
      if(!candiesByColorAndColumn[candy.getColumn()]) {
        candiesByColorAndColumn[candy.getColumn()] = [];
      }
      candiesByColorAndColumn[candy.getColumn()].push(candy);
      return candiesByColorAndColumn;
    }, {});
  }

  checkCombo(organizedCandies, offset = 1) {
    let isCombo = false;
    Object.keys(organizedCandies).forEach(index => {
        const reorganizedCandies = organizedCandies[index];
        for (let i = 0; i < reorganizedCandies.length; i++) {
          if (reorganizedCandies.length >= 3) {
            const firstCandy = reorganizedCandies[i];
            const secondCandy = reorganizedCandies[i + 1];
            const thirdCandy = reorganizedCandies[i + 2];
            const fourthCandy = reorganizedCandies[i + 3];
            const fifthCandy = reorganizedCandies[i + 4];
            
            if (firstCandy.id + (1 * offset) === secondCandy?.id && firstCandy.id + (2 * offset) === thirdCandy?.id) {
              firstCandy.isRemoved = true;
              secondCandy.isRemoved = true;
              thirdCandy.isRemoved = true;
              this.score.addScore(3 * candyPoints);
              isCombo = true;
            } else if (firstCandy.id + (1 * offset) === secondCandy?.id && firstCandy.id + (2 * offset) === thirdCandy?.id && firstCandy.id + (3 * offset) === fourthCandy?.id) {
              firstCandy.isRemoved = true;
              secondCandy.isRemoved = true;
              thirdCandy.isRemoved = true;
              fourthCandy.isRemoved = true;
              this.score.addScore(4 * candyPoints);
              isCombo = true;
            } else if (firstCandy.id + (1 * offset) === secondCandy?.id && firstCandy.id + (2 * offset) === thirdCandy?.id && firstCandy.id + (3 * offset) === fourthCandy?.id && firstCandy.id + (4 * offset) === fifthCandy?.id) {
              firstCandy.isRemoved = true;
              secondCandy.isRemoved = true;
              thirdCandy.isRemoved = true;
              fourthCandy.isRemoved = true;
              fifthCandy.isRemoved = true;
              this.score.addScore(5 * candyPoints);
              isCombo = true;
            }
          }
        } 
      });
      return isCombo;
  }

  checkLines() {
    const candiesByColor = this.getCandiesByColor();
    let isCombo = false;

    Object.keys(candiesByColor).forEach(color => {
      const sameColorCandies = candiesByColor[color];

      const candiesByColorAndRow = this.getCandiesByColorAndRow(sameColorCandies);
      const isRowCombo = this.checkCombo(candiesByColorAndRow);

      const candiesByColorAndColumn = this.getCandiesByColorAndColumn(sameColorCandies);
      const isColumnCombo = this.checkCombo(candiesByColorAndColumn, this.gridSize);
      
      isCombo = isRowCombo || isColumnCombo || isCombo;
    });
    return isCombo;
  }

  /* checkLines() {
    const candiesByColor = this.getCandiesByColor();

    Object.keys(candiesByColor).forEach(color => {
      const sameColorCandies = candiesByColor[color];
    
      const candiesByColorAndRow = sameColorCandies.reduce((candiesByColorAndRow, candy) => {
        if (!candiesByColorAndRow[candy.getRow()]) {
          candiesByColorAndRow[candy.getRow()] = [];
        }
        candiesByColorAndRow[candy.getRow()].push(candy);
        return candiesByColorAndRow;
      }, {});
      Object.keys(candiesByColorAndRow).forEach(row => {
        this.candiesByRow = candiesByColorAndRow[row];
        for (let i = 0; i < this.candiesByRow.length; i++) {
          if (this.candiesByRow.length >= 3) {
            const firstCandy = this.candiesByRow[i];
            const secondCandy = this.candiesByRow[i + 1];
            const thirdCandy = this.candiesByRow[i + 2];
            const fourthCandy = this.candiesByRow[i + 3];
            const fifthCandy = this.candiesByRow[i + 4];
            
            if (firstCandy.id + 1 === secondCandy?.id && firstCandy.id + 2 === thirdCandy?.id) {
              firstCandy.isRemoved = true;
              secondCandy.isRemoved = true;
              thirdCandy.isRemoved = true;
              this.score.addScore(3 * candyPoints);
            } else if (firstCandy.id + 1 === secondCandy?.id && firstCandy.id + 2 === thirdCandy?.id && firstCandy.id + 3 === fourthCandy?.id) {
              firstCandy.isRemoved = true;
              secondCandy.isRemoved = true;
              thirdCandy.isRemoved = true;
              fourthCandy.isRemoved = true;
              this.score.addScore(4 * candyPoints);
            } else if (firstCandy.id + 1 === secondCandy?.id && firstCandy.id + 2 === thirdCandy?.id && firstCandy.id + 3 === fourthCandy?.id && firstCandy.id + 4 === fifthCandy?.id) {
              firstCandy.isRemoved = true;
              secondCandy.isRemoved = true;
              thirdCandy.isRemoved = true;
              fourthCandy.isRemoved = true;
              fifthCandy.isRemoved = true;
              this.score.addScore(5 * candyPoints);
            }
          }
        } 
      });
      
      const candiesByColorAndColumn = sameColorCandies.reduce((candiesByColorAndColumn, candy) => {
        if(!candiesByColorAndColumn[candy.getColumn()]) {
          candiesByColorAndColumn[candy.getColumn()] = [];
        }
        candiesByColorAndColumn[candy.getColumn()].push(candy);
        return candiesByColorAndColumn;
      }, {});
      Object.keys(candiesByColorAndColumn).forEach(column => {
        this.candiesByColumn = candiesByColorAndColumn[column];
        for (let i = 0; i < this.candiesByColumn.length; i++) {
          if (this.candiesByColumn.length >= 3) {
            const firstCandy = this.candiesByColumn[i];
            const secondCandy = this.candiesByColumn[i + 1];
            const thirdCandy = this.candiesByColumn[i + 2];
            const fourthCandy = this.candiesByColumn[i + 3];
            const fifthCandy = this.candiesByColumn[i + 4];
            
            if (firstCandy.id + (this.gridSize * 1) === secondCandy?.id && firstCandy.id + (this.gridSize * 2) === thirdCandy?.id) {
              firstCandy.isRemoved = true;
              secondCandy.isRemoved = true;
              thirdCandy.isRemoved = true;
              this.score.addScore(3 * candyPoints);
            } else if (firstCandy.id + (this.gridSize * 1) === secondCandy?.id && firstCandy.id + (this.gridSize * 2) === thirdCandy?.id && firstCandy.id + (this.gridSize * 3) === fourthCandy?.id) {
              firstCandy.isRemoved = true;
              secondCandy.isRemoved = true;
              thirdCandy.isRemoved = true;
              fourthCandy.isRemoved = true;
              this.score.addScore(4 * candyPoints);
            } else if (firstCandy.id + (this.gridSize * 1) === secondCandy?.id && firstCandy.id + (this.gridSize * 2) === thirdCandy?.id && firstCandy.id + (this.gridSize * 3) === fourthCandy?.id && firstCandy.id + (this.gridSize * 4) === fifthCandy?.id) {
              firstCandy.isRemoved = true;
              secondCandy.isRemoved = true;
              thirdCandy.isRemoved = true;
              fourthCandy.isRemoved = true;
              fifthCandy.isRemoved = true;
              this.score.addScore(5 * candyPoints);
            }
          }
        }
      });  
    });
  } */

  checkFinishedGame() {
    this.gameOverScreen = new GameOverScreen(this.score.score);
    if(this.score.score >= this.requiredScore) {
      this.checkLines();
      this.gameOverScreen.draw();
      this.gameOverScreen.setScore();
    }
  }
  
}