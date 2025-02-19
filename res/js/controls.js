var leadPanel;
var firstPanel;
var focusObj = [];
var focusPanel = [];
var inFocus;
var ctrlAFocus;
var isSelecting;
var resX;
var resY;
var multiSelect = false;
var selectedAll = false;


//=============CHECK DOCUMENT CLICKS TO HIDE DROPDOWN MENUS ===========

function checkClicks(e) { //hide all dropdowns

    var clicked = e.target;
    var dropdown = document.getElementsByClassName('dropdown');
    var dropdownLineStart = document.getElementsByClassName('dropdownLineStart');
    var dropdownLineEnd = document.getElementsByClassName('dropdownLineEnd');
    var searchbox = document.getElementsByClassName('searchbox');
    var dropdownZoom = document.getElementById('dropdownZoom');

    hideAllOptions();

    for(var a = 0; a < dropdown.length; a++) { //generic loop for all dropdown classes

        if(clicked === dropdown[a] || clicked.parentElement === dropdown[a]) {
            
            if(dropdown[a].dataset.on == "false") {
                
                if(dropdown[a].parentElement.children[1].childElementCount > 0) {
                    dropdown[a].parentElement.children[1].style.display = "block";
                }
                
                dropdown[a].dataset.on = "true";
            }

            else if(dropdown[a].dataset.on == "true") {
                dropdown[a].dataset.on = "false";
            }
            
        }

        else {
            dropdown[a].dataset.on = "false";
        }

    }

    for(var a = 0; a < dropdownLineStart.length; a++) { //generic loop for all dropdown classes

        if(clicked === dropdownLineStart[a] || clicked.closest('.dropdownLineStart') === dropdownLineStart[a]) {
            
            if(dropdownLineStart[a].dataset.on == "false") {
                
                if(dropdownLineStart[a].parentElement.children[1].childElementCount > 0) {
                    dropdownLineStart[a].parentElement.children[1].style.display = "block";
                }
                
                dropdownLineStart[a].dataset.on = "true";
            }

            else if(dropdownLineStart[a].dataset.on == "true") {
                dropdownLineStart[a].dataset.on = "false";
            }
            
        }

        else {
            dropdownLineStart[a].dataset.on = "false";
        }

    }

    for(var a = 0; a < dropdownLineEnd.length; a++) { //generic loop for all dropdown classes

        if(clicked === dropdownLineEnd[a] || clicked.closest('.dropdownLineEnd') === dropdownLineEnd[a]) {
            
            if(dropdownLineEnd[a].dataset.on == "false") {
                
                if(dropdownLineEnd[a].parentElement.children[1].childElementCount > 0) {
                    dropdownLineEnd[a].parentElement.children[1].style.display = "block";
                }
                
                dropdownLineEnd[a].dataset.on = "true";
            }

            else if(dropdownLineEnd[a].dataset.on == "true") {
                dropdownLineEnd[a].dataset.on = "false";
            }
            
        }

        else {
            dropdownLineEnd[a].dataset.on = "false";
        }

    }

    for(var a = 0; a < searchbox.length; a++) { //loop for txtSearch classes

        if(clicked === searchbox[a] || clicked === searchbox[a].children[0] || clicked === searchbox[a].children[1]) {

            if(searchbox[a].dataset.on == "false") {
                
                if(a != 2) { //exclude searchbox[a] for fonts
                    var val = searchbox[a].querySelector('.txtSearch').value;
                    if(val.trim().length > 0) {
                        searchbox[a].closest('.pnlDropHeader').children[1].style.display = "block";
                        searchbox[a].dataset.on = "true";
                    }
                }
                else {

                    var val = searchbox[a].querySelector('.txtSearch').value;

                    if(val.trim().length > 0) {
                        searchbox[a].closest('.pnlDropHeader').children[1].style.display = "block";
                        searchbox[a].dataset.on = "true";
                    }
                    else {
                        searchbox[a].closest('.pnlDropHeader').children[1].style.display = "none";
                    }
                }
            }

            else if(searchbox[a].dataset.on == "true") {

                searchbox[a].dataset.on = "false";
                searchbox[a].closest('.pnlDropHeader').children[1].style.display = "none";

            }
            
        }
        else {
            searchbox[a].dataset.on = "false";
            searchbox[a].closest('.pnlDropHeader').children[1].style.display = "none";
        }
    }

    if(clicked.closest('#dropdownZoom') || clicked === dropdownZoom[a]) {
        
        if(dropdownZoom.dataset.on == "false") {
            dropdownZoom.closest('#contZoom').children[1].style.display = "block";
            dropdownZoom.dataset.on = "true";
        }

        else if(dropdownZoom.dataset.on == "true") {
            dropdownZoom.dataset.on = "false";
        }

    }

    else {
        dropdownZoom.dataset.on = "false";
    }
    
}
document.addEventListener('click', checkClicks);


function linkCanvasWithPanelLayer(key, pin) {
    
    let f = Number(pin.dataset.ref);
    let configScroll = document.getElementsByClassName('configScroll');
    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)
    let panel = configScroll[5].querySelector(`[data-ref="${f}"]`);
    let txtHeader = document.getElementsByClassName('txtHeader');

    if(key == null) {
        
        if(checkObjFocusCount() > 1) {

            if(checkFocus(panel)[0]) {
                chooseLeadDrag(pin)
                leadPanel = panel;
                hideAllContextMenu();
            }

            else {

                resetAllFocus();
                canvas2Focus(canvas);
                firstPanel = panel;
                checkMultiSelect();
       
            }
            
        }
        else {

            resetAllFocus();
            canvas2Focus(canvas);
            firstPanel = panel;
            checkMultiSelect();
        }

    }

    else if(key == 'ctrl') {

        if(checkFocus(panel)[0]) {

            canvasUnfocus(f)
            checkMultiSelect();
        }

        else {

            if(!multiSelect) {
                firstPanel = panel;
            }
            
            //blur all txtHeaders
            for(var a = 0; a < txtHeader.length; a++) {
                txtHeader[a].blur();
            }
            
            //remove other pnlboxthumb focus
            thumbResetAll();

            canvas2Focus(canvas);
            checkMultiSelect();
        }

    }

    if(canvas.dataset.type != "text") {
        swapPanels(leadPanel.dataset.type);
    }

}

//=====================CHOOSE LEAD DRAG================================
function chooseLeadDrag(pin) {

    if(checkObjFocusCount() > 1) {

        //this function will reset which should be on top
        resetLeadDrag();

        pin.style.zIndex = "1";
        pin.querySelector(`.pinTL2`).style.backgroundColor = "#6885CC";
        pin.querySelector(`.pinTR2`).style.backgroundColor = "#6885CC";
        pin.querySelector(`.pinBR2`).style.backgroundColor = "#6885CC";
        pin.querySelector(`.pinBL2`).style.backgroundColor = "#6885CC";

        leadDrag = pin;
    }

    else if (checkObjFocusCount() <= 1) {

        for(var a = 0; a < pinBody.length; a++) {
            if(pinBody[a] != null) {
                pinBody[a].style.zIndex = "0";
            }
        }

        pin.style.zIndex = "1";

        leadDrag = pin;
    }
}

function resetLeadDrag() {

    for(var a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            pinBody[a].style.zIndex = "0";
            pinBody[a].querySelector('.pinTL2').style.backgroundColor = "white";
            pinBody[a].querySelector('.pinTR2').style.backgroundColor = "white";
            pinBody[a].querySelector('.pinBR2').style.backgroundColor = "white";
            pinBody[a].querySelector('.pinBL2').style.backgroundColor = "white";

        }
    }

    leadDrag = null;
}

//=====================SELECT ALL=========================================

