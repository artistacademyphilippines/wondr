

var isScaling = false;
var isResizing = false;
var isRotating = false;
var isDragging = false;

var borderW = [];
var borderH = [];
var borderL = [];
var borderT = [];
var borderR = [];

var layerW = [];
var layerH = [];
var layerL = [];
var layerT = [];

var imgCold = [];
var imgWarm = [];
var fontSelected = "Stylish";

var pinL = [];
var pinL2 = [];
var pinTL = [];
var pinTL2 = [];
var pinT = [];
var pinT2 = [];
var pinTR = []; 
var pinTR2 = []; 
var pinR = [];
var pinR2 = [];
var pinBR = [];
var pinBR2 = [];
var pinB = [];
var pinB2 = [];
var pinBL = [];
var pinBL2 = [];

var aRatio = [];

var leadDrag;

var layerSequence = "";



//===============================ADD LAYER BORDER======================

function adjustBorder() {

    let z = rngZoom.value/100;
    let cnvGrpLayers = document.getElementById('cnvGrpLayers');

    for(var a = 0; a < pinBody.length; a++) {
    
        if(pinBody[a] != null) {

            let f = pinBody[a].dataset.ref;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            //check when zoomed out or zoomed in
            //zooming will make the cnvBox wider or taller than canvasBorder
            if((cnvBox.clientWidth * z + 96) > canvasBorder.clientWidth) { //96 total of 3em left and right
                pinBody[a].style.left = (canvas.offsetLeft * z) + 48 + 'px'; // 48 total of 3em left
                
            }
            else {
                pinBody[a].style.width = canvas.clientWidth * z + 'px';
                pinBody[a].style.left = (cnvBox.getBoundingClientRect().left) + (canvas.offsetLeft * z) - 350 + 'px';
            }

            //check when zoomed out or zoomed in
            //zooming will make the cnvBox wider or taller than canvasBorder
            if((cnvBox.clientHeight * z + 96) > canvasBorder.clientHeight) { //96 total of 3em top and bottom
                
                pinBody[a].style.top = (canvas.offsetTop * z) + 48 + 'px'; //48 total of 3em top
                 
            }
            else {
                
                pinBody[a].style.height = canvas.clientHeight * z + 'px';
                pinBody[a].style.top = (cnvBox.getBoundingClientRect().top) + (canvas.offsetTop * z) - 116 + 'px';

            }
        }
    }
}

//===============================SCALE LAYERS==========================

function scaleBorderDown(e) {

    e.preventDefault();

    if(e.button == 0) {
        if(e.target.closest('.pinBody')) {

            leadDrag = e.target.closest('.pinBody');

            if(multiSelect) chooseLeadDrag(leadDrag);

            resX = e.clientX;
            resY = e.clientY;

            if(e.target.className == "pinTL2") {

                adjust = "pinTL2";
                isScaling = true;
                isResizing = false;
                isRotating = false;
            }

            else if(e.target.className == "pinTR2") {

                adjust = "pinTR2";
                isScaling = true;
                isResizing = false;
                isRotating = false;

            }

            else if(e.target.className == "pinBR2") {
                
                adjust = "pinBR2";
                isScaling = true;
                isResizing = false;
                isRotating = false;
            }

            else if(e.target.className == "pinBL2") {

                adjust = "pinBL2";
                isScaling = true;
                isResizing = false;
                isRotating = false;
            }

            /////////////////COPY ALL FOCUSOBJ CURRENT POSITION///////////////
            for(var a = 0; a < focusObj.length; a++) {

                if(focusObj[a] != null) {

                    let f = focusObj[a].dataset.ref;
                    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
                    let pin = cnvPin.querySelector(`[data-ref="${f}"]`);

                    borderW[f] = pin.clientWidth;
                    borderH[f] = pin.clientHeight;
                    borderL[f] = pin.offsetLeft;
                    borderT[f] = pin.offsetTop;
            
                    layerW[f] = canvas.clientWidth;
                    layerH[f] = canvas.clientHeight;
                    layerL[f] = canvas.offsetLeft;
                    layerT[f] = canvas.offsetTop;
                    aRatio[f] = canvas.clientWidth / canvas.clientHeight;

                }
            }
        }
    }
}

