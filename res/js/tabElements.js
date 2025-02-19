

////////////////////////////////////SHOW ALL FILLERS/////////////////////////////
showFillers(document.getElementsByClassName('configScroll')[3]);

////////////////////////////////////SHOW DEFAULT PATTERNS/////////////////////////////

resetContentPreview(document.getElementsByClassName('configScroll')[3], 'elements')

////////////////////////////////////SEARCHING FOR PATTERN//////////////////////////

//INPUT

menuElements.querySelector('.txtSearch').addEventListener('input', function() {

    if(this.value.trim().length >= 3) {
        
        searchSuggestions(this, this.value);
    }
    else {

        this.parentElement.nextElementSibling.style.display = "none";
    }

    if(this.value.trim().length == 0) {
        menuElements.querySelector('.btnDelSearch').style.visibility = "hidden";
        resetPreviewOrCategory.call(this)
    }
    else {
        menuElements.querySelector('.btnDelSearch').style.visibility = "visible";
    }
})

//ENTER OR CHANGE EVENT
menuElements.querySelector('.txtSearch').addEventListener('keydown', function(e) {
    if(e.key == 'Enter') {
        e.preventDefault();
        this.click();
        searchPreviewOrCategory.call(this)
    }
})

////////////////////////////////////DELETE SEARCH PATTERN/////////////////////////
menuElements.querySelector('.btnDelSearch').addEventListener('click', function() {
    this.style.visibility = "hidden";
    this.previousElementSibling.value = "";
    this.dispatchEvent(new Event('change'));
})

//============================LAYER BLEND======================
//function already exist, just add event listeners
for(let b = 0; b < document.getElementById('pnlBoxElement').querySelectorAll('.optLayerBlend').length; b++) {
    document.getElementById('pnlBoxElement').querySelectorAll('.optLayerBlend')[b].addEventListener('click', chooseLayerBlend);
}

//=============================LAYER WIDTH / HEIGHT SIZE=====================
document.getElementById('pnlBoxElement').querySelector('.txtWidthLayer').addEventListener('change', adjustLayerWidth);
document.getElementById('pnlBoxElement').querySelector('.txtHeightLayer').addEventListener('change', adjustLayerHeight);

//=============================LAYER X / Y COORDINATES====================
document.getElementById('pnlBoxElement').querySelector('.txtXLayer').addEventListener('change', adjustLayerX);
document.getElementById('pnlBoxElement').querySelector('.txtYLayer').addEventListener('change', adjustLayerY);

//=============================FLIP X / Y COORDINATES====================
document.getElementById('pnlBoxElement').querySelector('.chkFlipX').addEventListener('click', adjustFlipX);


document.getElementById('pnlBoxElement').querySelector('.chkFlipY').addEventListener('click', adjustFlipY);

//==============================LAYER OPACITY========================
document.getElementById('pnlBoxElement').querySelector('.txtOpacityLayer').addEventListener('change', chooseLayerOpacity);
document.getElementById('pnlBoxElement').querySelector('.txtOpacityLayer').previousElementSibling.addEventListener('input', chooseLayerOpacity);

//==============================LAYER ROTATION========================
document.getElementById('pnlBoxElement').querySelector('.txtRotationLayer').addEventListener('change', chooseLayerRotation);
document.getElementById('pnlBoxElement').querySelector('.txtRotationLayer').previousElementSibling.addEventListener('input', chooseLayerRotation);


