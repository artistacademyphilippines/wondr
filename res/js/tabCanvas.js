
var dataCanvas = '';

dataCanvas = 'Default*';
dataCanvas += `\npnlBoxCanvas: Canvas`;
dataCanvas += `\ndropdown 0: Instagram Post`;
dataCanvas += `\ntxtSizeWidth: 1080`;
dataCanvas += `\ntxtSizeHeight: 1080`;
dataCanvas += `\ntxtSolidColor: FFFFFF`;
dataCanvas += `\ntxtGradientColor1: FFFFFF`;
dataCanvas += `\ntxtGradientColor2: A9AEFF`;
dataCanvas += `\ntxtGradientRotation: 0`;
dataCanvas += `\ntxtGradientScale: 1`;
dataCanvas += `\ndropdown 1: Solid Color`;


//===============RESIZE CANVAS=========================

function resizeBoxCanvas() {
    let cnvBox = document.getElementById('cnvBox');
    let pnlBoxPattern = document.getElementById('pnlBoxPattern');
    let panel = document.getElementById('pnlBoxCanvas');
    let txtSizeWidth = panel.querySelector('.txtSizeWidth');
    let txtSizeHeight = panel.querySelector('.txtSizeHeight');

    cnvBox.style.width = txtSizeWidth.value + "px";
    cnvBox.style.height = txtSizeHeight.value + "px";
    
    for(var a=0; a < pnlBoxPattern.length; a++) {
        renderPattern(a);
    }
    resetPatternMinMax();
    zoomMainCanvas();

    //encodeCanvas();
}

function hoverSize() {
    this.style.borderBottom = "1px solid #647499";
}

function leaveSize() {
    this.style.borderBottom = "1px solid #515E7B";
}

function validateCustomSize() {

    var max = 4000;
    var min = 1;

    if(this.value > max) {
        this.value = max;
    }
    else if(this.value < min) {
        this.value = min;
    }

    resizeBoxCanvas()
}

function enterCustomSize(e) {
    if(e.key === "Enter") {
        this.blur();
        this.value = Math.round(Number(this.value));
        resizeBoxCanvas();
    }
}
 
