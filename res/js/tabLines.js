

var elements = [];

elements[0] = {
    id: 'line',
    type: 'line',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'shapes, straight line, regular line',
    source: `<svg id="line" width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 1L18 1" stroke="white" stroke-width="1"/>
    </svg>`,
}

elements[1] = {
    id: 'line miter',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line miter, blunt line, square line',
    source: ``,
}

elements[2] = {
    id: 'line round',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line round, round line',
    source: `<svg id="line" width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 1L18 1" stroke="white" stroke-width="1" stroke-linecap="round"/>
    </svg>`,
    }

elements[3] = {
    id: 'line arrow',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line arrow',
    source: `<svg id="line arrow" width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 1L1 3.5L3.5 6M1.5 3.5H6" stroke="white"/>
    </svg>`,
}

elements[4] = {
    id: 'line arrow fill',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'true',
    tags: 'line arrow, arrowhead, arrow head, arrow fill',
    source: `<svg id="line arrow fill" width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2.5L5 4V2.5V1L2 2.5Z" fill="white"/>
    <path d="M5 2.5V4L2 2.5L5 1V2.5ZM5 2.5H6" stroke="white"/>
    </svg>`,
}

elements[5] = {
    id: 'line circle',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line circle, line ellipse',
    source: `<svg id="line circle" width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2.5C5 3.60457 4.10457 4.5 3 4.5C1.89543 4.5 1 3.60457 1 2.5C1 1.39543 1.89543 0.500004 3 0.500004C4.10457 0.500004 5 1.39543 5 2.5ZM5 2.5H6" stroke="white"/>
    </svg>`,
}

elements[6] = {
    id: 'line circle fill',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'true',
    tags: 'line circle, line ellipse, line circle fill, line ellipse fill',
    source: `<svg id="line circle fill" width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2.5C5 3.60457 4.10457 4.5 3 4.5C1.89543 4.5 1 3.60457 1 2.5C1 1.39543 1.89543 0.500004 3 0.500004C4.10457 0.500004 5 1.39543 5 2.5ZM5 2.5H6" stroke="white" fill="white"/>
    </svg>`,
}

elements[7] = {
    id: 'line diamond',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line diamond',
    source: `<svg id="line diamond" width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3.50001L3 1.50001L1 3.50001L3 5.50001L5 3.50001ZM5 3.50001H6" stroke="white"/>
    </svg>`,
}

elements[8] = {
    id: 'line diamond fill',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'true',
    tags: 'line diamond, line diamond fill',
    source: `<svg id="line diamond fill" width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3.50001L3 1.50001L1 3.50001L3 5.50001L5 3.50001ZM5 3.50001H6" stroke="white" fill="white"/>
    </svg>`,
}

elements[9] = {
    id: 'line square',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line square',
    source: `<svg id="line square" width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2.5V0.500004H1V4.5H5V2.5ZM5 2.5H6" stroke="white"/>
    </svg>`,
}

elements[10] = {
    id: 'line square fill',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'true',
    tags: 'line square, line square fill',
    source: `<svg id="line square fill" width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2.5V0.500004H1V4.5H5V2.5ZM5 2.5H6" stroke="white" fill="white"/>
    </svg>`,
}

elements[11] = {
    id: 'line triangle',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'false',
    tags: 'line triangle',
    source: `<svg id="line triangle" width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3.5L1 5.23205L1 1.76795L4 3.5ZM4 3.5L6 3.5" stroke="white"/>
    </svg>`,
}

elements[12] = {
    id: 'line triangle fill',
    type: 'head',
    size: 'mini',
    post: 'center',
    fill: 'true',
    tags: 'line triangle, line triangle fill',
    source: `<svg id="line triangle fill" width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3.5L1 5.23205L1 1.76795L4 3.5ZM4 3.5L6 3.5" stroke="white"/>
    </svg>`,
}

//======================CREATE LINE===================

