
//=============TOOLBOX CONTROLS===============

var tool = document.getElementsByClassName('tool');
const toolmenu = document.getElementById('toolmenu');

function hoverTool() {
    document.getElementById(this.id).children[0].style.filter = "saturate(1) brightness(1.5)";
}

function leaveTool() {
    document.getElementById(this.id).children[0].style.filter = "none";
}

function clickTool() {

    showToolMenu(this.id)
 
}

function addControlTool() {
    for(var a=0; a < tool.length; a++) {
        tool[a].addEventListener('click', clickTool)
        tool[a].addEventListener('pointerover', hoverTool)
        tool[a].addEventListener('pointerleave', leaveTool)
    }
}
addControlTool()

//===============TOOLMENU CONTROLS==============

function hideToolMenu() {

    //read controls to tool
    addControlTool()

    //reset the tools color to default
    for(var a=0; a< tool.length; a++) {
        tool[a].style.backgroundColor = "transparent";
        tool[a].children[0].style.filter = "none";
    }

      //hide toolmenu
    toolmenu.style.visibility = "none";
    toolmenu.style.transform = `translateX(${(toolmenu.offsetWidth) * -1}px)`;
    toolmenu.style.boxShadow = "none";
    toolbox.style.boxShadow = "none";

    //glowRight.style.boxShadow = "none";
}
hideToolMenu()

function escToolMenu(e) {
    
    if(e.key == 'Escape') {
        if(checkInputFocus()) {
            document.activeElement.blur();
            highlight = false;
        }
        else {
            e.preventDefault();
            hideToolMenu();
        }
    }
}
document.addEventListener('keydown', escToolMenu)

function showToolMenu(id) {

    addControlTool();

    for(var a=0; a< tool.length; a++) {
        tool[a].style.backgroundColor = "transparent";
        tool[a].children[0].style.filter = "none";
     }
 
    document.getElementById(id).style.backgroundColor = "#6885CC";
    document.getElementById(id).children[0].style.filter = "saturate(0) brightness(2)";
    
    document.getElementById(id).removeEventListener('pointerover', hoverTool);
    document.getElementById(id).removeEventListener('pointerleave', leaveTool);

    toolmenu.style.visibility = "visible";
    toolmenu.style.transform = `translateX(${0}px)`;
    toolmenu.style.boxShadow = "1px 10px 10px rgba(0,0,0,.2)";
    
    //glowRight.style.boxShadow = "90px 0px 1000px #6885CC";

    toolbox.style.boxShadow = "-100px 0px 1000px #6885CC";
    appendMenu(id) //will append actual menu elements based on ID
}

function appendMenu(id) {
    id = id.substring(4);

    var menu = document.querySelectorAll('.menu');

    for(var a = 0; a < menu.length; a++) {
        menu[a].style.display = "none";
    }
    
    document.getElementById('menu' + id).style.display = "block";
}