function selectDeselectAll() {

    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');

    //check first if there's input focus, if not proceed
    if(!checkInputFocus()) {

        if(ctrlAFocus == "menuUploads") {
            let getSelected = 0;

            for(let a = 0; a < focusPanel.length; a++) {
                if(focusPanel[a] != null) {
                    getSelected+=1;
                }
            }

            if(getSelected != pnlBoxThumb.length) {
                for(let a = 0; a < pnlBoxThumb.length; a++) {
                    //pnlBoxThumb[a].style.borderColor = "#6885CC";
                    pnlBoxThumb[a].style.borderColor = "#647499";
                    pnlBoxThumb[a].style.borderWidth = "1px";
                    focusPanel[a] = pnlBoxThumb[a];
                }
            }
            else if(getSelected == pnlBoxThumb.length) {
                for(var a = 0; a < pnlBoxThumb.length; a++) {
                    pnlBoxThumb[a].style.borderColor = "transparent";
                    pnlBoxThumb[a].style.borderWidth = "1px";
                    focusPanel[a] = null;
                }
            }

            checkMultiSelect();
        }

        else if(ctrlAFocus == "menuLayers" || ctrlAFocus == "workArea") {

            let getSelected = 0;
            let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');
            let configScroll = document.getElementsByClassName('configScroll');

            for(let a = configScroll[5].childElementCount-1; a >= 0; a--) {
                if(focusPanel[a] != null) {
                    getSelected+=1;
                }
            }
            
            //select all
            if(getSelected != pnlBoxLayer.length) {
                for(let a = pnlBoxLayer.length-1; a >= 0; a--) {
                    panel2Focus(pnlBoxLayer[a]);
                }

                //leadpanel should be the last
                leadPanel = pnlBoxLayer[pnlBoxLayer.length-1];
                leadDrag = cnvPin.querySelector(`[data-ref="${leadPanel.dataset.ref}"]`)
                swapPanels(leadPanel.dataset.type);
                checkMultiSelect();

                selectedAll = true;

                checkMaxHistory();
                history[h] = "Select All*";
            }

            //deselect all
            else if(getSelected == pnlBoxLayer.length) {
                for(let a = 0; a < pnlBoxLayer.length; a++) {
                    panelUnfocus(pnlBoxLayer[a]);
                }

                multiSelect = false;
                selectedAll = false;
                resetLeadDrag();

                checkMaxHistory();
                history[h] = "Deselect All*";
            }
        }
    }
}

function ctrlA(e) {

    if((e.ctrlKey && e.key == 'a') || (e.ctrlKey && e.key  == 'A')) {
        selectDeselectAll();
    }
    
}
document.addEventListener('keydown', ctrlA);

document.addEventListener('pointerover', function(e){

    let configScroll = document.getElementsByClassName('configScroll');

    if(e.target.closest('#workArea')) {
        ctrlAFocus = "workArea";
        configScroll[2].children[0].style.backgroundColor = "transparent";
    }
    else if(e.target.closest('#menuPatterns')) {
        ctrlAFocus = "menuPatterns";
    }
    else if(e.target.closest('#menuUploads')) {
        ctrlAFocus = "menuUploads";
    }
    else if(e.target.closest('#menuLayers')) {
        ctrlAFocus = "menuLayers";
    }
})

///////////////////////START SELECTING CANVAS USING MOUSE///////////////////

document.getElementById('cnvPin').addEventListener('pointerdown', function(e) {
    
    let scrollL = canvasBorder.scrollLeft;
    let scrollT = canvasBorder.scrollTop;

    isScaling = false;
    isRotating = false;
    isResizing  = false;
    isDragging = false;
    
    if(e.button == 0) {
        if(!e.target.closest('.pinBody')) {

            cnvPin.style.cursor = `default !important`;
    
            var inputs = cnvPin.querySelectorAll('div');
    
            inputs.forEach(function(input) {

                input.style.cursor = `default`;
    
            })
    
            isSelecting = true;
            //350 IS TOTAL WIDTH OF TOOLBOX AND TOOLMENU COMBINED
            //116 IS TOTAL HEIGHT OF HEADERUI AND SUBMENU COMBINED
            resX = e.clientX - 350 + scrollL;
            resY = e.clientY - 116 + scrollT;
            
        }
        else {
            isSelecting = false;
        }
    }
})


///////////////////////MOVE SELECTING CANVAS USING MOUSE////////////////////
function selectingCanvases(e) {

    let scrollL = canvasBorder.scrollLeft;
    let scrollT = canvasBorder.scrollTop;

    let selectPin = document.getElementById('selectPin');

    if(isSelecting) {

        //350 IS THE TOTAL WIDTH OF TOOLMENU AND TOOLBOX
        let newX = e.clientX - 350 + scrollL;
        let newY = e.clientY -116 + scrollT;

        //CHECK FIRST IF SELECTING IS GOING TO THE RIGHT DIRECTION
        if( newX > resX) {
            selectPin.style.left = resX + 'px';
            selectPin.style.width = Math.abs(newX - resX) + 'px';
        }
        else if(newX < resX) { 
            selectPin.style.width = Math.abs(newX - resX) + 'px';
            selectPin.style.left = resX - selectPin.clientWidth + 'px';
        }

        //CHECK FIRST IF SELECTING IS GOING TO THE LOWER DIRECTION
        if(newY > resY) {
            selectPin.style.top = resY + 'px';
            selectPin.style.height = Math.abs(newY - resY) + 'px';
        }
        else if(newY < resY) {
            selectPin.style.height = Math.abs(newY - resY) + 'px';
            selectPin.style.top = resY - selectPin.clientHeight + 'px';
        }

        if(selectPin.clientWidth > 2 && selectPin.clientHeight > 2) {
            selectPin.style.visibility = "visible";
        }

        cnvPin.style.cursor = `default !important`;

        var inputs = cnvPin.querySelectorAll('div');

        inputs.forEach(function(input) {

            input.style.cursor = `default`;

        })

        checkSelectedPin(); 
    }
    
}
document.getElementById('cnvPin').addEventListener('pointermove', selectingCanvases);

function checkSelectedPin() {
   
    let selectPin = document.getElementById('selectPin');

    let configScroll = document.getElementsByClassName('configScroll');

    for(let a = 0; a < pinBody.length; a++) {

        if(pinBody[a] != null) {

            let f = pinBody[a].dataset.ref;
            let panel = configScroll[5].querySelector(`[data-ref="${f}"]`);
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);

            if(pinBody[a].getBoundingClientRect().left < selectPin.getBoundingClientRect().right && pinBody[a].getBoundingClientRect().right > selectPin.getBoundingClientRect().left && pinBody[a].getBoundingClientRect().top < selectPin.getBoundingClientRect().bottom && pinBody[a].getBoundingClientRect().bottom > selectPin.getBoundingClientRect().top) {
                
                focusPanel[f] = panel;
                focusPanel[f].style.borderColor = "#6885CC";
                leadPanel = focusPanel[f];

                focusObj[f] = canvas;

                if(pinBody[a] != null) {
                    let divs = pinBody[a].querySelectorAll('div');
                    divs.forEach(function(div) {
                        div.style.visibility = "visible";
                    })
                }
            }

            else {

                leadPanel = null;
                focusPanel[f] = null;

                panel.style.borderColor = "#3F4961";
                
                focusObj[f] = null;
               
                if(pinBody[a] != null) {
                    let divs = pinBody[a].querySelectorAll('div');
                    divs.forEach(function(div) {
                        div.style.visibility = "hidden";
                    })
                }

            }
        }
    }
}

///////////////////////STOP SELECTING CANVAS USING MOUSE///////////////////
document.getElementById('cnvPin').addEventListener('pointerup', function(e) {

    
    let selectPin = document.getElementById('selectPin');

    isSelecting = false;
    
    selectPin.style.width = `0px`;
    selectPin.style.height = `0px`;
    selectPin.style.visibility = `hidden`;

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
        
})