function createPnlBoxElement(n, source, post) {

    let f = maxF; //get the length of pnlBoxPatterns and use it as layer count
    maxF++;
    let name = autoIncrementHeader("Element");
    let configScroll = document.getElementsByClassName('configScroll');

    var newVector = 
    `<div class="pnlBoxLayer" data-thumbno="${n}" data-type="element" data-ref="${f}">
        <div class="pnlTitleLayer" style="height: 40px;">
            <div class="iconLayer">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0C0.447715 0 0 0.447716 0 1V21C0 21.5523 0.447716 22 1 22H9C9.55229 22 10 21.5523 10 21V1C10 0.447715 9.55228 0 9 0H1ZM9 1H1V21H9V1Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 0C12.4477 0 12 0.447716 12 1V9C12 9.55229 12.4477 10 13 10H21C21.5523 10 22 9.55228 22 9V1C22 0.447715 21.5523 0 21 0H13ZM21 1H13V9H21V1Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 13C12 12.4477 12.4477 12 13 12H21C21.5523 12 22 12.4477 22 13V21C22 21.5523 21.5523 22 21 22H13C12.4477 22 12 21.5523 12 21V13ZM13 13H21V21H13V13Z" fill="white"/>
                </svg>
            </div>
            <input type="text" class="txtHeader" value="${name}">
            <div class="btnShowHide" data-show = "visible">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.00014 2.71429C5.57998 2.71429 4.42871 3.86555 4.42871 5.28572C4.42871 6.70588 5.57998 7.85714 7.00014 7.85714C8.4203 7.85714 9.57157 6.70588 9.57157 5.28572C9.57157 3.86555 8.4203 2.71429 7.00014 2.71429Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9119 4.87535C12.4818 1.69741 9.79075 1.19209e-07 7 0C4.20925 -1.78814e-07 1.51815 1.69741 0.0880784 4.87535C-0.0293595 5.13632 -0.0293595 5.43511 0.0880784 5.69608C1.51815 8.87402 4.20925 10.5714 7 10.5714C9.79075 10.5714 12.4818 8.87401 13.9119 5.69608C14.0294 5.4351 14.0294 5.13632 13.9119 4.87535ZM7 8.57143C5.18342 8.57143 3.27797 7.53709 2.11033 5.28572C3.27797 3.03434 5.18342 2 7 2C8.81657 2 10.722 3.03434 11.8897 5.28571C10.722 7.53708 8.81657 8.57143 7 8.57143Z" fill="white"/>
                </svg>
            </div>
        </div>
        
    </div>`;

    configScroll[5].insertAdjacentHTML('afterbegin', newVector); //add the child on top of the previous one
    configScroll[5].querySelector('.txtHeader').addEventListener('dblclick', renameTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('keypress', validateTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('click', clickTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('focusout', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', encodeTxtHeader);

    //add the show and hide control
    configScroll[5].querySelector('.btnShowHide').addEventListener('click', showHideLayers);
    
    addPnlBoxElement(f, n, name, source, post);
    
}


function recreatePnlBoxElement(f, n, name) {

    let configScroll = document.getElementsByClassName('configScroll');

    let getSVG = configScroll[3].querySelector(`[data-thumbno = "${n}"]`).children[0];
    getSVG.style.filter = "none";

    var newVector = 
    `<div class="pnlBoxLayer" data-thumbno="${n}" data-type="element" data-ref="${f}">
        <div class="pnlTitleLayer" style="height: 40px;">
            <div class="iconLayer">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0C0.447715 0 0 0.447716 0 1V21C0 21.5523 0.447716 22 1 22H9C9.55229 22 10 21.5523 10 21V1C10 0.447715 9.55228 0 9 0H1ZM9 1H1V21H9V1Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 0C12.4477 0 12 0.447716 12 1V9C12 9.55229 12.4477 10 13 10H21C21.5523 10 22 9.55228 22 9V1C22 0.447715 21.5523 0 21 0H13ZM21 1H13V9H21V1Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 13C12 12.4477 12.4477 12 13 12H21C21.5523 12 22 12.4477 22 13V21C22 21.5523 21.5523 22 21 22H13C12.4477 22 12 21.5523 12 21V13ZM13 13H21V21H13V13Z" fill="white"/>
                </svg>
            </div>
            <input type="text" class="txtHeader" value="${name}">
            <div class="btnShowHide" data-show = "visible">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.00014 2.71429C5.57998 2.71429 4.42871 3.86555 4.42871 5.28572C4.42871 6.70588 5.57998 7.85714 7.00014 7.85714C8.4203 7.85714 9.57157 6.70588 9.57157 5.28572C9.57157 3.86555 8.4203 2.71429 7.00014 2.71429Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9119 4.87535C12.4818 1.69741 9.79075 1.19209e-07 7 0C4.20925 -1.78814e-07 1.51815 1.69741 0.0880784 4.87535C-0.0293595 5.13632 -0.0293595 5.43511 0.0880784 5.69608C1.51815 8.87402 4.20925 10.5714 7 10.5714C9.79075 10.5714 12.4818 8.87401 13.9119 5.69608C14.0294 5.4351 14.0294 5.13632 13.9119 4.87535ZM7 8.57143C5.18342 8.57143 3.27797 7.53709 2.11033 5.28572C3.27797 3.03434 5.18342 2 7 2C8.81657 2 10.722 3.03434 11.8897 5.28571C10.722 7.53708 8.81657 8.57143 7 8.57143Z" fill="white"/>
                </svg>
            </div>
        </div>
        
    </div>`;

    let temp  = document.createElement('div');
    temp.innerHTML = newVector;

    configScroll[5].prepend(temp.children[0]); //add the child on top of the previous one
    configScroll[5].querySelector('.txtHeader').addEventListener('dblclick', renameTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('keypress', validateTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('click', clickTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('focusout', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', encodeTxtHeader);

    //add the show and hide control
    configScroll[5].querySelector('.btnShowHide').addEventListener('click', showHideLayers);
}


function addPnlBoxElement(f, n, name, source, post) {

    dataLayer[f] = '\n*';
    dataLayer[f] += `\nref: ${f}`;
    dataLayer[f] += `\npnlBoxElement: ${name}`;
    dataLayer[f] += `\nthumbno: ${n}`;
    dataLayer[f] += `\nshow: visible`;
    dataLayer[f] += `\nlock: false`;
    dataLayer[f] += `\ndropdown 0: Normal`;
    dataLayer[f] += `\ntxtWidthLayer: 0`;
    dataLayer[f] += `\ntxtHeightLayer: 0`;
    dataLayer[f] += `\ntxtXLayer: 0`;
    dataLayer[f] += `\ntxtYLayer: 0`;
    dataLayer[f] += `\nchkFlipX: false`;
    dataLayer[f] += `\nchkFlipY: false`;
    dataLayer[f] += `\ntxtOpacityLayer: 100`;
    dataLayer[f] += `\ntxtRotationLayer: 0`;

    dataLayer[f] += `\ndropdown 1: Stroke`;
    dataLayer[f] += `\ntxtElementStrokeColor: 647499`;
    dataLayer[f] += `\ntxtElementStrokeOpacity: 100`;
    dataLayer[f] += `\ntxtElementStrokeWidth: 20`;
    dataLayer[f] += `\ntxtElementCornerRadius: 0`;
    dataLayer[f] += `\ntxtElementStrokeDash: 0`;
    dataLayer[f] += `\ntxtElementStrokeGap: 0`;
    dataLayer[f] += `\nchkElementStrokeCap: false`;
    dataLayer[f] += `\nchkElementStrokeShow: true`;

    dataLayer[f] += `\ntxtElementFillColor: A9AEFF`;
    dataLayer[f] += `\ntxtElementFillOpacity: 100`;
    dataLayer[f] += `\nchkElementFillShow: true`;

    //after all assigned controls then create the actual pattern layer
    createCanvasElement(f, n, name, 'element', source, post);

}

async function createCanvasElement(f, n, name, type, source, post) {     

    cnvLayers[f] = document.createElement('div');
    cnvLayers[f].classList.add('cnvLayers');
    cnvLayers[f].dataset.rotation = 0;
    cnvLayers[f].dataset.ref = f;
    cnvLayers[f].dataset.thumbno = n;
    cnvLayers[f].dataset.type = type;
    cnvLayers[f].style.minWidth = 20 + 'px';
    cnvLayers[f].style.minHeight = 20 + 'px';
    cnvLayers[f].style.overflow = "visible";
    cnvLayers[f].style.visibility = "visible";

    // append cnvlayer to cnvmain
    cnvGrpLayers.appendChild(cnvLayers[f]);

    createSVG(f, n, source, post);
    //make width and height as auto
    layerL[f] = cnvLayers[f].offsetLeft;
    layerT[f] = cnvLayers[f].offsetTop;
    layerW[f] = cnvLayers[f].clientWidth;
    layerH[f] = cnvLayers[f].clientHeight;

    //add border
    addBorderLayer(cnvLayers[f], f);

    createHistory(f, name, type, n);
    
    let configScroll = document.getElementsByClassName('configScroll');
    configScroll[5].children[0].click();
}

function recreateCanvasElement(f, n, pnlBox) {     

    let configScroll = document.getElementsByClassName('configScroll');

    cnvLayers[f] = document.createElement('div');
    cnvLayers[f].classList.add('cnvLayers');
    cnvLayers[f].dataset.rotation = valueFinder(dataLayer[f], 'txtRotationLayer');
    cnvLayers[f].dataset.ref = f;
    cnvLayers[f].dataset.thumbno = n;
    cnvLayers[f].dataset.type = "element";
    cnvLayers[f].style.minWidth = 20 + 'px';
    cnvLayers[f].style.minHeight = 20 + 'px';
    cnvLayers[f].style.overflow = "visible";
    cnvLayers[f].style.visibility = "hidden";

    // append cnvlayer to cnvmain
    cnvGrpLayers.appendChild(cnvLayers[f]);

    addBorderLayer(cnvLayers[f], f);

    configScroll[5].children[0].click();

    //add border
    validateData(dataLayer[f], pnlBox);

    renderSVG(f, 'upload');

    //make width and height as auto
    layerL[f] = cnvLayers[f].offsetLeft;
    layerT[f] = cnvLayers[f].offsetTop;
    layerW[f] = cnvLayers[f].clientWidth;
    layerH[f] = cnvLayers[f].clientHeight;
}


for(let b = 0; b < document.getElementById('pnlBoxElement').querySelectorAll('.optElementColor').length; b++) {
    document.getElementById('pnlBoxElement').querySelectorAll('.optElementColor')[b].addEventListener('click', chooseElementTab);
}

function chooseElementTab() {

    let opt = this.innerText;
    let contPath = this.closest('.contPath');

    contPath.querySelector('.dropdown').children[0].innerText = opt;
    if(opt == 'Stroke') {
  
        contPath.children[1].style.display = "block";
        contPath.children[2].style.display = "none";
    }
    else if(opt == 'Fill') {

        contPath.children[1].style.display = "none";
        contPath.children[2].style.display = "block";
    }
}


function adjustElementStrokeColor() {

    testHexCode(this);
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "element") {
                canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke', '#' + this.value);    
            }
        }
    }

    
}
document.getElementById('pnlBoxElement').querySelector('.txtElementStrokeColor').addEventListener('change', adjustElementStrokeColor);
document.getElementById('pnlBoxElement').querySelector('.txtElementStrokeColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustElementStrokeOpacity() {
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "element") {
                canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-opacity', this.value/100);
            }
        }
    }
}
document.getElementById('pnlBoxElement').querySelector('.txtElementStrokeOpacity').addEventListener('change', adjustElementStrokeOpacity);
document.getElementById('pnlBoxElement').querySelector('.txtElementStrokeOpacity').previousElementSibling.addEventListener('input', adjustElementStrokeOpacity);

function adjustElementStrokeWidth() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "element") {
                renderSVG(f)
            }
        }
    }
}
document.getElementById('pnlBoxElement').querySelector('.txtElementStrokeWidth').addEventListener('change', adjustElementStrokeWidth);
document.getElementById('pnlBoxElement').querySelector('.txtElementStrokeWidth').previousElementSibling.addEventListener('input', adjustElementStrokeWidth);


