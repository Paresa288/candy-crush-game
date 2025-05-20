class Candy {
  constructor(id) {
    this.id = id;
    this.index = Math.floor(Math.random() * candyColors.length)
    this.color = candyColors[this.index].color;
    this.isRemoved = false;
    this.mode = "regular";
    this.node;
  }

  toHTML() {
    const candyNode = document.createElement("div");
    this.node = candyNode
    candyNode.setAttribute("id", this.id);
    if (!this.isRemoved) {
      candyNode.setAttribute("draggable", true);
      candyNode.setAttribute("color", `${this.color}`);
      candyNode.setAttribute("mode", "regular(0)");
      candyNode.style.backgroundImage = candyColors[this.index][this.mode];
    } else {
      candyNode.style.backgroundImage = blankSquare;
    }
    return candyNode;  
  }

  select() {
    this.node.classList.add('selected')
  }

  getRow() {
    return Math.floor(this.id / 9);
  }

  getColumn() {
    return this.id % 9;
  }

}

  