function scaleBorderMove(e) {
    
    if(isScaling) {

        var z = rngZoom.value / 100;

        for(var a = 0; a < focusObj.length; a++) {

            if(focusObj[a] != null) {

                let f = focusObj[a].dataset.ref;
                let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
                let pin = cnvPin.querySelector(`[data-ref="${f}"]`);

                if(adjust == "pinTL2") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        if(input.className == "pinBody" || input.className == "pinTL2") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                        }

                    })

                    var diffX = (resX - e.clientX);
                    var diffY = (resY - e.clientY);

                    var minW = Math.round(Number(canvas.style.minWidth.replace('px', '')));
                    var minH = Math.round(Number(canvas.style.minHeight.replace('px', '')));

                    if(canvas.dataset.type == "image") { 

                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    //for landscape
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    pin.style.width =  borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z  + 'px'; 

                                    canvas.style.left = layerL[f] - (diffX + diffY)  + 'px';
                                    canvas.style.top = layerT[f] -  (diffX + diffY) / aRatio[f]  + 'px';

                                    pin.style.left = borderL[f] - (diffX + diffY) * z + 'px';
                                    pin.style.top = borderT[f] - (diffX + diffY) / aRatio[f] * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    canvas.style.left = layerL[f] - diffX / z + 'px';

                                    pin.style.width = borderW[f] + diffX + 'px';
                                    pin.style.left = borderL[f] - diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    canvas.style.top = layerT[f] - diffY / z + 'px';

                                    pin.style.height = borderH[f] + diffY + 'px';
                                    pin.style.top = borderT[f] - diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }                   
                    }
                    else if(canvas.dataset.type == "vector") { 

                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    //for landscape
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    pin.style.width =  borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z  + 'px'; 

                                    canvas.style.left = layerL[f] - (diffX + diffY)  + 'px';
                                    canvas.style.top = layerT[f] -  (diffX + diffY) / aRatio[f]  + 'px';

                                    pin.style.left = borderL[f] - (diffX + diffY) * z + 'px';
                                    pin.style.top = borderT[f] - (diffX + diffY) / aRatio[f] * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    canvas.style.left = layerL[f] - diffX / z + 'px';

                                    pin.style.width = borderW[f] + diffX + 'px';
                                    pin.style.left = borderL[f] - diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    canvas.style.top = layerT[f] - diffY / z + 'px';

                                    pin.style.height = borderH[f] + diffY + 'px';
                                    pin.style.top = borderT[f] - diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }                   
                    }
                    else if(canvas.dataset.type == "element") { 

                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    //for landscape
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    pin.style.width =  borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z  + 'px'; 

                                    canvas.style.left = layerL[f] - (diffX + diffY)  + 'px';
                                    canvas.style.top = layerT[f] -  (diffX + diffY) / aRatio[f]  + 'px';

                                    pin.style.left = borderL[f] - (diffX + diffY) * z + 'px';
                                    pin.style.top = borderT[f] - (diffX + diffY) / aRatio[f] * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                }
                            }
                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    canvas.style.left = layerL[f] - diffX / z + 'px';

                                    pin.style.width = borderW[f] + diffX + 'px';
                                    pin.style.left = borderL[f] - diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    canvas.style.top = layerT[f] - diffY / z + 'px';

                                    pin.style.height = borderH[f] + diffY + 'px';
                                    pin.style.top = borderT[f] - diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }
                        } 
                        renderSVG(f);                  
                    }
                    else if(canvas.dataset.type == "line") { 

                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    //for landscape
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    pin.style.width =  borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z  + 'px'; 

                                    canvas.style.left = layerL[f] - (diffX + diffY)  + 'px';
                                    canvas.style.top = layerT[f] -  (diffX + diffY) / aRatio[f]  + 'px';

                                    pin.style.left = borderL[f] - (diffX + diffY) * z + 'px';
                                    pin.style.top = borderT[f] - (diffX + diffY) / aRatio[f] * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                }
                            }
                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    canvas.style.left = layerL[f] - diffX / z + 'px';

                                    pin.style.width = borderW[f] + diffX + 'px';
                                    pin.style.left = borderL[f] - diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    canvas.style.top = layerT[f] - diffY / z + 'px';

                                    pin.style.height = borderH[f] + diffY + 'px';
                                    pin.style.top = borderT[f] - diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }
                        } 
                        renderLine(f);                  
                    }
                    else if(canvas.dataset.type == "text") {

                        if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().bottom) {
                        
                            if(canvas.clientWidth > minW + 8) {   

                                canvas.style.width = layerW[f] + diffX / z - 8 + 'px';
                                canvas.style.left = layerL[f] - diffX / z + 'px';

                                pin.style.width = borderW[f] + diffX + 'px';
                                pin.style.left = borderL[f] - diffX + 'px';

                            }

                            else{
                                canvas.style.width = layerW[f] + diffX / z - 8 + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';

                            }
                            
                            if(canvas.clientHeight > minH) {    

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                canvas.style.top = layerT[f] - diffY / z + 'px';

                                pin.style.height = borderH[f] + diffY + 'px';
                                pin.style.top = borderT[f] - diffY + 'px';

                            }
                            
                            else {

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            
                            }
                        
                        }       
                           
                    }
                }

                else if(adjust == "pinTR2") {
                    
                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {

                        if(input.className == "pinBody" || input.className == "pinTL2") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }

                    })

                    var diffX = (e.clientX - resX);
                    var diffY = (resY - e.clientY);
                    
                    var minW = Math.round(Number(canvas.style.minWidth.replace('px', '')));
                    var minH = Math.round(Number(canvas.style.minHeight.replace('px', '')));
  
                    if(canvas.dataset.type == "image") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                    canvas.style.top = layerT[f] -  (diffX + diffY) / aRatio[f] + 'px';

                                    pin.style.width = borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z + 'px';
                                    pin.style.top = borderT[f] - (diffX + diffY) / aRatio[f] * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }

                                    /*
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                    */
                                }
                            }

                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = borderW[f] + diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    canvas.style.top = layerT[f] - diffY / z + 'px';

                                    pin.style.height = borderH[f] + diffY + 'px';
                                    pin.style.top = borderT[f] - diffY  + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }                   
                    }
                    else if(canvas.dataset.type == "vector") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                    canvas.style.top = layerT[f] -  (diffX + diffY) / aRatio[f] + 'px';

                                    pin.style.width = borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z + 'px';
                                    pin.style.top = borderT[f] - (diffX + diffY) / aRatio[f] * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }

                                    /*
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                    */
                                }
                            }

                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = borderW[f] + diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    canvas.style.top = layerT[f] - diffY / z + 'px';

                                    pin.style.height = borderH[f] + diffY + 'px';
                                    pin.style.top = borderT[f] - diffY  + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }                   
                    }
                    else if(canvas.dataset.type == "element") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                    canvas.style.top = layerT[f] -  (diffX + diffY) / aRatio[f] + 'px';

                                    pin.style.width = borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z + 'px';
                                    pin.style.top = borderT[f] - (diffX + diffY) / aRatio[f] * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }

                                }
                            }

                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = borderW[f] + diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    canvas.style.top = layerT[f] - diffY / z + 'px';

                                    pin.style.height = borderH[f] + diffY + 'px';
                                    pin.style.top = borderT[f] - diffY  + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }
                        }   
                        renderSVG(f);
                    }
                    else if(canvas.dataset.type == "line") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                    canvas.style.top = layerT[f] -  (diffX + diffY) / aRatio[f] + 'px';

                                    pin.style.width = borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z + 'px';
                                    pin.style.top = borderT[f] - (diffX + diffY) / aRatio[f] * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }

                                }
                            }

                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().bottom) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = borderW[f] + diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    canvas.style.top = layerT[f] - diffY / z + 'px';

                                    pin.style.height = borderH[f] + diffY + 'px';
                                    pin.style.top = borderT[f] - diffY  + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }
                        }   
                        renderLine(f);
                    }
                    else if(canvas.dataset.type == "text") {

                        if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().bottom) {
                        
                            if(canvas.clientWidth > minW + 8) {   

                                canvas.style.width = layerW[f] + diffX / z - 8 + 'px';
                                pin.style.width = borderW[f] + diffX + 'px';
                               
                            }

                            else {   

                                canvas.style.width = layerW[f] + diffX / z - 8 + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';
                               
                            }

                            if(canvas.clientHeight > minH) {    

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                canvas.style.top = layerT[f] - diffY / z + 'px';

                                pin.style.height = borderH[f] + diffY + 'px';
                                pin.style.top = borderT[f] - diffY + 'px';

                            }
                            
                            else {

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            
                            }
                        
                        }   
                        
                    }
                }

                else if(adjust == "pinBR2") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        
                        if(input.className == "pinBody" || input.className == "pinTL2") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }

                    })

                    var diffX = e.clientX - resX;
                    var diffY = e.clientY - resY;

                    var minW = Math.round(Number(canvas.style.minWidth.replace('px', '')));
                    var minH = Math.round(Number(canvas.style.minHeight.replace('px', '')));
  
                    if(canvas.dataset.type == "image") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    //for landscape
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    pin.style.width =  borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z  + 'px'; 

                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                    
                                }
                                
                            }
                        
                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = borderW[f] + diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = borderH[f] + diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }
                        
                    }

                    else if(canvas.dataset.type == "vector") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    //for landscape
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    pin.style.width =  borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z  + 'px'; 

                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                    
                                }
                                
                            }
                        
                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = borderW[f] + diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = borderH[f] + diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }
                        
                    }

                    else if(canvas.dataset.type == "element") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    //for landscape
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    pin.style.width =  borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z  + 'px'; 

                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                    
                                }
                                
                            }
                        
                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = borderW[f] + diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = borderH[f] + diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }
                        renderSVG(f)
                    }
                    else if(canvas.dataset.type == "line") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    //for landscape
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    pin.style.width =  borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z  + 'px'; 

                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f] + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                    
                                }
                                
                            }
                        
                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = borderW[f] + diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = borderH[f] + diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                
                                }
                                
                            }

                        }
                        renderLine(f)
                    }

                    else if(canvas.dataset.type == "text") {

                        if(e.clientX != pin.getBoundingClientRect().left || e.clientY != pin.getBoundingClientRect().top) {
                        
                            if(canvas.clientWidth > minW + 8) {   

                                canvas.style.width = layerW[f] + diffX / z - 8 + 'px';
                                pin.style.width = borderW[f] + diffX + 'px';
                               
                            }

                            else {   

                                canvas.style.width = layerW[f] + diffX / z - 8 + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';
                               
                            }

                            if(canvas.clientHeight > minH) {    

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = borderH[f] + diffY + 'px';

                            }
                            
                            else {

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            
                            }
                        
                        }       

                    }

                }

                else if(adjust == "pinBL2") {
                    
                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        
                        if(input.className == "pinBody" || input.className == "pinTL2") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }

                    })

                    var diffX = (resX - e.clientX);
                    var diffY = (e.clientY - resY);
                    
                    var minW = Math.round(Number(canvas.style.minWidth.replace('px', '')));
                    var minH = Math.round(Number(canvas.style.minHeight.replace('px', '')));
  
                    if(canvas.dataset.type == "image") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    canvas.style.left = layerL[f] - (diffX + diffY) + 'px';

                                    pin.style.width = borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z + 'px';
                                    pin.style.left = borderL[f] - (diffX + diffY) * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    canvas.style.left = layerL[f] - diffX / z + 'px';

                                    pin.style.width = borderW[f] + diffX + 'px';
                                    pin.style.left = borderL[f] - diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = borderH[f] + diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                    
                                }
                            }

                        }
                        
                    }

                    else if(canvas.dataset.type == "vector") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    canvas.style.left = layerL[f] - (diffX + diffY) + 'px';

                                    pin.style.width = borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z + 'px';
                                    pin.style.left = borderL[f] - (diffX + diffY) * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    canvas.style.left = layerL[f] - diffX / z + 'px';

                                    pin.style.width = borderW[f] + diffX + 'px';
                                    pin.style.left = borderL[f] - diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = borderH[f] + diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                    
                                }
                            }

                        }
                        
                    }

                    else if(canvas.dataset.type == "element") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    
                                    canvas.style.left = layerL[f] - (diffX + diffY) + 'px';

                                    pin.style.width = borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z + 'px';
                                    pin.style.left = borderL[f] - (diffX + diffY) * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    canvas.style.left = layerL[f] - diffX / z + 'px';
                                    pin.style.width = borderW[f] + diffX + 'px';
                                    pin.style.left = borderL[f] - diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = borderH[f] + diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                    
                                }

                            }

                        }

                        renderSVG(f)
                    }

                    else if(canvas.dataset.type == "line") { 
                        
                        if(!e.shiftKey) {
                        
                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW && canvas.clientHeight > minH) {
                                    
                                    canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                    canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                    
                                    canvas.style.left = layerL[f] - (diffX + diffY) + 'px';

                                    pin.style.width = borderW[f] + (diffX + diffY) * z + 'px';
                                    pin.style.height = borderH[f] + (diffX + diffY) / aRatio[f] * z + 'px';
                                    pin.style.left = borderL[f] - (diffX + diffY) * z + 'px';
                                } 

                                else {

                                    if(canvas.clientWidth == minW) {
                                        canvas.style.width = layerW[f] + (diffX + diffY) + 'px';
                                        pin.style.width = canvas.clientWidth * z + 'px';
                                    }

                                    if(canvas.clientHeight == minH) {
                                        canvas.style.height = layerH[f] + (diffX + diffY) / aRatio[f]  + 'px';
                                        pin.style.height = canvas.clientHeight * z + 'px';
                                    }
                                }
                            }

                        }
                        else {

                            if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().top) {
                                
                                if(canvas.clientWidth > minW) {   

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    canvas.style.left = layerL[f] - diffX / z + 'px';
                                    pin.style.width = borderW[f] + diffX + 'px';
                                    pin.style.left = borderL[f] - diffX + 'px';

                                }
                                
                                else {

                                    canvas.style.width = layerW[f] + diffX / z + 'px';
                                    pin.style.width = canvas.clientWidth * z + 'px';

                                }

                                if(canvas.clientHeight > minH) {    

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = borderH[f] + diffY + 'px';

                                }
                                
                                else {

                                    canvas.style.height = layerH[f] + diffY / z + 'px';
                                    pin.style.height = canvas.clientHeight * z + 'px';
                                    
                                }

                            }

                        }

                        renderLine(f)
                    }

                    else if(canvas.dataset.type == "text") {

                        if(e.clientX != pin.getBoundingClientRect().right || e.clientY != pin.getBoundingClientRect().top) {
                        
                            if(canvas.clientWidth > minW + 8) {   

                                canvas.style.width = layerW[f] + diffX / z - 8 + 'px';
                                canvas.style.left = layerL[f] - diffX / z + 'px';

                                pin.style.width = borderW[f] + diffX + 'px';
                                pin.style.left = borderL[f] - diffX + 'px';

                            }

                            else {   

                                canvas.style.width = layerW[f] + diffX / z - 8 + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';
                               
                            }

                            if(canvas.clientHeight > minH) {    

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = borderH[f] + diffY + 'px';

                            }
                            
                            else {

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            
                            }
                        
                        }       

                    }
                    
                }

                //check if content is text
                if(canvas.dataset.type == "text") {

                    let panel = document.getElementById('pnlBoxText');
                    panel.querySelector('.btnFixedSize').children[0].style.filter = "saturate(0) brightness(2)";
                    panel.querySelector('.btnAutoWidth').children[0].style.filter = "none";
                    panel.querySelector('.btnAutoHeight').children[0].style.filter = "none";
                    
                    currResizeBox = "FixedSize";
                    panel.querySelector('.selTextResize').dataset.value = currResizeBox;

                    inputFormatResizeBox(f);
                }

                //fade the pins if size is minimum
                if (pin.clientWidth <= 11 || pin.clientHeight <= 11) {
                    pin.querySelector(`.pinTL`).style.opacity = 0;
                    pin.querySelector(`.pinTR`).style.opacity = 0;
                    pin.querySelector(`.pinBL`).style.opacity = 0;
                    pin.querySelector(`.pinBR`).style.opacity = 0;
                }

                else if (pin.clientWidth > 11 || pin.clientHeight > 11) {
                    pin.querySelector(`.pinTL`).style.opacity = 100;
                    pin.querySelector(`.pinTR`).style.opacity = 100;
                    pin.querySelector(`.pinBL`).style.opacity = 100;
                    pin.querySelector(`.pinBR`).style.opacity = 100;
                }

            }
        }

        let f = leadDrag.dataset.ref;
        let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)
        adjustBasicsFromCanvas(canvas);
    }
}

