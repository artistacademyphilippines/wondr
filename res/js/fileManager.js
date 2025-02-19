
var thumbCountMax = 0;
var initThumb = 0;
var panelCountMax = 0;
var initPanel = 0; 
let uploadHistory = null;
let uploadRedo = null;
let uploadThumb = null;
let uploadPanel = null;

var tmrAutoSave = null;
var projectTitle = "";

//////////////////////////////SAFE FILE///////////////////////
function saveFile() {

    let configScroll = document.getElementsByClassName('configScroll');
    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');

    let content = "$$$$$\n";

    //////////////////CHECK IF HISTORY SHOULD BE INCLUDED//////////////////
    if(includeHistory) {

        content += "History*";

        for(let a = 0; a < h; a++) {
            if(history[a] != null) {
                content += '\n'
                content += history[a];
                content += '\n~'
            }
        }

        content += "$$$$$\nRedo*";

        for(let a = 0; a < rh; a++) {
            if(redoHistory[a] != null) {
                content += '\n'
                content += redoHistory[a];
                content += '\n~'
            }
        }

        content += "$$$$$\n";
    }

    //////////////////NOW APPEND CANVAS SETTINGS///////////////

    content += dataCanvas;

    ////////////////////////////NOW APPEND THUMB//////////////////////
    content += "$$$$$\n";

    for(let a = 0; a < pnlBoxThumb.length; a++) {
        
        let n = pnlBoxThumb[a].dataset.thumbno;
        content += dataThumb[n];
        
    }

    ///////////////////////////NOW APPEND DATA FROM CONFIG 5////////////////

    content += "\n$$$$$";

    for(a = 0; a < configScroll[5].childElementCount; a++) {
        if(configScroll[5].children[a] != null) {
            if(configScroll[5].children[a].dataset.type == "pattern") {
                let f = configScroll[5].children[a].dataset.ref;
                content += dataPattern[f];
            }
            else {
                let f = configScroll[5].children[a].dataset.ref;
                content += dataLayer[f];
            }
        }
    }

    let simpleCrypto = new SimpleCrypto("4818a616c7cb892c5397c69443bde3bbbda9ab4cd20bcff6bae5062eb4045ac4");
    let turing = simpleCrypto.encrypt(content);
    // Create a Blob with the content
    let blob = new Blob([turing], { type: 'text/plain' });

    // Create a link to download the file
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    if(projectTitle.trim().length == 0) {
        link.download = `Untitled.wondr`;
    }
    else {
        link.download = `${projectTitle}.wondr`;
    }

    // Trigger the download by simulating a click
    link.click();
    link.remove();
    link = null;
    blob = null;

    
}
document.getElementById('btnSave').addEventListener('click', saveFile);


function checkIncludeHistory() {
    if(this.dataset.value == 'false') {
        includeHistory = true;
    }
    else if(this.dataset.value == 'true') {
        includeHistory = false;
    }

}
document.getElementsByClassName('chkIncludeHistory')[0].addEventListener('click', checkIncludeHistory);

////////////////////////////OPEN FILE////////////////////////
function openFile() {

    let inputFile = document.createElement('input');
    inputFile.type = "file";
    inputFile.accept =".wondr";
    inputFile.click();

    inputFile.onchange = function() { 

        let reader = new FileReader(); //create a file reader to read the format
        reader.readAsText(inputFile.files[0]); //read the file as text since it's SVG
        reader.onload = function() {

            let simpleCrypto = new SimpleCrypto("4818a616c7cb892c5397c69443bde3bbbda9ab4cd20bcff6bae5062eb4045ac4");
            let turing = simpleCrypto.decrypt(reader.result)
            ///////////////////////////!IMPORTANT RESET H AND RH/////////////////
            resetProject();
            let data  = turing.split('$$$$$');

            /////////STARTS AT A=1 SINCE A=0 IS " "
            for(let a = 1; a <= data.length; a++) {
                if(data[a] != null) {

                    ////////////////////////////OPENING HISTORY///////////////////
                    if(data[a].includes('History*')) {
                        data[a] = data[a].replace('History*', '');

                        uploadHistory = data[a];
                       
                    }
                    ////////////////////////////OPENING REDO///////////////////
                    else if(data[a].includes('Redo*')) {
                        data[a] = data[a].replace('Redo*', '');

                        uploadRedo = data[a];
                    }

                    ////////////////////LOAD IF THERE ARE THUMBS/////////////////
                    else if(data[a].includes('pnlBoxThumb:')) {

                        uploadThumb = data[a];
                    }

                    else {
                        
                        uploadPanel += data[a];

                    }
                        
                }
            }

            useHistory();
            useRedo();
            useThumb();

        }
    }
}
document.getElementById('btnUploadFile').addEventListener('click', openFile);