//==================RESET ALL FOCUS==================================
function resetAllFocus() {

    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');
    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');
    let cnvPin = document.getElementById('cnvPin')

    for(let a = 0; a < pnlBoxThumb.length; a++) {
        
        if(pnlBoxThumb[a] != null) {

            pnlBoxThumb[a].style.borderColor = "transparent";
            pnlBoxThumb[a].style.backgroundColor = "transparent";
            pnlBoxThumb[a].style.borderWidth = "1px";
            //pnlBoxThumb[a].children[0].style.filter = "saturate(.7) blur(.2px)";
            focusPanel[a] = null;
        }
    }

    for(let a = 0; a < pnlBoxLayer.length; a++) {
        
        if(pnlBoxLayer[a] != null) {

            pnlBoxLayer[a].style.borderColor = "#3F4961";
            pnlBoxLayer[a] = null;
            focusPanel[a] = null;
        }
    }

    for(let a = 0; a < focusObj.length; a++) {
        
        focusObj[a] = null;
        
    }

    for(let a = 0; a < focusPanel.length; a++) {
        
        focusPanel[a] = null;
        
    }

    for(let a = 0; a < cnvPin.childElementCount; a++) {
        
        if(cnvPin.children[a] != null) {

            if(cnvPin.children[a].className == 'pinBody') {
                var inputs = cnvPin.children[a].querySelectorAll('div');
        
                inputs.forEach(function(input) {
                    input.style.visibility = "hidden";
                })
            }
        } 
    }

    for(let a = 0; a < cnvLayers.length; a++) {

        if(cnvLayers[a] != null) {

            if(cnvLayers[a].children[0].className == "textArea") {

                cnvLayers[a].children[0].blur();
            }
        }
    }

    
    
    inFocus = false;
    leadPanel = null;
    firstPanel = null;
    multiSelect = false;
    selectedAll = false;

    //this will falsify the highlight bool for every text input focus or highlight
    highlight = false;

    swapPanels('canvas');
    
    checkMultiSelect();

    hideAllContextMenu();

    resetLeadDrag();
}

//==================RESET ALL DATA==================================
function resetAllData() {
    
    dataCanvas = null;

    for(let a = 0; a < dataPattern.length; a++) {
        dataPattern[a] = "";
        dataPattern[a] = null;
    }
    for(let a = 0; a < dataLayer.length; a++) {
        dataLayer[a] = "";
        dataLayer[a] = null;
    }
}

//==================RESET ALL HISTORY AND REDO========================
function resetAllHistory() {
    for(let a = 0; a < h; a++) {
        history[a] = null;
    }
    for(let a = 0; a < rh; a++) {
        redoHistory[a] = null;
    }
    
    h = 0;
    rh = 0;
}

//====================DECODE DATA================

