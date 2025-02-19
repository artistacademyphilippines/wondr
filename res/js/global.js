
var counter = 0;
var cnvLayers = [];
var pinBody = [];
var cnvPinW = 0;
var cnvPinH = 0;
var defLeftScroll;
var defTopScroll;
var leadFlip;
var maxF = 0;
var highlight = false;

//============ADJUST WORKAREA OVERFLOW==========

//============BREAKLINE DRAG=============
var breaklineDrag = document.createElement('div');
breaklineDrag.setAttribute('id', 'breaklineDrag');

function containWorkArea() {
    
    //list of elements that affects vertical sizing
    let header = 46; // headerUI
    let submenu = 140; //submenu x2
    let footer = 4; //footer

    //list of elements that affects horizontal sizing
    let toolbox = 70; // toolbox
    let tmenu = 280; // toolmenu
    let border = 4;
    let gap = 4;
    let adsBox = 300;
    let pnlHeader = 70;
    let breakline = 1 + 8; //breakline 1px + .5em margin-bottom which is 8;
    let menufooter = 40;
    let fontcategory = 40 + 16 + 12.8; //16 is 1em margin-bottom and 12.8 is .8em margin-top 

    let cnvPin = document.getElementById('cnvPin');
    let canvasBorder = document.getElementById('canvasBorder');
    let configScroll = document.getElementsByClassName('configScroll')
    let configContainer = document.getElementsByClassName('configContainer');
    

    //mainbox subtract adsbox and gap
    //mainbox includes toolbox and toolmenu
    mainBox.style.width = window.innerWidth + 'px';
    mainBox.style.maxWidth = window.innerWidth + 'px';
    
    //now from mainbox, get the workarea size
    //workarea includes submenu
    //workarea is the parent of canvasBorder and ancestor of all canvases
    //that's why we only get its width, height is unnecessary
    workArea.style.height = window.innerHeight + 'px';
    workArea.style.width = mainBox.clientWidth - toolbox - tmenu + 'px';
    workArea.style.maxWidth = mainBox.clientWidth - toolbox - tmenu + 'px';
    workArea.style.display = "block";

    //get canvasBorder height by using workarea then subtract 2 subheaders
    var canvasBorderH = workArea.offsetHeight - submenu; //140px is 2 subheaders top and bottom at 70px each

    canvasBorder.style.height = canvasBorderH + 'px';
    canvasBorder.style.maxHeight = canvasBorderH + 'px';
    canvasBorder.style.visibility = "visible";

    //cnvPin resizing and loading
    cnvPinW = window.innerWidth - toolbox - tmenu - border - gap - adsBox;
    cnvPinH = window.innerHeight - header - submenu - footer;

    cnvPin.style.width = cnvPinW + 'px';
    cnvPin.style.height = cnvPinH + 'px';
    
    document.querySelectorAll('.menu').forEach(divs => {
        divs.style.height = window.innerHeight - header + 'px';
        divs.style.maxHeight = window.innerHeight - header + 'px';
    })

    //also adjust all the config scroll height under tool menu 
    
    for(var a= 0; a < configScroll.length; a++) {
        
        //console.log(header + pnlHeader + breakline + menufooter + footer)
        configScroll[a].style.height = (configScroll[a].parentElement.clientHeight - (pnlHeader + breakline + menufooter)) + "px";
        configScroll[a].style.maxHeight = (configScroll[a].parentElement.clientHeight - (pnlHeader + breakline + menufooter)) + "px";

        /*
        tabFontCategory.style.height = (window.innerHeight - 160) + "px";
        tabSliderFont.style.height = (window.innerHeight - 160) + "px";
        tabStylish.style.height = (window.innerHeight - 160) + "px";
        tabSansSerif.style.height = (window.innerHeight - 160) + "px";
        tabSerif.style.height = (window.innerHeight - 160) + "px";
        */

        if(configContainer[a] != null) {
            configContainer[a].style.height = (configScroll[a].parentElement.clientHeight - (pnlHeader + breakline + menufooter)) + "px";
            configContainer[a].style.maxHeight = (configScroll[a].parentElement.clientHeight - (pnlHeader + breakline + menufooter)) + "px";
        }

        if (a == 4) {
            configScroll[a].style.height = (configScroll[a].parentElement.clientHeight - (pnlHeader + menufooter + fontcategory + breakline)) + "px";
            configScroll[a].style.maxHeight = (configScroll[a].parentElement.clientHeight - (pnlHeader + menufooter + fontcategory + breakline)) + "px";
        }
    }

    rightPanel.style.visibility = "visible";

}
containWorkArea();
//window.addEventListener('load', containWorkArea)
window.addEventListener('resize', function() {
    containWorkArea();
    adjustBorder();
});