function resetProject()  {
    
    let cnvPin = document.getElementById('cnvPin');
    let cnvGrpLayers = document.getElementById('cnvGrpLayers');
    let configScroll = document.getElementsByClassName('configScroll');

    resetAllHistory();
    resetAllFocus();
    resetAllData();

    cnvGrpLayers.innerHTML = "";
    cnvPin.innerHTML = `<div id="selectPin"></div>`;

    configScroll[2].children[0].children[0].innerHTML = "";
    configScroll[5].innerHTML = "";
    
}

////////////////////////////USE HISTORY////////////////////
function useHistory() {
    
    if(uploadHistory != null) {
        let partHistory = uploadHistory.trim().split('~');
                        
        for(let b = 0; b < partHistory.length; b++) {
            if(partHistory[b] != null && partHistory[b].trim() != "") {
                
                if(b < maxH) {
                    history[b] = partHistory[b];
                    h = b;
                }
                else {
                    for(let a = 0; a < maxH; a++) {
                        if(history[a+1] != null) {
                            history[a] = history[a+1];
                        }   
                    }
                    history[maxH] = partHistory[b];
                    h = maxH;
                }
            }
        }
    }
}

////////////////////////////USE REDO///////////////////////
function useRedo() {

    if(uploadRedo != null) {
        let partHistory = uploadRedo.trim().split('~');
                            
        for(let b = 0; b < partHistory.length; b++) {
            if(partHistory[b] != null) {
            
                if(partHistory[b].trim().length > 0) {
                    redoHistory[rh] = partHistory[b].trim();
                    rh++;
                }
            }
        }
    }
}

///////////////////////////USE THUMB///////////////////////
function useThumb() {

    if(uploadThumb != null) {
        let splitThumb = uploadThumb.trim().split('*')
        for(let b = 0; b < splitThumb.length; b++) {
            if(splitThumb[b] != null && splitThumb[b].trim() != "") {
                thumbCountMax++;
            }
        }

        if(thumbCountMax > 0) {

            let partHistory = uploadThumb.split('*');
            let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb')
            let configScroll = document.getElementsByClassName('configScroll');

            for(let a = partHistory.length-1; a > 0; a--) {
                
                let n = Number(valueFinder(partHistory[a], "thumbno"));
                
                //////////////////////CHECK THUMBS IF SVG OR IMAGE////////////////////
                if(partHistory[a].includes('data:image/')) {

                    let src = valueFinder(partHistory[a], "source");

                    let img = new Image();
                    img.src = src;
                    img.setAttribute('draggable', 'false');
                    img.onload = function(e) {

                        let div = document.createElement('div');
                        div.classList.add('pnlBoxThumb');
                        div.setAttribute('draggable', 'false');
                        div.dataset.thumbno = n;
                        div.dataset.type = "image";
                        div.appendChild(img);

                        configScroll[2].children[0].children[0].prepend(div);

                        //add event listeners to pnlBoxThumbs
                        //index [0] as we use prepend so all new thumbs are [0]
                        pnlBoxThumb[0].addEventListener('dblclick', dblClickThumb)
                        pnlBoxThumb[0].addEventListener('pointerover', pointerOverThumb);
                        pnlBoxThumb[0].addEventListener('pointerleave', pointerLeaveThumb);

                        dataThumb[n] = '*' + partHistory[a];
                        
                        initThumb++;

                        if(initThumb == thumbCountMax) {
                        
                            useLightPanel();
                            initThumb = 0;
                            thumbCountMax = 0;
                        }
                    }

                }
                else {

                    let src = "";
                    let mainSrc = partHistory[a].split('\n');
                    
                    for(let b = 3; b < mainSrc.length; b++) {
                        src += mainSrc[b];
                    }
                    src = src.replace('source: ', '');

                    
                    let div = document.createElement('div');
                    div.classList.add('pnlBoxThumb');
                    div.setAttribute('draggable', 'false');
                    div.dataset.thumbno = n;
                    div.dataset.type = "vector";
                    div.innerHTML = src;

                    let svgChild = "";
                    let getSVGTag;

                    //check first if there's <g> tag already
                    if(div.querySelector('g') == null) {

                        getSVGTag = div.querySelector('svg');

                        for(let c = 0; c < getSVGTag.childElementCount; c++) {
                            svgChild += getSVGTag.children[c].outerHTML;
                        }
                    }
                    else {
                        getSVGTag = div.querySelector('g');

                        for(let c = 0; c < getSVGTag.childElementCount; c++) {
                            svgChild += getSVGTag.children[c].outerHTML;
                        }
                    }

                    //add the <g> tag
                    div.children[0].innerHTML = `<g style="mix-blend-mode:normal" opacity="1"></g>`;

                    //add the svgChild back
                    div.children[0].children[0].innerHTML = svgChild;

                    configScroll[2].children[0].children[0].prepend(div);

                    pnlBoxThumb[0].addEventListener('dblclick', dblClickThumb)
                    pnlBoxThumb[0].addEventListener('pointerover', pointerOverThumb);
                    pnlBoxThumb[0].addEventListener('pointerleave', pointerLeaveThumb);

                    dataThumb[n] = '*' + partHistory[a];

                    initThumb++;
                    
                    
                    if(initThumb == thumbCountMax) {
                        //console.log('thumbs uploaded')
                        useLightPanel();
                        initThumb = 0;
                        thumbCountMax = 0;
                    }
                }
            }
        }

        else {
            useLightPanel();
            initThumb = 0;
            thumbCountMax = 0;
        }
    }
    else {
        useLightPanel();
        initThumb = 0;
        thumbCountMax = 0;
    }
    
}

