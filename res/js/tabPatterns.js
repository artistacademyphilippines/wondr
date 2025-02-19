
var dataPattern = [];
var cnvPatterns = [];
var boxSize = 60;

////////////////////////////////////SHOW ALL FILLERS/////////////////////////////
showFillers(document.getElementsByClassName('configScroll')[1]);

////////////////////////////////////SHOW DEFAULT PATTERNS/////////////////////////////

resetContentPreview(document.getElementsByClassName('configScroll')[1], 'patterns')

////////////////////////////////////SEARCHING FOR PATTERN//////////////////////////

//INPUT

menuPatterns.querySelector('.txtSearch').addEventListener('input', function() {

    if(this.value.trim().length >= 3) {
        
        searchSuggestions(this, this.value);
    }
    else {

        this.parentElement.nextElementSibling.style.display = "none";
    }

    if(this.value.trim().length == 0) {
        menuPatterns.querySelector('.btnDelSearch').style.visibility = "hidden";
        resetPreviewOrCategory.call(this)
    }
    else {
        menuPatterns.querySelector('.btnDelSearch').style.visibility = "visible";
    }
})

//ENTER OR CHANGE EVENT
menuPatterns.querySelector('.txtSearch').addEventListener('keydown', function(e) {
    if(e.key == 'Enter') {
        e.preventDefault();
        this.click();
        searchPreviewOrCategory.call(this)
    }
})

////////////////////////////////////DELETE SEARCH PATTERN/////////////////////////
menuPatterns.querySelector('.btnDelSearch').addEventListener('click', function() {
    this.style.visibility = "hidden";
    this.previousElementSibling.value = "";
    this.dispatchEvent(new Event('change'));
})