function scaleBorderUp(e) {

    e.preventDefault();

    let cnvPin = document.getElementById('cnvPin');
    let cnvBox = document.getElementById('cnvBox');
    let cnvGrpLayers = document.getElementById('cnvGrpLayers');

    if(isScaling) {
        isDragging = false;
        isRotating = false;
        isResizing = false;
        isScaling = false;
        encodeBasicsFromCanvas('scale');
    }
    
    resX = null;
    resY = null;
    adjust = null;

    cnvBox.style.position = "relative";
    cnvGrpLayers.style.boxSizing = "border-box";
    cnvGrpLayers.style.overflow = "hidden";

    //reset cursors
    cnvPin.style.cursor = "default";

    for(var a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            pinBody[a].style.cursor = "default";

            pinTL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinTR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;

            pinTL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinTR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
        }
        
    }

    /*
    console.clear();
    for(let a = 0; a < 10; a++) {
       console.log(history[a])
    }
    console.log("--------REDO---------")
    for(let a = 0; a < 10; a++) {
       console.log(redoHistory[a])
    }
    */
}

//===============================RESIZE LAYERS============================

function resizeBorderDown(e) {

    e.preventDefault();

    if(e.button == 0) {
        if(e.target.closest('.pinBody')) {

            leadDrag = e.target.closest('.pinBody');
            
            if(multiSelect) chooseLeadDrag(leadDrag);

            resX = e.clientX;
            resY = e.clientY;

            if(e.target.closest('.pinL')) {

                adjust = "pinL"
                isScaling = false;
                isResizing = true;
                isRotating = false;
            }

            else if(e.target.closest('.pinT')) {

                adjust = "pinT";
                isScaling = false;
                isResizing = true;
                isRotating = false;
            }

            else if(e.target.closest('.pinR')) {

                adjust = "pinR";
                isScaling = false;
                isResizing = true;
                isRotating = false;
            }

            else if(e.target.closest('.pinB')) {
            
                adjust = "pinB";
                isScaling = false;
                isResizing = true;
                isRotating = false;
            }

            /////////////////COPY ALL FOCUSOBJ CURRENT POSITION///////////////
            for(var a = 0; a < focusObj.length; a++) {

                if(focusObj[a] != null) {

                    let f = focusObj[a].dataset.ref;
                    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
                    let pin = cnvPin.querySelector(`[data-ref="${f}"]`);

                    borderW[f] = pin.clientWidth;
                    borderH[f] = pin.clientHeight;
                    borderL[f] = pin.offsetLeft;
                    borderT[f] = pin.offsetTop;
            
                    layerW[f] = canvas.clientWidth;
                    layerH[f] = canvas.clientHeight;
                    layerL[f] = canvas.offsetLeft;
                    layerT[f] = canvas.offsetTop;
                    aRatio[f] = canvas.clientWidth / canvas.clientHeight;

                }
            }
        }
    }
}

function resizeBorderMove(e) {

    if(isResizing) {
        
        var z = rngZoom.value / 100;

        for(var a = 0; a < focusObj.length; a++) { 

            if(focusObj[a] != null) {

                let f = focusObj[a].dataset.ref;
                let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
                let pin = cnvPin.querySelector(`[data-ref="${f}"]`);

                if(adjust == "pinL") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        if(input.className == "pinBody" || input.className == "pinL") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
                        }

                    })

                    var diffX = resX - e.clientX;

                    var minW = Math.round(Number(canvas.style.minWidth.replace('px', '')));
                    
                    if(canvas.dataset.type == "image") {

                        if(e.clientX != pin.getBoundingClientRect().right) {

                            if(canvas.clientWidth > minW) {   

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                canvas.style.left = layerL[f] - diffX / z + 'px';

                                pin.style.width = borderW[f] + diffX + 'px';
                                pin.style.left = borderL[f] - diffX + 'px';

                            }
                            
                            else {

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';

                            }
                
                        }
                    }
                    else if(canvas.dataset.type == "vector") {

                        if(e.clientX != pin.getBoundingClientRect().right) {

                            if(canvas.clientWidth > minW) {   

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                canvas.style.left = layerL[f] - diffX / z + 'px';

                                pin.style.width = borderW[f] + diffX + 'px';
                                pin.style.left = borderL[f] - diffX + 'px';

                            }
                            
                            else {

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';

                            }
                
                        }
                    }
                    else if(canvas.dataset.type == "element") {

                        if(e.clientX != pin.getBoundingClientRect().right) {

                            if(canvas.clientWidth > minW) {   

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                canvas.style.left = layerL[f] - diffX / z + 'px';

                                pin.style.width = borderW[f] + diffX + 'px';
                                pin.style.left = borderL[f] - diffX + 'px';

                            }
                            
                            else {

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';

                            }
                
                        }

                        renderSVG(f);
                    }
                    else if(canvas.dataset.type == "line") {

                        if(e.clientX != pin.getBoundingClientRect().right) {

                            if(canvas.clientWidth > minW) {   

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                canvas.style.left = layerL[f] - diffX / z + 'px';

                                pin.style.width = borderW[f] + diffX + 'px';
                                pin.style.left = borderL[f] - diffX + 'px';

                            }
                            
                            else {

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';

                            }
                
                        }

                        renderLine(f);
                    }
                    else if(canvas.dataset.type == "text") {

                        if(e.clientX != pin.getBoundingClientRect().right) {
                        
                            if(canvas.clientWidth > minW + 8) {   

                                canvas.style.width = layerW[f] + diffX / z - 8 + 'px';
                                canvas.style.left = layerL[f] - diffX / z + 'px';

                                pin.style.width = borderW[f] + diffX + 'px';
                                pin.style.left = borderL[f] - diffX + 'px';

                            }

                            else{
                                canvas.style.width = layerW[f] + diffX / z - 8 + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';

                            }
                            
                        }   
                    }

                }

                else if(adjust == "pinT") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        if(input.className == "pinBody" || input.className == "pinT") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                        }

                    })

                    var diffY = resY - e.clientY;

                    var minH = Math.round(Number(canvas.style.minHeight.replace('px', '')));

                    if(canvas.dataset.type == "image") {

                        if(e.clientY != pin.getBoundingClientRect().bottom) {

                            if(canvas.clientHeight > minH) {
                                pin.style.height = borderH[f] + diffY + 'px';
                                pin.style.top = borderT[f] - diffY + 'px';

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                canvas.style.top = layerT[f] - diffY / z + 'px';
                            }
                            else {
                            
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            }

                        }
                    }
                    else if(canvas.dataset.type == "vector") {

                        if(e.clientY != pin.getBoundingClientRect().bottom) {

                            if(canvas.clientHeight > minH) {
                                pin.style.height = borderH[f] + diffY + 'px';
                                pin.style.top = borderT[f] - diffY + 'px';

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                canvas.style.top = layerT[f] - diffY / z + 'px';
                            }
                            else {
                            
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            }

                        }
                    }
                    else if(canvas.dataset.type == "element") {

                        if(e.clientY != pin.getBoundingClientRect().bottom) {

                            if(canvas.clientHeight > minH) {
                                pin.style.height = borderH[f] + diffY + 'px';
                                pin.style.top = borderT[f] - diffY + 'px';

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                canvas.style.top = layerT[f] - diffY / z + 'px';
                            }
                            else {
                            
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            }
                        }

                        renderSVG(f)
                    }
                    else if(canvas.dataset.type == "line") {

                        if(e.clientY != pin.getBoundingClientRect().bottom) {

                            if(canvas.clientHeight > minH) {
                                pin.style.height = borderH[f] + diffY + 'px';
                                pin.style.top = borderT[f] - diffY + 'px';

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                canvas.style.top = layerT[f] - diffY / z + 'px';
                            }
                            else {
                            
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            }
                        }

                        renderLine(f)
                    }

                    else if(canvas.dataset.type == "text") {

                        if(e.clientY != pin.getBoundingClientRect().bottom) {
                        
                            if(canvas.clientHeight > minH) {    

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                canvas.style.top = layerT[f] - diffY / z + 'px';

                                pin.style.height = borderH[f] + diffY + 'px';
                                pin.style.top = borderT[f] - diffY + 'px';

                            }
                            
                            else {

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            
                            }
                        
                        }  
                    }
                }

                else if(adjust == "pinR") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        if(input.className == "pinBody" || input.className == "pinR") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;

                        }

                    })

                    var diffX = e.clientX - resX;

                    var minW = Math.round(Number(canvas.style.minWidth.replace('px', '')));

                    if(canvas.dataset.type == "image") {

                        if(e.clientX != pin.getBoundingClientRect().left) {

                            if(canvas.clientWidth > minW) {   

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = borderW[f] + diffX + 'px';
  
                            }
                            
                            else {

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';

                            }
                
                        }
                    }
                    else if(canvas.dataset.type == "vector") {

                        if(e.clientX != pin.getBoundingClientRect().left) {

                            if(canvas.clientWidth > minW) {   

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = borderW[f] + diffX + 'px';
  
                            }
                            
                            else {

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';

                            }
                
                        }
                    }
                    else if(canvas.dataset.type == "element") {

                        if(e.clientX != pin.getBoundingClientRect().left) {

                            if(canvas.clientWidth > minW) {   

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = borderW[f] + diffX + 'px';
  
                            }
                            
                            else {

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';

                            }
                
                        }

                        renderSVG(f);
                    }
                    else if(canvas.dataset.type == "line") {

                        if(e.clientX != pin.getBoundingClientRect().left) {

                            if(canvas.clientWidth > minW) {   

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = borderW[f] + diffX + 'px';
  
                            }
                            
                            else {

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';

                            }
                
                        }

                        renderLine(f);
                    }
                    else if(canvas.dataset.type == "text") {

                        if(e.clientX != pin.getBoundingClientRect().left) {
                        
                            if(canvas.clientWidth > minW) {   

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = borderW[f] + diffX + 'px';
                               
                            }

                            else {   

                                canvas.style.width = layerW[f] + diffX / z + 'px';
                                pin.style.width = canvas.clientWidth * z + 'px';
                               
                            }
                        }       
                    }
                }

                else if(adjust == "pinB") {

                    //cursor change
                    cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                    var inputs = cnvPin.querySelectorAll('div');

                    inputs.forEach(function(input) {
                        if(input.className == "pinBody" || input.className == "pinB") {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                        }
                        else {
                            input.removeEventListener('pointerover', addPinCursor);
                            input.style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pin.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                        }

                    })

                    var diffY = e.clientY - resY;

                    var minH = Math.round(Number(canvas.style.minHeight.replace('px', '')));
                    
                    if(canvas.dataset.type == "image") {

                        if(e.clientY != pin.getBoundingClientRect().bottom) {

                            if(canvas.clientHeight > minH) {
                                pin.style.height = borderH[f] + diffY + 'px';
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                
                            }
                            else {
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            }

                        }
                    }
                    else if(canvas.dataset.type == "vector") {

                        if(e.clientY != pin.getBoundingClientRect().bottom) {

                            if(canvas.clientHeight > minH) {
                                pin.style.height = borderH[f] + diffY + 'px';
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                
                            }
                            else {
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            }

                        }
                    }
                    else if(canvas.dataset.type == "element") {

                        if(e.clientY != pin.getBoundingClientRect().bottom) {

                            if(canvas.clientHeight > minH) {
                                pin.style.height = borderH[f] + diffY + 'px';
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                
                            }
                            else {
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            }

                        }

                        renderSVG(f);
                    }
                    else if(canvas.dataset.type == "line") {

                        if(e.clientY != pin.getBoundingClientRect().bottom) {

                            if(canvas.clientHeight > minH) {
                                pin.style.height = borderH[f] + diffY + 'px';
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                
                            }
                            else {
                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            }

                        }

                        renderLine(f);
                    }
                    else if(canvas.dataset.type == "text") {

                        if(e.clientY != pin.getBoundingClientRect().top) {
                        
                            if(canvas.clientHeight > minH) {    

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = borderH[f] + diffY + 'px';

                            }
                            
                            else {

                                canvas.style.height = layerH[f] + diffY / z + 'px';
                                pin.style.height = canvas.clientHeight * z + 'px';
                            
                            }
                        }       
                    }
                }

                //check if content is text
                if(canvas.dataset.type == "text") {
                    
                    let panel = document.getElementById('pnlBoxText');
                    panel.querySelector('.btnFixedSize').children[0].style.filter = "saturate(0) brightness(2)";
                    panel.querySelector('.btnAutoWidth').children[0].style.filter = "none";
                    panel.querySelector('.btnAutoHeight').children[0].style.filter = "none";
                    
                    currResizeBox = "FixedSize";
                    panel.querySelector('.selTextResize').dataset.value = currResizeBox;

                    inputFormatResizeBox(f);
            
                }

                //fade the pins if size is minimum
                if (pin.clientWidth <= 11 || pin.clientHeight <= 11) {
                    pinTL[f].style.opacity = 0;
                    pinTR[f].style.opacity = 0;
                    pinBL[f].style.opacity = 0;
                    pinBR[f].style.opacity = 0;
                }

                else if (pin.clientWidth > 11 || pin.clientHeight > 11) {
                    pinTL[f].style.opacity = 100;
                    pinTR[f].style.opacity = 100;
                    pinBL[f].style.opacity = 100;
                    pinBR[f].style.opacity = 100;
                }
            }
        }

        let f = leadDrag.dataset.ref;
        let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)
        adjustBasicsFromCanvas(canvas);
    }
}