//==============ZOOM CONTROLS====================

function rangeZoomFormat() { //reformatting txtZoom removing %
    var getPercent = Math.round((Number(rngZoom.value) / Number(rngZoom.max))*100);
    rngZoom.style.background = `linear-gradient(to right, #2E3646 ${getPercent-4}%, transparent ${4}%)`;
    txtZoom.children[0].innerText = rngZoom.value + "%";
}
rangeZoomFormat()
rngZoom.addEventListener('input', rangeZoomFormat) //change format of slider

rngZoom.addEventListener('change', function() {
    this.blur();
});


function adjustBorderZoom() {

    let z = rngZoom.value / 100;
    let pinBody = document.getElementsByClassName('pinBody');

    for(var a = 0; a < pinBody.length; a++) {

        if(pinBody[a] != null) {
            let f = pinBody[a].dataset.ref;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)
            pinBody[a].style.width = canvas.clientWidth * z + 'px';
            pinBody[a].style.height = canvas.clientHeight * z + 'px';
            //check when zoomed out or zoomed in
            //zooming will make the cnvBox wider or taller than canvasBorder
            if((cnvBox.clientWidth * z + 96) > canvasBorder.clientWidth) { //96 total of 3em left and right
               
                pinBody[a].style.left = (canvas.offsetLeft * z) + 48 + 'px'; // 48 total of 3em left
                
            }
            else {
                
                pinBody[a].style.left = (cnvBox.getBoundingClientRect().left) + (canvas.offsetLeft * z) - 350 + 'px';
            }

            //check when zoomed out or zoomed in
            //zooming will make the cnvBox wider or taller than canvasBorder
            if((cnvBox.clientHeight * z + 96) > canvasBorder.clientHeight) { //96 total of 3em top and bottom
                
                pinBody[a].style.top = (canvas.offsetTop * z) + 48 + 'px'; //48 total of 3em top
                 
            }
            else {
                pinBody[a].style.top = (cnvBox.getBoundingClientRect().top) + (canvas.offsetTop * z) - 116 + 'px';

            }
            
        }
    }
}

//===============ZOOM CANVAS====================
function zoomMainCanvas() {

   
    let cnvPin = document.getElementById('cnvPin');
    let rngZoom = document.getElementById('rngZoom');
    let z = rngZoom.value / 100;
    let pinBody = document.getElementsByClassName('pinBody');
    
    cnvBox.style.zoom = txtZoom.children[0].innerText;
    
    let actualCnvBoxH = cnvBox.clientHeight * (rngZoom.value/100) + 96;
    let scrollH = (actualCnvBoxH - canvasBorder.offsetHeight) / 2;
    let actualCnvBoxW = cnvBox.clientWidth * (rngZoom.value/100) + 96;
    let scrollW = (actualCnvBoxW - canvasBorder.offsetWidth) / 2;

    canvasBorder.scrollLeft = scrollW;
    canvasBorder.scrollTop = scrollH;
    
    if((cnvBox.clientWidth * z + 96) > canvasBorder.clientWidth) {
        cnvPin.style.width = cnvPinW + (canvasBorder.scrollWidth - cnvPinW)  + 'px';
        //for some reasons the width works when multiplied by 2
    }
    else {
        cnvPin.style.width = cnvPinW + 'px';
    }

    //if else statement for cnvPin resizing
    if((cnvBox.clientHeight * z + 96) > canvasBorder.clientHeight) {
        cnvPin.style.height = cnvPinH + (canvasBorder.scrollHeight - cnvPinH)  + 'px'; 
        
    }
    else {
        cnvPin.style.height = cnvPinH + 'px';
    }
    
    adjustBorderZoom();
    //hide small pinbody
    for(var a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            if (pinBody[a].clientWidth <= 11 || pinBody[a].clientHeight <= 11) {
                pinBody[a].querySelector(`.pinTL`).style.opacity = 0;
                pinBody[a].querySelector(`.pinTR`).style.opacity = 0;
                pinBody[a].querySelector(`.pinBL`).style.opacity = 0;
                pinBody[a].querySelector(`.pinBR`).style.opacity = 0;
            }

            else if (pinBody[a].clientWidth > 11 || pinBody[a].clientHeight > 11) {
                pinBody[a].querySelector(`.pinTL`).style.opacity = 1;
                pinBody[a].querySelector(`.pinTR`).style.opacity = 1;
                pinBody[a].querySelector(`.pinBL`).style.opacity = 1;
                pinBody[a].querySelector(`.pinBR`).style.opacity = 1;
            }
        }
        
    }

}
cnvBox.style.zoom = txtZoom.children[0].innerText;
rngZoom.addEventListener('input', zoomMainCanvas); //resize canvas using rngzoom
rngZoom.addEventListener('input', function() {  //separate function for white txtzoom text color
    txtZoom.children[0].style.color = "white";
})

