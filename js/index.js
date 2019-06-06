class App {

  static init() {
    const boxes = document.getElementsByClassName('isDraggable');
    for (const box of boxes) {
      box.addEventListener("dragstart", App.dragstart);
      box.addEventListener("dragend", App.dragend);
    }

    const containers = document.getElementsByClassName('item');

    for (const container of containers) {
      container.addEventListener("dragover", App.dragover);
      container.addEventListener("dragenter", App.dragenter);
      container.addEventListener("dragleave", App.dragleave);
      container.addEventListener("drop", App.drop);
    }
  }
  
  static dragstart(e) {
    this.className += " held";
    setTimeout(() => this.className = "invisible", 0);
    e.dataTransfer.setData("Text", e.target.id);
  }

  static dragend(e) {
    this.className = "isDraggable";
  }

  static dragover(e) {
    e.preventDefault();
  }
  static drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("Text");
    e.target.appendChild(document.getElementById(data));
  }
}
document.addEventListener("DOMContentLoaded", App.init)