function resizeBorderUp(e) {

    e.preventDefault();

    let cnvPin = document.getElementById('cnvPin');
    
    if(isResizing) {
        isDragging = false;
        isRotating = false;
        isResizing = false;
        isScaling = false;
        encodeBasicsFromCanvas('resize');
    }
    
    resX = null;
    resY = null;
    adjust = null;

    //reset cursors
    cnvPin.style.cursor = "default";

    for(var a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            pinBody[a].style.cursor = "default";

            pinTL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinTR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;

            pinTL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinTR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
        
        }
    }

}

//===============================ROTATE LAYERS=============================

function rotateBorderDown(e) {

    e.preventDefault();

    if(e.button == 0) {

        if(e.target.closest('.pinBody')) {

            leadDrag = e.target.closest('.pinBody');
            
            if(multiSelect) chooseLeadDrag(leadDrag);

            resX = e.clientX;
            resY = e.clientY;

            if(e.target.className == "pinTL") {

                adjust = "pinTL";
                isRotating = true;
                isScaling = false;
                isResizing = false;

            } 

            else if(e.target.className == "pinTR") {

                adjust = "pinTR";
                isScaling = false;
                isRotating = true;
                isResizing = false; 

            } 

            else if(e.target.className == "pinBR") {

                adjust = "pinBR";
                isScaling = false;
                isRotating = true;
                isResizing = false; 
            } 

            else if(e.target.className == "pinBL") {

                adjust = "pinBL";
                isScaling = false;
                isRotating = true;
                isResizing = false; 

            } 

        /////////////////////////////THIS BLOCK IS FOR GETTING ANGLE 1 REFERENCE///////////////
        //THIS IS TO BE USED FOR CHECKING IF CLOCKWISE OR COUNTERCLOCKWISE ROTATION
        
            borderCenterX = leadDrag.getBoundingClientRect().left + (leadDrag.clientWidth/2);
            borderCenterY = leadDrag.getBoundingClientRect().top + (leadDrag.clientHeight/2);
            
            if(resX < borderCenterX && resY < borderCenterY) { // if quadrant 1
                
                //if vertical distance is > than horizontal distance
                AC = Math.sqrt(((borderCenterX - resX) ** 2) + ((resY - resY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
                BC = Math.sqrt(((borderCenterX - resX) ** 2) + ((borderCenterY - resY) ** 2));
                angle1 = Math.asin(AC/BC) * 180 / Math.PI;
            }

            else if(resX < borderCenterX && resY > borderCenterY) { // if quadrant 2
            
                //if vertical distance is > than horizontal distance
                AC = Math.sqrt(((resX - resX) ** 2) + ((borderCenterY - resY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
                BC = Math.sqrt(((borderCenterX - resX) ** 2) + ((borderCenterY - resY) ** 2));
                angle1 = Math.asin(AC/BC) * 180 / Math.PI + 90;
            }

            else if(resX > borderCenterX && resY > borderCenterY) { // if quadrant 3
            
                //if vertical distance is > than horizontal distance
                AC = Math.sqrt(((borderCenterX - resX) ** 2) + ((resY - resY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
                BC = Math.sqrt(((borderCenterX - resX) ** 2) + ((borderCenterY - resY) ** 2));
                angle1 = Math.asin(AC/BC) * 180 / Math.PI + 180;
            }

            else if(resX > borderCenterX && resY < borderCenterY) { // if quadrant 4
                
                //if vertical distance is > than horizontal distance
                AC = Math.sqrt(((resX - resX) ** 2) + ((borderCenterY - resY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
                BC = Math.sqrt(((borderCenterX - resX) ** 2) + ((borderCenterY - resY) ** 2));
                angle1 = Math.asin(AC/BC) * 180 / Math.PI + 270;
            }

            /////////////////COPY ALL FOCUSOBJ CURRENT POSITION///////////////
            for(var a = 0; a < focusObj.length; a ++) {

                if(focusObj[a] != null) {
                    let f = focusObj[a].dataset.ref;
                    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

                    borderR[f] = Number(canvas.dataset.rotation);
                }
            }
        }

    }
}

function rotateBorderMove(e) {
    
    if(isRotating) {

        /////////////////////////THIS BLOCK IS TO GET ANGLE 2//////////////////
        if(e.clientX < borderCenterX && e.clientY < borderCenterY) { // if quadrant 1
            
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((e.clientY - e.clientY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2));
            angle2 = Math.asin(AC/BC) * 180 / Math.PI;
        }

        else if(e.clientX < borderCenterX && e.clientY > borderCenterY) { // if quadrant 2
       
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((e.clientX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2));
            angle2 = Math.asin(AC/BC) * 180 / Math.PI + 90;
        }

        else if(e.clientX > borderCenterX && e.clientY > borderCenterY) { // if quadrant 3
       
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((e.clientY - e.clientY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2));
            angle2 = Math.asin(AC/BC) * 180 / Math.PI + 180;
        }

        else if(e.clientX > borderCenterX && e.clientY < borderCenterY) { // if quadrant 4
            
            //if vertical distance is > than horizontal distance
            AC = Math.sqrt(((e.clientX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2)); //x-x is 0, y-y is borderCenterY[a] squared and rooted
            BC = Math.sqrt(((borderCenterX - e.clientX) ** 2) + ((borderCenterY - e.clientY) ** 2));
            angle2 = Math.asin(AC/BC) * 180 / Math.PI + 270;

        }

        /////////////////////////THIS BLOCK IS TO GET ANGLE 3/////////////////
        var angle3;

        if(angle1 >= angle2) {
            angle3 = Math.round(angle1 - angle2);
        }
        else {
            
            if(e.shiftKey) {
                angle3 = Math.round(359 - (angle2 - angle1));
            }
            else {
                angle3 = 360 - (angle2 - angle1);
            }
            
        }
        //////////////////////////////////////////////////////////////////////

        for(var a = 0; a < focusObj.length; a++) {
            if(focusObj[a] != null) {

                let f = focusObj[a].dataset.ref;
                let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
                let pin = cnvPin.querySelector(`[data-ref="${f}"]`);

                //check if shiftkey is pressed  to lock angle
                if(e.shiftKey) {  

                    if(angle3 % 15 == 0) {
                    
                        pin.dataset.rotation =  borderR[f] + angle3;
                        canvas.dataset.rotation = borderR[f] + angle3;

                        //if rotation exceeds 360
                        if(borderR[f] + angle3 >= 359) {
                            pin.dataset.rotation -= 359;
                            canvas.dataset.rotation -= 359;
                        }

                        pin.style.rotate = pin.dataset.rotation + 'deg';
                        canvas.style.rotate = canvas.dataset.rotation + 'deg';
                    }
                }
                else {
                    pin.dataset.rotation = borderR[f] + angle3;
                    canvas.dataset.rotation = borderR[f] + angle3;

                    //if rotation exceeds 360
                    if(borderR[f] + angle3 >= 359) {
                        pin.dataset.rotation -= 359;
                        canvas.dataset.rotation -= 359;
                    }

                    pin.style.rotate = pin.dataset.rotation + 'deg';
                    canvas.style.rotate = canvas.dataset.rotation + 'deg';
                }

            }
        }

        let f = leadDrag.dataset.ref;
        let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)
        adjustBasicsFromCanvas(canvas);

        if(adjust == "pinTL") {

            cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadDrag.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            
            var inputs = cnvPin.querySelectorAll('div');
            
            inputs.forEach(function(input) {
                input.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadDrag.dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            })
        }
    
        else if(adjust == "pinTR") {
            cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadDrag.dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            
            var inputs = cnvPin.querySelectorAll('div');
            
            inputs.forEach(function(input) {
                input.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadDrag.dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            })
        }
    
        else if(adjust == "pinBR") {
            cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadDrag.dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            
            var inputs = cnvPin.querySelectorAll('div');
            
            inputs.forEach(function(input) {
                input.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadDrag.dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            })
        }
    
        else if(adjust == "pinBL") {
            cnvPin.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadDrag.dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            
            var inputs = cnvPin.querySelectorAll('div');
            
            inputs.forEach(function(input) {
                input.style.cursor = `url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(leadDrag.dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='12 12'%3E%3Cpath d='M14.8421 4.14067L15.2997 4.10173V3.64247V1.78947C15.2997 1.55853 15.5497 1.4142 15.7497 1.52967L22.3497 5.34018C22.5497 5.45565 22.5497 5.74432 22.3497 5.85979L15.7497 9.67031C15.5497 9.78578 15.2997 9.64144 15.2997 9.4105V7.66939V7.09506L14.7308 7.17415C10.8228 7.71752 7.71204 11.1546 7.18059 14.7264L7.09525 15.2999H7.67515H9.4105C9.64144 15.2999 9.78578 15.5499 9.67031 15.7499L5.85979 22.3499C5.74432 22.5499 5.45565 22.5499 5.34018 22.3499L1.52967 15.7499C1.4142 15.5499 1.55853 15.2999 1.78947 15.2999H3.64243H4.10169L4.14063 14.8423C4.6176 9.23676 9.23655 4.61773 14.8421 4.14067Z' fill='white' stroke='%236885CC'/%3E%3C/g%3E%3C/svg%3E%0A") 12 12, auto`;
            })
        }
    } 

}

function rotateBorderUp(e) {
    
    e.preventDefault();
    e.target.style.cursor = "default";

    let cnvPin = document.getElementById('cnvPin');

    if(isRotating) {
        isDragging = false;
        isRotating = false;
        isResizing = false;
        isScaling = false;
        encodeBasicsFromCanvas('rotate');
    }
    
    resX = null;
    resY = null;
    adjust = null;

    AB = null;
    AC = null;
    angle1 = null;
    angle2 = null;
    borderCenterX = null;
    borderCenterY = null;

    //reset cursors
    cnvPin.style.cursor = "default";

    for(var a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            pinBody[a].style.cursor = "default";

            pinTL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinTR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;

            pinTL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinTR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

            pinL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

        }
    }
}

//=============================LAYER DRAG AND DROP========================

function countdownLayer() {

    if(counter < 50) {
        counter+=25;
    }
    else {

        isDragging = true; //set boolean to true
        isSelecting = false;
        clearInterval(tmrDrag);
        tmrDrag = null;
        counter = 0;
    }
}

function dragBorderDown(e) {
    
    if(e.button == 0) {
        if(!e.shiftKey) {

            if(e.target != cnvPin && e.target.className == "pinBody") {

                isSelecting = false;
                e.preventDefault();

                leadDrag = e.target.closest('.pinBody');

                counter = 0;
                clearInterval(tmrDrag)
                tmrDrag = null;

                tmrDrag = setInterval(countdownLayer, 25);
                //pinbody movement
                clientX = Math.round(e.clientX - cnvPin.getBoundingClientRect().left);
                clientY = Math.round(e.clientY - cnvPin.getBoundingClientRect().top);

                //get the percentage of cursor inside the leaddrag
                spaceX = (clientX - leadDrag.offsetLeft) / leadDrag.clientWidth;
                spaceY = (clientY - leadDrag.offsetTop) / leadDrag.clientHeight;
                
                leadDragX = leadDrag.offsetLeft;
                leadDragY = leadDrag.offsetTop;

                /////////////////COPY ALL FOCUSOBJ CURRENT POSITION///////////////
                for(var a = 0; a < focusObj.length; a++) {

                    if(focusObj[a] != null) {

                        let f = focusObj[a].dataset.ref;
                        let pin = cnvPin.querySelector(`[data-ref="${f}"]`);

                        borderL[f] = pin.offsetLeft;
                        borderT[f] = pin.offsetTop;

                    }
                    
                }

                /*
                console.clear();
                for(let a = 0; a < 10; a++) {
                    console.log(history[a])
                }
                console.log("--------REDO---------")
                for(let a = 0; a < 10; a++) {
                    console.log(redoHistory[a])
                }
                */
                
            }
        }
    }
}

function dragBorderMove(e) {

    e.preventDefault();

    if(isDragging) {
        
        var z = rngZoom.value / 100;

        e.target.style.cursor = "move";

        //pinbody movement
        clientX = Math.round(e.clientX - cnvPin.getBoundingClientRect().left);
        clientY = Math.round(e.clientY - cnvPin.getBoundingClientRect().top);

        leadDrag.style.left =  clientX - (spaceX * leadDrag.clientWidth) + 'px';
        leadDrag.style.top =  clientY - (spaceY * leadDrag.clientHeight) + 'px';

        let f = Number(leadDrag.dataset.ref);

        let leadCanvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);

        let borderW = Number(leadCanvas.style.borderWidth.replace('px', ''))

        leadCanvas.style.left = (leadDrag.offsetLeft - (cnvBox.offsetLeft * z))/z - borderW + 'px';
        leadCanvas.style.top =  (leadDrag.offsetTop - (cnvBox.offsetTop * z))/z - borderW + 'px';

        for(var a = 0; a < focusObj.length; a++) {
         
            if(focusObj[a] != null) {

                let f = focusObj[a].dataset.ref;
                let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
                let pin = cnvPin.querySelector(`[data-ref="${f}"]`);

                if(pin != leadDrag) {
                    pin.style.left = borderL[f] + (leadDrag.offsetLeft - leadDragX) + 'px';
                    pin.style.top = borderT[f] + (leadDrag.offsetTop - leadDragY) + 'px';

                    canvas.style.left = (pin.offsetLeft - (cnvBox.offsetLeft * z))/z + 'px';
                    canvas.style.top =  (pin.offsetTop - (cnvBox.offsetTop * z))/z + 'px';
                }
            }
        }
        adjustBasicsFromCanvas(leadCanvas);
    }
}

function dragBorderUp(e) {

    counter = 0;
    clearInterval(tmrDrag);
    tmrDrag = null;

    e.preventDefault();
    e.target.style.cursor = "default";

    if(isDragging) {
        isDragging = false;
        isRotating = false;
        isResizing = false;
        isScaling = false;
        encodeBasicsFromCanvas('drag');

        clientX = null;
        clientY = null;
        spaceX = null;
        spaceY = null;

        for(var a = 0; a < focusObj.length; a++) {

            if(focusObj[a] != null) {
                
                let f = focusObj[a].dataset.ref;
                let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
                let pin = cnvPin.querySelector(`[data-ref="${f}"]`);

                borderL[f] = pin.offsetLeft;
                borderT[f] = pin.offsetTop;
                layerL[f] = canvas.offsetLeft;
                layerT[f] = canvas.offsetTop;
            }
            
        }
    }
    
}

function addPinCursor() {

    for(var f = 0; f < pinBody.length; f++) {

        if(pinBody[f] != null) {

            pinL[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinL2[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinT[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinT2[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinR[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinR2[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
            pinB[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinB2[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinTL[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinTL2[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinTR[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinTR2[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBR[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBR2[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            pinBL[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
            pinBL2[f].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[f].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
        
        }
        
    }
}

//========================CREATE BOUNDING BOX FOR LAYERS===================
function addBorderLayer(canvas, f) {

    var z = rngZoom.value / 100;


    aRatio[f] = canvas.clientWidth / canvas.clientHeight;

    //create pinBody
    pinBody[f] = document.createElement('div');
    pinBody[f].style.width = canvas.clientWidth * z + 'px';
    pinBody[f].style.height = canvas.clientHeight * z + 'px';
    pinBody[f].dataset.ref = f;
    pinBody[f].dataset.type = canvas.dataset.type;
    pinBody[f].dataset.rotation = canvas.dataset.rotation;
    pinBody[f].style.rotate = pinBody[f].dataset.rotation + 'deg';
    pinBody[f].classList.add('pinBody');
    cnvPin.appendChild(pinBody[f]);

    //append left
    pinL[f] = document.createElement('div');
    pinL[f].classList.add('pinL');
    pinBody[f].appendChild(pinL[f]);
    pinL[f].addEventListener('pointerover', addPinCursor)

    pinL2[f] = document.createElement('div');
    pinL2[f].classList.add('pinL2');
    pinL[f].appendChild(pinL2[f]);
    pinL2[f].addEventListener('pointerover', addPinCursor)

    //append top
    pinT[f] = document.createElement('div');
    pinT[f].classList.add('pinT');
    pinBody[f].appendChild(pinT[f]);
    pinT[f].addEventListener('pointerover', addPinCursor)

    pinT2[f] = document.createElement('div');
    pinT2[f].classList.add('pinT2');
    pinT[f].appendChild(pinT2[f]);
    pinT2[f].addEventListener('pointerover', addPinCursor)

    //append right
    pinR[f] = document.createElement('div');
    pinR[f].classList.add('pinR');
    pinBody[f].appendChild(pinR[f]);
    pinR[f].addEventListener('pointerover', addPinCursor)

    pinR2[f] = document.createElement('div');
    pinR2[f].classList.add('pinR2');
    pinR[f].appendChild(pinR2[f]);
    pinR2[f].addEventListener('pointerover', addPinCursor)

    //append bottom
    pinB[f] = document.createElement('div');
    pinB[f].classList.add('pinB');
    pinBody[f].appendChild(pinB[f]);
    pinB[f].addEventListener('pointerover', addPinCursor)

    pinB2[f] = document.createElement('div');
    pinB2[f].classList.add('pinB2');
    pinB[f].appendChild(pinB2[f]);
    pinB2[f].addEventListener('pointerover', addPinCursor)

    //append top left
    pinTL[f] = document.createElement('div');
    pinTL[f].classList.add('pinTL');
    pinBody[f].appendChild(pinTL[f]);
    pinTL[f].addEventListener('pointerover', addPinCursor)

    pinTL2[f] = document.createElement('div');
    pinTL2[f].classList.add('pinTL2');
    pinTL[f].appendChild(pinTL2[f]);
    pinTL2[f].addEventListener('pointerover', addPinCursor)

    //append to top right
    pinTR[f] = document.createElement('div');
    pinTR[f].classList.add('pinTR');
    pinBody[f].appendChild(pinTR[f]);
    pinTR[f].addEventListener('pointerover', addPinCursor)

    pinTR2[f] = document.createElement('div');
    pinTR2[f].classList.add('pinTR2');
    pinTR[f].appendChild(pinTR2[f]);
    pinTR2[f].addEventListener('pointerover', addPinCursor)

    //append to bottom right
    pinBR[f] = document.createElement('div');
    pinBR[f].classList.add('pinBR');
    pinBody[f].appendChild(pinBR[f]);
    pinBR[f].addEventListener('pointerover', addPinCursor)

    pinBR2[f] = document.createElement('div');
    pinBR2[f].classList.add('pinBR2');
    pinBR[f].appendChild(pinBR2[f]);
    pinBR2[f].addEventListener('pointerover', addPinCursor)

    //append to bottom left
    pinBL[f] = document.createElement('div');
    pinBL[f].classList.add('pinBL');
    pinBody[f].appendChild(pinBL[f]);
    pinBL[f].addEventListener('pointerover', addPinCursor)

    pinBL2[f] = document.createElement('div');
    pinBL2[f].classList.add('pinBL2');
    pinBL[f].appendChild(pinBL2[f]);
    pinBL2[f].addEventListener('pointerover', addPinCursor)

    adjustBorder();
}

function adjustBasicsFromCanvas(canvas) {
    
    let type = leadPanel.dataset.type.replace(leadPanel.dataset.type.charAt(0), leadPanel.dataset.type.charAt(0).toUpperCase());

    let newPanel = document.getElementById(`pnlBox${type}`);

    newPanel.querySelector('.txtWidthLayer').value = Math.round(canvas.clientWidth);
    newPanel.querySelector('.txtHeightLayer').value = Math.round(canvas.clientHeight);

    newPanel.querySelector('.txtXLayer').value = Math.round(canvas.offsetLeft);
    newPanel.querySelector('.txtYLayer').value = Math.round(canvas.offsetTop);

    newPanel.querySelector('.txtRotationLayer').value = Math.round(canvas.dataset.rotation);
    newPanel.querySelector('.txtRotationLayer').previousElementSibling.value = newPanel.querySelector('.txtRotationLayer').value;
    
}

//=======================ALL BASIC PANEL FUNCTIONS======================

//function to hide and show cnvPattern
function showHideLayers() {

    var f = this.closest('.pnlBoxLayer').dataset.ref;
    
    if(this.dataset.show == "visible") {
        f2Canvas(f).style.visibility = "hidden";
        this.style.opacity = .2;
        this.dataset.show = "hidden";
    }
    else {
        f2Canvas(f).style.visibility = "visible";
        this.style.opacity = 1;
        this.dataset.show = "visible";
    }

}

//============================LAYER BLEND======================
function chooseLayerBlend() {

    let panel = this.closest(`[id*='pnlBox']`);
    panel.querySelector('.dropdown').children[0].innerText = this.innerText;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type != "pattern") {
                canvas.style.mixBlendMode = this.innerText;
            }
        }
    }
}

//=============================LAYER WIDTH SIZE=====================
function adjustLayerWidth() {

    let z = rngZoom.value / 100;
    let panel = this.closest(`[id*='pnlBox']`);

    for(let a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null) {

            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type != "pattern" && type != "text") {

                let initWidth = canvas.clientWidth;
                canvas.style.width = this.value + 'px';

                //also move the x axis
                let newX = ((initWidth - canvas.clientWidth) * z);
                canvas.style.left = canvas.offsetLeft + newX + "px";

                panel.querySelector('.txtXLayer').value = canvas.offsetLeft;

                if(type == "element") {
                    renderSVG(f)
                }
                else if(type == "line") {
                    renderLine(f);
                }

            } 

            else if(type != "pattern" &&  type == "text") {

                let initWidth = canvas.clientWidth;
                canvas.style.width = this.value + 'px';

                //also move the x axis
                let newX = ((initWidth - canvas.clientWidth) * z);
                canvas.style.left = canvas.offsetLeft + newX + "px";

                panel.querySelector('.txtXLayer').value = canvas.offsetLeft;

                canvas.children[0].style.whiteSpace = "normal";

                canvas.children[0].style.width = canvas.clientWidth + 'px';
                canvas.children[0].style.height = 1 + 'px';
                canvas.children[0].style.height = canvas.children[0].scrollHeight + 'px';
                
                if(canvas.children[0].clientHeight * z > canvas.clientHeight * z && currVertiAlignment == "Middle") {
                    var val = canvas.children[0].clientHeight * z - canvas.clientHeight * z;
                    canvas.children[0].style.position = "absolute";
                    canvas.children[0].style.top = 0 - val + 'px';
                }
                else if(canvas.children[0].clientHeight * z > canvas.clientHeight * z && currVertiAlignment == "Bottom") {
                    var val = canvas.children[0].clientHeight * z - canvas.clientHeight * z;
                    canvas.children[0].style.position = "absolute";
                    canvas.children[0].style.top = 0 - val * 2 + 'px';
                }
                else {
                    canvas.children[0].style.position = "static"; // need return to static for margin auto
                }

                
                panel.querySelector('.btnFixedSize').children[0].style.filter = "saturate(0) brightness(2)";
                panel.querySelector('.btnAutoWidth').children[0].style.filter = "none";
                panel.querySelector('.btnAutoHeight').children[0].style.filter = "none";
                
                currResizeBox = "FixedSize";

                panel.querySelector('.selTextResize').dataset.value = currResizeBox;
                
            }
        }
    }

    adjustBorder();
}

//=============================LAYER HEIGHT SIZE====================
function adjustLayerHeight() {

    let z = rngZoom.value / 100;
    let panel = this.closest(`[id*='pnlBox']`);

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type != "pattern" && type != "text") {

                //deal with width
                let initHeight = canvas.clientHeight;
                canvas.style.height = this.value + 'px';

                //also move the x axis
                let newY = ((initHeight - canvas.clientHeight) * z);
                canvas.style.top = canvas.offsetTop + newY + "px";

                panel.querySelector('.txtYLayer').value = canvas.offsetTop;

                if(type == "element") {
                    renderSVG(f)
                }
                else if(type == "line") {
                    renderLine(f);
                }
            }

            else if(type != "pattern" && type == "text") {

                let initHeight = canvas.clientHeight;
                canvas.style.height = this.value + 'px';

                //also move the x axis
                let newY = ((initHeight - canvas.clientWidth) * z);
                canvas.style.top = canvas.offsetTop + newY + "px";

                panel.querySelector('.txtYLayer').value = canvas.offsetTop;
                
                canvas.children[0].style.whiteSpace = "normal";

                canvas.children[0].style.width = canvas.clientWidth + 'px';
                canvas.children[0].style.height = 1 + 'px';
                canvas.children[0].style.height = canvas.children[0].scrollHeight + 'px';
                
                if(canvas.children[0].clientHeight * z > canvas.clientHeight * z && currVertiAlignment == "Middle") {
                    var val = canvas.children[0].clientHeight * z - canvas.clientHeight * z;
                    canvas.children[0].style.position = "absolute";
                    canvas.children[0].style.top = 0 - val + 'px';
                }
                else if(canvas.children[0].clientHeight * z > canvas.clientHeight * z && currVertiAlignment == "Bottom") {
                    var val = canvas.children[0].clientHeight * z - canvas.clientHeight * z;
                    canvas.children[0].style.position = "absolute";
                    canvas.children[0].style.top = 0 - val * 2 + 'px';
                }
                else {
                    canvas.children[0].style.position = "static"; // need return to static for margin auto
                }
        
                panel.querySelector('.btnFixedSize').children[0].style.filter = "saturate(0) brightness(2)";
                panel.querySelector('.btnAutoWidth').children[0].style.filter = "none";
                panel.querySelector('.btnAutoHeight').children[0].style.filter = "none";
                
                currResizeBox = "FixedSize";

                panel.querySelector('.selTextResize').dataset.value = currResizeBox;
            }
            
        }
    }

    adjustBorder();
}

//=============================LAYER X COORDINATES====================
function adjustLayerX() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type != "pattern") {

                canvas.style.left = this.value + 'px';
    
            }
        }
    }

    adjustBorder();

}

//=============================LAYER Y COORDINATES====================
function adjustLayerY() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type != "pattern") {

                canvas.style.top = this.value + 'px';
    
            }
        }
    }

    adjustBorder();
}

//=============================FLIP X COORDINATES====================
function adjustFlipX() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type != "pattern") {
                
                if(this.dataset.value == "true") {

                    canvas.style.transform = "scale(-1, 1)";
                }

                else if(this.dataset.value == "false") { 

                    canvas.style.transform = "scale(1, 1)";

                    this.removeEventListener('mouseover', chkBoxHover);
                }
            }
        }
    }
}

//=============================FLIP Y COORDINATES====================
function adjustFlipY() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type != "pattern") {

                if(this.dataset.value == "true") {

                    canvas.style.transform = "scale(1, -1)";
                }
            
                else if(this.dataset.value == "false") { 
            
                    canvas.style.transform = "scale(1, 1)";
            
                    this.removeEventListener('mouseover', chkBoxHover);
            
                }

            }
        }
    }

}

//==============================IMAGE OPACITY========================
function chooseLayerOpacity() {
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type != "pattern") {
                canvas.style.opacity = this.value + '%';
            }
        }
    }

}

