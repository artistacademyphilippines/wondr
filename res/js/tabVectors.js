var svgOldW = [];
var svgOldH = [];

//============================LAYER BLEND======================
//function already exist, just add event listeners
for(let b = 0; b < document.getElementById('pnlBoxVector').querySelectorAll('.optLayerBlend').length; b++) {
    document.getElementById('pnlBoxVector').querySelectorAll('.optLayerBlend')[b].addEventListener('click', chooseLayerBlend);
}

//=============================LAYER WIDTH / HEIGHT SIZE=====================
document.getElementById('pnlBoxVector').querySelector('.txtWidthLayer').addEventListener('change', adjustLayerWidth);
document.getElementById('pnlBoxVector').querySelector('.txtHeightLayer').addEventListener('change', adjustLayerHeight);

//=============================LAYER X / Y COORDINATES====================
document.getElementById('pnlBoxVector').querySelector('.txtXLayer').addEventListener('change', adjustLayerX);
document.getElementById('pnlBoxVector').querySelector('.txtYLayer').addEventListener('change', adjustLayerY);

//=============================FLIP X / Y COORDINATES====================
document.getElementById('pnlBoxVector').querySelector('.chkFlipX').addEventListener('click', adjustFlipX);

document.getElementById('pnlBoxVector').querySelector('.chkFlipY').addEventListener('click', adjustFlipY);

//==============================LAYER OPACITY========================
document.getElementById('pnlBoxVector').querySelector('.txtOpacityLayer').addEventListener('change', chooseLayerOpacity);
document.getElementById('pnlBoxVector').querySelector('.txtOpacityLayer').previousElementSibling.addEventListener('input', chooseLayerOpacity);

//==============================LAYER ROTATION========================
document.getElementById('pnlBoxVector').querySelector('.txtRotationLayer').addEventListener('change', chooseLayerRotation);
document.getElementById('pnlBoxVector').querySelector('.txtRotationLayer').previousElementSibling.addEventListener('input', chooseLayerRotation);


//===============================VECTOR LAYER==============================
//actual function to create pnlBoxProperties
function addPnlBoxVector(f, name, n) {  //adding controls only for 'IMAGE' panel boxes

    dataLayer[f] = '\n*';
    dataLayer[f] += `\nref: ${f}`;
    dataLayer[f] += `\npnlBoxVector: ${name}`;
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

    dataLayer[f] += `\ntxtSubLayer: 0`;
    dataLayer[f] += `\ndropdown 1: Stroke`;
    dataLayer[f] += `\ntxtVectorStrokeColor: 000000`;
    dataLayer[f] += `\ntxtVectorStrokeOpacity: 100`;
    dataLayer[f] += `\ntxtVectorStrokeWidth: 4`;
    dataLayer[f] += `\ntxtVectorStrokeDash: 0`;
    dataLayer[f] += `\ntxtVectorStrokeGap: 0`;
    dataLayer[f] += `\nchkVectorStrokeCap: false`;
    dataLayer[f] += `\nchkVectorStrokeShow: false`;

    dataLayer[f] += `\ntxtVectorFillColor: 000000`;
    dataLayer[f] += `\ntxtVectorFillOpacity: 100`;
    dataLayer[f] += `\nchkVectorFillShow: false`;

    createCanvasVector(f, n, name)

}