///////////////////////////////////////////////////////////////////////////////////
function createPnlBoxPattern(id , src) {

    //reset txtSearch value
    menuPatterns.querySelector('.txtSearch').value = "";
    menuPatterns.querySelector('.btnDelSearch').style.visibility = "hidden";

    let f = maxF; //get the length of pnlBoxPatterns and use it as layer count
    maxF++;
    let name = autoIncrementHeader(id);
    let configScroll = document.getElementsByClassName('configScroll');

    var newPattern = 
    `<div class="pnlBoxLayer" data-type="pattern" data-pattern=${id} data-ref=${f}>
        <div class="pnlTitleLayer" style="height: 40px;">
            <div class="iconLayer">
                <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.0607 3.06066C11.6464 2.47487 11.6464 1.52513 11.0607 0.93934C10.4749 0.353553 9.52513 0.353553 8.93934 0.93934L4.93934 4.93934C4.35355 5.52513 4.35355 6.47487 4.93934 7.06066C5.52513 7.64645 6.47487 7.64645 7.06066 7.06066L11.0607 3.06066Z" fill="white"/>
                    <path d="M5.06066 16.0607L10.0607 11.0607C10.6464 10.4749 10.6464 9.52513 10.0607 8.93934C9.47487 8.35355 8.52513 8.35355 7.93934 8.93934L2.93934 13.9393C2.35355 14.5251 2.35355 15.4749 2.93934 16.0607C3.52513 16.6464 4.47487 16.6464 5.06066 16.0607Z" fill="white"/>
                    <path d="M18.0607 0.93934C18.6464 1.52513 18.6464 2.47487 18.0607 3.06066L16.0607 5.06066C15.4749 5.64645 14.5251 5.64645 13.9393 5.06066C13.3536 4.47487 13.3536 3.52513 13.9393 2.93934L15.9393 0.93934C16.5251 0.353553 17.4749 0.353553 18.0607 0.93934Z" fill="white"/>
                    <path d="M21.0607 7.06066C21.6464 6.47487 21.6464 5.52513 21.0607 4.93934C20.4749 4.35355 19.5251 4.35355 18.9393 4.93934L12.9393 10.9393C12.3536 11.5251 12.3536 12.4749 12.9393 13.0607C13.5251 13.6464 14.4749 13.6464 15.0607 13.0607L21.0607 7.06066Z" fill="white"/>
                    <path d="M23.5607 9.93934C24.1464 10.5251 24.1464 11.4749 23.5607 12.0607L17.0607 18.5607C16.4749 19.1464 15.5251 19.1464 14.9393 18.5607C14.3536 17.9749 14.3536 17.0251 14.9393 16.4393L21.4393 9.93934C22.0251 9.35355 22.9749 9.35355 23.5607 9.93934Z" fill="white"/>
                    <path d="M23.7071 17.7071C24.0976 17.3166 24.0976 16.6834 23.7071 16.2929C23.3166 15.9024 22.6834 15.9024 22.2929 16.2929L21.2929 17.2929C20.9024 17.6834 20.9024 18.3166 21.2929 18.7071C21.6834 19.0976 22.3166 19.0976 22.7071 18.7071L23.7071 17.7071Z" fill="white"/>
                    <path d="M9.06066 16.9393C9.64645 17.5251 9.64645 18.4749 9.06066 19.0607L6.56066 21.5607C5.97487 22.1464 5.02513 22.1464 4.43934 21.5607C3.85355 20.9749 3.85355 20.0251 4.43934 19.4393L6.93934 16.9393C7.52513 16.3536 8.47487 16.3536 9.06066 16.9393Z" fill="white"/>
                    <path d="M3 10C3.55228 10 4 9.55229 4 9C4 8.44772 3.55228 8 3 8C2.44772 8 2 8.44772 2 9C2 9.55229 2.44772 10 3 10Z" fill="white"/>
                    <path d="M2.19995 17.5C2.19995 18.0523 1.75224 18.5 1.19995 18.5C0.647666 18.5 0.199951 18.0523 0.199951 17.5C0.199951 16.9477 0.647666 16.5 1.19995 16.5C1.75224 16.5 2.19995 16.9477 2.19995 17.5Z" fill="white"/>
                    <path d="M25 9.5C25.5523 9.5 26 9.05229 26 8.5C26 7.94772 25.5523 7.5 25 7.5C24.4477 7.5 24 7.94772 24 8.5C24 9.05229 24.4477 9.5 25 9.5Z" fill="white"/>
                    <path d="M13.5 7C13.5 7.82843 12.8284 8.5 12 8.5C11.1716 8.5 10.5 7.82843 10.5 7C10.5 6.17157 11.1716 5.5 12 5.5C12.8284 5.5 13.5 6.17157 13.5 7Z" fill="white"/>
                    <path d="M22.5 5C23.3284 5 24 4.32843 24 3.5C24 2.67157 23.3284 2 22.5 2C21.6716 2 21 2.67157 21 3.5C21 4.32843 21.6716 5 22.5 5Z" fill="white"/>
                    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="white"/>
                    <path d="M5 2.5C5 3.32843 4.32843 4 3.5 4C2.67157 4 2 3.32843 2 2.5C2 1.67157 2.67157 1 3.5 1C4.32843 1 5 1.67157 5 2.5Z" fill="white"/>
                    <path d="M11 16.5C11.8284 16.5 12.5 15.8284 12.5 15C12.5 14.1716 11.8284 13.5 11 13.5C10.1716 13.5 9.5 14.1716 9.5 15C9.5 15.8284 10.1716 16.5 11 16.5Z" fill="white"/>
                    <path d="M15 20.5C15 21.3284 14.3284 22 13.5 22C12.6716 22 12 21.3284 12 20.5C12 19.6716 12.6716 19 13.5 19C14.3284 19 15 19.6716 15 20.5Z" fill="white"/>
                </svg>
            </div>
            <input type="text" class="txtHeader" value="${name}" >
            <div class="btnShowHide" data-show = "visible">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.00014 2.71429C5.57998 2.71429 4.42871 3.86555 4.42871 5.28572C4.42871 6.70588 5.57998 7.85714 7.00014 7.85714C8.4203 7.85714 9.57157 6.70588 9.57157 5.28572C9.57157 3.86555 8.4203 2.71429 7.00014 2.71429Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9119 4.87535C12.4818 1.69741 9.79075 1.19209e-07 7 0C4.20925 -1.78814e-07 1.51815 1.69741 0.0880784 4.87535C-0.0293595 5.13632 -0.0293595 5.43511 0.0880784 5.69608C1.51815 8.87402 4.20925 10.5714 7 10.5714C9.79075 10.5714 12.4818 8.87401 13.9119 5.69608C14.0294 5.4351 14.0294 5.13632 13.9119 4.87535ZM7 8.57143C5.18342 8.57143 3.27797 7.53709 2.11033 5.28572C3.27797 3.03434 5.18342 2 7 2C8.81657 2 10.722 3.03434 11.8897 5.28571C10.722 7.53708 8.81657 8.57143 7 8.57143Z" fill="white"/>
                </svg>
            </div>
        </div>

    </div>
    
    `;

    let temp = document.createElement('div')
    temp.innerHTML = newPattern;

    configScroll[5].prepend(temp.children[0]);

    configScroll[5].querySelector('.txtHeader').addEventListener('dblclick', renameTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('keypress', validateTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('click', clickTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('focusout', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', encodeTxtHeader);

    //add the show and hide control
    configScroll[5].querySelector('.btnShowHide').addEventListener('click', showHideLayers);

    addPnlBoxPattern(f, name, id, src);

}

function addPnlBoxPattern(f, name, id, src) { 

    dataPattern[f] = '\n*';
    dataPattern[f] += `\nref: ${f}`;
    dataPattern[f] += `\npnlBoxPattern: ${name}`;
    dataPattern[f] += `\nid: ${id}`;
    dataPattern[f] += `\nshow: visible`;
    dataPattern[f] += `\nlock: false`;
    dataPattern[f] += `\ndropdown 0: Normal`;
    dataPattern[f] += `\ntxtColorPattern: 949EFF`;
    dataPattern[f] += `\ntxtOpacityPattern: 100`;
    dataPattern[f] += `\ntxtXPattern: 0`;
    dataPattern[f] += `\ntxtYPattern: 0`;
    dataPattern[f] += `\ntxtSizePattern: 3`;
    dataPattern[f] += `\ntxtSpacingPattern: 0`;
    dataPattern[f] += `\ntxtRandomSpinPattern: 0`;
    dataPattern[f] += `\nchkRandomSeed: false`;
    
    createCanvasPattern(f, src);

    createHistory(f, name, 'pattern', id);
}

//create pattern layer
function createCanvasPattern(f, src) {

    cnvPatterns[f] = document.createElement('div');
    cnvPatterns[f].classList.add('cnvPatterns');
    cnvPatterns[f].dataset.ref = f;
    cnvPatterns[f].dataset.type = "pattern";
    cnvPatterns[f].style.width = "100%";
    cnvPatterns[f].style.height = "100%";
    cnvPatterns[f].style.display = "grid";
    cnvPatterns[f].style.gridTemplateColumns = "repeat(10, 10px)";
    cnvPatterns[f].style.gridGap = '0%';
    cnvPatterns[f].style.flexWrap = "wrap";
    cnvPatterns[f].style.position = "absolute";
    cnvPatterns[f].style.visibility = "visible";
    cnvPatterns[f].style.backgroundColor = "transparent"
    
    //after creating the main pattern layer, render the tiles
    renderPattern(f, src);
}

function renderPattern(f, src) {

    let txtColorPattern = valueFinder(dataPattern[f], "txtColorPattern");
    let txtXPattern = valueFinder(dataPattern[f], "txtXPattern");
    let txtYPattern = valueFinder(dataPattern[f], "txtYPattern");
    let txtSizePattern = valueFinder(dataPattern[f], "txtSizePattern");
    let txtSpacingPattern = valueFinder(dataPattern[f], "txtSpacingPattern");
    let txtRandomSpinPattern = valueFinder(dataPattern[f], "txtRandomSpinPattern");
    let chkRandomSeed = valueFinder(dataPattern[f], "chkRandomSeed");
    let txtSizeWidth = document.getElementById('pnlBoxCanvas').querySelector('.txtSizeWidth');
    let txtSizeHeight = document.getElementById('pnlBoxCanvas').querySelector('.txtSizeHeight');
    let cnvGrpLayers = document.getElementById('cnvGrpLayers');

    cnvPatterns[f].innerHTML = "";

    var numBoxesX = Math.ceil(txtSizeWidth.value / boxSize) ;
    var numBoxesY = Math.ceil(txtSizeHeight.value / boxSize);

    var numBoxesTotal = numBoxesX * numBoxesY;

    //var convertPatternSize = ((getPatternSize.value * 10) + 30) * .7; //plus 30 to start at 30% then multiply by .7 since it's the 1% of the remaining 70%
    var convertPatternSize = txtSizePattern * 10; //plus 30 to start at 30% then multiply by .7 since it's the 1% of the remaining 70%

    //adjust the spacing/gap of each boxes
    cnvPatterns[f].style.gridGap = `${txtSpacingPattern*boxSize}px`;

    //adjust the position of each boxes
    cnvPatterns[f].style.gridTemplateColumns = `repeat(${numBoxesX}, ${boxSize}px)`;

    //adjust the position of the entire layer
    cnvPatterns[f].style.left = `${txtXPattern*boxSize}px`;
    cnvPatterns[f].style.top = `${txtYPattern*boxSize}px`;

    //create the box container of this SVG
    let box = [];
    let getSVG = document.createElement('div');
    getSVG.innerHTML = src;

    getSVG.firstChild.querySelectorAll('*').forEach((path) => {
        if(path.getAttribute('fill') != null) {
            path.setAttribute('fill', '#' + txtColorPattern);
        }
        if(path.getAttribute('stroke-color') != null) {
            path.setAttribute('stroke-color', '#' + txtColorPattern);
        }
        
    })


    //get SVG from library-----------------------------------------
    
    for(let b = 0; b < numBoxesTotal; b++) { //start creating individial pattern
        box[b] = document.createElement('div');
        box[b].style.width = boxSize + "px"; //width from txtSizeWidth *percent as px
        box[b].style.height = boxSize + "px"; //height is the same as width in px
        box[b].style.display = "flex";
        box[b].classList.add('boxesPattern');

        //append the SVG xml string inside the box
        box[b].innerHTML = getSVG.firstChild.outerHTML;

        //change the svg properties inside the box
        box[b].children[0].style.margin = "auto";
        box[b].children[0].style.width = `${convertPatternSize}%`;
        box[b].children[0].style.height = "auto";

        cnvPatterns[f].appendChild(box[b]);
    }

    //check if random spin is true
    //can be from redoCreate function
    if(Number(txtRandomSpinPattern) > 0) {
        randomSpin();
    }

    //check if random seed is true
    //can be from redoCreate function
    if(chkRandomSeed == "true") {
        patternSeeder(f, leadPanel);
    }

    //adjust max and min hori and verti of the layer based on the canvas size
    resetPatternMinMax();

    //insert before cnvLayers if there's any
    cnvGrpLayers.appendChild(cnvPatterns[f]);

    let configScroll = document.getElementsByClassName('configScroll');
    configScroll[5].children[0].click();

}

function patternSeeder(f) {
    let panel = document.getElementById('pnlBoxPattern');
    let txtSizeWidth = document.getElementById('pnlBoxCanvas').querySelector('.txtSizeWidth');
    var numBoxesX = Math.ceil(txtSizeWidth.value / boxSize) ;
    var boxesPattern = f2Canvas(f).getElementsByClassName('boxesPattern');
    var maxSize = panel.querySelector('.txtSizePattern').value
    var mySize;

    for(var a = 0; a < boxesPattern.length; a++) {

        if(a == 0) {

            mySize = Math.floor(Math.random() * Number(maxSize)) + 1
            boxesPattern[a].children[0].style.width = mySize * 10 + '%';
            boxesPattern[a].children[0].style.height = 'auto';

        }

        else if(a > 0) {

            if(maxSize >= 3) {

                var sizeCheck = [];

                //check first if top box exist
                if(boxesPattern[a-numBoxesX] != null || !isNaN(boxesPattern[a-numBoxesX])) {
                    sizeCheck[0] = Number(boxesPattern[a-numBoxesX].children[0].style.width.replace('%', '')) / 10;
                }
                
                //check if right box exist
                if(boxesPattern[a-1] != null || !isNaN(boxesPattern[a-1])) {
                    sizeCheck[1] = Number(boxesPattern[a-1].children[0].style.width.replace('%', '')) / 10;
                }
                
                while (mySize == sizeCheck[0] && sizeCheck[0] != null && mySize != (sizeCheck[0] - 3) && mySize != (sizeCheck[0] + 3) || mySize == sizeCheck[1] && sizeCheck[1] != null && mySize != (sizeCheck[1] - 3) && mySize != (sizeCheck[1] + 3)) {
                    
                    mySize = Math.floor(Math.random() * Number(maxSize)) + 1

                    if(mySize > 5) {

                        var newMax = mySize;

                        mySize = Math.floor(Math.random() * Number(100)) + 1
                        if(mySize > 98) {
                            mySize = newMax;
                        }
                        else if(mySize > 95 && mySize <= 98) {
                            mySize = newMax - 1;
                        }
                        else if(mySize > 90 && mySize <= 95) {
                            mySize = newMax - 2;
                        }
                        else if(mySize > 80 && mySize <= 90) {
                            mySize = newMax - 3;
                        }
                        else if(mySize <= 80) {
                            mySize = newMax - 4;
                        }

                    }
                    
                }

                boxesPattern[a].children[0].style.width = mySize * 10 + '%';
                boxesPattern[a].children[0].style.height = 'auto';
            }
            else if(maxSize == 2) {
                
                mySize = Math.floor(Math.random() * Number(maxSize)) + 1

                boxesPattern[a].children[0].style.width = mySize * 10 + '%';
                boxesPattern[a].children[0].style.height = 'auto';
            
            }

            else if(maxSize == 1) {
                boxesPattern[a].children[0].style.width = maxSize * 10 + '%';
                boxesPattern[a].children[0].style.height = 'auto';
            }

        }

    }
}

//================================PANEL CONTROLS==========================


//function for choosing color
function chooseBlend() {
    
    /* THIS IS FOR SINGLE CANVAS ONLY
    let f = Number(leadPanel.dataset.ref)
    let pnlBoxPattern = document.getElementById('pnlBoxPattern');

    pnlBoxPattern.querySelectorAll('.dropdown')[0].children[0].innerText = this.innerText;

    f2Canvas(f).style.mixBlendMode = this.innerText;
    */

    let pnlBoxPattern = document.getElementById('pnlBoxPattern');
    pnlBoxPattern.querySelectorAll('.dropdown')[0].children[0].innerText = this.innerText;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "pattern") {
                
                canvas.style.mixBlendMode = this.innerText;
            }
        }
    }
}
//assign dropOptionVerti selection for blend mode
for(var a = 0; a < document.querySelectorAll('.optPatternBlend').length; a++) {
    document.querySelectorAll('.optPatternBlend')[a].addEventListener('click', chooseBlend);
}

function choosePatternColor() {

    //validate hex format
    testHexCode(this);

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "pattern") {
                
                let boxesPattern = canvas.getElementsByClassName('boxesPattern');
                //get the path tags of the SVG and manually override it
                for(let a = 0; a < boxesPattern.length; a++) {

                    for(var b = 0; b < boxesPattern[a].firstChild.childElementCount; b++) {

                        //console.log(boxesPattern[a].firstChild.children[b])
                        if(boxesPattern[a].firstChild.children[b].getAttribute('fill') != null) {
                            boxesPattern[a].firstChild.children[b].setAttribute('fill', '#' + this.value);
                        }
                        if(boxesPattern[a].firstChild.children[b].getAttribute('stroke-color') != null) {
                            boxesPattern[a].firstChild.children[b].setAttribute('stroke-color', '#' + this.value);
                        }   
                    }
                }
            }
        }
    }

}
document.querySelector('#pnlBoxPattern').querySelector('.txtColorPattern').addEventListener('change', choosePatternColor);
document.querySelector('#pnlBoxPattern').querySelector('.txtColorPattern').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function chooseOpacity() {

    let o = Number(this.value)/100;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "pattern") {
                
                canvas.style.opacity = o;
            }
        }
    }
}
document.querySelector('#pnlBoxPattern').querySelector('.txtOpacityPattern').addEventListener('change', chooseOpacity);
document.querySelector('#pnlBoxPattern').querySelector('.txtOpacityPattern').previousElementSibling.addEventListener('input', chooseOpacity);