//==============================IMAGE ROTATION========================
function chooseLayerRotation() {

    //let f = Number(leadPanel.dataset.ref);

    //deal with top
    //pinBody[f].style.rotate = this.value + 'deg';
    //pinBody[f].dataset.rotation = this.value;

    //cnvLayers[f].style.rotate = this.value + 'deg';
    //cnvLayers[f].dataset.rotation = this.value;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type != "pattern") {
                f2PinBody(f).style.rotate = this.value + 'deg';
                f2PinBody(f).dataset.rotation = this.value;

                canvas.style.rotate = this.value + 'deg';
                canvas.dataset.rotation = this.value;
            }
        }
    }

}

//=========================ADD CNVPIN EVENT LISTENERS=========================

cnvPin.addEventListener('pointerdown', scaleBorderDown);
cnvPin.addEventListener('pointermove', scaleBorderMove);
cnvPin.addEventListener('pointerup', scaleBorderUp);

cnvPin.addEventListener('pointerdown', resizeBorderDown);
cnvPin.addEventListener('pointermove', resizeBorderMove);
cnvPin.addEventListener('pointerup', resizeBorderUp);

cnvPin.addEventListener('pointerdown', rotateBorderDown);
cnvPin.addEventListener('pointermove', rotateBorderMove);
cnvPin.addEventListener('pointerup', rotateBorderUp);