///////////////////////////USE LIGHTPANELS///////////////////////
function useLightPanel() {

    initPanel = 0;
    panelCountMax = 0;
    
    let splitPanel = uploadPanel.trim().split('*')
    for(let b = 0; b < splitPanel.length; b++) {
        if(splitPanel[b].includes('pnlBoxPattern:')) {
            panelCountMax++;
        }
        else if(splitPanel[b].includes('pnlBoxElement:')) {
            panelCountMax++;
        }
        else if(splitPanel[b].includes('pnlBoxLine:')) {
            panelCountMax++;
        }
        else if(splitPanel[b].includes('pnlBoxText:')) {
            panelCountMax++;
        }
    }

    let pnlBox;
    let partHistory = uploadPanel.trim().split('*');

    for(let a = partHistory.length-1; a > 0; a--) {

        if(partHistory[a] != null && partHistory[a].trim() != "") {

            let f = valueFinder(partHistory[a], "ref");

            //check first if canvas
            if(partHistory[a].includes('pnlBoxCanvas: Canvas')) {

                pnlBox = document.getElementById('pnlBoxCanvas');
                dataCanvas = partHistory[a];
                
                validateData(partHistory[a], pnlBox, dataCanvas);
            }   

            else if(partHistory[a].includes('pnlBoxPattern:')) {

                pnlBox = document.getElementById('pnlBoxPattern');

                /////////////////RESTORE PATTERN/////////////////
                let name = valueFinder(partHistory[a], "pnlBoxPattern");
                let id = valueFinder(partHistory[a], "id");

                //transfer redoHistory to dataPattern
                dataPattern[f] = '*' + partHistory[a];
                
                recreatePnlBoxPattern(f, name, id, 'upload');
            }
        
            else if(partHistory[a].includes('pnlBoxElement:')) {
        
                pnlBox = document.getElementById('pnlBoxElement');

                let n = valueFinder(partHistory[a], 'thumbno');
                let name = valueFinder(partHistory[a], 'pnlBoxElement');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxElement(f, n, name);
                recreateCanvasElement(f, n, pnlBox);
            }
        
            else if(partHistory[a].includes('pnlBoxLine:')) {
        
                pnlBox = document.getElementById('pnlBoxLine');

                let n = valueFinder(partHistory[a], 'thumbno');
                let name = valueFinder(partHistory[a], 'pnlBoxLine');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxLine(f, n, name);
                recreateCanvasLine(f, n, pnlBox);
            }

            else if(partHistory[a].includes('pnlBoxText:')) {
        
                pnlBox = document.getElementById('pnlBoxText');

                let f = valueFinder(partHistory[a], 'ref');
                let name = valueFinder(partHistory[a], 'pnlBoxText');
                let fontName = valueFinder(partHistory[a], 'fontName');
                let fontClass = valueFinder(partHistory[a], 'fontName');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxText(f, name, fontName, fontClass);
                recreateCanvasText(f, fontName, pnlBox);
                
            }
        }
    }
}