//================HOVER ON ZOOM=================
dropdownZoom.addEventListener('mouseover', function() {
    txtZoom.children[0].style.color = "white";
})

dropdownZoom.addEventListener('mouseleave', function() { 
    txtZoom.children[0].style.color = "#647499";
})

//================CUSTOM ZOOM====================
function zoomCustomCanvas() {

    let cnvPin = document.getElementById('cnvPin');
    let z = rngZoom.value / 100;

    cnvBox.style.zoom = txtZoom.children[0].innerText;
    txtZoom.children[0].style.color = "white";

    //reset the default scroll value if zoomed out
    canvasBorder.scrollLeft = (defLeftScroll / 100) * canvasBorder.scrollWidth;
    canvasBorder.scrollTop = (defTopScroll / 100) * canvasBorder.scrollHeight;
    
    //if else statement for cnvPin resizing
    if((cnvBox.clientHeight * z + 96) > canvasBorder.clientHeight) {
        cnvPin.style.height = cnvPinH + (canvasBorder.scrollHeight - cnvPinH)  + 'px'; 
        //for some reasons the height works when multiplied by 2
    }
    else {
        cnvPin.style.height = cnvPinH + 'px';
    }
    if((cnvBox.clientWidth * z + 96) > canvasBorder.clientWidth) {
        cnvPin.style.width = cnvPinW + (canvasBorder.scrollWidth - cnvPinW)  + 'px';
        //for some reasons the width works when multiplied by 2
    }
    else {
        cnvPin.style.width = cnvPinW + 'px';
    }

    adjustBorderZoom(); //readjust all selected borders

    //hide small pinbody
    for(var a = 0; a < pinBody.length; a++) {

        if (pinBody[a].clientWidth <= 11 || pinBody[a].clientHeight <= 11) {
            pinBody[a].querySelector(`.pinTL`).style.opacity = 0;
            pinBody[a].querySelector(`.pinTR`).style.opacity = 0;
            pinBody[a].querySelector(`.pinBL`).style.opacity = 0;
            pinBody[a].querySelector(`.pinBR`).style.opacity = 0;
        }

        else if (pinBody[a].clientWidth > 11 || pinBody[a].clientHeight > 11) {
            pinBody[a].querySelector(`.pinTL`).style.opacity = 1;
            pinBody[a].querySelector(`.pinTR`).style.opacity = 1;
            pinBody[a].querySelector(`.pinBL`).style.opacity = 1;
            pinBody[a].querySelector(`.pinBR`).style.opacity = 1;
        }
        
    }
}

//================CTRL + SCROLL TO ZOOM===========
window.addEventListener('wheel', function(e) {

    if(e.ctrlKey) {
        e.preventDefault();

        if(e.deltaY < 0) {
            rngZoom.value = Number(rngZoom.value) + 2;
            rangeZoomFormat();
            zoomMainCanvas();
        }
        else if(e.deltaY > 0) {
            rngZoom.value = Number(rngZoom.value) - 2;
            rangeZoomFormat();
            zoomMainCanvas();
            
        }
    }

    else if(e.altKey) {
        e.preventDefault();

        if(e.deltaY < 0) {
            rngZoom.value = Number(rngZoom.value) + 2;
            rangeZoomFormat();
            zoomCustomCanvas();
        }
        else if(e.deltaY > 0) {
            rngZoom.value = Number(rngZoom.value) - 2;
            rangeZoomFormat();
            zoomCustomCanvas();
            
        }
    }

    else {
        blurZoomMainCanvas();
    }

    txtZoom.children[0].style.color = "white";

}, {passive: false})

//================SIDE SCROLL ON ZOOM=============
function saveDefaultScroll() {

    defLeftScroll = (this.scrollLeft / this.scrollWidth) * 100;
    defTopScroll = (this.scrollTop / this.scrollHeight) * 100;

}
canvasBorder.addEventListener('scroll', saveDefaultScroll);

//===============OUT OF ZOOM======================