function decodeData3() {

    if(leadPanel != null) {

        pauseEncoding();

        let f = Number(leadPanel.dataset.ref);
        let n = Number(leadPanel.dataset.thumbno);
        let configScroll = document.getElementsByClassName('configScroll');
        let type = leadPanel.dataset.type.replace(leadPanel.dataset.type.charAt(0), leadPanel.dataset.type.charAt(0).toUpperCase());
        let panel = document.getElementById(`pnlBox${type}`);

        panel.querySelectorAll(`input[type="text"], input[type="number"]`).forEach(input => {
            input.blur();
        })
        
        if(leadPanel.dataset.type == "pattern") {

            panel.querySelector(`.txtColorPattern`).value = valueFinder(dataPattern[f], `txtColorPattern`);
            panel.querySelector(`.txtColorPattern`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataPattern[f], `txtColorPattern`);
            panel.querySelector(`.txtOpacityPattern`).value = valueFinder(dataPattern[f], `txtOpacityPattern`);
            panel.querySelector(`.txtXPattern`).value = valueFinder(dataPattern[f], `txtXPattern`);
            panel.querySelector(`.txtYPattern`).value = valueFinder(dataPattern[f], `txtYPattern`);
            panel.querySelector(`.txtSizePattern`).value = valueFinder(dataPattern[f], `txtSizePattern`);
            panel.querySelector(`.txtSpacingPattern`).value = valueFinder(dataPattern[f], `txtSpacingPattern`);
            panel.querySelector(`.txtRandomSpinPattern`).value = valueFinder(dataPattern[f], `txtRandomSpinPattern`);
            panel.querySelector(`.chkRandomSeed`).dataset.value = valueFinder(dataPattern[f], `chkRandomSeed`);
            chkBoxFormat(panel.querySelector(`.chkRandomSeed`));
            
            panel.querySelectorAll(`.dropdown`)[0].children[0].innerText =  valueFinder(dataPattern[f], `dropdown 0`);

        }

        else {

            panel.querySelector(`.txtWidthLayer`).value = valueFinder(dataLayer[f], `txtWidthLayer`);
            panel.querySelector(`.txtHeightLayer`).value = valueFinder(dataLayer[f], `txtHeightLayer`);
            panel.querySelector(`.txtXLayer`).value = valueFinder(dataLayer[f], `txtXLayer`);
            panel.querySelector(`.txtYLayer`).value = valueFinder(dataLayer[f], `txtYLayer`);

            panel.querySelector(`.chkFlipX`).dataset.value = valueFinder(dataLayer[f], `chkFlipX`);
            chkBoxFormat(panel.querySelector(`.chkFlipX`));

            panel.querySelector(`.chkFlipY`).dataset.value = valueFinder(dataLayer[f], `chkFlipY`);
            chkBoxFormat(panel.querySelector(`.chkFlipY`));

            panel.querySelector(`.txtOpacityLayer`).value = valueFinder(dataLayer[f], `txtOpacityLayer`);
            panel.querySelector(`.txtRotationLayer`).value = valueFinder(dataLayer[f], `txtRotationLayer`);

            if(leadPanel.dataset.type == "image") {

                panel.querySelector(`.txtBlur`).value = valueFinder(dataLayer[f], `txtBlur`);
                panel.querySelector(`.txtBrightness`).value = valueFinder(dataLayer[f], `txtBrightness`);
                panel.querySelector(`.txtContrast`).value = valueFinder(dataLayer[f], `txtContrast`);
                panel.querySelector(`.txtSaturation`).value = valueFinder(dataLayer[f], `txtSaturation`);
                panel.querySelector(`.txtTemperature`).value = valueFinder(dataLayer[f], `txtTemperature`);

                panel.querySelector(`.txtOutlineColor`).value = valueFinder(dataLayer[f], `txtOutlineColor`);
                panel.querySelector(`.txtOutlineColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtOutlineColor`);
                panel.querySelector(`.txtOutlineOpacity`).value = valueFinder(dataLayer[f], `txtOutlineOpacity`);
                panel.querySelector(`.txtOutlineSize`).value = valueFinder(dataLayer[f], `txtOutlineSize`);
                
                panel.querySelector(`.txtGlowColor`).value = valueFinder(dataLayer[f], `txtGlowColor`);
                panel.querySelector(`.txtGlowColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtGlowColor`);
                panel.querySelector(`.txtGlowOpacity`).value = valueFinder(dataLayer[f], `txtGlowOpacity`);
                panel.querySelector(`.txtGlowSize`).value = valueFinder(dataLayer[f], `txtGlowSize`);
                panel.querySelector(`.txtGlowSpread`).value = valueFinder(dataLayer[f], `txtGlowSpread`);
                
                panel.querySelector(`.txtShadowColor`).value = valueFinder(dataLayer[f], `txtShadowColor`);
                panel.querySelector(`.txtShadowColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtShadowColor`);
                panel.querySelector(`.txtShadowOpacity`).value = valueFinder(dataLayer[f], `txtShadowOpacity`);
                panel.querySelector(`.txtShadowSize`).value = valueFinder(dataLayer[f], `txtShadowSize`);
                panel.querySelector(`.txtShadowSpread`).value = valueFinder(dataLayer[f], `txtShadowSpread`);
                panel.querySelector(`.txtShadowRotation`).value = valueFinder(dataLayer[f], `txtShadowRotation`);

                panel.querySelectorAll(`.dropdown`)[0].children[0].innerText =  valueFinder(dataLayer[f], `dropdown 0`);
                panel.querySelectorAll(`.dropdown`)[1].children[0].innerText =  valueFinder(dataLayer[f], `dropdown 1`);

                let options = panel.querySelectorAll(`.dropdown`)[0].nextElementSibling.querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.innerText == valueFinder(dataLayer[f], 'dropdown 0')) {
                        opt.click();
                    }
                })

                options = panel.querySelectorAll(`.dropdown`)[1].nextElementSibling.querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.innerText == valueFinder(dataLayer[f], 'dropdown 1')) {
                        opt.click();
                    }
                })

            }
            else if(leadPanel.dataset.type == "line") {

                panel.querySelector(`.txtLineStrokeColor`).value = valueFinder(dataLayer[f], `txtLineStrokeColor`);
                panel.querySelector(`.txtLineStrokeColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtLineStrokeColor`);
                panel.querySelector(`.txtLineStrokeWidth`).value = valueFinder(dataLayer[f], `txtLineStrokeWidth`);
                panel.querySelector(`.txtLineStrokeDash`).value = valueFinder(dataLayer[f], `txtLineStrokeDash`);

                panel.querySelector(`.chkLineStrokeCap`).dataset.value = valueFinder(dataLayer[f], `chkLineStrokeCap`);
                chkBoxFormat(panel.querySelector(`.chkLineStrokeCap`));

                let options = panel.querySelectorAll(`.dropdown`)[0].nextElementSibling.querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.innerText == valueFinder(dataLayer[f], 'dropdown 0')) {
                        opt.click();
                    }
                })

                let start = valueFinder(dataLayer[f], `dropdownLineStart 0`);

                options = panel.querySelector(`.dropOptionLineStart`).querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.children[0].getAttribute('id') == start) {
                        opt.click();
                    }
                })

                let end = valueFinder(dataLayer[f], `dropdownLineEnd 0`);
                
                options = panel.querySelector(`.dropOptionLineEnd`).querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.children[0].getAttribute('id') == end) {
                        opt.click();
                    }
                })

            }
            else if(leadPanel.dataset.type == "vector") {

                //console.log(configScroll[2].querySelector(`[data-thumbno="${n}"]`))
                let getSVG = configScroll[2].querySelector(`[data-thumbno="${n}"]`).children[0];
                getSVG.style.filter = "none";

                let tabVectorPreview = panel.querySelector('.tabVectorPreview');
                tabVectorPreview.innerHTML = getSVG.outerHTML;

                let txtSubLayer = panel.querySelector('.txtSubLayer');
                
                var getMax = tabVectorPreview.querySelector('g').childElementCount;
                txtSubLayer.max = getMax;
                txtSubLayer.previousElementSibling.max = getMax;

                panel.querySelector(`.txtSubLayer`).value = valueFinder(dataLayer[f], `txtSubLayer`);
                panel.querySelector(`.txtVectorStrokeColor`).value = valueFinder(dataLayer[f], `txtVectorStrokeColor`);
                panel.querySelector(`.txtVectorStrokeColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtVectorStrokeColor`);
                panel.querySelector(`.txtVectorStrokeOpacity`).value = valueFinder(dataLayer[f], `txtVectorStrokeOpacity`);
                panel.querySelector(`.txtVectorStrokeWidth`).value = valueFinder(dataLayer[f], `txtVectorStrokeWidth`);
                panel.querySelector(`.txtVectorStrokeDash`).value = valueFinder(dataLayer[f], `txtVectorStrokeDash`);
                panel.querySelector(`.txtVectorStrokeGap`).value = valueFinder(dataLayer[f], `txtVectorStrokeGap`);

                panel.querySelector(`.chkVectorStrokeCap`).dataset.value = valueFinder(dataLayer[f], `chkVectorStrokeCap`);
                chkBoxFormat(panel.querySelector(`.chkVectorStrokeCap`));

                panel.querySelector(`.chkVectorStrokeShow`).dataset.value = valueFinder(dataLayer[f], `chkVectorStrokeShow`);
                chkBoxFormat(panel.querySelector(`.chkVectorStrokeShow`));

                panel.querySelector(`.txtVectorFillColor`).value = valueFinder(dataLayer[f], `txtVectorFillColor`);
                panel.querySelector(`.txtVectorFillColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtVectorFillColor`);
                panel.querySelector(`.txtVectorFillOpacity`).value = valueFinder(dataLayer[f], `txtVectorFillOpacity`);

                panel.querySelector(`.chkVectorFillShow`).dataset.value = valueFinder(dataLayer[f], `chkVectorFillShow`);
                chkBoxFormat(panel.querySelector(`.chkVectorFillShow`));
                
                let options = panel.querySelectorAll(`.dropdown`)[0].nextElementSibling.querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.innerText == valueFinder(dataLayer[f], 'dropdown 0')) {
                        opt.click();
                    }
                })

                options = panel.querySelectorAll(`.dropdown`)[1].nextElementSibling.querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.innerText == valueFinder(dataLayer[f], 'dropdown 1')) {
                        opt.click();
                    }
                });
                
                if(panel.querySelector(`.txtSubLayer`).value == "0") {

                    document.getElementById('pnlBoxVector').querySelector('.contNoPath').style.display = "block";
                    document.getElementById('pnlBoxVector').querySelector('.contPath').style.display = "none";
                }
            
                else {
            
                    document.getElementById('pnlBoxVector').querySelector('.contNoPath').style.display = "none";
                    document.getElementById('pnlBoxVector').querySelector('.contPath').style.display = "block";
                
                }

            }
            else if(leadPanel.dataset.type == "element") {

                panel.querySelector(`.txtElementStrokeColor`).value = valueFinder(dataLayer[f], `txtElementStrokeColor`);
                panel.querySelector(`.txtElementStrokeColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtElementStrokeColor`);
                panel.querySelector(`.txtElementStrokeOpacity`).value = valueFinder(dataLayer[f], `txtElementStrokeOpacity`);
                panel.querySelector(`.txtElementStrokeWidth`).value = valueFinder(dataLayer[f], `txtElementStrokeWidth`);
                panel.querySelector(`.txtElementCornerRadius`).value = valueFinder(dataLayer[f], `txtElementCornerRadius`);
                panel.querySelector(`.txtElementStrokeDash`).value = valueFinder(dataLayer[f], `txtElementStrokeDash`);
                panel.querySelector(`.txtElementStrokeGap`).value = valueFinder(dataLayer[f], `txtElementStrokeGap`);

                panel.querySelector(`.chkElementStrokeCap`).dataset.value = valueFinder(dataLayer[f], `chkElementStrokeCap`);
                chkBoxFormat(panel.querySelector(`.chkElementStrokeCap`));

                panel.querySelector(`.chkElementStrokeShow`).dataset.value = valueFinder(dataLayer[f], `chkElementStrokeShow`);
                chkBoxFormat(panel.querySelector(`.chkElementStrokeShow`));

                panel.querySelector(`.txtElementFillColor`).value = valueFinder(dataLayer[f], `txtElementFillColor`);
                panel.querySelector(`.txtElementFillColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtElementFillColor`);
                panel.querySelector(`.txtElementFillOpacity`).value = valueFinder(dataLayer[f], `txtElementFillOpacity`);

                panel.querySelector(`.chkElementFillShow`).dataset.value = valueFinder(dataLayer[f], `chkElementStrokeShow`);
                chkBoxFormat(panel.querySelector(`.chkElementFillShow`));

                let options = panel.querySelectorAll(`.dropdown`)[0].nextElementSibling.querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.innerText == valueFinder(dataLayer[f], 'dropdown 0')) {
                        opt.click();
                    }
                });

                options = panel.querySelectorAll(`.dropdown`)[1].nextElementSibling.querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.innerText == valueFinder(dataLayer[f], 'dropdown 1')) {
                        opt.click();
                    }
                });

            }
            else if(leadPanel.dataset.type == "text") {
        
                panel.querySelector(`.txtResizeText`).value = valueFinder(dataLayer[f], `txtResizeText`);
                panel.querySelector(`.txtTextColor`).value = valueFinder(dataLayer[f], `txtTextColor`);
                panel.querySelector(`.txtTextColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtTextColor`);
                panel.querySelector(`.txtLetterSpacing`).value = valueFinder(dataLayer[f], `txtLetterSpacing`);
                panel.querySelector(`.txtLineHeight`).value = valueFinder(dataLayer[f], `txtLineHeight`);
        
                btnTextClick.call(panel.querySelector(`.selTextCase`).querySelector(`.btn${valueFinder(dataLayer[f], `selTextCase`)}`));
                btnOptionClick.call(panel.querySelector(`.selTextResize`).querySelector(`.btn${valueFinder(dataLayer[f], `selTextResize`)}`));
                btnOptionClick.call(panel.querySelector(`.selTextHori`).querySelector(`.btn${valueFinder(dataLayer[f], `selTextHori`)}`));
                btnOptionClick.call(panel.querySelector(`.selTextVerti`).querySelector(`.btn${valueFinder(dataLayer[f], `selTextVerti`)}`));
                btnTextClick.call(panel.querySelector(`.selTextDecor`).querySelector(`.btn${valueFinder(dataLayer[f], `selTextDecor`)}`));
        
                panel.querySelector(`.txtOutlineColor`).value = valueFinder(dataLayer[f], `txtOutlineColor`);
                panel.querySelector(`.txtOutlineColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtOutlineColor`);
                panel.querySelector(`.txtOutlineOpacity`).value = valueFinder(dataLayer[f], `txtOutlineOpacity`);
                panel.querySelector(`.txtOutlineSize`).value = valueFinder(dataLayer[f], `txtOutlineSize`);
        
                panel.querySelector(`.txtGlowColor`).value = valueFinder(dataLayer[f], `txtGlowColor`);
                panel.querySelector(`.txtGlowColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtGlowColor`);
                panel.querySelector(`.txtGlowOpacity`).value = valueFinder(dataLayer[f], `txtGlowOpacity`);
                panel.querySelector(`.txtGlowSize`).value = valueFinder(dataLayer[f], `txtGlowSize`);
                panel.querySelector(`.txtGlowSpread`).value = valueFinder(dataLayer[f], `txtGlowSpread`);
        
                panel.querySelector(`.txtShadowColor`).value = valueFinder(dataLayer[f], `txtShadowColor`);
                panel.querySelector(`.txtShadowColor`).nextElementSibling.style.backgroundColor = '#' + valueFinder(dataLayer[f], `txtShadowColor`);
                panel.querySelector(`.txtShadowOpacity`).value = valueFinder(dataLayer[f], `txtShadowOpacity`);
                panel.querySelector(`.txtShadowSize`).value = valueFinder(dataLayer[f], `txtShadowSize`);
                panel.querySelector(`.txtShadowSpread`).value = valueFinder(dataLayer[f], `txtShadowSpread`);
                panel.querySelector(`.txtShadowRotation`).value = valueFinder(dataLayer[f], `txtShadowRotation`);
        
                panel.querySelectorAll(`.dropdown`)[0].children[0].innerText =  valueFinder(dataLayer[f], `dropdown 0`);
                panel.querySelectorAll(`.dropdown`)[1].children[0].innerText =  valueFinder(dataLayer[f], `dropdown 1`);
                panel.querySelectorAll(`.dropdown`)[2].children[0].innerText =  valueFinder(dataLayer[f], `dropdown 2`);
                
                let options = panel.querySelectorAll(`.dropdown`)[0].nextElementSibling.querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.innerText == valueFinder(dataLayer[f], 'dropdown 0')) {
                        opt.click();
                    }
                })

                options = panel.querySelectorAll(`.dropdown`)[1].nextElementSibling.querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.innerText == valueFinder(dataLayer[f], 'dropdown 1')) {
                        opt.click();
                    }
                })
                
                options = panel.querySelectorAll(`.dropdown`)[2].nextElementSibling.querySelectorAll(`[class*="opt"]`);
                options.forEach(opt => {
                    if(opt.innerText == valueFinder(dataLayer[f], 'dropdown 2')) {
                        opt.click();
                    }
                })
            }
        }

        resumeEncoding();
    } 
}