function adjustX() {

    let txtSizeWidth = document.getElementById('pnlBoxCanvas').querySelector('.txtSizeWidth');
    let numBoxesX = Math.ceil(txtSizeWidth.value / boxSize);
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)
            let boxesPattern = canvas.querySelectorAll('.boxesPattern');

            if(type == "pattern") {
                let i = 0;

                //if X value is less than 0
                if(Number(this.value) < 0) {
                    let minX =  Number(this.value);

                    for(let b = 0; b < boxesPattern.length; b++) {
                        i++;

                        boxesPattern[b].children[0].style.display = "block";
                
                    
                        if(i % numBoxesX == 0) { 

                            for(let c = b; c > b + minX; c--) {
                                boxesPattern[c].children[0].style.display = "none";
                            }
                        }

                    }
                    
                }
                //if X value is greater than 0
                else if(Number(this.value) > 0) {
                    let maxX =  Number(this.value);

                    for(let b = 0; b < boxesPattern.length; b++) {
                        boxesPattern[b].children[0].style.display = "block";
                    }

                    for(let b = 0; b < boxesPattern.length; b++) {
                        i++;
                        
                        if(i % numBoxesX == 1) { 

                            for(let c = b; c < b + maxX; c++) {
                                boxesPattern[c].children[0].style.display = "none";
                            }
                        }
                    }
                }

                else if(Number(this.value) == 0) { 
                    for(let b = 0; b < boxesPattern.length; b++) {
                        boxesPattern[b].children[0].style.display = "block";
                    }
                }
            }
        }
    }
    
}
document.querySelector('#pnlBoxPattern').querySelector('.txtXPattern').addEventListener('change', adjustX);
document.querySelector('#pnlBoxPattern').querySelector('.txtXPattern').previousElementSibling.addEventListener('input', adjustX);