cnvPin.addEventListener('pointerdown', dragBorderDown);
cnvPin.addEventListener('pointermove', dragBorderMove);
cnvPin.addEventListener('pointerup', dragBorderUp);

cnvPin.addEventListener('dblclick', function(e) {
    if(e.target != cnvPin && e.target.className == "pinBody") {
        counter = 0;
        clearInterval(tmrDrag);
        tmrDrag = null;
    }
});

//remove out of focus scaling, draggin and resizing signals
document.body.addEventListener('pointerup', function(e) {

    if(e.button == 0) {

        isScaling = false;
        isRotating = false;
        isResizing = false;
        isDragging = false;

        cnvBox.style.position = "relative";
        cnvGrpLayers.style.boxSizing = "border-box";
        cnvGrpLayers.style.overflow = "hidden";

        //reset cursors
        cnvPin.style.cursor = "default";

        for(var a = 0; a < pinBody.length; a++) {

            if(pinBody[a] != null) {

                pinBody[a].style.cursor = "default";

                pinTL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
                pinTR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
                pinBR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(-0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;
                pinBL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 -0.9)' transform-origin='11 11'%3E%3Cpath d='M5.22599 21.661C4.96521 22.1127 4.31328 22.1127 4.05251 21.661L0.0920152 14.8013C-0.168758 14.3496 0.157209 13.785 0.678755 13.785H8.59974C9.12128 13.785 9.44725 14.3496 9.18648 14.8013L5.22599 21.661Z' fill='%236885CC'/%3E%3Cpath d='M4.81984 20.7294C4.75465 20.8424 4.59166 20.8424 4.52647 20.7294L1.15272 14.886C1.08752 14.7731 1.16902 14.6319 1.2994 14.6319L8.04691 14.6319C8.17729 14.6319 8.25879 14.7731 8.19359 14.886L4.81984 20.7294Z' fill='white'/%3E%3Cpath d='M21.6615 4.05199C22.1132 4.31276 22.1132 4.96469 21.6615 5.22546L14.8017 9.18591C14.35 9.44668 13.7854 9.12072 13.7854 8.59918V0.678268C13.7854 0.156727 14.35 -0.169236 14.8017 0.0915348L21.6615 4.05199Z' fill='%236885CC'/%3E%3Cpath d='M20.7299 4.49204C20.8428 4.55723 20.8428 4.72021 20.7299 4.78541L14.8864 8.15913C14.7735 8.22432 14.6323 8.14283 14.6323 8.01244V1.265C14.6323 1.13462 14.7735 1.05313 14.8864 1.11832L20.7299 4.49204Z' fill='white'/%3E%3Cpath d='M14.3784 2.52153C8.76577 2.52153 2.52203 8.5957 2.52203 14.2083H6.75657C6.75657 10.8208 10.5674 6.75592 14.3784 6.75592V2.52153Z' fill='%236885CC'/%3E%3Cpath d='M14.8019 3.36841C8.87367 3.36841 3.36892 8.87311 3.36892 14.8013H5.90957C5.90957 9.71999 10.5673 5.90904 14.8019 5.90904V3.36841Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 11 11, auto`;

                pinTL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                pinTR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                pinBR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M2.89321 3.87335C2.73382 3.27849 3.27815 2.73416 3.87301 2.89355L11.2343 4.86602C11.8292 5.02541 12.0284 5.76898 11.593 6.20445L6.2041 11.5933C5.76864 12.0288 5.02507 11.8295 4.86568 11.2347L2.89321 3.87335Z' fill='%236885CC'/%3E%3Cpath d='M3.83631 4.08187C3.79646 3.93316 3.93254 3.79708 4.08126 3.83692L10.5822 5.57884C10.7309 5.61869 10.7807 5.80458 10.6718 5.91345L5.91283 10.6725C5.80397 10.7813 5.61807 10.7315 5.57823 10.5828L3.83631 4.08187Z' fill='white'/%3E%3Cpath d='M23.1063 22.1265C23.2657 22.7213 22.7214 23.2656 22.1265 23.1063L14.7652 21.1338C14.1703 20.9744 13.9711 20.2308 14.4065 19.7954L19.7954 14.4065C20.2309 13.971 20.9744 14.1703 21.1338 14.7651L23.1063 22.1265Z' fill='%236885CC'/%3E%3Cpath d='M22.1632 21.9179C22.2031 22.0666 22.067 22.2027 21.9183 22.1629L15.4173 20.421C15.2686 20.3811 15.2188 20.1952 15.3277 20.0864L20.0867 15.3274C20.1955 15.2185 20.3814 15.2683 20.4213 15.417L22.1632 21.9179Z' fill='white'/%3E%3Cpath d='M7.34285 10.1716L10.1713 7.34318L18.6566 15.8285L15.8281 18.6569L7.34285 10.1716Z' fill='%236885CC'/%3E%3Cpath d='M7.34285 8.7574L8.75706 7.34318L18.6566 17.2427L17.2423 18.6569L7.34285 8.7574Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                pinBL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M22.1267 2.89348C22.7216 2.73409 23.2659 3.27842 23.1065 3.87328L21.1341 11.2346C20.9747 11.8295 20.2311 12.0287 19.7956 11.5933L14.4068 6.20437C13.9713 5.76891 14.1705 5.02534 14.7654 4.86595L22.1267 2.89348Z' fill='%236885CC'/%3E%3Cpath d='M21.9182 3.83658C22.0669 3.79673 22.203 3.93281 22.1632 4.08153L20.4213 10.5825C20.3814 10.7312 20.1955 10.781 20.0866 10.6721L15.3276 5.9131C15.2188 5.80424 15.2686 5.61834 15.4173 5.5785L21.9182 3.83658Z' fill='white'/%3E%3Cpath d='M3.87326 23.1066C3.2784 23.266 2.73407 22.7216 2.89346 22.1268L4.86593 14.7654C5.02532 14.1706 5.76889 13.9713 6.20435 14.4068L11.5932 19.7957C12.0287 20.2311 11.8295 20.9747 11.2346 21.1341L3.87326 23.1066Z' fill='%236885CC'/%3E%3Cpath d='M4.08178 22.1635C3.93307 22.2033 3.79698 22.0672 3.83683 21.9185L5.57875 15.4176C5.6186 15.2689 5.80449 15.2191 5.91336 15.3279L10.6724 20.0869C10.7812 20.1958 10.7314 20.3817 10.5827 20.4216L4.08178 22.1635Z' fill='white'/%3E%3Cpath d='M15.8285 7.34313L18.6569 10.1716L10.1716 18.6568L7.34319 15.8284L15.8285 7.34313Z' fill='%236885CC'/%3E%3Cpath d='M17.2427 7.34313L18.6569 8.75734L8.7574 18.6568L7.34319 17.2426L17.2427 7.34313Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                pinL[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
                pinT[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                pinR[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
                pinB[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;

                pinL2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
                pinT2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
                pinR2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M0.400005 13.6928C-0.133329 13.3848 -0.133329 12.615 0.400005 12.3071L7 8.49661C7.53334 8.18869 8.2 8.57359 8.2 9.18943V16.8105C8.2 17.4263 7.53334 17.8112 7 17.5033L0.400005 13.6928Z' fill='%236885CC'/%3E%3Cpath d='M1.21432 13.1733C1.08099 13.0964 1.08099 12.9039 1.21432 12.8269L7.04289 9.4618C7.17623 9.38482 7.34289 9.48105 7.34289 9.63501L7.34289 16.3653C7.34289 16.5192 7.17623 16.6154 7.04289 16.5385L1.21432 13.1733Z' fill='white'/%3E%3Cpath d='M25.6 12.3071C26.1333 12.615 26.1333 13.3848 25.6 13.6928L19 17.5033C18.4666 17.8112 17.8 17.4263 17.8 16.8104L17.8 9.18943C17.8 8.57359 18.4666 8.18868 19 8.4966L25.6 12.3071Z' fill='%236885CC'/%3E%3Cpath d='M24.7857 12.8265C24.919 12.9035 24.919 13.096 24.7857 13.1729L18.9571 16.5381C18.8238 16.6151 18.6571 16.5188 18.6571 16.3649L18.6571 9.63462C18.6571 9.48066 18.8238 9.38443 18.9571 9.46141L24.7857 12.8265Z' fill='white'/%3E%3Cpath d='M7.99993 14.9999V10.9999L17.9999 10.9999V14.9999L7.99993 14.9999Z' fill='%236885CC'/%3E%3Cpath d='M6.99993 13.9999V11.9999L18.9999 11.9999V13.9999L6.99993 13.9999Z' fill='white'/%3E%3C/g%3E%3C/svg%3E") 13 13, auto`;
                pinB2[a].style.cursor = `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(${Number(pinBody[a].dataset.rotation)} 0 0) scale(0.9 0.9)' transform-origin='13 13'%3E%3Cpath d='M12.3072 0.399759C12.6151 -0.133575 13.3849 -0.133575 13.6928 0.399759L17.5033 6.99976C17.8113 7.53309 17.4263 8.19976 16.8105 8.19976H9.18949C8.57365 8.19976 8.18875 7.53309 8.49667 6.99976L12.3072 0.399759Z' fill='%236885CC'/%3E%3Cpath d='M12.8266 1.21408C12.9036 1.08074 13.096 1.08074 13.173 1.21408L16.5381 7.04265C16.6151 7.17598 16.5189 7.34265 16.3649 7.34265H9.63468C9.48072 7.34265 9.38449 7.17598 9.46147 7.04265L12.8266 1.21408Z' fill='white'/%3E%3Cpath d='M13.6928 25.5997C13.3849 26.133 12.6151 26.133 12.3072 25.5997L8.49667 18.9997C8.18875 18.4663 8.57365 17.7997 9.18949 17.7997H16.8105C17.4264 17.7997 17.8113 18.4663 17.5033 18.9997L13.6928 25.5997Z' fill='%236885CC'/%3E%3Cpath d='M13.1734 24.7854C13.0964 24.9187 12.904 24.9187 12.827 24.7854L9.46186 18.9568C9.38488 18.8235 9.48111 18.6568 9.63507 18.6568H16.3653C16.5193 18.6568 16.6155 18.8235 16.5385 18.9568L13.1734 24.7854Z' fill='white'/%3E%3Cpath d='M11 7.99968H15V17.9997H11V7.99968Z' fill='%236885CC'/%3E%3Cpath d='M12 6.99968H14V18.9997H12V6.99968Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A") 13 13, auto`;
            }
            
        }
    }
})