function chooseSize() {

    let boxSize = 60;
    let panel = document.getElementById('pnlBoxCanvas');
    let txtSizeWidth = panel.querySelector('.txtSizeWidth');
    let txtSizeHeight = panel.querySelector('.txtSizeHeight');

    //adjust patterns depending on the size of the canvas
    let maxHori = Math.ceil(txtSizeWidth.value / boxSize);
    let maxVerti = Math.ceil(txtSizeHeight.value / boxSize);
    let pnlBoxPattern = document.getElementById('pnlBoxPattern');

    this.closest('.pnlDrop').children[0].children[0].innerText = this.innerText;

    if(this.innerText == "Instagram Post") {
   
        txtSizeWidth.value = 1080;
        txtSizeHeight.value = 1080;

        //add readonly for editing
        txtSizeWidth.setAttribute('disabled', 'true');
        txtSizeHeight.setAttribute('disabled', 'true');
        
        //hide border underline
        txtSizeWidth.style.borderBottom = "1px solid transparent";
        txtSizeHeight.style.borderBottom = "1px solid transparent";

        //remove hover effect to txtSizeWidth
        txtSizeWidth.removeEventListener('mouseover', hoverSize);
        txtSizeHeight.removeEventListener('mouseover', hoverSize);

        //remove leave effect to txtSizeHeight
        txtSizeWidth.removeEventListener('mouseleave', leaveSize);
        txtSizeHeight.removeEventListener('mouseleave', leaveSize);
    }

    else if(this.innerText == "Facebook Page Cover") {

        txtSizeWidth.value = 1640;
        txtSizeHeight.value = 608;

        //remove selectall function

        //add readonly for editing
        txtSizeWidth.setAttribute('disabled', 'true');
        txtSizeHeight.setAttribute('disabled', 'true');
        
        //hide border underline
        txtSizeWidth.style.borderBottom = "1px solid transparent";
        txtSizeHeight.style.borderBottom = "1px solid transparent";

        //remove hover effect to txtSizeWidth
        txtSizeWidth.removeEventListener('mouseover', hoverSize);
        txtSizeHeight.removeEventListener('mouseover', hoverSize);

        //remove leave effect to txtSizeHeight
        txtSizeWidth.removeEventListener('mouseleave', leaveSize);
        txtSizeHeight.removeEventListener('mouseleave', leaveSize);

    }

    else if(this.innerText == "Youtube Thumbnail") {

        txtSizeWidth.value = 1280;
        txtSizeHeight.value = 720;

        //remove selectall function

        //add readonly for editing
        txtSizeWidth.setAttribute('disabled', 'true');
        txtSizeHeight.setAttribute('disabled', 'true');
        
        //hide border underline
        txtSizeWidth.style.borderBottom = "1px solid transparent";
        txtSizeHeight.style.borderBottom = "1px solid transparent";

        //remove hover effect to txtSizeWidth
        txtSizeWidth.removeEventListener('mouseover', hoverSize);
        txtSizeHeight.removeEventListener('mouseover', hoverSize);

        //remove leave effect to txtSizeHeight
        txtSizeWidth.removeEventListener('mouseleave', leaveSize);
        txtSizeHeight.removeEventListener('mouseleave', leaveSize);

    }

    else if(this.innerText == "Custom Size") {

        //add readonly for editing
        txtSizeWidth.removeAttribute('disabled');
        txtSizeHeight.removeAttribute('disabled');

        //show border underline
        txtSizeWidth.style.borderBottom = "1px solid #515E7B";
        txtSizeHeight.style.borderBottom = "1px solid #515E7B";
    
        //add hover effect and leave to txtSizeWidth
        txtSizeWidth.addEventListener('mouseover', hoverSize);
        txtSizeHeight.addEventListener('mouseover', hoverSize);

        txtSizeWidth.addEventListener('mouseleave', leaveSize);
        txtSizeHeight.addEventListener('mouseleave', leaveSize);
        
        //add change event to the txtSizeWidth
        txtSizeWidth.addEventListener('change', validateCustomSize);
        //add change event to the txtSizeHeight
        txtSizeHeight.addEventListener('change', validateCustomSize);

        //add outfocus event to the txtSizeWidth
        txtSizeWidth.addEventListener('focusout', validateCustomSize);
        //add outfocus event to the txtSizeHeight
        txtSizeHeight.addEventListener('focusout', validateCustomSize);

        txtSizeWidth.addEventListener('keydown', enterCustomSize);
        txtSizeHeight.addEventListener('keydown', enterCustomSize);


    }

    pnlBoxPattern.querySelector('.txtXPattern').max = maxHori;
    pnlBoxPattern.querySelector('.txtXPattern').min = maxHori * -1;
    pnlBoxPattern.querySelector('.txtXPattern').previousElementSibling.max = maxHori;
    pnlBoxPattern.querySelector('.txtXPattern').previousElementSibling.min = maxHori * -1;

    pnlBoxPattern.querySelector('.txtYPattern').max = maxVerti;
    pnlBoxPattern.querySelector('.txtYPattern').min = maxVerti * -1;
    pnlBoxPattern.querySelector('.txtYPattern').previousElementSibling.max = maxHori;
    pnlBoxPattern.querySelector('.txtYPattern').previousElementSibling.min = maxHori * -1;


    resizeBoxCanvas();
    //encodeCanvas();
}

for(var i = 0; i < document.querySelectorAll('.optSize').length; i++) { //dropdown background option
    document.querySelectorAll('.optSize')[i].addEventListener('click', chooseSize);
}

//===========DROPDOWN BACKGROUND===============

function chooseBackground() {

    let panel = document.getElementById('pnlBoxCanvas');
    let txtGradientScale = panel.querySelector('.txtGradientScale');
    let txtGradientRotation = panel.querySelector('.txtGradientRotation');

    this.closest('.pnlDrop').children[0].children[0].innerText = this.innerText;

    if(this.innerText == "Solid Color") {
       
        panel.querySelector('.tabSolidColor').style.display = "block";
        panel.querySelector('.tabGradientColor').style.display = "none";
        chooseSolidColor();
    }

    else if(this.innerText == "Gradient Color") {

        panel.querySelector('.tabSolidColor').style.display = "none";
        panel.querySelector('.tabGradientColor').style.display = "block";

        chooseGradientColors();

    }
} 

for(var i = 0; i < document.getElementsByClassName('optBG').length; i++) { //dropdown background option
    document.getElementsByClassName('optBG')[i].addEventListener('click', chooseBackground)
}

//=======================SOLID BG COLOR PICKER==================

function chooseSolidColor() {

    let panel = document.getElementById('pnlBoxCanvas');
    let txtSolid = panel.querySelector('.txtSolidColor');
    let cnvBG = document.getElementById('cnvBG');
    let thumbPicker = panel.querySelector('.txtSolidColor').nextElementSibling;

    testHexCode(txtSolid)

    //change thumbpick color
    thumbPicker.style.backgroundColor = '#' + txtSolid.value;
    //change the cnvBG color now
    cnvBG.style.backgroundColor = '#' + txtSolid.value;
    cnvBG.style.backgroundImage = "none";

    txtSolid.blur();

    //encodeCanvas();
}
document.querySelector('#pnlBoxCanvas').querySelector('.txtSolidColor').addEventListener('change', chooseSolidColor);
document.querySelector('#pnlBoxCanvas').querySelector('.txtSolidColor').nextElementSibling.addEventListener('click', letsSummonColorPicker)