window.addEventListener('keyup', function(e) {
    if(e.key == "Control") {
        blurZoomMainCanvas();
    }
})
function blurZoomMainCanvas() {
    txtZoom.children[0].style.color = "#647499";
    var getPercent = Math.round((Number(rngZoom.value) / Number(rngZoom.max))*100);
    rngZoom.style.background = `linear-gradient(to right, #2E3646 ${getPercent-4}%, transparent ${4}%)`;
}
rngZoom.addEventListener('change', blurZoomMainCanvas); //resize canvas using rngzoom

//change zoom text and range via dropdown

function changeTextZoom() {
    rngZoom.value = Number(this.innerText.substr(0, this.innerText.length-1))
    rangeZoomFormat(); //change slider value too
    zoomMainCanvas();
}

//add event listener for all optZooms
var optZoom = document.querySelectorAll('.optZoom');
for(var a = 0; a < optZoom.length; a++) {
    optZoom[a].addEventListener('click', changeTextZoom);
}

//=============CHANGE COLOR OF ALL TEXTS===============
function changeTextColor() {
    
    let inputs = document.querySelectorAll('input');
    
    let testRng = 'rng';
    let testColor = 'Color';
    let testSearch = 'Search';

    inputs.forEach(function(input) {
 
        input.setAttribute('spellcheck', "false");
        input.setAttribute('data-gramm', "false");
        input.setAttribute('data-gramm_editor', "false");
        input.setAttribute('data-enable-grammarly', 'false');
        
        //ONLY APPLIES THESE NESTED CONDITIONS
        //IF TEXTBOX INPUT IS NOT TXT PANEL HEADER
       
            //SPECIAL CONDITION FOR TXTCOLORS
            if(input.className.includes(testColor)) {
                input.style.color = "white";
            }
            //SPECIAL CONDITION FOR RNGS
            else if(input.className.includes(testRng)) {
                input.addEventListener('input', function() {
                    input.nextElementSibling.style.color = "white";
                })

                input.addEventListener('change', function() {
                    input.nextElementSibling.style.color = "#647499";
                })
            }
            else if(input.className.includes(testSearch)) {
                input.style.color = "white";
            }
            else {
                
                input.style.color = "#647499";
                input.addEventListener('focus', function() {
                    input.style.color = "white";
                    highlight = true;
                    input.select();
                    
                })
                input.addEventListener('blur', function() {
                    input.style.color = "#647499";
                    highlight = false;
                })
            }

            //add blur on enter
            input.addEventListener('keydown', function(e) {
                if(e.key == "Enter") {
                    input.blur();
                }
            })
            
            input.addEventListener('focus', function() {
                input.select(); 
                highlight = true;
            })

            //resume caret selection
            input.addEventListener('click', function() {

                if(!highlight) {
                    if(input.type == "text") {
                        highlight = true;
                        input.setSelectionRange(input.selectionEnd, input.selectionEnd);
                    }
                    else {
                        highlight = true;
                    }
                }   
                else if(highlight) {

                    highlight = false;
                }
                            
            })

            //highlight on dblclick
            input.addEventListener('dblclick', function() {
                input.select();
                highlight = true;
            })
        
    })
}
changeTextColor();

//=============HIDE ALL DROPDOWN SELECTIONS=============

function hideAllOptions() { // hide all verti options
    let dropOptionLineStart = document.getElementsByClassName('dropOptionLineStart');
    let dropOptionLineEnd = document.getElementsByClassName('dropOptionLineEnd');
    let dropOptionVerti = document.getElementsByClassName('dropOptionVerti');
    let dropOptionHeader = document.getElementsByClassName('dropOptionHeader');

    for(var a = 0; a < dropOptionVerti.length; a++) {
        
        dropOptionVerti[a].style.display = "none";
    }

    for(var a = 0; a < dropOptionHeader.length; a++) {
        
        dropOptionHeader[a].style.display = "none";
    }

    for(var a = 0; a < dropOptionLineStart.length; a++) {
        
        dropOptionLineStart[a].style.display = "none";
    }

    for(var a = 0; a < dropOptionLineEnd.length; a++) {
        
        dropOptionLineEnd[a].style.display = "none";
    }

    document.querySelector('.dropOptionZoom').style.display = "none";
} 
hideAllOptions()