function createLine(f) {
    
    let panel = document.getElementById('pnlBoxLine');
    let txtSizeWidth = document.querySelector('.txtSizeWidth');
    let txtSizeHeight = document.querySelector('.txtSizeHeight');

    //get fill and stroke color
    //var fillColor = panel.querySelector('.txtVectorFillColor').value;
    let strokeColor = panel.querySelector('.txtLineStrokeColor').value;
    let strokeWidth = Number(panel.querySelector('.txtLineStrokeWidth').value);
 
    //create div start line
    var divLineStart = document.createElement('div');
    divLineStart.innerHTML = elements[1].source;
    divLineStart.classList.add('divLineStart');
    cnvLayers[f].appendChild(divLineStart);

    //reposition divLineStart SVG
    divLineStart.style.width = `${strokeWidth*4}px`;
    divLineStart.style.minWidth = `${strokeWidth*4}px`;
    divLineStart.style.left = divLineStart.clientLeft + 2 + 'px';

    var divLineMid = document.createElement('div');
    divLineMid.innerHTML = elements[0].source;
    divLineMid.classList.add('divLineMid');
    cnvLayers[f].appendChild(divLineMid);

    var pathW = Number(divLineMid.children[0].getAttribute('width'));
    var pathH = Number(divLineMid.children[0].getAttribute('height'));
    divLineMid.querySelector('path').setAttribute('d', `M0 ${pathH/2}H${pathW}`)

    var divLineEnd = document.createElement('div');
    divLineEnd.innerHTML = elements[1].source;
    divLineEnd.classList.add('divLineEnd');
    cnvLayers[f].appendChild(divLineEnd);

    //reposition divLineEnd SVG
    divLineEnd.style.width = `${strokeWidth*4}px`;
    divLineEnd.style.minWidth = `${strokeWidth*4}px`;
    divLineEnd.style.left = divLineStart.clientLeft - 2 + 'px';

    var paths = cnvLayers[f].querySelectorAll('path');
    paths.forEach(function(input) {
        input.setAttribute('stroke', '#' + strokeColor);
        input.setAttribute('stroke-width', strokeWidth);
        input.setAttribute('vector-effect', 'non-scaling-stroke');
    })

    cnvLayers[f].style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
    cnvLayers[f].style.height =  `${strokeWidth*2}px`;
    cnvLayers[f].style.minHeight =  `${strokeWidth*2}px`;
    cnvLayers[f].style.minWidth = cnvLayers[f].clientHeight * 2 + 'px';
    cnvLayers[f].style.left = `${(txtSizeWidth.value / 2) - (cnvLayers[f].clientWidth/2)}px`;
    cnvLayers[f].style.top = `${(txtSizeHeight.value / 2) - (cnvLayers[f].clientHeight/2)}px`;

    organizeLine(f);
}

function recreateLine(f) {
    
    let panel = document.getElementById('pnlBoxLine');

    //get fill and stroke color
    //var fillColor = panel.querySelector('.txtVectorFillColor').value;
    let strokeColor = panel.querySelector('.txtLineStrokeColor').value;
    let strokeWidth = Number(panel.querySelector('.txtLineStrokeWidth').value);
 
    //create div start line
    var divLineStart = document.createElement('div');
    divLineStart.innerHTML = elements[1].source;
    divLineStart.classList.add('divLineStart');
    cnvLayers[f].appendChild(divLineStart);

    //reposition divLineStart SVG
    divLineStart.style.width = `${strokeWidth*4}px`;
    divLineStart.style.minWidth = `${strokeWidth*4}px`;

    var divLineMid = document.createElement('div');
    divLineMid.innerHTML = elements[0].source;
    divLineMid.classList.add('divLineMid');
    cnvLayers[f].appendChild(divLineMid);

    var pathW = Number(divLineMid.children[0].getAttribute('width'));
    var pathH = Number(divLineMid.children[0].getAttribute('height'));
    divLineMid.querySelector('path').setAttribute('d', `M0 ${pathH/2}H${pathW}`)

    var divLineEnd = document.createElement('div');
    divLineEnd.innerHTML = elements[1].source;
    divLineEnd.classList.add('divLineEnd');
    cnvLayers[f].appendChild(divLineEnd);

    //reposition divLineEnd SVG
    divLineEnd.style.width = `${strokeWidth*4}px`;
    divLineEnd.style.minWidth = `${strokeWidth*4}px`;

    var paths = cnvLayers[f].querySelectorAll('path');
    paths.forEach(function(input) {
        input.setAttribute('stroke', '#' + strokeColor);
        input.setAttribute('stroke-width', strokeWidth);
        input.setAttribute('vector-effect', 'non-scaling-stroke');
    })

    cnvLayers[f].style.width = `${valueFinder(dataLayer[f], 'txtWidthLayer')}px`;
    cnvLayers[f].style.height =  `${valueFinder(dataLayer[f], 'txtHeightLayer')}px`;
    cnvLayers[f].style.minHeight =  `${strokeWidth}px`;
    cnvLayers[f].style.minWidth = cnvLayers[f].clientHeight * 2 + 'px';
    cnvLayers[f].style.left = `${valueFinder(dataLayer[f], 'txtXLayer')}px`;
    cnvLayers[f].style.top = `${valueFinder(dataLayer[f], 'txtYLayer')}px`;

    
}