function useVectorPanel() {

    initPanel = 0;
    panelCountMax = 0;
    
    let splitPanel = uploadPanel.trim().split('*')
    for(let b = 0; b < splitPanel.length; b++) {
        if(splitPanel[b].includes('pnlBoxVector:')) {
            panelCountMax++;
        }
    }

    if(panelCountMax > 0) {

        let pnlBox;
        let partHistory = uploadPanel.trim().split('*');

        for(let a = partHistory.length-1; a > 0; a--) {

            if(partHistory[a] != null && partHistory[a].trim() != "") {

                let f = valueFinder(partHistory[a], "ref");
    
                if(partHistory[a].includes('pnlBoxVector:')) {
            
                    pnlBox = document.getElementById('pnlBoxVector');

                    let n = valueFinder(partHistory[a], 'thumbno');
                    let name = valueFinder(partHistory[a], 'pnlBoxVector');

                    dataLayer[f] = '*' + partHistory[a];

                    recreatePnlBoxVector(f, n, name);
                    recreateCanvasVector(f, n, pnlBox);
                }
        
            }
        }
    }
    else {
        useImagePanel();
    }
    
}

function useImagePanel() {

    initPanel = 0;
    panelCountMax = 0;

    let splitPanel = uploadPanel.trim().split('*')
    for(let b = 0; b < splitPanel.length; b++) {
        if(splitPanel[b].includes('pnlBoxImage:')) {
            panelCountMax++;
            
        }
    }

    if(panelCountMax > 0) {

        let pnlBox;
        let partHistory = uploadPanel.trim().split('*');

        for(let a = partHistory.length-1; a > 0; a--) {

            if(partHistory[a] != null && partHistory[a].trim() != "") {

                let f = valueFinder(partHistory[a], "ref");
    
                if(partHistory[a].includes('pnlBoxImage:')) {

                    pnlBox = document.getElementById('pnlBoxImage');

                    let n = valueFinder(partHistory[a], 'thumbno');
                    let name = valueFinder(partHistory[a], 'pnlBoxImage');

                    dataLayer[f] = '*' + partHistory[a];

                    recreatePnlBoxImage(f, n, name);
                    recreateCanvasImage(f, n, pnlBox);
                    
                }
        
            }
        }
    }
    else {
        resetAllFocus();
        rearrangeUploadedPanels();
    }
    
}