//===============VALIDATE THE HEX IN TEXTBOX============
function testHexCode(me) {

    var match = false;

    var hex = me.value.toUpperCase();

    var regex = /^#?([0-9A-Fa-f]{6})$/;

    if(!regex.test(hex)) {
        for(var a = 0; a < colorName.length; a++) {
            if(colorName[a].name == hex.replace(" ", "").toLowerCase()) {

                match = true;

                me.value = colorName[a].hex;

                me.nextElementSibling.style.backgroundColor = "#" + me.value;
    
            }
        }
    
        if(match == false) {
       
            me.value = "FFFFFF";

            if(me.nextElementSibling != null) {
                me.nextElementSibling.style.backgroundColor = "#" + me.value;
            }
        }
    }
    else {

        if(hex.substring(0,1) == '#') {
            me.value = hex.substr(1,7).toUpperCase();
        }
        else {
            me.value = hex.toUpperCase();
        }
    
        me.nextElementSibling.style.backgroundColor = "#" + me.value;
    }
}

//================DISABLE TAB ON ALL INPUT=============
function disableTab(e) {
    if(e.key == "Tab") {
        e.preventDefault();
    }
}
document.addEventListener('keydown', disableTab);

//================RENAMING PANEL HEADERS================
var renameDefault = "";
//function to rename txtHeader

function validateTxtHeader(e) {
    let regex = /^[A-Za-z0-9 ]$/;

    if(!regex.test(e.key) && !['Enter', 'Escape'].includes(e.key)) {
        e.preventDefault();
    }
}

function renameTxtHeader() {

    panel2Focus(this.closest('.pnlBoxLayer'));

    renameDefault = this.value;
    if(!highlight) this.select();
    this.style.border= "1px solid #647499";    
}

function blurTxtHeader() {
    this.blur();
    renameDefault = "";
}

function clickTxtHeader() {

    if(!highlight) {

        highlight = true;
        this.setSelectionRange(this.selectionEnd, this.selectionEnd);

    }   
    else {

        highlight = false;
    }
    
}

//function to  save header's name
function saveTxtHeader() {
    if(this.value == "") {
        this.value = renameDefault;
    }

    this.style.border= "1px solid transparent";
    this.blur();
}

//===============CHECKBOXES BUTTONS LISTENERS============

function chkBoxHover() {

    this.style.transition = ".2s";
    this.style.borderColor = "#647499";
    this.children[0].style.transition = ".2s";
    this.children[0].style.backgroundColor = "white";
        
}

function chkBoxLeave() {
    
    if(this.dataset.value == "false") {
        this.style.borderColor = "#3F4961";
        this.children[0].style.backgroundColor = "#647499";
    }
    
    else if(this.dataset.value == "true") {
        this.children[0].style.backgroundColor = "white";
    }
    
    this.addEventListener('mouseover', chkBoxHover)
}

function chkBoxClick() {

    leadFlip = this;
    
    if(leadFlip.dataset.value == "false") {
        
        leadFlip.dataset.value = "true";
        leadFlip.style.transition = ".2s";
        leadFlip.style.borderColor = "transparent";
        leadFlip.style.backgroundColor = "#6885CC";
        leadFlip.children[0].style.transition = ".2s";
        leadFlip.children[0].style.translate = "12px";
        leadFlip.children[0].style.backgroundColor = "white";
    }

    else if(this.dataset.value == "true") { 

        leadFlip.dataset.value = "false";
        leadFlip.style.transition = ".2s";
        leadFlip.style.borderColor = "#647499";
        leadFlip.style.backgroundColor = "transparent";
        leadFlip.children[0].style.transition = ".2s";
        leadFlip.children[0].style.translate = "0px";
        leadFlip.children[0].style.backgroundColor = "white";

        leadFlip.removeEventListener('mouseover', chkBoxHover);
    }

}
document.querySelectorAll('[class*=chk]').forEach(chk => {
    if(chk.className != 'chkSwitch') {
        chk.addEventListener('click', chkBoxClick);;
        chk.addEventListener('pointerover', chkBoxHover);
        chk.addEventListener('pointerleave', chkBoxLeave);
    }
})


function chkBoxFormat(leadFlip) {
    
    if(leadFlip.dataset.value == "false") {

        leadFlip.style.transition = "0s";
        leadFlip.style.backgroundColor = "transparent";
        leadFlip.children[0].style.transition = "0s";
        leadFlip.children[0].style.translate = "0px";
        leadFlip.style.borderColor = "#3F4961";
        leadFlip.children[0].style.backgroundColor = "#647499";
        
    }

    else if(leadFlip.dataset.value == "true") { 

        leadFlip.style.transition = "0s";
        leadFlip.style.borderColor = "transparent";
        leadFlip.style.backgroundColor = "#6885CC";
        leadFlip.children[0].style.transition = "0s";
        leadFlip.children[0].style.translate = "12px";
        leadFlip.children[0].style.backgroundColor = "white";

        leadFlip.removeEventListener('mouseover', chkBoxHover);
    }
    
}