//========================SWAP PANELS=================================
function swapPanels(type) {
    //hide all pnlboxes first
    let propertiesBox = document.getElementById('propertiesBox');
    let pnlBoxes = propertiesBox.querySelectorAll('[id*="pnlBox"]');
    //let e = Number(leadPanel.dataset.layer);
    pnlBoxes.forEach(pnlBox=> {
        pnlBox.style.display = 'none';
    })

    if(type == 'canvas') {
        document.getElementById('pnlBoxCanvas').style.display = 'flex'; 
    }
    else if(type == 'pattern') {

        document.getElementById('pnlBoxPattern').style.display = 'flex';
        decodeData3();

    }
    else if(type == 'image') {

        document.getElementById('pnlBoxImage').style.display = 'flex';
        decodeData3();
     
    }
    else if(type == 'vector') {

        document.getElementById('pnlBoxVector').style.display = 'flex';
        let txtSubLayer = document.getElementById('pnlBoxVector').querySelector('.txtSubLayer');
        
        decodeData3();
        getAllPathProperties.call(txtSubLayer);
        previewVector.call(txtSubLayer);
        
    
    }
    else if(type == 'element') {

        document.getElementById('pnlBoxElement').style.display = 'flex';
        decodeData3();
      
    }
    else if(type == 'line') {

        document.getElementById('pnlBoxLine').style.display = 'flex';
        decodeData3();
    
    }
    else if(type == 'text') {

        document.getElementById('pnlBoxText').style.display = 'flex';
        //no need to encode data since
        //addfontweights has encode
        addFontWeights();
        decodeData3();
    
    }
    else if(type == 'textEditor') {
        document.getElementById('pnlBoxTextEditor').style.display = 'flex';

        document.getElementById('pnlBoxEmojiSymbol').style.display = 'flex';
    }

}

document.getElementById('cnvPin').addEventListener('click', function() { 

    if(leadPanel == null) {
        swapPanels("canvas")
    }
})

//================CHECK PNLBOXTHUMB FOCUS==============================
function addPnlBoxThumbFocus(key, thumb) {

    highlight = false;
    let configScroll = document.getElementsByClassName('configScroll');
    // get the data layer of the panel selected

    if(key == null) {

        //if no key is pressed, remove all border first
        thumbs2Blur();
        thumb2Focus(thumb);
        multiSelect = false;
        
    }

    else if(key == 'ctrl') {

        if(checkFocus(thumb)[0]) {

            thumbUnfocus(thumb);

            if(checkPanelFocusCount() == 0) {
                resetAllFocus();
                checkMultiSelect();
            }
           
        }

       else {

            //remove all focus object
            if(multiSelect) {
              
                canvasUnfocusAll();
                thumb2Focus(thumb);
                checkMultiSelect();
            }
            else {
                //console.log('hey')
                //thumbs2Blur();
                thumb2Focus(thumb);
                checkMultiSelect();
            }
       }
    }

    else if(key == 'shift') {

        if(checkFocus(thumb)[0]) {

            thumbUnfocus(thumb);

            if(checkPanelFocusCount() == 0) {
                resetAllFocus();
                checkMultiSelect();
            }
            
        }

        else {

            thumb2Focus(thumb);
            checkMultiSelect();

            if(multiSelect) {
    
                canvasUnfocusAll();
                
                var a = 0; //init the first focus
                var z = 0; //init the last focus

                //first loop to get actual first focus
                for(let c = 0; c < focusPanel.length; c++) {
                    if(focusPanel[c] != null) {
                        a = focusPanel[c].dataset.thumbno;
                        break;
                    }
                }

                //next loop to get actual last focus
                for(let c = 0; c < focusPanel.length ; c++) {
                    if(focusPanel[c] != null) {
                        z = focusPanel[c].dataset.thumbno;
                    }
                }

                //finally, focus all in between
                ////////////////PANEL2FOCUS DOES NOT WORK HERE SO FOCUS MANUALLY/////////
                for(let c = z; c < a; c++) {
                    var newPanel = configScroll[2].querySelector(`[data-thumbno="${c}"]`)
                    
                    //newPanel.style.borderColor = "#6885CC";
                    newPanel.style.borderColor = "#647499";
                    newPanel.style.borderWidth = "1px";
                    newPanel.children[0].style.filter = "saturate(.7) blur(.2px)";
                    focusPanel[c] = newPanel;
        
                }

                for(let c = z; c > a; c--) {
                    var newPanel = configScroll[2].querySelector(`[data-thumbno="${c}"]`)
                    
                    //newPanel.style.borderColor = "#6885CC";
                    newPanel.style.borderColor = "#647499";
                    newPanel.style.borderWidth = "1px";
                    newPanel.children[0].style.filter = "saturate(.7) blur(.2px)";
                    focusPanel[c] = newPanel;
                }
                
                checkMultiSelect();

            }
            else {
                thumbs2Blur();
                thumb2Focus(thumb);
                checkMultiSelect();
            }

        }
    }
    
}
//================CHECK PNLBOXTHUMB FOCUS==============================