//============================GRADIENTS==========================
function createGradient() { //create canvas gradient
    
    let panel = document.getElementById('pnlBoxCanvas');
    let cnvBG = document.getElementById('cnvBG');
    let txtGradient1 = panel.querySelector('.txtGradientColor1');
    let txtGradient2 = panel.querySelector('.txtGradientColor2');
    let txtGradientScale = panel.querySelector('.txtGradientScale');
    let txtGradientRotation = panel.querySelector('.txtGradientRotation');

    let scaleGradient = txtGradientScale.value * 0.5;
    
    let rotateGradient = Number(txtGradientRotation.value) + 180;

    cnvBG.style.backgroundImage = `linear-gradient(${rotateGradient}deg , ${'#' + txtGradient1.value} ${scaleGradient}%, ${'#' + txtGradient2.value} ${100-scaleGradient}%)`;

    //encodeCanvas();
}
document.querySelector('#pnlBoxCanvas').querySelector('.txtGradientScale').previousElementSibling.addEventListener('input', createGradient);
document.querySelector('#pnlBoxCanvas').querySelector('.txtGradientScale').addEventListener('change', createGradient)
document.querySelector('#pnlBoxCanvas').querySelector('.txtGradientRotation').previousElementSibling.addEventListener('input', createGradient);
document.querySelector('#pnlBoxCanvas').querySelector('.txtGradientRotation').addEventListener('change', createGradient)

function chooseGradientColors() {

    let panel = document.getElementById('pnlBoxCanvas');
    let txtGradient1 = panel.querySelector('.txtGradientColor1');
    let txtGradient2 = panel.querySelector('.txtGradientColor2');

    testHexCode(txtGradient1) //if invalid format
    testHexCode(txtGradient2) //if invalid format

    this.blur();
    createGradient();
}
document.querySelector('#pnlBoxCanvas').querySelector('.txtGradientColor1').addEventListener('change', chooseGradientColors);
document.querySelector('#pnlBoxCanvas').querySelector('.txtGradientColor2').addEventListener('change', chooseGradientColors);
document.querySelector('#pnlBoxCanvas').querySelector('.txtGradientColor1').previousElementSibling.addEventListener('click', letsSummonColorPicker);
document.querySelector('#pnlBoxCanvas').querySelector('.txtGradientColor2').previousElementSibling.addEventListener('click', letsSummonColorPicker);


function swapGradient() {

    var swap1 = txtGradient1.value;
    var swap2 = txtGradient2.value;

    txtGradient1.value = swap2;
    txtGradient2.value = swap1;

    pckGradient1.style.backgroundColor = '#' + txtGradient1.value;
    pckGradient2.style.backgroundColor = '#' + txtGradient2.value;

    createGradient();
}

//================================BOTTOM CONTROLS=========================

function showBasicBox(){
    this.closest('#pnlBoxCanvas').children[0].children[0].innerText = "Canvas Settings";
    this.closest('#pnlBoxCanvas').querySelector('.tabSliderBox2').style.translate = "0%"; //slide tab
    this.closest('#pnlBoxCanvas').querySelector('.pnlBottomBoxThumb2').style.translate = "0%"; //slide scroll thumb
}

function showColorBox() {
    this.closest('#pnlBoxCanvas').children[0].children[0].innerText = "Canvas Color";
    this.closest('#pnlBoxCanvas').querySelector('.tabSliderBox2').style.translate = "-100%"; //slide tab to left
    this.closest('#pnlBoxCanvas').querySelector('.pnlBottomBoxThumb2').style.translate = "100%"; //slide thumb to right
}

document.querySelector('#pnlBoxCanvas').querySelector('.btnBasicBox').addEventListener('click', btnBottomClick); //default the btnBasic to white
document.querySelector('#pnlBoxCanvas').querySelector('.btnBasicBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxCanvas').querySelector('.btnBasicBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxCanvas').querySelector('.btnBasicBox').addEventListener('click', showBasicBox);
document.querySelector('#pnlBoxCanvas').querySelector('.btnBasicBox').click();

document.querySelector('#pnlBoxCanvas').querySelector('.btnColorBox').addEventListener('click', btnBottomClick);
document.querySelector('#pnlBoxCanvas').querySelector('.btnColorBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxCanvas').querySelector('.btnColorBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxCanvas').querySelector('.btnColorBox').addEventListener('click', showColorBox);