function adjustY() {

    let txtSizeWidth = document.getElementById('pnlBoxCanvas').querySelector('.txtSizeWidth');
    let numBoxesX = Math.ceil(txtSizeWidth.value / boxSize);

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)
            let boxesPattern = canvas.querySelectorAll('.boxesPattern');

            if(type == "pattern") {

                if(Number(this.value) < 0) {

                    let minX = boxesPattern.length + (numBoxesX * Number(this.value));
                    
                    for(let b = 0; b < boxesPattern.length; b++) {
                        //i++;
                        boxesPattern[b].children[0].style.display = "block";
                    }

                    for(let b = minX; b < boxesPattern.length; b++) {
                        boxesPattern[b].children[0].style.display = "none";
                    }
                    
                }

                else if(Number(this.value) > 0) {

                    let maxX = (numBoxesX * Number(this.value));
                    
                    for(let b = 0; b < boxesPattern.length; b++) {
                        //i++;
                        boxesPattern[b].children[0].style.display = "block";
                    }

                    for(let b = 0; b < maxX; b++) {
                        boxesPattern[b].children[0].style.display = "none";
                    }
                    
                }

                else if(Number(this.value) == 0) {
                    
                    for(let b = 0; b < boxesPattern.length; b++) {
                        //i++;
                        boxesPattern[b].children[0].style.display = "block";
                    }
                }
            }
        }
    }
   
}
document.querySelector('#pnlBoxPattern').querySelector('.txtYPattern').addEventListener('change', adjustY);
document.querySelector('#pnlBoxPattern').querySelector('.txtYPattern').previousElementSibling.addEventListener('input', adjustY);