function addPnlBoxLayerFocus(key, panel) {
    
    let f = Number(panel.dataset.ref);
    let type = panel.dataset.type;
    let pin = cnvPin.querySelector(`[data-ref="${f}"]`)
    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');

    if(key == null) {
        
        if(checkPanelFocusCount() > 1) {

            if(checkFocus(panel)[0]) {
                if(type != "pattern") {
                    chooseLeadDrag(pin); 
                }
            }
            else {
                resetAllFocus();
                panel2Focus(panel);
                checkMultiSelect();
                firstPanel = panel;
            }
        }
        else {
            panelUnfocusAll()
            panel2Focus(panel);
            checkMultiSelect();
            firstPanel = panel;
        }
    }

    else if(key == 'ctrl') {
        
        if(checkFocus(panel)[0]) {

            panelUnfocus(panel);

            if(checkPanelFocusCount() == 0) {
                resetAllFocus();
                checkMultiSelect();
            }
        }

       else {
            panel2Focus(panel);
            checkMultiSelect();
       }

    }

    else if(key == 'shift') {

        if(checkFocus(panel)[0]) {

            panelUnfocus(panel)
            checkMultiSelect();

        }

        else {

            panel2Focus(panel);
            checkMultiSelect()

            if(multiSelect) {

                var a = Number(checkPanelPosition(firstPanel));
                var z = Number(checkPanelPosition(panel));

                panelUnfocusAll();
                
                if(a > z) {
                    for(let c = z; c <= a; c++) {
                        panel2Focus(pnlBoxLayer[c]);
                    }
                }
                else {
                    for(let c = a; c <= z; c++) {
                        panel2Focus(pnlBoxLayer[c]);
                    }
                }

            }
            else {
                if(firstPanel == null) {
                    firstPanel = panel;
                }
            }
                
            checkMultiSelect();
            
        }
    }

    //swapPanels(leadPanel.dataset.type);
}

function checkPnlBoxFocus(e) {

    if(e.button == 0) {

        let p = e.target;
        let key = null;
        highlight = false;

        if(e.ctrlKey) { //ctrl key is pressed
            key = 'ctrl';
        }

        else if(e.shiftKey) { //shift key is pressed
            key = 'shift';
        }

        if(p.closest('.pnlBoxThumb')) {

            addPnlBoxThumbFocus(key, p.closest('.pnlBoxThumb'));

        }
        else if(p.closest('.pnlBoxStylish')) {
            
        }
        else if(p.closest('.pnlBoxSerif')) {
        
        }
        else if(p.closest('.pnlBoxSansSerif')) {
        
        }
        else if(p.closest('.pnlBoxLayer') ) { //check if closes is pnlBoxPatterns
            
            addPnlBoxLayerFocus(key, p.closest('.pnlBoxLayer'), p)

        }
        else if(p.closest('.pinBody')) {
            //empty condition just for pins
        }
        else if(p.closest('.tabFonts')) {
            //empty
        }
        else if(p.closest('#propertiesBox')) {
            //empty condition so focus will not be lost
            //when trying to configure properties panel
            
        }
        else if(p.closest('#cnvPin')) {

            //remove all input focus
            var checkInputs = document.querySelectorAll('input[type="text"], input[type="number"]');
            checkInputs.forEach(function(input) {
                input.blur();
            })
            
        }
        else if(p.closest('#colorPickerPanel')) {
            //empty condition for any textboxes from colorpicker
            //so it will not remove any focus
        }
        else if(p.closest(`[class*='rcOption']`)) {
           
            e.preventDefault();
            hideAllContextMenu();
            
        }
        else if(p.closest('.txtEditorBox')) {
            //EMPTY CONDITION
            //SO IT WON'T LOSE FOCUSOBJECTS 
            //WHEN EDITING TEXT
        }
        else if(p.closest('#rightPanel')) {
            //EMPTY CONDITION FOR CLICKING EMOJIS AND SYMBOLS
            //TO AVOID RESETTING FOCUS OBJECTS
        }
        else if(p.closest(`[id*='rcCanvas']`)) {
            //EMPTY CONDITION TO NOT LOSE FOCUS
        }
        
        else {

            panelUnfocusAll();
            
            resetAllFocus();

            //resetLeadDrag();

            //enable back cnvGrpLayers css
            cnvGrpLayers.style.boxSizing = "border-box";
            cnvGrpLayers.style.overflow = "hidden";
        }

        if(p.className == "pinBody") {
            //EMPTY CONDITION
        }

    }
}
document.addEventListener('click', checkPnlBoxFocus);

//=================CHECK CNVLAYER FOCUS=================================

function checkCnvLayerFocus(e) {

    let key = null;
    let p = e.target;
    highlight = false;
    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');
    
    if(e.button == 0) {

        if(e.ctrlKey) { //ctrl key is pressed
            key = 'ctrl';
        }

        else if(e.shiftKey) { //shift key is pressed
            key = 'shift';
        }

        if(p.className == "pinBody") {

            linkCanvasWithPanelLayer(key, p)
        }

        else if(p.closest('.pinBody')) {
            //empty condition just for pins
        }

        else if(p.closest('.pnlBox')) {
            //empty condition only for pnlBox
        }

        else if(p.closest('.pnlBoxPattern')) {
            //empty condition only for pnlBoxPattern
        }

        else if(p.closest('.tabFonts')) {
            //empty
        }

        else if(p.closest('.pnlBoxThumb')) {

            //DO NOT ADD ANYTHING HERE
            //THIS IS CANVAS FOCUS
            //ALREADY TRIED AND IT'S CAUSING BUG
            //THIS IS POINTER DOWN EVENT CAUSING CONFLICT WITH 'CLICK'

        }

        else if(p.closest('.pnlBoxStylish') || p.closest('.pnlBoxSerif' || p.closest('.pnlBoxSansSerif'))) {

            //addPnlBoxThumbFocus(key, p.closest('.pnlBoxThumb'))
            for(var a = 0; a < focusObj.length; a++) {
                if(focusObj[a] != null) {

                    pnlBoxLayer[a].style.borderColor = "#3F4961";
                    focusPanel[a] = null;
                    
                    var inputs = pinBody[a].querySelectorAll('div');
            
                    inputs.forEach(function(input) {
                        input.style.visibility = "hidden";
                    })

                    focusObj[a] = null;
                }
            }
        }
        else if(p.closest('.pnlBoxLayer')) {
            //empty condition only for pnlBoxLayer
        }
        else if(p.closest('#propertiesBox')) {
            //empty condition so focus will not be lost
            //when trying to configure properties panel
        }
        else if(p.closest('#colorPickerPanel')) {
            //empty condition for any textboxes from colorpicker
            //so it will not remove any focus
        }
        else if(p.closest(`[class*='rcOption']`)) {
            //LEAVE THIS BLANK
            //THIS IS POINTERDOWN EVENT
            //THIS SHOULD NOT REMOVE RIGHT CLICK OPTIONS
            //AND RCCANVAS SHOULD NOT DISAPPEAR WHEN POINTER IS DOWN
            //LOOKS WEIRD SO LEAVE BLANK [!]
        }
        else if(p.closest('.txtEditorBox')) {
            //EMPTY CONDITION
            //SO IT WON'T LOSE FOCUSOBJECTS 
            //WHEN EDITING TEXT
        }
        else if(p.closest('#rightPanel')) {
            //EMPTY CONDITION FOR CLICKING EMOJIS AND SYMBOLS
            //TO AVOID RESETTING FOCUS OBJECTS
        }
        else if(p.closest(`[id*='rcCanvas']`)) {
            //EMPTY CONDITION TO NOT LOSE FOCUS
        }
        
        else {

            panelUnfocusAll();
            
            resetAllFocus();

            //resetLeadDrag();
        }
    }
    
}
document.addEventListener('pointerdown', checkCnvLayerFocus)