function validateData(data, pnlBox) {

    let newData = data.trim().split('\n');
    let f = valueFinder(data, 'ref');

    for(let b = 0; b < newData.length; b++) {
        
        let category = newData[b].split(': ')[0];
        let key = newData[b].split(': ')[1];
       
        if(category.includes('txt')) {
            
            //SEPARATE CONDITION FOR PNLBOXTEXT 
            //FOR SOME REASONS THERE IS A BUG NOT DRAGGING THE TEXT
            //IF SHADOW OR GLOW OR STROKE TEXTS  ARE CHANGED
            if(!data.includes('pnlBoxText: ')) {
                //remove first encoding
                pnlBox.querySelector(`.${category}`).removeEventListener('change', encodeTextMulti);

                pnlBox.querySelector(`.${category}`).value = key;
                pnlBox.querySelector(`.${category}`).dispatchEvent(new Event('change')); 
            
                //restore event listener encoding for manual addition
                pnlBox.querySelector(`.${category}`).addEventListener('change', encodeTextMulti);
            }

            else {

                if(!category.includes('Outline') && !category.includes('Glow') && !category.includes('Shadow')) {
                    pnlBox.querySelector(`.${category}`).removeEventListener('change', encodeTextMulti);

                    pnlBox.querySelector(`.${category}`).value = key;
                    pnlBox.querySelector(`.${category}`).dispatchEvent(new Event('change')); 

                    pnlBox.querySelector(`.${category}`).addEventListener('change', encodeTextMulti);
                }

            }

            if(category.includes('Color')) {
                txtHexValue.value = key;
                hex2Thumb();
            }
        }
        
        else if(category.includes('dropdown')) {
            
            let i = Number(category.split(' ')[1]);

            let options = pnlBox.querySelectorAll(`[class*=dropdown]`)[i].nextElementSibling;
            
            for(let d = 0; d < options.childElementCount; d++) {

                if(options.children[d].innerText == key) {
                    options.children[d].removeEventListener('click', encodeDropdownMulti);
                    options.children[d].click();
                    options.children[d].addEventListener('click', encodeDropdownMulti);
                }
            }
        }
        
        else if(category.includes('chk')) {

            pnlBox.querySelector(`.${category}`).removeEventListener('click', encodeCheckboxMulti);

            let defaultValue = pnlBox.querySelector(`.${category}`).dataset.value;
            
            if(defaultValue != key) {
                pnlBox.querySelector(`.${category}`).click();
                pnlBox.querySelector(`.${category}`).dispatchEvent(new Event ('pointerleave'));
            }
            
            pnlBox.querySelector(`.${category}`).addEventListener('click', encodeCheckboxMulti);
        
        }
        
        else if(category.includes('sel')) { 

            let selection = pnlBox.querySelector(`.${category}`);

            for(let d = 0; d < selection.childElementCount; d++) {
                if(selection.children[d].className == 'btn' + key) {

                    selection.children[d].removeEventListener('click', encodeSelectMulti);
                    selection.children[d].click();
                    selection.children[d].addEventListener('click', encodeSelectMulti);
                }
            }
        }

        else if(category.includes('innerText')) {
                
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);

            canvas.children[0].innerText = key;
        }
            
    }
}

function rearrangeUploadedPanels() {
    let arr = [];
    let configScroll = document.getElementsByClassName('configScroll');
    let partHistory = uploadPanel.trim().split('*');

    for(let a = 2; a < partHistory.length; a++) {

        if(partHistory[a] != null && partHistory[a].trim() != "") {

            //console.log(partHistory[a])
            let f = valueFinder(partHistory[a], "ref");
            arr.push(Number(f))
            let show = valueFinder(partHistory[a], "show");

            let panel = configScroll[5].querySelector(`[data-ref="${f}"]`)
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

            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
            cnvGrpLayers.prepend(canvas);

            if(panel.dataset.type != "pattern") {
                let pin = cnvPin.querySelector(`[data-ref="${f}"]`);
                cnvPin.prepend(pin);
            }

            if(show == "visible") {
                panel.querySelector('.btnShowHide').style.opacity = 1;
                panel.querySelector('.btnShowHide').dataset.show = show;
                canvas.style.visibility = show;
            }
            else {
                panel.querySelector('.btnShowHide').style.opacity = .2;
                panel.querySelector('.btnShowHide').dataset.show = show;
                canvas.style.visibility = show;
            }
        }
    }

    maxF = Math.max(...arr);
    maxF++;

    /*
    console.clear();
    for(let a = 0; a < h; a++) {
       console.log(history[a])
       console.log('h: ', h)
    }
    console.log("--------REDO---------")
    for(let a = 0; a < rh; a++) {
       console.log(redoHistory[a])
    }
    */
}


////////////////////////////FUNCTIONS FOR PROJECT TITLE////////////////////
document.getElementById('txtProjectTitle').addEventListener('focus', function() {
    this.select();
});

document.getElementById('txtProjectTitle').addEventListener('input', function() {
    if(this.value.trim().length > 0) {
        this.style.textAlign = "center";
    }
    else {
        this.style.textAlign = "left";
    }
});

document.getElementById('txtProjectTitle').addEventListener('keydown', function(e) {
    if(e.key == "Enter") {
        this.blur();
        this.style.borderBottom = "1px solid #647499;"
        projectTitle = this.value;
    }
});