function adjustElementCornerRadius() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "element") {
                curveSVG(f);
            }
        }
    }

}
document.getElementById('pnlBoxElement').querySelector('.txtElementCornerRadius').addEventListener('change', adjustElementCornerRadius);
document.getElementById('pnlBoxElement').querySelector('.txtElementCornerRadius').previousElementSibling.addEventListener('input', adjustElementCornerRadius);


function adjustElementStrokeDash() {

    let panel = document.getElementById('pnlBoxElement');

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "element") {
                canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-dasharray', `${panel.querySelector('.txtElementStrokeDash').value} ${panel.querySelector('.txtElementStrokeGap').value}`);
            }
        }
    }
    adjustBorder();
}
document.getElementById('pnlBoxElement').querySelector('.txtElementStrokeDash').addEventListener('change', adjustElementStrokeDash);
document.getElementById('pnlBoxElement').querySelector('.txtElementStrokeDash').previousElementSibling.addEventListener('input', adjustElementStrokeDash);

document.getElementById('pnlBoxElement').querySelector('.txtElementStrokeGap').addEventListener('change', adjustElementStrokeDash);
document.getElementById('pnlBoxElement').querySelector('.txtElementStrokeGap').previousElementSibling.addEventListener('input', adjustElementStrokeDash);


function adjustElementStrokeCap() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "element") {
                if(this.dataset.value == "true") {

                    canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-linecap', "round");
                }
            
                else if(this.dataset.value == "false") { 
            
                    canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-linecap', "butt");
                    
                }
            }
        }
    }

    this.removeEventListener('mouseover', chkBoxHover);
}