//=============================DRAG AND DROP PNLBOX LAYERS=========================
var tmrDrag;
function countdownPanelLayer() {

    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');

    if(counter < 300) {
        counter+=100;
    }
    else {
        isDragging = true; //set boolean to true

        clearInterval(tmrDrag);
        tmrDrag = null;
        counter = 0;

        //record initial sequence
        layerSequence = "Stacked: ";

        for(let a = 0; a < pnlBoxLayer.length; a++) {
            layerSequence += `${Number(pnlBoxLayer[a].dataset.ref)} `;
        }
    }
}   

function pointerDownLayer(e) {

    if(e.button == 0) {
       
        if((this != e.target) && (e.target.closest('.pnlTitleLayer'))) {
            e.preventDefault(); //remove the highlighting on texts
            
            clientY = e.clientY;

            //remove any current focus especially on the renaming
            var checkInputs = document.querySelectorAll('input[type="text"], input[type="number"]');
            checkInputs.forEach(function(input) {
                //input.blur();
            })

            for(var a = 0; a < focusPanel.length; a++) {
                if(focusPanel[a] != null) {
                    if(focusPanel[a] == e.target.closest('.pnlBoxLayer')) {
                        tmrDrag = setInterval(countdownPanelLayer, 100);
                        break;
                    }
            
                }
            }
        }
    }

}
document.querySelectorAll('.configScroll')[5].addEventListener('pointerdown', pointerDownLayer);