//////////////////////////////FUNCTION FOR AUTOSAVE/////////////////////////

function restartAutoSave() {
    
}

function hoverInterval() {
    this.style.borderBottom = "1px solid #647499";
}

function leaveInterval() {
    this.style.borderBottom = "transparent"; 
}

document.getElementsByClassName('chkAutosave')[0].addEventListener('click', function() {
    let txtAutoSaveInterval = document.getElementById('txtAutoSaveInterval');

    if(this.dataset.value == "false") {    

        if(Number(txtAutoSaveInterval.value) == 0) {
            txtAutoSaveInterval.value = 1;
            txtAutoSaveInterval.min = 1;
            txtAutoSaveInterval.max = 60;
        }

        clearInterval(tmrAutoSave);
        tmrAutoSave = null;
        tmrAutoSave = setInterval(saveFile, 1000 * txtAutoSaveInterval.value * 60);

        txtAutoSaveInterval.removeAttribute('disabled');
        txtAutoSaveInterval.addEventListener('focus', function() { this.select(); });
        txtAutoSaveInterval.addEventListener('pointerover', hoverInterval);
        txtAutoSaveInterval.addEventListener('pointerleave', leaveInterval);

    }
    else {
        txtAutoSaveInterval.value = 0;
        txtAutoSaveInterval.min = 0;
        clearInterval(tmrAutoSave);
        tmrAutoSave = null;

        txtAutoSaveInterval.setAttribute('disabled', 'true');
        txtAutoSaveInterval.removeEventListener('pointerover', hoverInterval);
    }
    
});


/////////////////////////////FUNCTION FOR DOWNLOAD///////////////////////////

function downloadFile() {
    
    let txtSizeWidth = document.getElementsByClassName('txtSizeWidth')[0];
    let txtSizeHeight = document.getElementsByClassName('txtSizeHeight')[0];
    let drop = this.closest('.contentBox').querySelector('.dropdown').children[0].innerText;

    if(drop.includes('PNG')) {

        domtoimage.toPng(cnvMain, {width: txtSizeWidth.value, height: txtSizeHeight.value})
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            img.style.width = txtSizeWidth.value + "px";
            img.style.height = txtSizeHeight.value + "px";

            img.onload = function() {

                var a = document.createElement('a');
                a.href = img.src;
                
                if(projectTitle.trim().length == 0) {
                    a.download = `Untitled.png`;
                }
                else {
                    a.download = `${projectTitle}.png`;
                }

                a.click();
                a.remove();

            }
    
        })
        .catch(function (error) {
            console.error('Error:', error);
        });

    }

    else if(drop.includes('JPG')) {

        domtoimage.toJpeg(cnvMain, {width: txtSizeWidth.value, height: txtSizeHeight.value, quality: 1})
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            img.style.width = txtSizeWidth.value + "px";
            img.style.height = txtSizeHeight.value + "px";

            img.onload = function() {

                var a = document.createElement('a');
                a.href = img.src;
                
                if(projectTitle.trim().length == 0) {
                    a.download = `Untitled.jpg`;
                }
                else {
                    a.download = `${projectTitle}.jpg`;
                }

                a.click();
                a.remove();

            }
    
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
    }

    else if(drop.includes('PDF')) {

        domtoimage.toPng(cnvMain, {width: txtSizeWidth.value, height: txtSizeHeight.value})
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            img.style.width = txtSizeWidth.value + "px";
            img.style.height = txtSizeHeight.value + "px";

            img.onload = function() {
                
                let pdfWidth = Number(txtSizeWidth.value);
                let pdfHeight = Number(txtSizeHeight.value);

                const { jsPDF } = window.jspdf;
                const doc = new jsPDF({
                    //orientation: orientation,
                    unit: "px",
                    format: [pdfWidth, pdfHeight]
                  });
                  
                doc.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight)
                
                
                if(projectTitle.trim().length == 0) {
                    doc.save(`Untitled.pdf`);
                }
                else {
                    doc.save(`${projectTitle}.pdf`);
                }
            }
    
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
    }
}
document.getElementById('btnDownload').addEventListener('click', downloadFile);