document.getElementById('pnlBoxElement').querySelector('.chkElementStrokeCap').addEventListener('click', adjustElementStrokeCap);

function adjustElementStrokeShow() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "element") {
                if(this.dataset.value == "false") {

                    canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-opacity', "0");
                }
                else if(this.dataset.value == "true") { 
            
                    canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-opacity', "100");
                }
            }
        }
    }

    this.removeEventListener('mouseover', chkBoxHover);
    adjustBorder();

}

document.getElementById('pnlBoxElement').querySelector('.chkElementStrokeShow').addEventListener('click', adjustElementStrokeShow);

function adjustElementFillColor() {

    testHexCode(this);

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "element") {
                canvas.querySelectorAll('g')[2].children[0].setAttribute('fill', '#' + this.value);
            }
        }
    }
}
document.getElementById('pnlBoxElement').querySelector('.txtElementFillColor').addEventListener('change', adjustElementFillColor);
document.getElementById('pnlBoxElement').querySelector('.txtElementFillColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustElementFillOpacity() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "element") {

                canvas.querySelectorAll('g')[2].children[0].setAttribute('fill-opacity', this.value/100);
    
            }
        }
    }

}

document.getElementById('pnlBoxElement').querySelector('.txtElementFillOpacity').addEventListener('change', adjustElementFillOpacity);
document.getElementById('pnlBoxElement').querySelector('.txtElementFillOpacity').previousElementSibling.addEventListener('input', adjustElementFillOpacity);