function retainFocus(e) {
    e.preventDefault();

    if(e.target.getAttribute('id') == 'cnvPin') {

        for(var a = 0; a < focusObj.length; a++) {
            if(focusObj[a] != null) {
                
                let f = focusObj[a].dataset.ref;
                let pin = cnvPin.querySelector(`[data-ref="${f}"]`)

                focusPanel[a].style.borderColor = "#6885CC";
    
                pin.style.visibility = "visible";
    
                var divs = pinBody[a].querySelectorAll('div');
    
                divs.forEach(function(div) {
                    div.style.visibility = "visible";  
                })
            }
        }
    }
}
document.addEventListener('pointerup', retainFocus)

//=======================DELETE AN OBJECT===============================

function checkInputFocus() {

    inFocus = false;

    var checkInputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
    
    //for(var b = 0; b < checkInputs.length; b++) { //go thru each input type
    checkInputs.forEach(function(input) {
        if(input == document.activeElement) {
            inFocus = true; //return true if there's atleast one
            return inFocus; 
        }
    })

    return inFocus;
}

function deleteAllPatterns(f) {

    //let cnvGrpLayers = document.getElementById('cnvGrpLayers');
    let panel = f2Panel(f);
    let canvas = f2Canvas(f);

    canvas.remove();
    canvas = null;

    restorePanel[f] = panel.outerHTML;

    panel.remove();
    panel = null;
}

function deleteAllThumbs(n) {
    
    //////////////////TRANSFER THUMB DATA////////////////////
    let thumb = n2Thumb(n);
    restoreThumb[n] = thumb.outerHTML;

    ////////////////////REMOVE ALL PANELS//////////////////////
    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');

    //get tempPanel index
    for(let b = 0; b < pnlBoxLayer.length; b++) {
   
        if(Number(pnlBoxLayer[b].dataset.thumbno) == n) {

            let f = Number(pnlBoxLayer[b].dataset.ref)
            deleteAllLayers(f);
        }
    }
    
    //////////////////DELETE THE THUMB/////////////////////
    thumb.remove();
    thumb = null;

}

function deleteAllLayers(f) {

    let panel = f2Panel(f);

    deleteAllCanvas(f);

    restorePanel[f] = panel.outerHTML;

    panel.remove()
    panel = null;

}

function deleteAllCanvas(f) {

    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);

    ////////////////////REMOVE ALL VARIABLES////////////////
    borderW[f] = null;
    borderH[f] = null;
    borderL[f] = null;
    borderT[f] = null;
    borderR[f] = null;

    layerW[f] = null;
    layerH[f] = null;
    layerL[f] = null;
    layerT[f] = null;

    aRatio[f] = null;
    
    //////////////////REMOVE ALL CANVAS LAYERS////////////////
    restoreCanvas[f] = canvas.outerHTML;

    canvas.remove();
    canvas = null;

    //FOR SOME REASONS, F2PIN DOES NOT WORK
    //NEEDS TO FILTER PINBODY INDIVIDUALLY

    for(let a = 0; a < pinBody.length; a++) {
        if(pinBody[a] != null) {
            if(pinBody[a].dataset.ref == f) {
                pinBody[a].querySelectorAll('div').forEach(div => {
                    div.remove();
                    div = null;
                })
                pinBody[a].remove()
                pinBody[a] = null;
            }
        }
    }

}