function pointerMoveLayer(e) {
    
    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');
    e.preventDefault();

    if(isDragging) {
 
        //this.scrollTop = e.clientY;

        for(var a = 0; a < pnlBoxLayer.length; a++) {
           
            if(e.clientY < pnlBoxLayer[a].getBoundingClientRect().top + (pnlBoxLayer[a].clientHeight/2)) {
                
                patRank = a;

                breaklineDrag.style.display = "block";

                this.insertBefore(breaklineDrag, pnlBoxLayer[patRank]);
           
                break;
            }
            
            else if(e.clientY > pnlBoxLayer[pnlBoxLayer.length-1].getBoundingClientRect().top + (pnlBoxLayer[pnlBoxLayer.length-1].clientHeight /2)) {

                this.appendChild(breaklineDrag);

                break;
            }
        }
    }

}
document.querySelectorAll('.configScroll')[5].addEventListener('pointermove', pointerMoveLayer);
document.querySelectorAll('.configScroll')[5].addEventListener('contextmenu', function(e){
    e.preventDefault();
})

function pointerUpLayer(e) {

    e.preventDefault();
    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');

    if(isDragging) {

        isDragging = false;

        ///////////MOVE THE FOCUS PANEL////////
        for(let a = focusPanel.length-1; a >= 0; a--) {

            if(focusPanel[a] != null) {
                this.insertBefore(focusPanel[a], breaklineDrag);
            }
        }

        breaklineDrag.style.display = "none";
    
        patRank = null;

        //RECORD NEW SEQUENCE
        layerSequence += "*";

        for(let a = 0; a < pnlBoxLayer.length; a++) {
            layerSequence += `${Number(pnlBoxLayer[a].dataset.ref)} `;
        }

        checkMaxHistory();
        history[h] = layerSequence;

        layerSequence = "";

        rearrangeCanvasLayers();

    }

    counter = 0;
    clientY = null;
    clearInterval(tmrDrag);
    
}
document.querySelectorAll('.configScroll')[5].addEventListener('pointerup', pointerUpLayer);

function hideBreakLineDrag(e) {
    e.preventDefault();

    if(isDragging) {
        breaklineDrag.style.display = "none";
        patRank = null;
        rearrangeCanvasLayers();
    }

    counter = 0;
    clientY = null;
    clearInterval(tmrDrag);
    
}
document.getElementsByClassName('configScroll')[5].addEventListener('pointerup', hideBreakLineDrag);

//================REARRANGE PANELBOXES==================
function rearrangePanelBoxes(text) {

    let partStacking = text.split('*');
    let prevStack = partStacking[0];
    let ref = prevStack.split(' ');
    let cnvPin = document.getElementById('cnvPin');
    let configScroll = document.getElementsByClassName('configScroll');
    let cnvGrpLayers = document.getElementById('cnvGrpLayers');

    for(let a = 1; a < ref.length; a++) {
        if(ref[a] != '') {
            let panel = configScroll[5].querySelector(`[data-ref="${ref[a]}"]`)
            configScroll[5].appendChild(panel)

            panel.querySelector('.txtHeader').removeEventListener('keypress', validateTxtHeader);
            panel.querySelector('.txtHeader').removeEventListener('dblclick', renameTxtHeader);
            panel.querySelector('.txtHeader').removeEventListener('change', saveTxtHeader);
            panel.querySelector('.txtHeader').removeEventListener('click', blurTxtHeader);
            panel.querySelector('.txtHeader').removeEventListener('focusout', saveTxtHeader);

            //add the show and hide control
            panel.querySelector('.btnShowHide').removeEventListener('click', showHideLayers);

            panel.querySelector('.txtHeader').addEventListener('keypress', validateTxtHeader);
            panel.querySelector('.txtHeader').addEventListener('dblclick', renameTxtHeader);
            panel.querySelector('.txtHeader').addEventListener('change', saveTxtHeader);
            panel.querySelector('.txtHeader').addEventListener('click', blurTxtHeader);
            panel.querySelector('.txtHeader').addEventListener('focusout', saveTxtHeader);

            //add the show and hide control
            panel.querySelector('.btnShowHide').addEventListener('click', showHideLayers);

            let canvas = cnvGrpLayers.querySelector(`[data-ref="${ref[a]}"]`);
            cnvGrpLayers.prepend(canvas);

            if(panel.dataset.type != "pattern") {
                let pin = cnvPin.querySelector(`[data-ref="${ref[a]}"]`);
                cnvPin.prepend(pin);
            }
        }
    }
}

//================REARRANGE CANVAS DEPENDING ON THE LAYER ARRANGEMENT=======
function rearrangeCanvasLayers() {
 
    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');
    let cnvGrpLayers = document.getElementById('cnvGrpLayers');

    for(let a = 1; a < pnlBoxLayer.length; a++) {
        
        let f = pnlBoxLayer[a].dataset.ref;

        let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
        cnvGrpLayers.prepend(canvas);

        if(pnlBoxLayer[a].dataset.type != "pattern") {
        
            let pin = cnvPin.querySelector(`[data-ref="${f}"]`);
            cnvPin.prepend(pin);
        }
    }

}

//=================CLONE CANVAS TYPE===================
function cloneCanvas() {

    let newFocusSequence = "";
    let configScroll = document.getElementsByClassName('configScroll');
    let cnvGrpLayers = document.getElementById('cnvGrpLayers');

    //PRECOUNT ALL EXISTING FOCUS OBJECTS
    let c = 0;
    for(let a = 0; a < focusObj.length; a++) {
        if(focusObj[a] != null) {
            c++;
        }
    }

    //THIS WILL COUNT EVERY FOCUS PANEL/OBJECTS DUPLICATED
    let i = 0;

    resetLeadDrag();

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {

            let f = focusPanel[a].dataset.ref;
            newFocusSequence += `${maxF},`;

            //clone panel
            let clonePanel = focusPanel[a].cloneNode(true);
            clonePanel.dataset.ref = maxF;

            //reposition this clone
            configScroll[5].insertBefore(clonePanel, focusPanel[a])

            //clone canvas
            let cloneCanvas = focusObj[a].cloneNode(true);
            cloneCanvas.dataset.ref = maxF;

            //check first if the focusobj is the last child
            if(focusObj[f] == cnvGrpLayers.lastChild) {
                cnvGrpLayers.appendChild(cloneCanvas)
            }
            else {
                cnvGrpLayers.insertBefore(cloneCanvas, focusObj[a].nextElementSibling);
            }

            //add the layer arrays
            layerL[maxF] = layerL[f];
            layerT[maxF] = layerT[f];
            layerW[maxF] = layerW[f];
            layerH[maxF] = layerH[f];

            addBorderLayer(cloneCanvas, maxF);

            //add border arrays
            borderW[maxF] = borderW[f];
            borderH[maxF] = borderH[f];
            borderL[maxF] = borderL[f];
            borderT[maxF] = borderT[f];
            borderR[maxF] = borderR[f];

            //clone dataLayer as well
            dataLayer[maxF] = dataLayer[f];

            //replace 'ref' part in this new dataLayer
            dataLayer[maxF] = valueSwitcher(dataLayer[maxF], 'ref', maxF);
            
            //console.log(dataLayer[maxF], maxF)
            //check max history and add h++
            checkMaxHistory();
            //create history
            history[h] = dataLayer[maxF].replace('*', 'Created*'); 
            
            maxF++;

            i++;

            if(i == c) {

                multiSelect = false;
                selectedAll = false;

                resetAllFocus();
                resetLeadDrag();
            }
        }
    }

    let newF = newFocusSequence.trim().split(',');
    for(let a = 0; a < newF.length-1; a++) {

        if(newF[a] != null || newF[a].trim() != "") {

            let configScroll = document.getElementsByClassName('configScroll');
            let panel = configScroll[5].querySelector(`[data-ref="${newF[a]}"]`);

            panel2Focus(panel);
           
        }
    }
}

//=================MOVE LAYER VIA RIGHT CLICK===================

function contextMoveLayer(position) {
    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');
    let configScroll = document.getElementsByClassName('configScroll');

    //RECORD OLD SEQUENCE
    layerSequence = "Stacked: ";

    for(let a = 0; a < pnlBoxLayer.length; a++) {
        layerSequence += `${Number(pnlBoxLayer[a].dataset.ref)} `;
    }

    if(position == 'top') {
        configScroll[5].insertBefore(leadPanel, configScroll[5].firstChild);
    }
    else if(position == 'up') {
        configScroll[5].insertBefore(leadPanel, leadPanel.previousElementSibling);
    }
    else if(position == 'down') {
        configScroll[5].insertBefore(leadPanel, leadPanel.nextElementSibling.nextElementSibling);
    }
    else if(position == 'bottom') {
        configScroll[5].appendChild(leadPanel);
    }

    //APPEND THE NEW LAYER SEQUENCE
    layerSequence += "*";

    for(let a = 0; a < pnlBoxLayer.length; a++) {
        layerSequence += `${Number(pnlBoxLayer[a].dataset.ref)} `;
    }

    //ADD TO HISTORY
    checkMaxHistory();
    history[h] = layerSequence;

    //RESET LAYER SEQUENCE
    layerSequence = "";

    //REARRANGE CANVAS 
    rearrangeCanvasLayers();
}
