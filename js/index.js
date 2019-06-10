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

    const containers = document.querySelectorAll('.gridster ul li');
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
    /* App.resizeFn(); */
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
    if(this.childNodes.length <= 1){
      var data = e.dataTransfer.getData("text/html");
      var nodeCopy = document.getElementById(data).cloneNode(true);
      nodeCopy.id = Math.random().toString(5).substring(2, 5); 
      e.target.appendChild(nodeCopy);
    }
  }
  /* static resizeFn(){
    var resizeButton = document.getElementById('resizeBtn');    
    var resizer = document.getElementById('wrapper_1');

    resizeButton.addEventListener('click', function init() {
      resizeButton.removeEventListener('click', init, false);
      //resizeButton.className = resizeButton.className + 'resizable';
        //resizer.className = 'resizer';
        resizer.addEventListener('mousedown', initDrag, false);
    }, false);
    
    var startX, startY, startWidth, startHeight;
    
    function initDrag(e) {
      console.log(resizer);
       startX = e.clientX;
       startY = e.clientY;
       startWidth = parseInt(document.defaultView.getComputedStyle(resizer).width, 10);
       startHeight = parseInt(document.defaultView.getComputedStyle(resizer).height, 10);
       document.documentElement.addEventListener('mousemove', doDrag, false);
       document.documentElement.addEventListener('mouseup', stopDrag, false);
    }
    
    function doDrag(e) {
      resizer.style.width = (startWidth + e.clientX - startX) + 'px';
      resizer.style.height = (startHeight + e.clientY - startY) + 'px';
    }
    
    function stopDrag(e) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);    document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
  }  */
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