function organizeLine(f) {

    let panel = document.getElementById('pnlBoxLine');
    var startHead = panel.querySelector('.dropdownLineStart').querySelector('svg').id;
    var endHead = panel.querySelector('.dropdownLineEnd').querySelector('svg').id;

    var strokeColor = panel.querySelector('.txtLineStrokeColor').value;
    var strokeWidth = Number(panel.querySelector('.txtLineStrokeWidth').value);

    var divLineStart = cnvLayers[f].querySelector('.divLineStart');
    var divLineMid = cnvLayers[f].querySelector('.divLineMid');
    var divLineEnd = cnvLayers[f].querySelector('.divLineEnd');


    for(var a = 0; a < elements.length; a++) {
        if(elements[a].id == startHead) {

            divLineStart.innerHTML = elements[a].source;
            //start with starthead
            if(startHead == "line miter") {
                
                divLineStart.style.display = "none";

                var pathW = Number(cnvLayers[f].clientWidth);
                var pathH = Number(cnvLayers[f].clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                divLineMid.querySelector('svg').style.width = pathW + 'px';
                divLineMid.querySelector('svg').style.height = pathH + 'px';
                divLineMid.querySelector('svg').style.position = "absolute";
  
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');

                cnvLayers[f].style.height =  `${Number(strokeWidth)*5}px`;
                cnvLayers[f].style.minHeight =  `${Number(strokeWidth)*5}px`;
            }
            else if(startHead == "line round") {
                //redraw path 1px smaller from both ends
                divLineStart.style.display = "flex";
                
                var pathW = Number(divLineStart.children[0].getAttribute('width'));
                var pathH = Number(divLineStart.children[0].getAttribute('height'));
                divLineStart.querySelector('path').setAttribute('d', `M${3} ${pathH/2}H${pathW}`)
                divLineStart.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineStart.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineStart.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');

                pathW = Number(cnvLayers[f].clientWidth - divLineEnd.clientWidth - divLineStart.clientWidth);
                pathH = Number(cnvLayers[f].clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').style.width = pathW + 'px'
                divLineMid.querySelector('svg').style.height = pathH + 'px'
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');

                var svgs = cnvLayers[f].querySelectorAll('svg');
                svgs.forEach(svg => {
                    svg.style.position = "static";
                })

                cnvLayers[f].style.height =  `${Number(strokeWidth)*5}px`;
                cnvLayers[f].style.minHeight =  `${Number(strokeWidth)*5}px`;
            }
            else {

                divLineStart.style.display = "flex";
                cnvLayers[f].style.height =  `${Number(strokeWidth)*5}px`;
                cnvLayers[f].style.minHeight =  `${Number(strokeWidth)*5}px`;
                
                //all paths for any custom heads
                var paths = divLineStart.querySelectorAll('path');
                paths.forEach(function(input) {
                    input.setAttribute('stroke', '#' + strokeColor);
                    input.setAttribute('stroke-width', strokeWidth);
                    input.setAttribute('vector-effect', 'non-scaling-stroke');
                    
                    if(elements[a].fill == 'true') {
                        input.setAttribute('fill', '#' + strokeColor);
                    }
                    else if(elements[a].fill == 'false') {
                        input.setAttribute('fill', 'transparent');
                    }
                })
                
                pathW = Number(cnvLayers[f].clientWidth - divLineEnd.clientWidth - divLineStart.clientWidth);
                pathH = Number(cnvLayers[f].clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').style.width = pathW + 'px'
                divLineMid.querySelector('svg').style.height = pathH + 'px'
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');

                var svgs = cnvLayers[f].querySelectorAll('svg');
                svgs.forEach(svg => {
                    svg.style.position = "static";
                })

            }
        }

        if(elements[a].id == endHead) {

            divLineEnd.innerHTML = elements[a].source;
            //start with endhead
            if(endHead == "line miter") {
                divLineEnd.style.display = "none";

                var pathW = Number(cnvLayers[f].clientWidth);
                var pathH = Number(cnvLayers[f].clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                divLineMid.querySelector('svg').style.width = pathW + 'px';
                divLineMid.querySelector('svg').style.height = pathH + 'px';
                divLineMid.querySelector('svg').style.position = "absolute";
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');

                cnvLayers[f].style.height =  `${Number(strokeWidth)*5}px`;
                cnvLayers[f].style.minHeight =  `${Number(strokeWidth)*5}px`;
            }
            else if(endHead == "line round") {
                divLineEnd.style.display = "flex";
            
                var pathW = Number(divLineEnd.children[0].getAttribute('width'));
                var pathH = Number(divLineEnd.children[0].getAttribute('height'));
                divLineEnd.querySelector('path').setAttribute('d', `M${3} ${pathH/2}H${pathW}`)
                divLineEnd.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineEnd.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineEnd.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');

                pathW = Number(cnvLayers[f].clientWidth - divLineEnd.clientWidth - divLineStart.clientWidth);
                pathH = Number(cnvLayers[f].clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').style.width = pathW + 'px'
                divLineMid.querySelector('svg').style.height = pathH + 'px'
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');

                var svgs = cnvLayers[f].querySelectorAll('svg');
                svgs.forEach(svg => {
                    svg.style.position = "static";
                })

                cnvLayers[f].style.height =  `${Number(strokeWidth)*5}px`;
                cnvLayers[f].style.minHeight =  `${Number(strokeWidth)*5}px`;
            }
            else {

                divLineEnd.style.display = "flex";
                cnvLayers[f].style.height =  `${Number(strokeWidth)*5}px`;
                cnvLayers[f].style.minHeight =  `${Number(strokeWidth)*5}px`;

                var paths = divLineEnd.querySelectorAll('path');
                paths.forEach(function(input) {
                    input.setAttribute('stroke', '#' + strokeColor);
                    input.setAttribute('stroke-width', strokeWidth);
                    input.setAttribute('vector-effect', 'non-scaling-stroke');
                    
                    if(elements[a].fill == 'true') {
                        input.setAttribute('fill', '#' + strokeColor);
                    }
                    else if(elements[a].fill == 'false') {
                        input.setAttribute('fill', 'transparent');
                    }
                })

                pathW = Number(cnvLayers[f].clientWidth - divLineEnd.clientWidth - divLineStart.clientWidth);
                pathH = Number(cnvLayers[f].clientHeight);
                
                divLineMid.querySelector('svg').setAttribute('width', pathW);
                divLineMid.querySelector('svg').setAttribute('height', pathH);
                divLineMid.querySelector('svg').style.width = pathW + 'px'
                divLineMid.querySelector('svg').style.height = pathH + 'px'
                divLineMid.querySelector('svg').setAttribute('viewBox', `0 0 ${pathW} ${pathH}`);
                
                divLineMid.querySelector('path').setAttribute('d', `M${0} ${pathH/2}H${pathW}`);
                divLineMid.querySelector('path').setAttribute('stroke', '#' + strokeColor);
                divLineMid.querySelector('path').setAttribute('stroke-width', strokeWidth);
                divLineMid.querySelector('path').setAttribute('vector-effect', 'non-scaling-stroke');

                var svgs = cnvLayers[f].querySelectorAll('svg');
                svgs.forEach(svg => {
                    svg.style.position = "static";
                })

            }
        }
    }

    if(!isResizing && !isScaling) {
         //adjust the X axis when stroke was adjusted
        var newW = layerW[f] - cnvLayers[f].clientWidth;
        cnvLayers[f].style.left = (layerL[f] + newW / 2) + 'px';

        //adjust the Y axis when stroke was adjusted
        var newH = layerH[f] - cnvLayers[f].clientHeight;
        layerH[f] = cnvLayers[f].clientHeight;

        cnvLayers[f].style.top = (layerT[f] + newH / 2) + 'px';
        layerT[f] = cnvLayers[f].offsetTop;
    } 

    adjustBorder();

    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtWidthLayer', `${cnvLayers[f].clientWidth}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtHeightLayer', `${cnvLayers[f].clientHeight}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtXLayer', `${cnvLayers[f].offsetLeft}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtYLayer', `${cnvLayers[f].offsetTop}`);
    
}

function renderLine(f) {
    
    let panel = document.getElementById('pnlBoxLine');
    let startHead = panel.querySelector('.dropdownLineStart').querySelector('svg').id;
    let endHead = panel.querySelector('.dropdownLineEnd').querySelector('svg').id;

    for(var a = 0; a < elements.length; a++) {
        if(elements[a].id == startHead) {
            organizeLine(f)
        }
        if(elements[a].id == endHead) {
            organizeLine(f)
        }
    }   

}

//============================LAYER BLEND======================
//function already exist, just add event listeners


//=============================LAYER WIDTH / HEIGHT SIZE=====================
document.getElementById('pnlBoxLine').querySelector('.txtWidthLayer').addEventListener('change', adjustLayerWidth);
document.getElementById('pnlBoxLine').querySelector('.txtHeightLayer').addEventListener('change', adjustLayerHeight);

//=============================LAYER X / Y COORDINATES====================
document.getElementById('pnlBoxLine').querySelector('.txtXLayer').addEventListener('change', adjustLayerX);
document.getElementById('pnlBoxLine').querySelector('.txtYLayer').addEventListener('change', adjustLayerY);

//=============================FLIP X / Y COORDINATES====================
document.getElementById('pnlBoxLine').querySelector('.chkFlipX').addEventListener('click', adjustFlipX);

document.getElementById('pnlBoxLine').querySelector('.chkFlipY').addEventListener('click', adjustFlipY);

//==============================LAYER OPACITY========================
document.getElementById('pnlBoxLine').querySelector('.txtOpacityLayer').addEventListener('change', chooseLayerOpacity);
document.getElementById('pnlBoxLine').querySelector('.txtOpacityLayer').previousElementSibling.addEventListener('input', chooseLayerOpacity);

//==============================LAYER ROTATION========================
document.getElementById('pnlBoxLine').querySelector('.txtRotationLayer').addEventListener('change', chooseLayerRotation);
document.getElementById('pnlBoxLine').querySelector('.txtRotationLayer').previousElementSibling.addEventListener('input', chooseLayerRotation);


function createPnlBoxLine(n) {

    let f = maxF; //get the length of pnlBoxPatterns and use it as layer count
    maxF++;
    let name = autoIncrementHeader("Element");
    let configScroll = document.getElementsByClassName('configScroll');

    let getSVG = configScroll[3].querySelector(`[data-thumbno = "${n}"]`).children[0];
    getSVG.style.filter = "none";

    var newLine = 
    `<div class="pnlBoxLayer" data-thumbno="${n}" data-type="line" data-ref="${f}">
        <div class="pnlTitleLayer" style="height: 40px;">
            <div class="iconLayer">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.75 0.5C16.1349 -0.166667 17.0971 -0.166667 17.482 0.5L21.3791 7.25C21.764 7.91667 21.2829 8.75 20.5131 8.75H12.7189C11.9491 8.75 11.4679 7.91667 11.8528 7.25L15.75 0.5Z" fill="white"/>
                    <path d="M21.116 15.5C21.116 17.9853 19.1013 20 16.616 20C14.1307 20 12.116 17.9853 12.116 15.5C12.116 13.0147 14.1307 11 16.616 11C19.1013 11 21.116 13.0147 21.116 15.5Z" fill="white"/>
                    <path d="M0.115979 1C0.115979 0.447715 0.563694 7.4635e-08 1.11598 7.4635e-08H8.11598C8.66826 7.4635e-08 9.11598 0.447715 9.11598 1V8C9.11598 8.55228 8.66826 9 8.11598 9H1.11598C0.563694 9 0.115979 8.55228 0.115979 8V1Z" fill="white"/>
                    <path d="M4.45029 11.2449C4.52961 11.1276 4.70228 11.1276 4.7816 11.2449L6.32693 13.5291C6.35317 13.5679 6.39219 13.5962 6.43719 13.6092L9.08716 14.373C9.22318 14.4122 9.27653 14.5765 9.18954 14.6881L7.49464 16.8637C7.46586 16.9006 7.45095 16.9465 7.45252 16.9933L7.54496 19.7496C7.54971 19.8911 7.41001 19.9926 7.27693 19.9444L4.68409 19.0047C4.64006 18.9887 4.59183 18.9887 4.5478 19.0047L1.95496 19.9444C1.82188 19.9926 1.68218 19.8911 1.68693 19.7496L1.77937 16.9933C1.78094 16.9465 1.76603 16.9006 1.73725 16.8637L0.0423473 14.6881C-0.0446471 14.5765 0.00871085 14.4122 0.144726 14.373L2.7947 13.6092C2.8397 13.5962 2.87872 13.5679 2.90496 13.5291L4.45029 11.2449Z" fill="white"/>
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
    temp.innerHTML = newLine;

    configScroll[5].prepend(temp.children[0]); //add the child on top of the previous one
    configScroll[5].querySelector('.txtHeader').addEventListener('dblclick', renameTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('click', clickTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('focusout', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', encodeTxtHeader);

    //add the show and hide control
    configScroll[5].querySelector('.btnShowHide').addEventListener('click', showHideLayers);
    
    addPnlBoxLine(f, n, name);
}

function recreatePnlBoxLine(f, n, name) {

    let configScroll = document.getElementsByClassName('configScroll');

    let getSVG = configScroll[3].querySelector(`[data-thumbno = "${n}"]`).children[0];
    getSVG.style.filter = "none";

    var newLine = 
    `<div class="pnlBoxLayer" data-thumbno="${n}" data-type="line" data-ref="${f}">
        <div class="pnlTitleLayer">
            <div class="iconLayer">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.75 0.5C16.1349 -0.166667 17.0971 -0.166667 17.482 0.5L21.3791 7.25C21.764 7.91667 21.2829 8.75 20.5131 8.75H12.7189C11.9491 8.75 11.4679 7.91667 11.8528 7.25L15.75 0.5Z" fill="#647499"/>
                    <path d="M21.116 15.5C21.116 17.9853 19.1013 20 16.616 20C14.1307 20 12.116 17.9853 12.116 15.5C12.116 13.0147 14.1307 11 16.616 11C19.1013 11 21.116 13.0147 21.116 15.5Z" fill="#647499"/>
                    <path d="M0.115979 1C0.115979 0.447715 0.563694 7.4635e-08 1.11598 7.4635e-08H8.11598C8.66826 7.4635e-08 9.11598 0.447715 9.11598 1V8C9.11598 8.55228 8.66826 9 8.11598 9H1.11598C0.563694 9 0.115979 8.55228 0.115979 8V1Z" fill="#647499"/>
                    <path d="M4.45029 11.2449C4.52961 11.1276 4.70228 11.1276 4.7816 11.2449L6.32693 13.5291C6.35317 13.5679 6.39219 13.5962 6.43719 13.6092L9.08716 14.373C9.22318 14.4122 9.27653 14.5765 9.18954 14.6881L7.49464 16.8637C7.46586 16.9006 7.45095 16.9465 7.45252 16.9933L7.54496 19.7496C7.54971 19.8911 7.41001 19.9926 7.27693 19.9444L4.68409 19.0047C4.64006 18.9887 4.59183 18.9887 4.5478 19.0047L1.95496 19.9444C1.82188 19.9926 1.68218 19.8911 1.68693 19.7496L1.77937 16.9933C1.78094 16.9465 1.76603 16.9006 1.73725 16.8637L0.0423473 14.6881C-0.0446471 14.5765 0.00871085 14.4122 0.144726 14.373L2.7947 13.6092C2.8397 13.5962 2.87872 13.5679 2.90496 13.5291L4.45029 11.2449Z" fill="#647499"/>
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
    temp.innerHTML = newLine;

    configScroll[5].prepend(temp.children[0]); //add the child on top of the previous one
    configScroll[5].querySelector('.txtHeader').addEventListener('dblclick', renameTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('click', clickTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('focusout', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', encodeTxtHeader);

    //add the show and hide control
    configScroll[5].querySelector('.btnShowHide').addEventListener('click', showHideLayers);
    
}

function addPnlBoxLine(f, n, name) {

    dataLayer[f] = '\n*';
    dataLayer[f] += `\nref: ${f}`;
    dataLayer[f] += `\npnlBoxLine: ${name}`;
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

    dataLayer[f] += `\ndropdownLineStart 0: line miter`;
    dataLayer[f] += `\ndropdownLineEnd 0: line miter`;
    dataLayer[f] += `\ntxtLineStrokeColor: 647499`;
    dataLayer[f] += `\ntxtLineStrokeWidth: 10`;
    dataLayer[f] += `\ntxtLineStrokeDash: 0`;
    dataLayer[f] += `\ntxtLineStrokeGap: 0`;
    dataLayer[f] += `\nchkLineStrokeCap: false`;

    //after all assigned controls then create the actual pattern layer
    createCanvasLine(f, n, name)
}

function createCanvasLine(f, n, name) {     

    cnvLayers[f] = document.createElement('div');
    cnvLayers[f].classList.add('cnvLayers');
    cnvLayers[f].dataset.rotation = 0;
    cnvLayers[f].dataset.ref = f;
    cnvLayers[f].dataset.thumbno = n;
    cnvLayers[f].dataset.type = "line";
    cnvLayers[f].style.minWidth = 20 + 'px';
    cnvLayers[f].style.minHeight = 20 + 'px';
    cnvLayers[f].style.overflow = "visible";
    cnvLayers[f].style.display = "flex";
    cnvLayers[f].style.visibility = "visible";

    // append cnvlayer to cnvmain
    cnvGrpLayers.appendChild(cnvLayers[f]);

    createLine(f);
    
    //make width and height as auto
    layerL[f] = cnvLayers[f].offsetLeft;
    layerT[f] = cnvLayers[f].offsetTop;
    layerW[f] = cnvLayers[f].clientWidth;
    layerH[f] = cnvLayers[f].clientHeight;

    //add border
    addBorderLayer(cnvLayers[f], f)
    
    createHistory(f, name, 'line', n);

    let configScroll = document.getElementsByClassName('configScroll');
    configScroll[5].children[0].click();

}

function recreateCanvasLine(f, n, pnlBox) {     

    cnvLayers[f] = document.createElement('div');
    cnvLayers[f].classList.add('cnvLayers');
    cnvLayers[f].dataset.rotation = valueFinder(dataLayer[f], 'txtRotationLayer');
    cnvLayers[f].dataset.ref = f;
    cnvLayers[f].dataset.thumbno = n;
    cnvLayers[f].dataset.type = "line";
    cnvLayers[f].style.minWidth = 20 + 'px';
    cnvLayers[f].style.minHeight = 20 + 'px';
    cnvLayers[f].style.overflow = "visible";
    cnvLayers[f].style.display = "flex";
    cnvLayers[f].style.visibility = "hidden";

    // append cnvlayer to cnvmain
    cnvGrpLayers.appendChild(cnvLayers[f]);

    recreateLine(f, 'upload');

    //add border
    addBorderLayer(cnvLayers[f], f)
    
    let configScroll = document.getElementsByClassName('configScroll');
    configScroll[5].children[0].click();

    validateData(dataLayer[f], pnlBox);

    //make width and height as auto
    layerL[f] = cnvLayers[f].offsetLeft;
    layerT[f] = cnvLayers[f].offsetTop;
    layerW[f] = cnvLayers[f].clientWidth;
    layerH[f] = cnvLayers[f].clientHeight;

    
    initPanel++;
    if(initPanel == panelCountMax) {
        useVectorPanel();
    }

}

for(var b = 0; b < document.getElementById('pnlBoxLine').querySelectorAll('.optLineHead').length; b++) {
    document.getElementById('pnlBoxLine').querySelectorAll('.optLineHead')[b].addEventListener('click', chooseLineHead);
}


function chooseLineHead() {

    let f = Number(leadPanel.dataset.ref)
    let getSVG = this.children[0].outerHTML;

    this.closest('.pnlDropSide').children[0].children[0].innerHTML = getSVG;
    this.closest('.pnlDropSide').querySelector('svg').style.width = "60%";
    this.closest('.pnlDropSide').querySelector('svg').style.height = "auto";

    //if dropdown is for line start
    if(this.closest('.pnlDropSide').children[0].className == 'dropdownLineStart') {
        
        this.closest('.pnlDropSide').querySelector('svg').style.transform = "translateX(9px)";
    }
    //if dropdown is for line end
    else {
        this.closest('.pnlDropSide').querySelector('svg').style.transform = "translateX(9px)";
    }

    adjustBorder()

    organizeLine(f)
    
}

//ADD STROKE EVENTS----------------------------------------
function adjustLineStrokeColor() {

    //change stroke color for lead
    testHexCode(this);

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "line") {

                var paths = canvas.querySelectorAll('path');
                for(let b = 0; b < paths.length; b++) {
                    paths[b].setAttribute('stroke', '#' + this.value);
                    paths[b].setAttribute('fill', '#' + this.value);
                }
            }
        }
    }
}
document.getElementById('pnlBoxLine').querySelector('.txtLineStrokeColor').addEventListener('change', adjustLineStrokeColor);
document.getElementById('pnlBoxLine').querySelector('.txtLineStrokeColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustLineStrokeWidth() {
 
    let panel = document.getElementById('pnlBoxLine');
    let me = panel.querySelector('.txtLineStrokeWidth');
    let startHead = panel.querySelector('.dropdownLineStart').querySelector('svg').id;
    let endHead = panel.querySelector('.dropdownLineEnd').querySelector('svg').id;

    panel.querySelector('.txtLineStrokeWidth').value = me.value;
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "line") {

                if(startHead != "line miter" || endHead != "line miter") {
                    canvas.style.width = layerW[f] + me.value * 8 + 'px';
                    canvas.style.minWidth = canvas.clientHeight * 2 + 'px';
                }
            
                canvas.querySelector('.divLineStart').style.width = me.value * 4 + 'px';
                canvas.querySelector('.divLineStart').style.minWidth = me.value * 4 + 'px';
            
                canvas.querySelector('.divLineEnd').style.width = me.value * 4 + 'px';
                canvas.querySelector('.divLineEnd').style.minWidth = me.value * 4 + 'px';
            
                organizeLine(f);
            }
        }
    }

            
}
document.getElementById('pnlBoxLine').querySelector('.txtLineStrokeWidth').addEventListener('change', adjustLineStrokeWidth);
document.getElementById('pnlBoxLine').querySelector('.txtLineStrokeWidth').previousElementSibling.addEventListener('input', adjustLineStrokeWidth);

function adjustLineStrokeDash() {

    let panel = document.getElementById('pnlBoxLine');

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "line") {
                canvas.querySelector('.divLineMid').querySelector('path').setAttribute('stroke-dasharray', `${panel.querySelector('.txtLineStrokeDash').value} ${panel.querySelector('.txtLineStrokeGap').value}`);
    
                if(this.className == "txtLineStrokeDash") {
                    panel.querySelector('.txtLineStrokeDash').value = this.value;
                }
                else if(this.className == "txtLineStrokeGap") {
                    panel.querySelector('.txtLineStrokeGap').value = this.value;
                }
                
                
            }
        }
    }

    adjustBorder();
}

