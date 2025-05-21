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

  draw() {
    this.grid.innerHTML = "";
    this.candies.forEach(candy => {
      const candyNode = candy.toHTML();
      this.grid.appendChild(candyNode);
      candyNode.addEventListener("click", () => this.onCandyClick(candy));
    });
  }

  isNextTo(clickedCandy, candy) {
    let isNextTo = false;
    if (clickedCandy.getRow() != candy.getRow() && clickedCandy.getColumn() != candy.getColumn()) {
      return isNextTo;
    } else {
      const clickedCandyId = clickedCandy.id;
      const candyId = candy.id;
      if (clickedCandyId + 1 === candyId || clickedCandyId - 1 === candyId || clickedCandyId + (1 * this.gridSize) === candyId || clickedCandyId - (1 * this.gridSize) === candyId) {
        isNextTo = true;
      }
    }
    return isNextTo;
  }

  dropDown() {
    for (let i = 0; i < this.candies.length; i++) {
      if (this.candies[i + this.gridSize]?.isRemoved) {
        const bottomCandy = this.candies[i + this.gridSize];
        const topCandy = this.candies[i];
        const topCandyIndex = this.candies[i].index;
        const topCandyColor = this.candies[i].color;
        const topCandyIsRemoved = this.candies[i].isRemoved;
        
        topCandy.isRemoved = bottomCandy.isRemoved; 
        
        bottomCandy.index = topCandyIndex;
        bottomCandy.color = topCandyColor;
        bottomCandy.isRemoved = topCandyIsRemoved;

        if (topCandy.getRow() === 0 && topCandy.isRemoved) {
          this.candies[i] = new Candy(topCandy.id);
        };
      };
    };
  }

  swap(candy1, candy2) {
    const candy1Index = candy1.index;
    const candy1Color = candy1.color;

    candy1.index = candy2.index;
    candy1.color = candy2.color;

    candy2.index = candy1Index;
    candy2.color = candy1Color;
  }

  onCandyClick(candy) {
    if (!candy.isRemoved) {
      if (!this.clickedCandy) {
        this.clickedCandy = candy;
        this.clickedCandy.select();
      } else if (this.isNextTo(this.clickedCandy, candy)) {
        this.swap(this.clickedCandy, candy);
        if (!this.checkLines()) {
          this.swap(candy, this.clickedCandy);
          this.clickedCandy.select();
          this.clickedCandy = undefined;
        } else {
          this.clickedCandy = undefined;
          this.checkLines();
          this.dropDown();
          this.draw();
          this.checkFinishedGame();
        }
      }
    }
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
            
          if (!firstCandy.isRemoved && firstCandy.id + (1 * offset) === secondCandy?.id && firstCandy.id + (2 * offset) === thirdCandy?.id && firstCandy.id + (3 * offset) === fourthCandy?.id && firstCandy.id + (4 * offset) === fifthCandy?.id) {
            console.log("COMBO OF 5",firstCandy, secondCandy, thirdCandy, fourthCandy, fifthCandy);
            firstCandy.isRemoved = true;
            secondCandy.isRemoved = true;
            thirdCandy.isRemoved = true;
            fourthCandy.isRemoved = true;
            fifthCandy.isRemoved = true;
            console.log("COMBO OF 5",firstCandy, secondCandy, thirdCandy, fourthCandy, fifthCandy);
            this.score.addScore(5 * candyPoints);
            isCombo = true;
          } else if (!firstCandy.isRemoved && !isCombo && firstCandy.id + (1 * offset) === secondCandy?.id && firstCandy.id + (2 * offset) === thirdCandy?.id && firstCandy.id + (3 * offset) === fourthCandy?.id) {
            console.log("COMBO OF 4",firstCandy, secondCandy, thirdCandy, fourthCandy)
            firstCandy.isRemoved = true;
            secondCandy.isRemoved = true;
            thirdCandy.isRemoved = true;
            fourthCandy.isRemoved = true;
            console.log("COMBO OF 4",firstCandy, secondCandy, thirdCandy, fourthCandy)
            this.score.addScore(4 * candyPoints);
            isCombo = true;
          } else if (!firstCandy.isRemoved && !isCombo && firstCandy.id + (1 * offset) === secondCandy?.id && firstCandy.id + (2 * offset) === thirdCandy?.id) {
            console.log("COMBO OF 3", firstCandy, secondCandy, thirdCandy)
            firstCandy.isRemoved = true;
            secondCandy.isRemoved = true;
            thirdCandy.isRemoved = true;
            console.log("COMBO OF 3", firstCandy, secondCandy, thirdCandy)
            this.score.addScore(3 * candyPoints);
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

  checkFinishedGame() {
    let isFinished = false;
    if(this.score.score >= this.requiredScore) {
      this.gameOverScreen = new GameOverScreen(this.score.score);
      this.checkLines();
      this.gameOverScreen.draw();
      this.gameOverScreen.setScore();
      isFinished = true;
    };
    return isFinished;
  }

  setInterval() {
    const gameLoop = window.setInterval(() => {
      console.log("Interval Initialized");
      this.checkLines();
      this.dropDown();
      this.draw();
      if (this.checkFinishedGame()) {
        console.log("Interval Finished");
        this.checkFinishedGame();
        clearInterval(gameLoop);
      }
    }, 1000)
  }
}