function deleteObject() {

    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');

    if(!checkInputFocus()) {

        //delete if pnlBoxPattern
        h++;
        history[h] = "";

        ////////////////ADD STACKED INFO BEFORE REMOVING ACTUAL OBJECTS///////////
        layerSequence = "Stacked: ";

        for(let a = 0; a < pnlBoxLayer.length; a++) {
            layerSequence += ` ${Number(pnlBoxLayer[a].dataset.ref)} `;
        }
        layerSequence += '*\n';

        for(var a = 0; a < focusPanel.length; a++) { // run until focuspanel length

            if(focusPanel[a] != null) { // if focus panel has not skipped or null
                
                let f = Number(focusPanel[a].dataset.ref);

                if(focusPanel[a].className == "pnlBoxThumb") { //pnlboxthumb

                    let n = focusPanel[a].dataset.thumbno;

                    deleteAllThumbs(n)

                    history[h] += dataThumb[a];
                    history[h] = history[h].replace(history[h].split('*')[0], 'Deleted');
    
                }

                else if(focusPanel[a].className == "pnlBoxLayer") { //pnlboxlayer

                    if(focusPanel[a].dataset.type == "pattern") {

                        deleteAllPatterns(f)

                        history[h] += dataPattern[f];
                        history[h] = history[h].replace(history[h].split('*')[0], 'Deleted')
                        
                    }
                    
                    else {

                        deleteAllLayers(f);
                        history[h] += dataLayer[f];
                        history[h] = history[h].replace(history[h].split('*')[0], 'Deleted');
                        
                    }

                }
            }

        }

        history[h] = layerSequence + "\n" + history[h];

        resetAllFocus();
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
    
    //this block is for checking memory leaks
    /*
    for(var a = 0; a < 5; a++) {
        var chk = document.body.querySelectorAll(`[data-layer='${a}']`);

        chk.forEach(function(input) {
            console.log(input);
        })

        console.log('focusObj', a, focusObj[a])
        console.log('focusPanel', a, focusPanel[a])
    }
    */

}

function deleteSearch(e) {
    if(e.key == "Delete") { 
 
        if(document.activeElement.className.includes('txtSearch')) {
            let input = document.activeElement;
            input.value = "";
            input.dispatchEvent(new Event('input'));
        }

    }
}
document.addEventListener('keydown', deleteSearch);

///////////////////////////////////////SHORTCUT SAVE///////////////////////////
function ctrlS(e) {

    if(e.ctrlKey) {
        if(e.key.toLowerCase() == 's') {
            e.preventDefault();
            saveFile();
        }
    }
}
document.addEventListener('keydown', ctrlS);

///////////////////////////////////////SHORTCUT DOWNLOAD//////////////////////
function ctrlD(e) {
    if(e.ctrlKey) {
        if(e.key.toLowerCase() == 'd') {
            e.preventDefault();

            let btnDownload = document.getElementById('btnDownload');

            downloadFile.call(btnDownload);
        }
    }
}
document.addEventListener('keydown', ctrlD);

///////////////////////////////////////SHORTCUT PASTE/////////////////////////
function ctrlV(e) {

    let initFiles = 0;
    let reader = [];
    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');
    let configScroll = document.getElementsByClassName('configScroll');

    h++;
    history[h] = 'Uploaded';
    
    if(e.clipboardData.files.length > 0) {
      
        var maxFiles = e.clipboardData.files.length;
        
        for(let a = 0; a < maxFiles; a++) {
            
            //if file is an image
            if(e.clipboardData.files[a].type.match("image")) {

                //check if file is svg
                var chkSVG = /svg/;

                var resultSVG = chkSVG.test(e.clipboardData.files[a].type);

                if(!resultSVG) {

                    reader[a] = new FileReader();

                    reader[a].readAsDataURL(e.clipboardData.files[a]);

                    reader[a].onload = function(e) {

                        let img = new Image();
                        img.src = this.result;
                        img.setAttribute('draggable', 'false');
                        img.onload = function(e) {

                            initFiles++;

                            let div = document.createElement('div');
                            div.classList.add('pnlBoxThumb');
                            div.setAttribute('draggable', 'false');
                            div.dataset.thumbno = pnlBoxThumb.length;
                            div.dataset.type = "image";
                            div.appendChild(img);

                            configScroll[2].children[0].children[0].prepend(div);

                            //add event listeners to pnlBoxThumbs
                            //index [0] as we use prepend so all new thumbs are [0]
                            pnlBoxThumb[0].addEventListener('dblclick', dblClickThumb)
                            pnlBoxThumb[0].addEventListener('pointerover', pointerOverThumb);
                            pnlBoxThumb[0].addEventListener('pointerleave', pointerLeaveThumb);

                            dataThumb[div.dataset.thumbno] = '*';
                            dataThumb[div.dataset.thumbno] += `\npnlBoxThumb:`;
                            dataThumb[div.dataset.thumbno] += `\nthumbno: ${div.dataset.thumbno}`;
                            dataThumb[div.dataset.thumbno] += `\nsource: ${img.src}`;

                            history[h] += `*`;
                            history[h] += `\npnlBoxThumb:`;
                            history[h] += `\nthumbno: ${div.dataset.thumbno}`;
                            history[h] += `\nsource: ${img.src}\n`;

                            if(initFiles == maxFiles) {
                                createCanvasFromThumb();
                            }

                        }
                        
                    }
                }

                else {

                    reader[a] = new FileReader(); //create a file reader to read the format
                    reader[a].readAsText(e.clipboardData.files[a]); //read the file to dataURL for raster output
                    reader[a].onload = function(e) {
                        
                        initFiles++;
                        //use pnlBoxThumb.length as it will always default to existing count
                        //it will help to skip [0] index

                        let div = document.createElement('div');
                        div.classList.add('pnlBoxThumb');
                        div.setAttribute('draggable', 'false');
                        div.dataset.thumbno = pnlBoxThumb.length;
                        div.dataset.type = "vector";
                        div.innerHTML = this.result;

                        let svgChild = "";
                        let getSVGTag;

                        //check first if there's <g> tag already
                        if(div.querySelector('g') == null) {

                            getSVGTag = div.querySelector('svg');

                            for(var c = 0; c < getSVGTag.childElementCount; c++) {
                                svgChild += getSVGTag.children[c].outerHTML;
                            }
                        }
                        else {
                            getSVGTag = div.querySelector('g');

                            for(var c = 0; c < getSVGTag.childElementCount; c++) {
                                svgChild += getSVGTag.children[c].outerHTML;
                            }
                        }

                        //add the <g> tag
                        div.children[0].innerHTML = `<g style="mix-blend-mode:normal" opacity="1"></g>`;

                        //add the svgChild back
                        div.children[0].children[0].innerHTML = svgChild;

                        configScroll[2].children[0].children[0].prepend(div);

                        //add event listeners to pnlBoxThumbs
                        //index [0] as we use prepend so all new thumbs are [0]
                        pnlBoxThumb[0].addEventListener('dblclick', dblClickThumb)
                        pnlBoxThumb[0].addEventListener('pointerover', pointerOverThumb);
                        pnlBoxThumb[0].addEventListener('pointerleave', pointerLeaveThumb);

                        dataThumb[div.dataset.thumbno] = '*';
                        dataThumb[div.dataset.thumbno] += `\npnlBoxThumb:`;
                        dataThumb[div.dataset.thumbno] += `\nthumbno: ${div.dataset.thumbno}`;
                        dataThumb[div.dataset.thumbno] += `\nsource: ${this.result}`;

                        history[h] += `*`;
                        history[h] += `\npnlBoxThumb:`;
                        history[h] += `\nthumbno: ${div.dataset.thumbno}`;
                        history[h] += `\nsource: ${this.result}\n`;

                        if(initFiles == maxFiles) {
                            createCanvasFromThumb();
                        }
                    }
                }
            }
        }

    }
}   
document.addEventListener('paste', ctrlV);

///////////////////////////////////////SHORTCUT CLONE/////////////////////////
function ctrlC(e)  {
    if(e.ctrlKey) {

        if(e.key.toLowerCase() == 'c') {
            e.preventDefault();

            cloneCanvas();
        }
    }
}
document.addEventListener('keydown', ctrlC);

///////////////////////////////////////SHORTCUT DELETE//////////////////////////

function ctrlX(e) {

    if(e.ctrlKey) {

        if(e.key.toLowerCase() == 'x') {
            e.preventDefault();

            deleteObject();
        }
    }

    if(e.key == "Delete") {
        deleteObject();
    }
}
document.addEventListener('keydown', ctrlX);

///////////////////////////////////////SHORTCUT END EDIT//////////////////////////

function ctrlE(e) {

    if(e.ctrlKey) {
        if(e.key.toLowerCase() == "e") {
            e.preventDefault();

            if(leadDrag != null) {
                let pnlBoxTextEditor = document.getElementById('pnlBoxTextEditor');
                let txtEditorBox = document.getElementsByClassName('txtEditorBox')[0];
                
                let f = Number(leadDrag.dataset.ref);
                let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);


                if(pnlBoxTextEditor.style.display == 'none') {
                    
                    swapPanels('textEditor');

                    txtEditorBox.focus();
                    txtEditorBox.value = canvas.children[0].innerText;
                    txtEditorBox.select();
                    txtEditorBox.addEventListener('click', clickEditorBox);
                    highlight = true;
                
                }
                else if (pnlBoxTextEditor.style.display == 'flex') {
                    saveTextEditor();
                }
            }
            
        }
    } 
}
document.addEventListener('keydown', ctrlE);

///////////////////////////////////////SHORTCUT TO UNDO-REDO/////////////////////////
function ctrlZ(e) {

    checkInputFocus();

    if(!inFocus) {

        if(e.ctrlKey && !e.shiftKey) {

            if(e.key == 'z' || e.key == 'Z') {
                
                e.preventDefault();

                undo();
            }
        }

        else {

            if(e.key == 'z' || e.key == 'Z') {
                
                redo();             
            }
        }
    }
}
document.addEventListener('keydown', ctrlZ);

//////////////////////////SHORTCUT TO MOVE FOCUS OBJECTS USING ARROW KEYS/////////////////////

function arrowMove(e) {

    if(!checkInputFocus()) {
        if(e.key.includes('Arrow')) {

            if(checkObjFocusCount() > 0) {

                e.preventDefault();

                isDragging = true;
                isSelecting = false;

                for(var a = 0; a < focusObj.length; a++) {
                    
                    if(focusObj[a] != null) {

                        let f = focusObj[a].dataset.ref;
                        let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);

                        if(e.key == 'ArrowUp') {
                            
                            canvas.style.top = canvas.offsetTop - 2 + 'px';

                        }
                        else if(e.key == 'ArrowRight') {

                            canvas.style.left = canvas.offsetLeft + 2 + 'px';

                        }
                        else if(e.key == 'ArrowDown') {
                            
                            canvas.style.top = canvas.offsetTop + 2 + 'px';

                        }
                        else if(e.key == 'ArrowLeft') {
                            
                            canvas.style.left = canvas.offsetLeft - 2 + 'px';
                        
                        }
                        
                    }
                }
                
                let f = Number(leadDrag.dataset.ref);

                let leadCanvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);

                adjustBorder();

                adjustBasicsFromCanvas(leadCanvas);
            }
        }
    }
    
}
document.addEventListener('keydown', arrowMove);

function arrowUp(e) {

    if(e.key.includes('Arrow')) {

        if(checkObjFocusCount() > 0) {

            if(isDragging) {
    
                isDragging = false;
                isRotating = false;
                isResizing = false;
                isScaling = false;
                
                encodeBasicsFromCanvas('drag');
    
            }
        }
    }

}
document.addEventListener('keyup', arrowUp);