document.getElementById('pnlBoxLine').querySelector('.txtLineStrokeDash').addEventListener('change', adjustLineStrokeDash);
document.getElementById('pnlBoxLine').querySelector('.txtLineStrokeDash').previousElementSibling.addEventListener('input', adjustLineStrokeDash);

document.getElementById('pnlBoxLine').querySelector('.txtLineStrokeGap').addEventListener('change', adjustLineStrokeDash);
document.getElementById('pnlBoxLine').querySelector('.txtLineStrokeGap').previousElementSibling.addEventListener('input', adjustLineStrokeDash);

function adjustLineStrokeCap() {

    let panel = document.getElementById('pnlBoxLine');

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "line") {

                if(this.dataset.value == "true") {

                    canvas.querySelector('.divLineMid').querySelector('path').setAttribute('stroke-linecap', "round");
                    canvas.querySelector('.divLineMid').querySelector('path').setAttribute('stroke-dasharray', `${panel.querySelector('.txtLineStrokeDash').value} ${panel.querySelector('.txtLineStrokeGap').value}`);
                
                }
            
                else if(this.dataset.value == "false") { 
            
                    canvas.querySelector('.divLineMid').querySelector('path').setAttribute('stroke-linecap', "butt");
                    canvas.querySelector('.divLineMid').querySelector('path').setAttribute('stroke-dasharray', `${panel.querySelector('.txtLineStrokeDash').value} ${panel.querySelector('.txtLineStrokeGap').value}`);
                
                }  

            }
        }
    }
  
}