function createCanvasVector(f, n, name) {

    let configScroll = document.getElementsByClassName('configScroll');
    let txtSizeWidth = document.querySelector('.txtSizeWidth');
    let txtSizeHeight = document.querySelector('.txtSizeHeight');

    cnvLayers[f] = document.createElement('div');
    cnvLayers[f].style.visibility = "visible";
    cnvLayers[f].classList.add('cnvLayers');
    cnvLayers[f].dataset.rotation = 0;
    cnvLayers[f].dataset.ref = f;
    cnvLayers[f].dataset.thumbno = n;
    cnvLayers[f].dataset.type = "vector";

    //add first image  so we can adjust the left and right of the cnvlayer
    //use [f] to get pnlBoxLayer dataset of thumbNo 
    //index it back to pnlBoxThumb and get children[0] which is img and get src
    let getSVG = configScroll[2].querySelector(`[data-thumbno = "${n}"]`).children[0];
    //getSVG.style.filter = "none";

    cnvLayers[f].innerHTML = getSVG.outerHTML;

    cnvLayers[f].children[0].style.filter = "none";
    cnvLayers[f].children[0].style.width = "100%";
    cnvLayers[f].children[0].style.height = "100%";

    //then append cnvlayer to cnvmain
    cnvGrpLayers.appendChild(cnvLayers[f]);
    
    //get which is smaller if canvas width or canvas height
    let aspectRatio;
    let vectorW = Number(cnvLayers[f].querySelector('svg').getAttribute('width'));
    let vectorH = Number(cnvLayers[f].querySelector('svg').getAttribute('height'));

    if(Number(txtSizeWidth.value) > Number(txtSizeHeight.value)) {
        aspectRatio = vectorW / vectorH;

        if(vectorH >= Math.round(txtSizeHeight.value * 0.5)) {
            cnvLayers[f].style.height = `${Math.round(txtSizeHeight.value * 0.5)}px`;
            cnvLayers[f].style.width =  `${Math.round(cnvLayers[f].clientHeight * aspectRatio)}px`;
        }
        else {
            cnvLayers[f].style.height = `${vectorH}px`;
            cnvLayers[f].style.width =  `${vectorH * aspectRatio}px`;
        }
        
    }
    else if(Number(txtSizeWidth.value) < Number(txtSizeHeight.value)) {
        aspectRatio = vectorH / vectorW;

        if(vectorW >= Math.round(txtSizeWidth.value * 0.5)) {
            cnvLayers[f].style.width = `${Math.round(txtSizeWidth.value * 0.5)}px`;
            cnvLayers[f].style.height = `${Math.round(cnvLayers[f].clientWidth * aspectRatio)}px`;
        }
        else {
            cnvLayers[f].style.width = `${vectorW}px`;
            cnvLayers[f].style.height = `${vectorW * aspectRatio}px`;
        }
        
    }
    else if(Number(txtSizeWidth.value) == Number(txtSizeHeight.value)) {
        
        aspectRatio = vectorH / vectorW;

        if(vectorW >= Math.round(txtSizeWidth.value * 0.5)) {
            cnvLayers[f].style.width = `${Math.round(txtSizeWidth.value * 0.5)}px`;
            cnvLayers[f].style.height = `${Math.round(cnvLayers[f].clientWidth * aspectRatio)}px`;
        }
        else {
            cnvLayers[f].style.width = `${vectorW}px`;
            cnvLayers[f].style.height = `${vectorW * aspectRatio}px`;
        }
    }

    //set min width and height
    aspectRatio = vectorW / vectorH;
    cnvLayers[f].style.minWidth = 20 + 'px';
    cnvLayers[f].style.minHeight = 20 / aspectRatio + 'px';

    //position cnvlayer to center
    cnvLayers[f].style.left = `${(txtSizeWidth.value / 2) - (cnvLayers[f].clientWidth/2)}px`;
    cnvLayers[f].style.top = `${(txtSizeHeight.value / 2) - (cnvLayers[f].clientHeight/2)}px`;

    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtWidthLayer', `${cnvLayers[f].clientWidth}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtHeightLayer', `${cnvLayers[f].clientHeight}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtXLayer', `${cnvLayers[f].offsetLeft}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtYLayer', `${cnvLayers[f].offsetTop}`);

    //make width and height as auto
    layerL[f] = cnvLayers[f].offsetLeft;
    layerT[f] = cnvLayers[f].offsetTop;
    layerW[f] = cnvLayers[f].clientWidth;
    layerH[f] = cnvLayers[f].clientHeight;

    createHistory(f, name, 'vector', n);

    //add border
    addBorderLayer(cnvLayers[f], f);

     //DO NOT USE CLICK HERE [!]
    //USING CLICK IS MAKING UP ERROR
    //SINCE MULTIPLE IMAGES AND VECTORS
    //CAN BE UPLOADED AT ONCE
    //IT'S CAUSING CLICK ERROR
    //JUST USE FOCUS FUNCTION INSTEAD 
    canvas2Focus(cnvLayers[f]);
}