function chooseSize() {

    let chkSeed = document.querySelector('.chkRandomSeed');
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "pattern") {

                if (chkSeed.dataset.value == "true") {
                    patternSeeder(f)
                }
            
                else {
                    
                    let boxesPattern = canvas.getElementsByClassName('boxesPattern');
                    let convertBoxes = this.value * 10; //plus 30 to start at 30% then multiply by .7 since it's the 1% of the remaining 70%

                    for(let b = 0; b < boxesPattern.length; b++) {
                        
                        boxesPattern[b].children[0].style.width = convertBoxes + "%";

                    }
                }

            }
        }
    }
    
}
document.querySelector('#pnlBoxPattern').querySelector('.txtSizePattern').addEventListener('change', chooseSize);
document.querySelector('#pnlBoxPattern').querySelector('.txtSizePattern').previousElementSibling.addEventListener('input', chooseSize);

function chooseSpacing() {

    let txtSizeWidth = document.getElementById('pnlBoxCanvas').querySelector('.txtSizeWidth');
    let txtSizeHeight = document.getElementById('pnlBoxCanvas').querySelector('.txtSizeHeight');
    let numBoxesX = Math.ceil(txtSizeWidth.value / boxSize);
    let numBoxesY = Math.ceil(txtSizeHeight.value / boxSize);
    let max =  Number(this.value);
    
    for(let a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
            let boxesPattern = canvas.querySelectorAll('.boxesPattern');

            if(type == "pattern") {

                for(let b = 0; b < boxesPattern.length; b++) {
                    boxesPattern[b].children[0].style.display = "block";
                }
            
                //hide x axis
                for(let b = 0; b < boxesPattern.length; b+= numBoxesX) {
            
                    let i = 0;
                
                    for(let c = b+1; c < numBoxesX + b; c++) {
            
                        i++;
                        if(i <= max) {
                            boxesPattern[c].children[0].style.display = "none";
                        }
                        else {
                            i = 0;
                        }
                        
                    }
             
                }
            
                let i = 0;
                //hide y axis
                for(let b = 0; b < boxesPattern.length; b+= numBoxesY) {
            
                    if(b > 0) {
                        i++;
            
                        if(i <= max) {
            
                            for(let c = b; c < b + numBoxesX; c++) {
                                boxesPattern[c].children[0].style.display = "none";
                            }
                        }
                        else {
                            i = 0;
                        }
            
                    }
                }
            }
        }
    }

}
document.querySelector('#pnlBoxPattern').querySelector('.txtSpacingPattern').addEventListener('change', chooseSpacing);
document.querySelector('#pnlBoxPattern').querySelector('.txtSpacingPattern').previousElementSibling.addEventListener('input', chooseSpacing);

function randomSpin() {

    let panel = document.getElementById('pnlBoxPattern');    
    var getSpin = panel.querySelector('.txtRandomSpinPattern');

    for(let a = 0; a < focusPanel.length; a++) {
        
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
            var boxesPattern = canvas.getElementsByClassName('boxesPattern');

            if(type == "pattern") { 

                if(Number(getSpin.value) > 0) {
                    for(let b = 0; b < boxesPattern.length; b++) {
            
                        function getRand(min, max) {
                            return Math.floor(Math.random() * (max - min + 1) ) + min;
                        }
            
                        var min = Number(getSpin.value) * -1; //get negative value of
                        var max = Number(getSpin.value);
            
                        var rand = getRand(min, max);
                        boxesPattern[b].children[0].style.rotate = rand + "deg";
                    }
                }

            }
        }
    }
        
}
document.querySelector('#pnlBoxPattern').querySelector('.txtRandomSpinPattern').addEventListener('change', randomSpin);
document.querySelector('#pnlBoxPattern').querySelector('.txtRandomSpinPattern').previousElementSibling.addEventListener('input', randomSpin);

function randomSeed() {

    let panel = document.getElementById('pnlBoxPattern');

    for(let a = 0; a < focusPanel.length; a++) {
        
        if(focusPanel[a] != null) {

            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
           
            let boxesPattern = canvas.getElementsByClassName('boxesPattern');

            if(type == "pattern") { 
                if(this.dataset.value == "true") {

                    patternSeeder(f);
                }
            
                else if(this.dataset.value == "false") { 
            
                    let convertBoxes = panel.querySelector('.txtSizePattern').value * 10; //plus 30 to start at 30% then multiply by .7 since it's the 1% of the remaining 70%
            
                    for(let b = 0; b < boxesPattern.length; b++) {
                        
                        boxesPattern[b].children[0].style.width = convertBoxes + "%";
                        boxesPattern[b].children[0].style.width = convertBoxes + "%";
            
                    }
            
                    this.removeEventListener('mouseover', chkBoxHover);
                }
            }
        }
    }
}

document.querySelector('#pnlBoxPattern').querySelector('.chkRandomSeed').addEventListener('click', randomSeed);

//assign dropOptionVerti selection for blend mode
for(var a = 0; a < document.querySelector('.optPatternBlend').length; a++) {
    document.querySelector('.optPatternBlend')[a].addEventListener('click', chooseBlend);
}





















//========================RESET THE MIN AND MAX OF PATTERN SLIDERS====================