function adjustElementFillShow() {
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "element") {
                if(this.dataset.value == "false") {
                    canvas.querySelectorAll('g')[2].children[0].setAttribute('fill-opacity', "0");
                }
                else {
                    canvas.querySelectorAll('g')[2].children[0].setAttribute('fill-opacity', "100");
                }
            }
        }
    }
    
    adjustBorder();

}
document.getElementById('pnlBoxElement').querySelector('.chkElementFillShow').addEventListener('click', adjustElementFillShow);


function showBasicBoxElement(){
    this.closest('#pnlBoxElement').children[0].children[0].innerText = "Element Settings";
    this.closest('#pnlBoxElement').querySelector('.tabSliderBox2').style.translate = "0%"; //slide tab
    this.closest('#pnlBoxElement').querySelector('.pnlBottomBoxThumb2').style.translate = "0%"; //slide scroll thumb
}
document.querySelector('#pnlBoxElement').querySelector('.btnBasicBox').addEventListener('click', btnBottomClick); //default the btnBasic to white
document.querySelector('#pnlBoxElement').querySelector('.btnBasicBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxElement').querySelector('.btnBasicBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxElement').querySelector('.btnBasicBox').addEventListener('click', showBasicBoxElement);
document.querySelector('#pnlBoxElement').querySelector('.btnBasicBox').children[0].style.filter = "saturate(0) brightness(2)";
document.querySelector('#pnlBoxElement').querySelector('.btnBasicBox').children[0].style.transition = ".2s";

function showColorBoxElement() {
    this.closest('#pnlBoxElement').children[0].children[0].innerText = "Element Color";
    this.closest('#pnlBoxElement').querySelector('.tabSliderBox2').style.translate = "-100%"; //slide tab to left
    this.closest('#pnlBoxElement').querySelector('.pnlBottomBoxThumb2').style.translate = "100%"; //slide thumb to right
}
document.querySelector('#pnlBoxElement').querySelector('.btnColorBox').addEventListener('click', btnBottomClick); //default the btnColor to white
document.querySelector('#pnlBoxElement').querySelector('.btnColorBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxElement').querySelector('.btnColorBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxElement').querySelector('.btnColorBox').addEventListener('click', showColorBoxElement);
document.querySelector('#pnlBoxElement').querySelector('.btnColorBox').children[0].style.transition = ".2s";