function recreateCanvasVector(f, n, pnlBox) {

    let configScroll = document.getElementsByClassName('configScroll');

    cnvLayers[f] = document.createElement('div');
    cnvLayers[f].classList.add('cnvLayers');
    cnvLayers[f].dataset.rotation = valueFinder(dataLayer[f], 'txtRotationLayer');
    cnvLayers[f].dataset.ref = f;
    cnvLayers[f].dataset.thumbno = n;
    cnvLayers[f].dataset.type = "vector";
    cnvLayers[f].style.visibility = "hidden";

    let getSVG = configScroll[2].querySelector(`[data-thumbno = "${n}"]`).children[0];
    
    let cloneSVG = getSVG.cloneNode(true);

    cnvLayers[f].appendChild(cloneSVG);

    cnvLayers[f].children[0].style.filter = "none";

    //then append cnvlayer to cnvmain
    cnvGrpLayers.appendChild(cnvLayers[f]);
    
    //get which is smaller if canvas width or canvas height
    let aspectRatio;
    let vectorW = Number(cnvLayers[f].querySelector('svg').getAttribute('width'));
    let vectorH = Number(cnvLayers[f].querySelector('svg').getAttribute('height'));

    //set min width and height
    aspectRatio = vectorW / vectorH;
    cnvLayers[f].style.minWidth = 20 + 'px';
    cnvLayers[f].style.minHeight = 20 / aspectRatio + 'px';

    addBorderLayer(cnvLayers[f], f);

    configScroll[5].children[0].click();

    validateData(dataLayer[f], pnlBox);
    //make width and height as auto
    layerL[f] = cnvLayers[f].offsetLeft;
    layerT[f] = cnvLayers[f].offsetTop;
    layerW[f] = cnvLayers[f].clientWidth;
    layerH[f] = cnvLayers[f].clientHeight;

    initPanel++;

    if(initPanel == panelCountMax) {
        useImagePanel();
    }

}

function previewVector() {

    //NOTE: this i is index of the 'option' not index of the tabStyle
    let i = Number(this.value) - 1;
    let f = Number(leadPanel.dataset.ref);
    let panel = document.getElementById('pnlBoxVector');

    //preview in panel
    let tabVectorPreview = this.closest('.tabSubLayer').querySelector('.tabVectorPreview');

    //grayscale all svg children
    if(i + 1 > 0) {
        
        for(let a = 0; a < tabVectorPreview.querySelector('g').childElementCount; a++) {
            tabVectorPreview.querySelector('g').children[a].setAttribute("style", "filter: opacity(0%)");
            console.log(tabVectorPreview.querySelector('g').children[a]);
        }
        //now recolor this
        tabVectorPreview.querySelector('g').children[i].setAttribute("style", "filter: opacity(100%)");

        //APPEND SELECTIONS WHEN THERE'S A PATH SELECTED
        panel.querySelector('.contNoPath').style.display = "none";
        panel.querySelector('.contPath').style.display = "block";

    }

    else if(i == 0) {

        for(let a = 0; a < tabVectorPreview.querySelector('g').childElementCount; a++) {
            tabVectorPreview.querySelector('g').children[a].setAttribute("style", "filter: opacity(100%)");
        }

        //grayscale all svg children
        for(let a = 0; a < cnvLayers[f].querySelector('g').childElementCount; a++) {
            cnvLayers[f].querySelector('g').children[a].setAttribute("style", "filter: none");
        }

        //EMPTY OUT THE TAB SINCE NO PATH IS SELECTED
        panel.querySelector('.contNoPath').style.display = "block";
        panel.querySelector('.contPath').style.display = "none";
    }
    
}