function resetPatternMinMax() {
    let txtSizeWidth = document.getElementById('pnlBoxCanvas').querySelector('.txtSizeWidth');
    let txtSizeHeight = document.getElementById('pnlBoxCanvas').querySelector('.txtSizeHeight');

    //adjust patterns depending on the size of the canvas
    let maxHori = Math.ceil(txtSizeWidth.value / boxSize);
    let maxVerti = Math.ceil(txtSizeHeight.value / boxSize);
    let pnlBoxPattern = document.getElementById('pnlBoxPattern');

    pnlBoxPattern.querySelector('.txtXPattern').max = maxHori;
    pnlBoxPattern.querySelector('.txtXPattern').min = maxHori * -1;
    pnlBoxPattern.querySelector('.txtXPattern').previousElementSibling.max = maxHori;
    pnlBoxPattern.querySelector('.txtXPattern').previousElementSibling.min = maxHori * -1;

    pnlBoxPattern.querySelector('.txtYPattern').max = maxVerti;
    pnlBoxPattern.querySelector('.txtYPattern').min = maxVerti * -1;
    pnlBoxPattern.querySelector('.txtYPattern').previousElementSibling.max = maxHori;
    pnlBoxPattern.querySelector('.txtYPattern').previousElementSibling.min = maxHori * -1;
}
//==================================BOTTOM CONTROLS===============================


function showBasicBoxPattern(){
    this.closest('#pnlBoxPattern').children[0].children[0].innerText = "Pattern Settings";
    this.closest('#pnlBoxPattern').querySelector('.tabSliderBox2').style.translate = "0%"; //slide tab
    this.closest('#pnlBoxPattern').querySelector('.pnlBottomBoxThumb2').style.translate = "0%"; //slide scroll thumb
}
document.querySelector('#pnlBoxPattern').querySelector('.btnBasicBox').addEventListener('click', btnBottomClick); //default the btnBasic to white
document.querySelector('#pnlBoxPattern').querySelector('.btnBasicBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxPattern').querySelector('.btnBasicBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxPattern').querySelector('.btnBasicBox').addEventListener('click', showBasicBoxPattern);
document.querySelector('#pnlBoxPattern').querySelector('.btnBasicBox').click();

function showStyleBoxPattern() {
    this.closest('#pnlBoxPattern').children[0].children[0].innerText = "Pattern Style";
    this.closest('#pnlBoxPattern').querySelector('.tabSliderBox2').style.translate = "-100%"; //slide tab to left
    this.closest('#pnlBoxPattern').querySelector('.pnlBottomBoxThumb2').style.translate = "100%"; //slide thumb to right
}
document.querySelector('#pnlBoxPattern').querySelector('.btnStyleBox').addEventListener('click', btnBottomClick);
document.querySelector('#pnlBoxPattern').querySelector('.btnStyleBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxPattern').querySelector('.btnStyleBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxPattern').querySelector('.btnStyleBox').addEventListener('click', showStyleBoxPattern);




































//==================================RECREATE FOR UNDO=================================