//===============DROPDOWN FORMATTING====================

function dropdownFormat(pnlBox, i, val) {

    let dropdown = pnlBox.getElementsByClassName('dropdown')[i].dataset.default;
    let dropOptionVerti = pnlBox.getElementsByClassName('dropdown')[i].nextElementSibling;
    let z = 0;

    //console.clear()
    //console.log(dropdown, i, val)

    for(let a = 0; a < dropOptionVerti.childElementCount; a++) {
        if(dropOptionVerti.children[a].innerText == val) {

            dropOptionVerti.children[a].click();
            z++;
            break;
        }
    }

    //if z == 0 means nothing matched
    //then just click the last option child
    if(z == 0) {
        for(let a = 0; a < dropOptionVerti.childElementCount; a++) {
            if(dropOptionVerti.children[a].innerText == dropdown) {
    
                dropOptionVerti.children[a].click();
                break;
            }
        }
    }
    
}

//===============PANEL BOTTOM BUTTONS LISTENERS==========
function btnBottomClick(){

    //don't change to 'this.closer' because it needs closer 'pattern' and closer 'layer'
    for(var b = 0; b < this.parentElement.parentElement.childElementCount; b++) {
        this.parentElement.parentElement.children[b].children[0].children[0].style.filter = "none";
    }
    this.children[0].style.filter = "saturate(0) brightness(2)";
}

function btnBottomHover() {
    if(this.children[0].style.filter != "saturate(0) brightness(2)") {
        this.children[0].style.filter = "saturate(1) brightness(1.5)";
    }
}

function btnBottomLeave() {
    if(this.children[0].style.filter != "saturate(0) brightness(2)") {
        this.children[0].style.filter = "none";
    }
}

//===============TEXT PANEL BUTTONS LISTENERS==========
function btnOptionClick(){
    
    //don't change to 'this.closer' because it needs closer 'pattern' and closer 'layer'
  
    for(var b = 0; b < this.parentElement.childElementCount; b++) {
        this.parentElement.children[b].children[0].style.filter = "none";
    }
    this.children[0].style.filter = "saturate(0) brightness(2)";
}

function btnOptionHover() {
    if(this.children[0].style.filter != "saturate(0) brightness(2)") {
        this.children[0].style.filter = "saturate(1) brightness(1.5)";
    }
}

function btnOptionLeave() {
    if(this.children[0].style.filter != "saturate(0) brightness(2)") {
        this.children[0].style.filter = "none";
    }
}

//===============TEXT PANEL BUTTONS TEXT LISTENERS==========

function btnTextClick(){

    //don't change to 'this.closer' because it needs closer 'pattern' and closer 'layer'
    for(var b = 0; b < this.parentElement.childElementCount; b++) {
       
        this.parentElement.children[b].children[0].style.color = "#647499";
    }

    this.children[0].style.color = "white";
}

function btnTextHover() {
    if(this.children[0].style.color != "white") {
        this.children[0].style.color = "#9DAFDB";
    }
}

function btnTextLeave() {
    if(this.children[0].style.color != "#647499" && this.children[0].style.color != "white") {
        this.children[0].style.color = "#647499";
    }
}

//===============LINK TEXTBOXES TO RANGE================

function linkRangeToTextbox() {

    for(var a = 0; a < document.getElementsByClassName('rngInput').length; a++) {
        document.getElementsByClassName('rngInput')[a].addEventListener('input', adjustRangeToTextbox);
    }

}
linkRangeToTextbox();

function adjustRangeToTextbox() {
    this.nextElementSibling.value = this.value;
}

function validateTextboxToRange() {
    this.value = Math.round(Number(this.value));

    var max = Number(this.max);
    var min = Number(this.min);
    var me = Number(this.value);

    if(me > max && max != 0) {
        this.value = max;
        this.previousElementSibling.value = max;
    }
    else if(me < min) {

        this.value = min;
        this.previousElementSibling.value = min;
    }
    
    else {
        this.value = me;
        this.previousElementSibling.value = me;
    }

}