function getAllPathProperties() {

    let f = Number(leadPanel.dataset.ref);
    let panel = document.getElementById('pnlBoxVector');
    let path = panel.querySelector('g');
    let b = Number(this.value)-1;

    panel.querySelectorAll('.dropOptionVerti')[1].innerHTML = "";

    if(b >= 0) {

        //check if path has stroke properties---------------------------------
        if(path.children[b].getAttribute('stroke') != null && path.children[b].getAttribute('fill') == null) {

            panel.querySelector('.txtVectorStrokeColor').value = path.children[b].getAttribute('stroke');
            testHexCode(panel.querySelector('.txtVectorStrokeColor'))
            panel.querySelector('.txtVectorStrokeWidth').value = Number(path.children[b].getAttribute('stroke-width'));
            
            //simulate click on stroke
            panel.querySelectorAll('.dropOptionVerti')[1].innerHTML = 
            `<div class="optVectorColor">Stroke</div>`;
                                    
            //stroke opacity
            if(path.children[b].getAttribute('stroke-opacity') != null) {
                panel.querySelector('.txtVectorStrokeOpacity').value = Number(path.children[b].getAttribute('stroke-opacity')) * 100;
                panel.querySelector('.txtVectorStrokeOpacity').previousElementSibling.value = Number(path.children[b].getAttribute('stroke-opacity')) * 100;
            }
            else {
                path.children[b].setAttribute('stroke-opacity', "1");
                panel.querySelector('.txtVectorStrokeOpacity').value = 100;
                panel.querySelector('.txtVectorStrokeOpacity').previousElementSibling.value = 100;
            }

            panel.querySelectorAll('.optVectorColor')[0].addEventListener('click', chooseVectorTab);
            panel.querySelectorAll('.optVectorColor')[0].click();
        }

        else if(path.children[b].getAttribute('stroke') == null && path.children[b].getAttribute('fill') != null) {
            
            panel.querySelector('.txtVectorFillColor').value = path.children[b].getAttribute('fill');
            testHexCode(panel.querySelector('.txtVectorFillColor'))
            
            //simulate click on stroke
            panel.querySelectorAll('.dropOptionVerti')[1].innerHTML = 
            `<div class="optVectorColor">Fill</div>`;
                                    
            //fill opacity
            if(path.children[b].getAttribute('fill-opacity') != null) {
                panel.querySelector('.txtVectorFillOpacity').value = Number(path.children[b].getAttribute('fill-opacity')) * 100;
                panel.querySelector('.txtVectorFillOpacity').previousElementSibling.value = Number(path.children[b].getAttribute('fill-opacity')) * 100;
            }
            else {
                path.children[b].setAttribute('fill-opacity', "1");
                panel.querySelector('.txtVectorFillOpacity').value = 100;
                panel.querySelector('.txtVectorFillOpacity').previousElementSibling.value = 100;
            }

            panel.querySelectorAll('.optVectorColor')[0].addEventListener('click', chooseVectorTab)
            panel.querySelectorAll('.optVectorColor')[0].click();
        }

        else {

            panel.querySelector('.txtVectorStrokeColor').value = path.children[b].getAttribute('stroke').replace('#', '');
            panel.querySelector('.txtVectorStrokeColor').nextElementSibling.style.backgroundColor = path.children[b].getAttribute('stroke');
            
            panel.querySelector('.txtVectorFillColor').value = path.children[b].getAttribute('fill').replace('#', '');
            panel.querySelector('.txtVectorFillColor').nextElementSibling.style.backgroundColor = path.children[b].getAttribute('fill');
                    
            //simulate click on stroke
            panel.querySelectorAll('.dropOptionVerti')[1].innerHTML = 
            `<div class="optVectorColor">Stroke</div>
            <div class="optVectorColor">Fill</div>`;

            //stroke opacity
            if(path.children[b].getAttribute('stroke-opacity') != null) {
                panel.querySelector('.txtVectorStrokeOpacity').value = Number(path.children[b].getAttribute('stroke-opacity')) * 100;
                panel.querySelector('.txtVectorStrokeOpacity').previousElementSibling.value = Number(path.children[b].getAttribute('stroke-opacity')) * 100;
            }
            else {
                path.children[b].setAttribute('stroke-opacity', "1");
                panel.querySelector('.txtVectorStrokeOpacity').value = 100;
                panel.querySelector('.txtVectorStrokeOpacity').previousElementSibling.value = 100;
            }

            //fill opacity
            if(path.children[b].getAttribute('fill-opacity') != null) {
                panel.querySelector('.txtVectorFillOpacity').value = Number(path.children[b].getAttribute('fill-opacity')) * 100;
                panel.querySelector('.txtVectorFillOpacity').previousElementSibling.value = Number(path.children[b].getAttribute('fill-opacity')) * 100;
            }
            else {
                path.children[b].setAttribute('fill-opacity', "1");
                panel.querySelector('.txtVectorFillOpacity').value = 100;
                panel.querySelector('.txtVectorFillOpacity').previousElementSibling.value = 100;
            }

            panel.querySelectorAll('.optVectorColor')[0].addEventListener('click', chooseVectorTab)
            panel.querySelectorAll('.optVectorColor')[1].addEventListener('click', chooseVectorTab)
            panel.querySelectorAll('.optVectorColor')[0].click();
        }
    }

}