function recreatePnlBoxPattern(f, name, id, option) {
    //reset txtSearch value
    menuPatterns.querySelector('.txtSearch').value = "";
    //menuPatterns.querySelector('.btnDelSearch').style.visibility = "hidden";

    let configScroll = document.getElementsByClassName('configScroll');

    var newPattern = 
    `<div class="pnlBoxLayer" data-type="pattern" data-pattern="${id}" data-ref="${f}">
        <div class="pnlTitleLayer" style="height: 40px;">
            <div class="iconLayer">
                <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.0607 3.06066C11.6464 2.47487 11.6464 1.52513 11.0607 0.93934C10.4749 0.353553 9.52513 0.353553 8.93934 0.93934L4.93934 4.93934C4.35355 5.52513 4.35355 6.47487 4.93934 7.06066C5.52513 7.64645 6.47487 7.64645 7.06066 7.06066L11.0607 3.06066Z" fill="white"/>
                    <path d="M5.06066 16.0607L10.0607 11.0607C10.6464 10.4749 10.6464 9.52513 10.0607 8.93934C9.47487 8.35355 8.52513 8.35355 7.93934 8.93934L2.93934 13.9393C2.35355 14.5251 2.35355 15.4749 2.93934 16.0607C3.52513 16.6464 4.47487 16.6464 5.06066 16.0607Z" fill="white"/>
                    <path d="M18.0607 0.93934C18.6464 1.52513 18.6464 2.47487 18.0607 3.06066L16.0607 5.06066C15.4749 5.64645 14.5251 5.64645 13.9393 5.06066C13.3536 4.47487 13.3536 3.52513 13.9393 2.93934L15.9393 0.93934C16.5251 0.353553 17.4749 0.353553 18.0607 0.93934Z" fill="white"/>
                    <path d="M21.0607 7.06066C21.6464 6.47487 21.6464 5.52513 21.0607 4.93934C20.4749 4.35355 19.5251 4.35355 18.9393 4.93934L12.9393 10.9393C12.3536 11.5251 12.3536 12.4749 12.9393 13.0607C13.5251 13.6464 14.4749 13.6464 15.0607 13.0607L21.0607 7.06066Z" fill="white"/>
                    <path d="M23.5607 9.93934C24.1464 10.5251 24.1464 11.4749 23.5607 12.0607L17.0607 18.5607C16.4749 19.1464 15.5251 19.1464 14.9393 18.5607C14.3536 17.9749 14.3536 17.0251 14.9393 16.4393L21.4393 9.93934C22.0251 9.35355 22.9749 9.35355 23.5607 9.93934Z" fill="white"/>
                    <path d="M23.7071 17.7071C24.0976 17.3166 24.0976 16.6834 23.7071 16.2929C23.3166 15.9024 22.6834 15.9024 22.2929 16.2929L21.2929 17.2929C20.9024 17.6834 20.9024 18.3166 21.2929 18.7071C21.6834 19.0976 22.3166 19.0976 22.7071 18.7071L23.7071 17.7071Z" fill="white"/>
                    <path d="M9.06066 16.9393C9.64645 17.5251 9.64645 18.4749 9.06066 19.0607L6.56066 21.5607C5.97487 22.1464 5.02513 22.1464 4.43934 21.5607C3.85355 20.9749 3.85355 20.0251 4.43934 19.4393L6.93934 16.9393C7.52513 16.3536 8.47487 16.3536 9.06066 16.9393Z" fill="white"/>
                    <path d="M3 10C3.55228 10 4 9.55229 4 9C4 8.44772 3.55228 8 3 8C2.44772 8 2 8.44772 2 9C2 9.55229 2.44772 10 3 10Z" fill="white"/>
                    <path d="M2.19995 17.5C2.19995 18.0523 1.75224 18.5 1.19995 18.5C0.647666 18.5 0.199951 18.0523 0.199951 17.5C0.199951 16.9477 0.647666 16.5 1.19995 16.5C1.75224 16.5 2.19995 16.9477 2.19995 17.5Z" fill="white"/>
                    <path d="M25 9.5C25.5523 9.5 26 9.05229 26 8.5C26 7.94772 25.5523 7.5 25 7.5C24.4477 7.5 24 7.94772 24 8.5C24 9.05229 24.4477 9.5 25 9.5Z" fill="white"/>
                    <path d="M13.5 7C13.5 7.82843 12.8284 8.5 12 8.5C11.1716 8.5 10.5 7.82843 10.5 7C10.5 6.17157 11.1716 5.5 12 5.5C12.8284 5.5 13.5 6.17157 13.5 7Z" fill="white"/>
                    <path d="M22.5 5C23.3284 5 24 4.32843 24 3.5C24 2.67157 23.3284 2 22.5 2C21.6716 2 21 2.67157 21 3.5C21 4.32843 21.6716 5 22.5 5Z" fill="white"/>
                    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="white"/>
                    <path d="M5 2.5C5 3.32843 4.32843 4 3.5 4C2.67157 4 2 3.32843 2 2.5C2 1.67157 2.67157 1 3.5 1C4.32843 1 5 1.67157 5 2.5Z" fill="white"/>
                    <path d="M11 16.5C11.8284 16.5 12.5 15.8284 12.5 15C12.5 14.1716 11.8284 13.5 11 13.5C10.1716 13.5 9.5 14.1716 9.5 15C9.5 15.8284 10.1716 16.5 11 16.5Z" fill="white"/>
                    <path d="M15 20.5C15 21.3284 14.3284 22 13.5 22C12.6716 22 12 21.3284 12 20.5C12 19.6716 12.6716 19 13.5 19C14.3284 19 15 19.6716 15 20.5Z" fill="white"/>
                </svg>
            </div>
            <input type="text" class="txtHeader" value="${name}" >
            <div class="btnShowHide" data-show = "visible">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.00014 2.71429C5.57998 2.71429 4.42871 3.86555 4.42871 5.28572C4.42871 6.70588 5.57998 7.85714 7.00014 7.85714C8.4203 7.85714 9.57157 6.70588 9.57157 5.28572C9.57157 3.86555 8.4203 2.71429 7.00014 2.71429Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9119 4.87535C12.4818 1.69741 9.79075 1.19209e-07 7 0C4.20925 -1.78814e-07 1.51815 1.69741 0.0880784 4.87535C-0.0293595 5.13632 -0.0293595 5.43511 0.0880784 5.69608C1.51815 8.87402 4.20925 10.5714 7 10.5714C9.79075 10.5714 12.4818 8.87401 13.9119 5.69608C14.0294 5.4351 14.0294 5.13632 13.9119 4.87535ZM7 8.57143C5.18342 8.57143 3.27797 7.53709 2.11033 5.28572C3.27797 3.03434 5.18342 2 7 2C8.81657 2 10.722 3.03434 11.8897 5.28571C10.722 7.53708 8.81657 8.57143 7 8.57143Z" fill="white"/>
                </svg>
            </div>
        </div>

    </div>
    
    `;

    let temp = document.createElement('div')
    temp.innerHTML = newPattern;

    configScroll[5].prepend(temp.children[0]);
    
    configScroll[5].querySelector(`[data-ref="${f}"]`).querySelector('.txtHeader').addEventListener('dblclick', renameTxtHeader);
    configScroll[5].querySelector(`[data-ref="${f}"]`).querySelector('.txtHeader').addEventListener('keypress', validateTxtHeader);
    configScroll[5].querySelector(`[data-ref="${f}"]`).querySelector('.txtHeader').addEventListener('change', saveTxtHeader);
    configScroll[5].querySelector(`[data-ref="${f}"]`).querySelector('.txtHeader').addEventListener('click', clickTxtHeader);
    configScroll[5].querySelector(`[data-ref="${f}"]`).querySelector('.txtHeader').addEventListener('focusout', saveTxtHeader);
    configScroll[5].querySelector(`[data-ref="${f}"]`).querySelector('.txtHeader').addEventListener('change', encodeTxtHeader);

    configScroll[5].querySelector('.btnShowHide').addEventListener('click', showHideLayers);
    
    panel2Focus(configScroll[5].querySelector(`[data-ref="${f}"]`))

    recreateCanvasPattern(f, option, id);
}

function recreateCanvasPattern(f, option, id) {

    cnvLayers[f] = document.createElement('div');
    cnvLayers[f].classList.add('cnvPatterns');
    cnvLayers[f].dataset.ref = f;
    cnvLayers[f].dataset.type = "pattern"
    cnvLayers[f].style.width = "100%";
    cnvLayers[f].style.height = "100%";
    cnvLayers[f].style.display = "grid";
    cnvLayers[f].style.gridTemplateColumns = "repeat(10, 10px)";
    cnvLayers[f].style.gridGap = '0%';
    cnvLayers[f].style.flexWrap = "wrap";
    cnvLayers[f].style.position = "absolute";
    (option == 'upload') ? cnvLayers[f].style.visibility = "hidden": cnvLayers[f].style.visibility = "visible";
    cnvLayers[f].style.backgroundColor = "transparent"
    
    cnvGrpLayers.prepend(cnvLayers[f])
    
    rerenderPattern(f, option, id);

}