document.getElementById('pnlBoxLine').querySelector('.chkLineStrokeCap').addEventListener('click', adjustLineStrokeCap);

//================================BOTTOM BUTTONS=============================

function showBasicBoxElement(){
    this.closest('#pnlBoxLine').children[0].children[0].innerText = "Element Settings";
    this.closest('#pnlBoxLine').querySelector('.tabSliderBox2').style.translate = "0%"; //slide tab
    this.closest('#pnlBoxLine').querySelector('.pnlBottomBoxThumb2').style.translate = "0%"; //slide scroll thumb
}
document.querySelector('#pnlBoxLine').querySelector('.btnBasicBox').addEventListener('click', btnBottomClick); //default the btnBasic to white
document.querySelector('#pnlBoxLine').querySelector('.btnBasicBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxLine').querySelector('.btnBasicBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxLine').querySelector('.btnBasicBox').addEventListener('click', showBasicBoxElement);
document.querySelector('#pnlBoxLine').querySelector('.btnBasicBox').children[0].style.filter = "saturate(0) brightness(2)";
document.querySelector('#pnlBoxLine').querySelector('.btnBasicBox').children[0].style.transition = ".2s";

function showColorBoxElement() {
    this.closest('#pnlBoxLine').children[0].children[0].innerText = "Element Color";
    this.closest('#pnlBoxLine').querySelector('.tabSliderBox2').style.translate = "-100%"; //slide tab to left
    this.closest('#pnlBoxLine').querySelector('.pnlBottomBoxThumb2').style.translate = "100%"; //slide thumb to right
}
document.querySelector('#pnlBoxLine').querySelector('.btnColorBox').addEventListener('click', btnBottomClick); //default the btnColor to white
document.querySelector('#pnlBoxLine').querySelector('.btnColorBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxLine').querySelector('.btnColorBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxLine').querySelector('.btnColorBox').addEventListener('click', showColorBoxElement);
document.querySelector('#pnlBoxLine').querySelector('.btnColorBox').children[0].style.transition = ".2s";