document.getElementById('pnlBoxVector').querySelector('.txtSubLayer').addEventListener('input', previewVector); 
document.getElementById('pnlBoxVector').querySelector('.txtSubLayer').addEventListener('input', getAllPathProperties); 
document.getElementById('pnlBoxVector').querySelector('.txtSubLayer').addEventListener('change', getAllPathProperties);
document.getElementById('pnlBoxVector').querySelector('.txtSubLayer').previousElementSibling.addEventListener('input', previewVector);
document.getElementById('pnlBoxVector').querySelector('.txtSubLayer').previousElementSibling.addEventListener('input', getAllPathProperties);
document.getElementById('pnlBoxVector').querySelector('.txtSubLayer').previousElementSibling.addEventListener('change', getAllPathProperties);


for(let b = 0; b < document.querySelectorAll('.optVectorColor').length; b++) {
    document.querySelectorAll('.optVectorColor')[b].addEventListener('click', chooseVectorTab)
}


function chooseVectorTab() {

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

//ADD STROKE EVENTS----------------------------------------

function adjustVectorStrokeColor() {

    let i = Number(document.getElementById('pnlBoxVector').querySelector('.txtSubLayer').value) - 1;
    let f = Number(leadPanel.dataset.ref);
    
    testHexCode(this);

    if(i >= 0) {
        f2Canvas(f).querySelector('g').children[i].setAttribute('stroke', '#' + this.value);
        document.getElementById('pnlBoxVector').querySelector('g').children[i].setAttribute('stroke', '#' + this.value);
    }
    
}
document.getElementById('pnlBoxVector').querySelector('.txtVectorStrokeColor').addEventListener('change', adjustVectorStrokeColor);
document.getElementById('pnlBoxVector').querySelector('.txtVectorStrokeColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustVectorStrokeOpacity() {

    let i = Number(document.getElementById('pnlBoxVector').querySelector('.txtSubLayer').value) - 1;
    let f = Number(leadPanel.dataset.ref);

    if(i >= 0) {
        f2Canvas(f).querySelector('g').children[i].setAttribute('stroke-opacity', this.value/100);
        document.getElementById('pnlBoxVector').querySelector('g').children[i].setAttribute('stroke-opacity', this.value/100);
    }
}
document.getElementById('pnlBoxVector').querySelector('.txtVectorStrokeOpacity').addEventListener('change', adjustVectorStrokeOpacity);
document.getElementById('pnlBoxVector').querySelector('.txtVectorStrokeOpacity').previousElementSibling.addEventListener('input', adjustVectorStrokeOpacity);

function adjustVectorFillColor() {

    let i = Number(document.getElementById('pnlBoxVector').querySelector('.txtSubLayer').value) - 1;
    let f = Number(leadPanel.dataset.ref);

    testHexCode(this);
    
    if(i >= 0) {
        f2Canvas(f).querySelector('g').children[i].setAttribute('fill', '#' + this.value);
        document.getElementById('pnlBoxVector').querySelector('g').children[i].setAttribute('fill', '#' + this.value);
    }
}
document.getElementById('pnlBoxVector').querySelector('.txtVectorFillColor').addEventListener('change', adjustVectorFillColor);
document.getElementById('pnlBoxVector').querySelector('.txtVectorFillColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustVectorFillOpacity() {

    let i = Number(document.getElementById('pnlBoxVector').querySelector('.txtSubLayer').value) - 1;
    let f = Number(leadPanel.dataset.ref);

    if(i >= 0) {
        f2Canvas(f).querySelector('g').children[i].setAttribute('fill-opacity', this.value/100);
        document.getElementById('pnlBoxVector').querySelector('g').children[i].setAttribute('fill-opacity', this.value/100);
    }
  
}
document.getElementById('pnlBoxVector').querySelector('.txtVectorFillOpacity').addEventListener('change', adjustVectorFillOpacity);
document.getElementById('pnlBoxVector').querySelector('.txtVectorFillOpacity').previousElementSibling.addEventListener('input', adjustVectorFillOpacity);

































function showBasicBoxVector(){
    this.closest('#pnlBoxVector').children[0].children[0].innerText = "Vector Settings";
    this.closest('#pnlBoxVector').querySelector('.tabSliderBox3').style.translate = "0%"; //slide tab
    this.closest('#pnlBoxVector').querySelector('.pnlBottomBoxThumb3').style.translate = "0%"; //slide scroll thumb
}
document.querySelector('#pnlBoxVector').querySelector('.btnBasicBox').addEventListener('click', btnBottomClick); //default the btnBasic to white
document.querySelector('#pnlBoxVector').querySelector('.btnBasicBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxVector').querySelector('.btnBasicBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxVector').querySelector('.btnBasicBox').addEventListener('click', showBasicBoxVector);
document.querySelector('#pnlBoxVector').querySelector('.btnBasicBox').children[0].style.filter = "saturate(0) brightness(2)";
document.querySelector('#pnlBoxVector').querySelector('.btnBasicBox').children[0].style.transition = ".2s";

function showSubLayer() {
    this.closest('#pnlBoxVector').children[0].children[0].innerText = "Vector Paths";
    this.closest('#pnlBoxVector').querySelector('.tabSliderBox3').style.translate = "-100%"; //slide tab to left
    this.closest('#pnlBoxVector').querySelector('.pnlBottomBoxThumb3').style.translate = "100%"; //slide thumb to right
}
document.querySelector('#pnlBoxVector').querySelector('.btnSubLayer').addEventListener('click', btnBottomClick); //default the btnColor to white
document.querySelector('#pnlBoxVector').querySelector('.btnSubLayer').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxVector').querySelector('.btnSubLayer').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxVector').querySelector('.btnSubLayer').addEventListener('click', showSubLayer);
document.querySelector('#pnlBoxVector').querySelector('.btnSubLayer').children[0].style.transition = ".2s";

function showColorBoxVector() {
    this.closest('#pnlBoxVector').children[0].children[0].innerText = "Vector Color";
    this.closest('#pnlBoxVector').querySelector('.tabSliderBox3').style.translate = "-200%"; //slide tab to left
    this.closest('#pnlBoxVector').querySelector('.pnlBottomBoxThumb3').style.translate = "200%"; //slide thumb to right
}

document.querySelector('#pnlBoxVector').querySelector('.btnColorBox').addEventListener('click', btnBottomClick); //default the btnStyle to white
document.querySelector('#pnlBoxVector').querySelector('.btnColorBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxVector').querySelector('.btnColorBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxVector').querySelector('.btnColorBox').addEventListener('click', showColorBoxVector);
document.querySelector('#pnlBoxVector').querySelector('.btnColorBox').children[0].style.transition = ".2s";