async function rerenderPattern(f, option, id) {

    let dropdown0, txtColorPattern, txtXPattern, txtYPattern, txtSizePattern, 
    txtSpacingPattern, txtRandomSpinPattern, txtOpacityPattern, chkRandomSeed;

    let txtSizeWidth = document.getElementById('pnlBoxCanvas').querySelector('.txtSizeWidth');
    let txtSizeHeight = document.getElementById('pnlBoxCanvas').querySelector('.txtSizeHeight');
    let cnvGrpLayers = document.getElementById('cnvGrpLayers');

    if(option == "upload") {
        dropdown0 = valueFinder(dataPattern[f], "dropdown 0");
        txtColorPattern = valueFinder(dataPattern[f], "txtColorPattern");
        txtXPattern = valueFinder(dataPattern[f], "txtXPattern");
        txtYPattern = valueFinder(dataPattern[f], "txtYPattern");
        txtSizePattern = valueFinder(dataPattern[f], "txtSizePattern");
        txtSpacingPattern = valueFinder(dataPattern[f], "txtSpacingPattern");
        txtRandomSpinPattern = valueFinder(dataPattern[f], "txtRandomSpinPattern");
        txtOpacityPattern = valueFinder(dataPattern[f], "txtOpacityPattern");
        chkRandomSeed = valueFinder(dataPattern[f], "chkRandomSeed");
    }
    else {
        dropdown0 = valueFinder(history[h], "dropdown 0");
        txtColorPattern = valueFinder(history[h], "txtColorPattern");
        txtXPattern = valueFinder(history[h], "txtXPattern");
        txtYPattern = valueFinder(history[h], "txtYPattern");
        txtSizePattern = valueFinder(history[h], "txtSizePattern");
        txtSpacingPattern = valueFinder(history[h], "txtSpacingPattern");
        txtRandomSpinPattern = valueFinder(history[h], "txtRandomSpinPattern");
        txtOpacityPattern = valueFinder(history[h], "txtOpacityPattern");
        chkRandomSeed = valueFinder(history[h], "chkRandomSeed");
    }
   
    f2Canvas(f).innerHTML = "";

    var numBoxesX = Math.ceil(txtSizeWidth.value / boxSize) ;
    var numBoxesY = Math.ceil(txtSizeHeight.value / boxSize);

    var numBoxesTotal = numBoxesX * numBoxesY;

    //var convertPatternSize = ((getPatternSize.value * 10) + 30) * .7; //plus 30 to start at 30% then multiply by .7 since it's the 1% of the remaining 70%
    var convertPatternSize = txtSizePattern * 10; //plus 30 to start at 30% then multiply by .7 since it's the 1% of the remaining 70%

    //adjust the spacing/gap of each boxes
    f2Canvas(f).style.gridGap = `${txtSpacingPattern*boxSize}px`;

    //adjust the position of each boxes
    f2Canvas(f).style.gridTemplateColumns = `repeat(${numBoxesX}, ${boxSize}px)`;

    //adjust the position of the entire layer
    f2Canvas(f).style.left = `${txtXPattern*boxSize}px`;
    f2Canvas(f).style.top = `${txtYPattern*boxSize}px`;

    f2Canvas(f).style.opacity = Number(txtOpacityPattern) / 100;

    f2Canvas(f).style.mixBlendMode = dropdown0;

    //create the box container of this SVG
    var box = [];

    //get SVG from library-----------------------------------------

    let data = await fetchRowById('patterns', id);
    let src = data[0].source;

    let getSVG = document.createElement('div');
    getSVG.innerHTML = src;

    getSVG.firstChild.querySelectorAll('*').forEach((path) => {
        if(path.getAttribute('fill') != null) {
            path.setAttribute('fill', '#' + txtColorPattern);
        }
        if(path.getAttribute('stroke-color') != null) {
            path.setAttribute('stroke-color', '#' + txtColorPattern);
        }
        
    })

    for(var b = 0; b < numBoxesTotal; b++) { //start creating individial pattern
        box[b] = document.createElement('div');
        box[b].style.width = boxSize + "px"; //width from txtSizeWidth *percent as px
        box[b].style.height = boxSize + "px"; //height is the same as width in px
        box[b].style.display = "flex";
        box[b].classList.add('boxesPattern');

        //append the SVG xml string inside the box
        box[b].innerHTML = getSVG.firstChild.outerHTML;

        //change the svg properties inside the box
        box[b].children[0].style.margin = "auto";
        box[b].children[0].style.width = `${convertPatternSize}%`;
        box[b].children[0].style.height = "auto";

        f2Canvas(f).appendChild(box[b]);
    }

    //check if random spin is true
    //can be from redoCreate function
    if(Number(txtRandomSpinPattern) > 0) {
        randomSpin();
    }

    //check if random seed is true
    //can be from redoCreate function
    if(chkRandomSeed == "true") {
        patternSeeder(f, leadPanel);
    }

    //insert before cnvLayers if there's any
    if(cnvGrpLayers.childElementCount == 0) {
        cnvGrpLayers.appendChild(f2Canvas(f));
    }
    else {
        let next = cnvGrpLayers.querySelector(`[data-layer="${f+1}"]`)
        cnvGrpLayers.insertBefore(f2Canvas(f), next)
    }
    
    let configScroll = document.getElementsByClassName('configScroll');
    configScroll[5].children[0].click();

    initPanel++;
    if(initPanel == panelCountMax) {
        useVectorPanel();
    }
}


























