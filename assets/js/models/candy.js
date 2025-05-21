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
    this.node = document.createElement("div");
    this.node.setAttribute("id", this.id);
    if (!this.isRemoved) {
      this.node.setAttribute("draggable", true);
      this.node.setAttribute("color", `${this.color}`);
      this.node.setAttribute("mode", "regular(0)");
      this.node.style.backgroundImage = candyColors[this.index][this.mode];
    } else {
      this.node.setAttribute("color", `${this.color}`);
      this.node.style.backgroundImage = blankSquare;
    }
    return this.node;  
  }

  select() {
    if (!this.isRemoved) {
      if (!this.node.classList.contains("selected")) {
        this.node.classList.add("selected");
      } else {
        this.node.classList.remove("selected");
      }
    }
  }

  getRow() {
    return Math.floor(this.id / 9);
  }

  getColumn() {
    return this.id % 9;
  }

}

  
