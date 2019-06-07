class App {
  static init() {
    let gridPositions = {
      wrapper_1 : [1, 1, 2, 7],
      wrapper_2 : [2, 1, 8, 6],
      wrapper_3: [8,1,9,7],
      wrapper_5: [4, 6, 2, 7],
      wrapper_7: [6, 6, 8 , 6]
    };

    const boxes = document.getElementsByClassName('element-draggable');
    for (const box of boxes) {
      box.addEventListener("dragstart", App.dragstart);
      //box.addEventListener("dragend", App.dragend);
    }

    const containers = document.getElementsByClassName('wrapper');
    for (const container of containers) {
      container.addEventListener("dragover", App.dragover);
      //container.addEventListener("dragenter", App.dragenter);
      //container.addEventListener("dragleave", App.dragleave);
      container.addEventListener("drop", App.drop);
      for (const item of Object.keys(gridPositions)){
        if (item == container.id){
          container.style.gridArea = gridPositions[item][0] + '/' + gridPositions[item][1] + '/' + gridPositions[item][2] + '/' + gridPositions[item][3];
        }
      }
    }  

  }
  
  static dragstart(e) {
    e.dataTransfer.setData("text/html", e.target.id);
  }

  /* static dragend(e) {
    console.log(e);
  } */

  static dragover(e) {
    e.preventDefault();
  }

  static drop(e) {
    e.preventDefault();
    if(!this.hasChildNodes()){
      var data = e.dataTransfer.getData("text/html");
      var nodeCopy = document.getElementById(data).cloneNode(true);
      nodeCopy.id = Math.random().toString(5).substring(2, 5); 
      e.target.appendChild(nodeCopy);
    }
  }
}
document.addEventListener("DOMContentLoaded", App.init);

let json;

function saveLayout(){    
  let initElement = document.getElementById("layout-preview");
  json = html2json(initElement.innerHTML);
}

function loadLayout(){
  let element = document.getElementById("layout-preview");
  let html = json2html(json);
  element.innerHTML = html;
  App.init();
}