function enterTextbox(e) {
    if(e.key === "Enter") {
        this.blur();
        
        this.value = Math.round(Number(this.value));

        var max = Number(this.max);
        var min = Number(this.min);
        var me = Number(this.value);

        if(me > max && max != 0) {
            me = max;
            this.previousElementSibling.value = max;
        }
        else if(me < min && min != 0) {
            me = min;
            this.previousElementSibling.value = min;
        }
        else {

            this.previousElementSibling.value = me;
        }
    }
}

function linkTextboxToRange() {

    var inputs = document.querySelector('#propertiesBox').querySelectorAll('input[type="number"]');
    inputs.forEach(function(input) {

        input.addEventListener('change', validateTextboxToRange);
        //input.addEventListener('focus', selectAll);
        input.addEventListener('focusout', validateTextboxToRange);
        input.addEventListener('keydown', enterTextbox);
    })

    var inputs = document.querySelector('#propertiesBox').querySelectorAll('input[type="text"]');
    inputs.forEach(function(input) {

        //input.addEventListener('focus', selectAll);
    })
}
linkTextboxToRange();

function autoIncrementHeader(name) {

    let txtHeader = document.getElementsByClassName('txtHeader');

    var counter = 1;
    var arrName = null;

    for(var a = 0; a < txtHeader.length; a++) {
        arrName = txtHeader[a].value.split(" ");
        if(arrName[0] == name) {
            if(Number(arrName[1]) >= counter ) {
                counter = Number(arrName[1]) + 1;
            }
        }
    }
    
    return newHeader = name + " " + counter;
}

//////////////////////FUNCTIONS ABOUT FOCUS//////////////////////

function thumb2Focus(thumb) {

    let n = thumb.dataset.thumbno;
    focusPanel[n] = thumb;
    focusPanel[n].style.borderColor = "#647499";
    focusPanel[n].style.borderWidth = "1px"; //highlight
    //focusPanel[n].children[0].style.filter = "saturate(.7) blur(.2px)";
}

function thumbUnfocus(thumb) {
    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');

    for(let a = 0; a < pnlBoxThumb.length; a++) {
        if(focusPanel[a] == thumb) {
            focusPanel[a].style.borderColor = "transparent";
            focusPanel[a].style.backgroundColor = "transparent";
            focusPanel[a].style.borderWidth = "1px";
            //focusPanel[a].children[0].style.filter = "saturate(.5) brightness(60%) blur(.2px)";
            focusPanel[a] = null;
        }
    }
}

function thumbResetAll() {

    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');

    for(let a = 0; a < pnlBoxThumb.length; a++) {
        
        if(pnlBoxThumb[a] != null) {

            pnlBoxThumb[a].style.borderColor = "transparent";
            pnlBoxThumb[a].style.backgroundColor = "transparent";
            pnlBoxThumb[a].style.borderWidth = "1px";
            pnlBoxThumb[a].children[0].style.filter = "saturate(.7) blur(.2px)";
            focusPanel[a] = null;
        }
    }
}

function thumbs2Blur() {
    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');

    for(let a = 0; a < pnlBoxThumb.length; a++) {
        if(pnlBoxThumb[a] != null) {
            pnlBoxThumb[a].style.borderColor = "transparent";
            pnlBoxThumb[a].style.borderWidth = "1px";
            //pnlBoxThumb[a].children[0].style.filter = "saturate(.5) brightness(60%) blur(.2px)";
            focusPanel[a] = null;
        }
    }
}

function n2Thumb(n) {
    let configScroll = document.getElementsByClassName('configScroll');

    let thumb = configScroll[2].querySelector(`[data-thumbno="${n}"]`);
    return thumb;
}

function f2Canvas(f) {
    let cnvGrpLayers = document.getElementById('cnvGrpLayers');

    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
    return canvas;
}

function f2Panel(f) {
    let configScroll = document.getElementsByClassName('configScroll');

    let panel = configScroll[5].querySelector(`[data-ref="${f}"]`);
    return panel;
}

function f2PinBody(f) {
    let cnvPin = document.getElementById('cnvPin');

    let pin = cnvPin.querySelector(`[data-ref="${f}"]`);
    return pin;
}

function panel2Focus(panel) {

    let f = panel.dataset.ref;
    let pin = cnvPin.querySelector(`[data-ref="${f}"]`);
    focusPanel[f] = panel;
    focusPanel[f].style.borderColor = "#6885CC";
    //focusPanel[f].querySelector('.iconLayer').style.backgroundColor = "#6885CC";
    
    leadPanel = focusPanel[f];
    leadDrag = pin;
    if(panel.dataset.type != "pattern") {
        focusObj[f] = f2Canvas(f);

        if(pin != null) {
            let divs = pin.querySelectorAll('div');

            divs.forEach(function(div) {
                div.style.visibility = "visible";
            })

            chooseLeadDrag(pin);
        }
        
    }

    swapPanels(panel.dataset.type);
}

function canvas2Focus(canvas) {

    let configScroll = document.getElementsByClassName('configScroll');

    let f = canvas.dataset.ref;
    let panel = configScroll[5].querySelector(`[data-ref="${f}"]`);
    let pin = cnvPin.querySelector(`[data-ref="${f}"]`);
    focusPanel[f] = panel;
    focusPanel[f].style.borderColor = "#6885CC";
    
    leadPanel = focusPanel[f];
    leadDrag = pin;

    focusObj[f] = canvas;

    if(pin != null) {
        let divs = pin.querySelectorAll('div');
        divs.forEach(function(div) {
            div.style.visibility = "visible";
        })

        chooseLeadDrag(pin);
    }

    swapPanels(canvas.dataset.type);
}

function panelUnfocus(panel) {

    let f = panel.dataset.ref;

    focusPanel[f].style.borderColor = "#3F4961";
    //focusPanel[f].querySelector('.iconLayer').style.backgroundColor = "transparent";

    focusPanel[f] = null;
                
    if(panel.dataset.type != "pattern") {

        focusObj[f] = null;

        let divs = f2PinBody(f).querySelectorAll('div');

        divs.forEach(function(div) {
            div.style.visibility = "hidden";
        })

    }
                
}

function panelUnfocusAll() {

    for(let a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null) {
            let f = focusPanel[a].dataset.ref;
        
            if(f2PinBody(f) != null) {
                let divs = f2PinBody(f).querySelectorAll('div');

                divs.forEach(function(div) {
                    div.style.visibility = "hidden";
                })
            }
            
            focusObj[a] = null;
            focusPanel[a].style.borderColor = "#3F4961";
            //focusPanel[a].querySelector('.iconLayer').style.backgroundColor = "transparent";
            focusPanel[a] = null;
        }
    }
}

function canvasUnfocus(f) {

    focusObj[f] = null;
    let divs = f2PinBody(f).querySelectorAll('div');

    divs.forEach(div => {
        div.style.visibility = "hidden";
    })

    if(focusPanel[f] != null) {
        focusPanel[f].style.borderColor = "#3F4961";
        focusPanel[f] = null;
    }

}

function canvasUnfocusAll() {

    for(let a = 0; a < focusObj.length; a++) {

        if(focusObj[a] != null) {
            let f = focusObj[a].dataset.ref;
            focusObj[a] = null;

            if(f2PinBody(f) != null) {
                let divs = f2PinBody(f).querySelectorAll('div');

                divs.forEach(function(div) {
                    div.style.visibility = "hidden";
                })
            }
            
            focusPanel[a].style.borderColor = "#3F4961";
            focusPanel[a] = null;
        }
    }
}

function checkObjFocusCount() {
    let b = 0;

    for(let a = 0; a < focusObj.length; a++) {
        if(focusObj[a] != null) {
            b++;
        }
    }
    return b;
}

function checkPanelFocusCount() {
    let b = 0;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            b++;
        }
    }
    return b;
}

function checkFocus(panel) {
    
    let val = [];
    val[0] = false;
    val[1] = 0;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            if(focusPanel[a] == panel) {
                val[0] = true;
                val[1] = a;
                break;
            }
        }
    }
    return val;
}

function checkPanelPosition(panel) {
    
    let post = 0;
    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer')

    for(let a = 0; a < pnlBoxLayer.length; a++) {
        
        if(pnlBoxLayer[a] == panel) {
            post = a;
            break;
        }
        
    }

    return post;
}

function checkMultiSelect() {
    
    let b = 0;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            b++;
        }
    }
    
    if(b > 1) { 
        multiSelect = true
    } 
    else {
        multiSelect = false;
    }
}

//////////////////////FUNCTIONS ABOUT DATA////////////////
function removeData(data, f) {
    for(let a = 0; a < data.length; a++) {
        if(data[a] != null) {
            if(data[a].includes(`ref: ${f}`)) {
                data[a] = null;
            }
        }
    }
}

//===============PREVENT DROP ON DOCUMENTS==============
function stopDragDrop(e) {
    e.preventDefault();
    e.stopPropagation();
}

document.addEventListener('drop', stopDragDrop);
document.addEventListener('dragover', stopDragDrop);
document.addEventListener('dragenter', stopDragDrop);
