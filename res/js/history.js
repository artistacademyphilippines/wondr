
var history = [];
var h = 0;
var redoHistory = [];
var rh = 0;
var restoreThumb = [];
var restoreCanvas = [];
var restorePanel = [];
var restorePin = [];

history[0] = dataCanvas;

//================================CREATE HISTORY===========================

function createHistory(f, name, type, id, id2) {

    if(type == "pattern") {

        checkMaxHistory();

        history[h] = 'Created*';
        history[h] += `\nref: ${f}`;
        history[h] += `\npnlBoxPattern: ${name}`;
        history[h] += `\nid: ${id}`;
        history[h] += `\nshow: visible`;
        history[h] += `\nlock: false`;
        history[h] += `\ntxtColorPattern: 949EFF`;
        history[h] += `\ntxtOpacityPattern: 100`;
        history[h] += `\ntxtXPattern: 0`;
        history[h] += `\ntxtYPattern: 0`;
        history[h] += `\ntxtSizePattern: 3`;
        history[h] += `\ntxtSpacingPattern: 0`;
        history[h] += `\ntxtRandomSpinPattern: 0`;
        history[h] += `\nchkRandomSeed: false`;

        history[h] += `\ndropdown 0: Normal`;
    }

    else if(type == "image") {

        checkMaxHistory();

        history[h] = 'Created*';
        history[h] += `\nref: ${f}`;
        history[h] += `\npnlBoxImage: ${name}`;
        history[h] += `\nthumbno: ${id}`;
        history[h] += `\nshow: visible`;
        history[h] += `\nlock: false`;
        history[h] += `\ntxtWidthLayer: ${cnvLayers[f].clientWidth}`;
        history[h] += `\ntxtHeightLayer: ${cnvLayers[f].clientHeight}`;
        history[h] += `\ntxtXLayer: ${cnvLayers[f].offsetLeft}`;
        history[h] += `\ntxtYLayer: ${cnvLayers[f].offsetTop}`;
        history[h] += `\nchkFlipX: false`;
        history[h] += `\nchkFlipY: false`;
        history[h] += `\ntxtOpacityLayer: 100`;
        history[h] += `\ntxtRotationLayer: 0`;

        history[h] += `\ntxtBlur: 0`;
        history[h] += `\ntxtBrightness: 100`;
        history[h] += `\ntxtContrast: 100`;
        history[h] += `\ntxtSaturation: 100`;
        history[h] += `\ntxtTemperature: 0`;

        history[h] += `\ntxtOutlineColor: 000000`;
        history[h] += `\ntxtOutlineOpacity: 100`;
        history[h] += `\ntxtOutlineSize: 10`;

        history[h] += `\ntxtGlowColor: 949EFF`;
        history[h] += `\ntxtGlowOpacity: 50`;
        history[h] += `\ntxtGlowSize: 100`;
        history[h] += `\ntxtGlowSpread: 100`;

        history[h] += `\ntxtShadowColor: 000000`;
        history[h] += `\ntxtShadowOpacity: 100`;
        history[h] += `\ntxtShadowSize: 20`;
        history[h] += `\ntxtShadowSpread: 0`;
        history[h] += `\ntxtShadowRotation: 0`;

        history[h] += `\ndropdown 0: Normal`;
        history[h] += `\ndropdown 1: Remove`;

    }

    else if(type == "line") {

        checkMaxHistory();

        history[h] = 'Created*';
        history[h] += `\nref: ${f}`;
        history[h] += `\npnlBoxLine: ${name}`;
        history[h] += `\nthumbno: ${id}`;
        history[h] += `\nshow: visible`;
        history[h] += `\nlock: false`;

        history[h] += `\ntxtWidthLayer: ${cnvLayers[f].clientWidth}`;
        history[h] += `\ntxtHeightLayer: ${cnvLayers[f].clientHeight}`;
        history[h] += `\ntxtXLayer: ${cnvLayers[f].offsetLeft}`;
        history[h] += `\ntxtYLayer: ${cnvLayers[f].offsetTop}`;
        history[h] += `\nchkFlipX: false`;
        history[h] += `\nchkFlipY: false`;
        history[h] += `\ntxtOpacityLayer: 100`;
        history[h] += `\ntxtRotationLayer: 0`;
     
        history[h] += `\ntxtLineStrokeColor: 647499`;
        history[h] += `\ntxtLineStrokeWidth: 10`;
        history[h] += `\ntxtLineStrokeDash: 0`;
        history[h] += `\ntxtLineStrokeGap: 0`;
        history[h] += `\nchkLineStrokeCap: false`;

        history[h] += `\ndropdown 0: Normal`;
        history[h] += `\ndropdownLineStart 0: line miter`;
        history[h] += `\ndropdownLineEnd 0: line miter`;
    }

    else if(type == "vector") {

        checkMaxHistory();

        history[h] = 'Created*';
        history[h] += `\nref: ${f}`;
        history[h] += `\npnlBoxVector: ${name}`;
        history[h] += `\nthumbno: ${id}`;
        history[h] += `\nshow: visible`;
        history[h] += `\nlock: false`;
        
        history[h] += `\ntxtWidthLayer: ${cnvLayers[f].clientWidth}`;
        history[h] += `\ntxtHeightLayer: ${cnvLayers[f].clientHeight}`;
        history[h] += `\ntxtXLayer: ${cnvLayers[f].offsetLeft}`;
        history[h] += `\ntxtYLayer: ${cnvLayers[f].offsetTop}`;
        history[h] += `\nchkFlipX: false`;
        history[h] += `\nchkFlipY: false`;
        history[h] += `\ntxtOpacityLayer: 100`;
        history[h] += `\ntxtRotationLayer: 0`;

        history[h] += `\ntxtSubLayer: 0`;
        history[h] += `\ntxtVectorStrokeColor: 000000`;
        history[h] += `\ntxtVectorStrokeOpacity: 100`;
        history[h] += `\ntxtVectorStrokeWidth: 4`;
        history[h] += `\ntxtVectorStrokeDash: 0`;
        history[h] += `\ntxtVectorStrokeGap: 0`;
        history[h] += `\nchkVectorStrokeCap: false`;
        history[h] += `\nchkVectorStrokeShow: false`;

        history[h] += `\ntxtVectorFillColor: 000000`;
        history[h] += `\ntxtVectorFillOpacity: 100`;
        history[h] += `\nchkVectorFillShow: false`;

        history[h] += `\ndropdown 0: Normal`;
        history[h] += `\ndropdown 1: Stroke`;

    }
    
    else if(type == "element") {

        checkMaxHistory();

        history[h] = 'Created*';
        history[h] += `\nref: ${f}`;
        history[h] += `\npnlBoxElement: ${name}`;
        history[h] += `\nthumbno: ${id}`;
        history[h] += `\nshow: visible`;
        history[h] += `\nlock: false`;
        history[h] += `\ntxtWidthLayer: ${cnvLayers[f].clientWidth}`;
        history[h] += `\ntxtHeightLayer: ${cnvLayers[f].clientHeight}`;
        history[h] += `\ntxtXLayer: ${cnvLayers[f].offsetLeft}`;
        history[h] += `\ntxtYLayer: ${cnvLayers[f].offsetTop}`;
        history[h] += `\nchkFlipX: false`;
        history[h] += `\nchkFlipY: false`;
        history[h] += `\ntxtOpacityLayer: 100`;
        history[h] += `\ntxtRotationLayer: 0`;

        history[h] += `\ntxtElementStrokeColor: 647499`;
        history[h] += `\ntxtElementStrokeOpacity: 100`;
        history[h] += `\ntxtElementStrokeWidth: 20`;
        history[h] += `\ntxtElementCornerRadius: 0`;
        history[h] += `\ntxtElementStrokeDash: 0`;
        history[h] += `\ntxtElementStrokeGap: 0`;
        history[h] += `\nchkElementStrokeCap: false`;
        history[h] += `\nchkElementStrokeShow: true`;

        history[h] += `\ntxtElementFillColor: A9AEFF`;
        history[h] += `\ntxtElementFillOpacity: 100`;
        history[h] += `\nchkElementFillShow: true`;

        history[h] += `\ndropdown 0: Normal`;
        history[h] += `\ndropdown 1: Stroke`;
    }

    else if(type == "text") {

        checkMaxHistory();

        history[h] = 'Created*';
        history[h] += `\nref: ${f}`;
        history[h] += `\npnlBoxText: ${name}`;
        history[h] += `\nfontName: ${id}`;
        history[h] += `\nfontClass: ${id2}`;
        history[h] += `\nshow: visible`;
        history[h] += `\nlock: false`;
        history[h] += `\ntxtWidthLayer: ${cnvLayers[f].clientWidth}`;
        history[h] += `\ntxtHeightLayer: ${cnvLayers[f].clientHeight}`;
        history[h] += `\ntxtXLayer: ${cnvLayers[f].offsetLeft}`;
        history[h] += `\ntxtYLayer: ${cnvLayers[f].offsetTop}`;
        history[h] += `\nchkFlipX: false`;
        history[h] += `\nchkFlipY: false`;
        history[h] += `\ntxtOpacityLayer: 100`;
        history[h] += `\ntxtRotationLayer: 0`;

        history[h] += `\ntxtResizeText: 48`;
        history[h] += `\ntxtTextColor: 949EFF`;
        history[h] += `\ntxtLetterSpacing: 0`;
        history[h] += `\ntxtLineHeight: Auto`;
        history[h] += `\nselTextCase: UpperCase`;
        history[h] += `\nselTextResize: AutoWidth`;
        history[h] += `\nselTextHori: AlignLeft`;
        history[h] += `\nselTextVerti: AlignTop`;
        history[h] += `\nselTextDecor: NoDecor`;
  
        history[h] += `\ntxtOutlineColor: 6885CC`;
        history[h] += `\ntxtOutlineOpacity: 100`;
        history[h] += `\ntxtOutlineSize: 10`;

        history[h] += `\ntxtGlowColor: 6885CC`;
        history[h] += `\ntxtGlowOpacity: 50`;
        history[h] += `\ntxtGlowSize: 100`;
        history[h] += `\ntxtGlowSpread: 100`;

        history[h] += `\ntxtShadowColor: 000000`;
        history[h] += `\ntxtShadowOpacity: 100`;
        history[h] += `\ntxtShadowSize: 20`;
        history[h] += `\ntxtShadowSpread: 0`;
        history[h] += `\ntxtShadowRotation: 0`;
        history[h] += `\ninnerText: ${cnvLayers[f].children[0].textContent}`;

        history[h] += `\ndropdown 0: Normal`;
        history[h] += `\ndropdown 1: Regular`;
        history[h] += `\ndropdown 2: Remove`;

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
//================================ENCODE CHANGES===========================

function checkUndoDuplicate() {
    
    //check if the the new history is just a duplicate
    if(history[h] == history[h-1]) {
        //check now if the history is just from colorpanel drag
        if(colorBarBool == false && colorBoardBool == false) {

            history[h] = "";
            history[h] = null;
            h--;
        }
    }

}

function valueSwitcher(text, category, key) {

    let result = '';
    let data = text.trim().split('\n');

    for(let a = 0; a < data.length; a++) {

        if(data[a].includes(category)) {
            data[a] = `${data[a].split(': ')[0]}: ${key}`;
        }

        result += '\n' + data[a]
    }

    return result;
}

function valueFinder(text, category) {

    let data = text.trim().split('\n');

    for(let a = 0; a < data.length; a++) {
        if(data[a].includes(category)) {

            let value = data[a].split(': ')[1];
            return value;
        }
    }

}

function dataSwitcher(data, f, category, newKey) {
  
    for(let a = 0; a < data.length; a++) {
        if(data[a].includes(`ref: ${f}`)) {

            data[a] = valueSwitcher(data[a], category, newKey);
        }
    }
}

function checkCurrentStateMatching(currCategory) {

    let data = history[h].trim().split('\n');
    let match = false;

    for(let a = 0; a < data.length; a++) {
        if(data[a].includes(currCategory)) {
            match = true;
            break;
        }
    }

    return match;
}

//================================FORWARD ENCODING=========================

function pauseEncoding() {
    document.querySelector('#propertiesBox').querySelectorAll('input').forEach(function(input) {
        input.removeEventListener('change', encodeTextMulti)
    })
    document.querySelector('#propertiesBox').querySelectorAll('[class*=opt]').forEach(function(input) {
        input.removeEventListener('click', encodeDropdownMulti);
    })
    document.querySelector('#propertiesBox').querySelectorAll('[class*=chk]').forEach(function(input) {
        if(input.className != "chkSwitch") {
            input.removeEventListener('click', encodeCheckboxMulti);
        }
    })
    document.querySelector('#propertiesBox').querySelectorAll('[class*=sel]').forEach(function(input) {  

        let btn = input.querySelectorAll('[class*=btn]');
    
        btn.forEach(input => {
            input.removeEventListener('click', encodeSelectMulti);
        })
    })
}

function resumeEncoding() {
    document.querySelector('#propertiesBox').querySelectorAll('input').forEach(function(input) {
        input.addEventListener('change', encodeTextMulti)
    })
    document.querySelector('#propertiesBox').querySelectorAll('[class*=opt]').forEach(function(input) {
        input.addEventListener('click', encodeDropdownMulti);
    })
    document.querySelector('#propertiesBox').querySelectorAll('[class*=chk]').forEach(function(input) {
        if(input.className != "chkSwitch") {
            input.addEventListener('click', encodeCheckboxMulti);
        }
    })
    document.querySelector('#propertiesBox').querySelectorAll('[class*=sel]').forEach(function(input) {  

        let btn = input.querySelectorAll('[class*=btn]');
    
        btn.forEach(input => {
            input.addEventListener('click', encodeSelectMulti);
        })
    })
}

//////////////////////////////////////ENCODING/////////////////////////////////

function encodeTextMulti() {

    if(redoHistory[0] == "" || redoHistory[0] == null) {
        checkMaxHistory();
    }
    else {
        
        if(checkCurrentStateMatching(this.className)) {

            for(let a = 0; a <= rh; a++) {
                redoHistory[a] = null;
            }  

            rh = 0;

            (h == 0) ? h = 1: checkMaxHistory();

        }

        else {

            for(let a = 0; a <= rh; a++) {
                redoHistory[a] = null;
            }  

            rh = 0;

            checkMaxHistory();
            history[h] = null;
        }
    }

    let f;
    let name;
    let panel = this.closest('[id*=pnlBox]');
    let panelName = panel.id.replace('pnlBox', '');
    let newClassName;

    ////////////////////DETECT FIRST IF THE INPUT IS RNG THEN CHANGE CLASS NAME///////////
    if(this.className.includes('rng')) {
        newClassName = this.nextElementSibling.className;
    }
    else {
        newClassName = this.className;
    }

    //check first if this panel is canvas or not
    //if not, then transfer the data to append temporarily
    if(panel.id == 'pnlBoxCanvas') {
    
        //reset the value using valueSwitcher
        layerSequence = valueFinder(dataCanvas, newClassName);

        history[h] = `Modified*`;
        history[h] += `\npnlBoxCanvas: Canvas`;
        history[h] += `\n${newClassName}: ${this.value}`;
        history[h] += `\n_`;
        history[h] += `\n${newClassName}: ${layerSequence}\n`;

        dataCanvas = valueSwitcher(dataCanvas, newClassName, this.value);
    }

    else if(panel.id == 'pnlBoxPattern') {

        history[h] = "\nModified";

        for(let a=0; a < focusPanel.length; a++) {

            if(focusPanel[a] != null) {

                if(focusPanel[a].dataset.type == panelName.toLowerCase()) {

                    f = Number(focusPanel[a].dataset.ref);
                    name = focusPanel[a].querySelector('.txtHeader').value;
                    
                    layerSequence = valueFinder(dataPattern[f], newClassName);

                    history[h] += `*`;
                    history[h] += `\nref: ${f}`;
                    history[h] += `\npnlBoxPattern: ${name}`;
                    history[h] += `\n${newClassName}: ${this.value}`;
                    history[h] += `\n_`;
                    history[h] += `\n${newClassName}: ${layerSequence}\n`;

                    dataPattern[f] = valueSwitcher(dataPattern[f], newClassName, this.value);
                }
            }
            
        }

    }
    else {
        //reset the value using valueSwitcher

        history[h] = "\nModified";

        for(let a=0; a < focusPanel.length; a++) {

            if(focusPanel[a] != null) {

                if(focusPanel[a].dataset.type == panelName.toLowerCase()) {

                    f = Number(focusPanel[a].dataset.ref);
                    name = focusPanel[a].querySelector('.txtHeader').value;

                    layerSequence = valueFinder(dataLayer[f], newClassName);

                    history[h] += `*`;
                    history[h] += `\nref: ${f}`;
                    history[h] += `\npnlBox${panelName}: ${name}`;
                    history[h] += `\n${newClassName}: ${this.value}`;
                    history[h] += `\n_`;
                    history[h] += `\n${newClassName}: ${layerSequence}\n`;

                    dataLayer[f] = valueSwitcher(dataLayer[f], newClassName, this.value);
                }
            }
        }
    }

    checkUndoDuplicate();

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
document.querySelector('#propertiesBox').querySelectorAll('input').forEach(function(input) {
    input.addEventListener('change', encodeTextMulti)
})

function encodeDropdownMulti() {

    if(redoHistory[0] == "" || redoHistory[0] == null) {
        checkMaxHistory();
    }
    else {
        
        if(checkCurrentStateMatching(this.className)) {

            for(let a = 0; a <= rh; a++) {
                redoHistory[a] = null;
            }  

            rh = 0;

            (h == 0) ? h = 1: checkMaxHistory();
            
        }

        else {

            for(let a = 0; a <= rh; a++) {
                redoHistory[a] = null;
            }  

            rh = 0;

            checkMaxHistory();
            history[h] = null;
        }
    }

    let i = 0;
    let panel = this.closest('[id*=pnlBox]');
    let panelName = panel.id.replace('pnlBox', '');
    let dropdown = panel.querySelectorAll('[class*=dropdown]');
    
    let name;

    //check first the index of this dropdown
    for(let a = 0; a < dropdown.length; a++) {

        if(dropdown[a] == this.parentElement.previousElementSibling) {
            i = a;
        }
    }

    //check first if this panel is canvas or not
    if(panel.id == 'pnlBoxCanvas') {

        layerSequence = valueFinder(dataCanvas, `dropdown ${i}`);

        history[h] = 'Modified*';
        history[h] += `\npnlBoxCanvas: Canvas`;
        history[h] += `\ndropdown ${i}: ${this.innerText}`;
        history[h] += `\n_`;
        history[h] += `\ndropdown ${i}: ${layerSequence}\n`;

        dataCanvas = valueSwitcher(dataCanvas, `dropdown ${i}`, this.innerText);
        
    }
    else if(panel.id == 'pnlBoxPattern') {

        history[h] = "\nModified";

        for(let a=0; a < focusPanel.length; a++) {

            if(focusPanel[a] != null) {

                if(focusPanel[a].dataset.type == panelName.toLowerCase()) {

                    //e = Number(focusPanel[a].dataset.layer);
                    f = Number(focusPanel[a].dataset.ref);
                    name = focusPanel[a].querySelector('.txtHeader').value;

                    ///////////////CHANGE THE VALUE IF DEFAULTED TO CHOOSE STYLE/////////////
                    let newValue = this.innerText;

                    if(newValue == "Choose style") {
                        newValue = "Remove";
                    }

                    layerSequence = valueFinder(dataPattern[f], `dropdown ${i}`);

                    history[h] += `*`;
                    history[h] += `\nref: ${f}`;
                    history[h] += `\npnlBoxPattern: ${name}`;
                    history[h] += `\ndropdown ${i}: ${newValue}`;
                    history[h] += `\n_`;
                    history[h] += `\ndropdown ${i}: ${layerSequence}\n`;

                    dataPattern[f] = valueSwitcher(dataPattern[f], `dropdown ${i}`, newValue);
                }
            }
        }
    }
    else if(panel.id == 'pnlBoxLine') {

        history[h] = "\nModified";

        for(let a=0; a < focusPanel.length; a++) {

            if(focusPanel[a] != null) {

                if(focusPanel[a].dataset.type == panelName.toLowerCase()) {

                    //e = Number(focusPanel[a].dataset.layer);
                    f = Number(focusPanel[a].dataset.ref);
                    name = focusPanel[a].querySelector('.txtHeader').value;

                    //check first if dropdown is for LineStart
                    if(this.parentElement.className == "dropOptionLineStart") {
                        
                        layerSequence = valueFinder(dataLayer[f], `dropdownLineStart 0`);
                        
                        history[h] += '*';
                        history[h] += `\nref: ${f}`;
                        history[h] += `\npnlBox${panelName}: ${name}`;
                        history[h] += `\ndropdownLineStart 0: ${this.children[0].getAttribute('id')}`;
                        history[h] += `\n_`;
                        history[h] += `\ndropdownLineStart 0: ${layerSequence}\n`;

                        dataLayer[f] = valueSwitcher(dataLayer[f], `dropdownLineStart 0`, this.children[0].getAttribute('id'));
                    }
                    else if(this.parentElement.className == "dropOptionLineEnd") {
                        
                        layerSequence = valueFinder(dataLayer[f], `dropdownLineEnd 0`);

                        history[h] += '*';
                        history[h] += `\nref: ${f}`;
                        history[h] += `\npnlBox${panelName}: ${name}`;
                        history[h] += `\ndropdownLineEnd 0: ${this.children[0].getAttribute('id')}`;
                        history[h] += `\n_`;
                        history[h] += `\ndropdownLineEnd 0: ${layerSequence}\n`;

                        dataLayer[f] = valueSwitcher(dataLayer[f], `dropdownLineEnd 0`, this.children[0].getAttribute('id'));
                        
                    }
                }
            }
        }
    }
    else {

        history[h] = "\nModified";

        for(let a=0; a < focusPanel.length; a++) {

            if(focusPanel[a] != null) {

                if(focusPanel[a].dataset.type == panelName.toLowerCase()) {

                    f = Number(focusPanel[a].dataset.ref);
                    name = focusPanel[a].querySelector('.txtHeader').value;

                    ///////////////CHANGE THE VALUE IF DEFAULTED TO CHOOSE STYLE/////////////
                    let newValue = this.innerText;

                    if(newValue == "Choose style") {
                        newValue = "Remove";
                    }

                    layerSequence = valueFinder(dataLayer[f], `dropdown ${i}`);

                    history[h] += '*';
                    history[h] += `\nref: ${f}`;
                    history[h] += `\npnlBox${panelName}: ${name}`;
                    history[h] += `\ndropdown ${i}: ${newValue}`;
                    history[h] += `\n_`;
                    history[h] += `\ndropdown ${i}: ${layerSequence}\n`;

                    dataLayer[f] = valueSwitcher(dataLayer[f], `dropdown ${i}`, newValue);
                }
            }
        }

    }

    checkUndoDuplicate();

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
document.querySelector('#propertiesBox').querySelectorAll('[class*=opt]').forEach(function(input) {

    input.addEventListener('click', encodeDropdownMulti);
    
})

function encodeCheckboxMulti() {

    if(redoHistory[0] == "" || redoHistory[0] == null) {
        checkMaxHistory();
    }
    else {
        
        if(checkCurrentStateMatching(this.className)) {

            for(let a = 0; a <= rh; a++) {
                redoHistory[a] = null;
            }  

            rh = 0;

            (h == 0) ? h = 1: checkMaxHistory();
            
        }

        else {

            for(let a = 0; a <= rh; a++) {
                redoHistory[a] = null;
            }  

            rh = 0;

            checkMaxHistory();
            history[h] = null;
        }
    }

    let name;
    let f;
    let panel = this.closest('[id*=pnlBox]');
    let panelName = panel.id.replace('pnlBox', '');

    //check first if this panel is canvas or not
    if(panel.id == 'pnlBoxCanvas') {

        layerSequence = valueFinder(dataCanvas, `${this.className}`);

        history[h] = 'Modified*';
        history[h] += `\npnlBoxCanvas: Canvas`;
        history[h] += `\n${this.className}: ${this.dataset.value}`;
        history[h] += `\n_`;
        history[h] += `\n${this.className}: ${layerSequence}\n`;

        dataCanvas = valueSwitcher(dataCanvas, `${this.className}`, this.dataset.value);
    }
    else if(panel.id == 'pnlBoxPattern') {

        history[h] = "\nModified";

        for(let a=0; a < focusPanel.length; a++) {

            if(focusPanel[a] != null) {

                if(focusPanel[a].dataset.type == panelName.toLowerCase()) {

                    f = Number(focusPanel[a].dataset.ref);
                    name = focusPanel[a].querySelector('.txtHeader').value;

                    layerSequence = valueFinder(dataPattern[f], `${this.className}`);

                    history[h] += '*';
                    history[h] += `\nref: ${f}`;
                    history[h] += `\npnlBoxPattern: ${name}`;
                    history[h] += `\n${this.className}: ${this.dataset.value}`;
                    history[h] += `\n_`;
                    history[h] += `\n${this.className}: ${layerSequence}\n`;

                    dataPattern[f] = valueSwitcher(dataPattern[f], `${this.className}`, this.dataset.value);
                }
            }
        }

    }
    else {

        history[h] = "\nModified";

        for(let a=0; a < focusPanel.length; a++) {

            if(focusPanel[a] != null) {

                if(focusPanel[a].dataset.type == panelName.toLowerCase()) {

                    f = Number(focusPanel[a].dataset.ref);
                    name = focusPanel[a].querySelector('.txtHeader').value;

                    layerSequence = valueFinder(dataLayer[f], `${this.className}`);

                    history[h] += '*';
                    history[h] += `\nref: ${f}`;
                    history[h] += `\npnlBox${panelName}: ${name}`;
                    history[h] += `\n${this.className}: ${this.dataset.value}`;
                    history[h] += `\n_`;
                    history[h] += `\n${this.className}: ${layerSequence}\n`;

                    dataLayer[f] = valueSwitcher(dataLayer[f], `${this.className}`, this.dataset.value);
                }
            }
        }
    }

    checkUndoDuplicate();

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

document.querySelector('#propertiesBox').querySelectorAll('[class*=chk]').forEach(function(input) {
    if(input.className != "chkSwitch") {
        input.addEventListener('click', encodeCheckboxMulti);
    }
})

function encodeSelectMulti(){

    if(redoHistory[0] == "" || redoHistory[0] == null) {
        checkMaxHistory();
    }
    
    else {
        
        if(checkCurrentStateMatching(this.className)) {

            for(let a = 0; a <= rh; a++) {
                redoHistory[a] = null;
            }  

            rh = 0;

            (h == 0) ? h = 1: checkMaxHistory();
            
        }

        else {

            for(let a = 0; a <= rh; a++) {
                redoHistory[a] = null;
            }  

            rh = 0;

            checkMaxHistory();
            history[h] = null;
        }
    }
        
    let name;
    let oldValue;
    let panel = this.closest('[id*=pnlBox]');
    let panelName = panel.id.replace('pnlBox', '');

    //THIS BLOCK IS ONLY FOR PNLBOXTEXT SINCE IT'S THE ONLY PANEL THAT USES
    //SELECT AS OF THIS BUILD
    if(panel.id == 'pnlBoxText') {

        history[h] = "\nModified";

        for(let a=0; a < focusPanel.length; a++) {

            if(focusPanel[a] != null) {

                if(focusPanel[a].dataset.type == panelName.toLowerCase()) {

                    //e = Number(focusPanel[a].dataset.layer);
                    f = Number(focusPanel[a].dataset.ref);
                    name = focusPanel[a].querySelector('.txtHeader').value;   
                    
                    layerSequence = valueFinder(dataLayer[f], `${this.parentElement.className}`);

                    history[h] += '*';
                    history[h] += `\nref: ${f}`;
                    history[h] += `\npnlBox${panelName}: ${name}`;
                    history[h] += `\n${this.parentElement.className}: ${this.className.replace('btn', '')}`;
                    history[h] += `\n_`;
                    history[h] += `\n${this.parentElement.className}: ${layerSequence}\n`;

                    dataLayer[f] = valueSwitcher(dataLayer[f], `${this.parentElement.className}`, this.className.replace('btn', ''));
                }
            }
        }
    }

    checkUndoDuplicate();
    
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

document.querySelector('#propertiesBox').querySelectorAll('[class*=sel]').forEach(function(input) {  

    let btn = input.querySelectorAll('[class*=btn]');

    btn.forEach(input => {
        input.addEventListener('click', encodeSelectMulti);
    })
})

function encodeTxtHeader() {

    let f = Number(this.closest(`.pnlBoxLayer`).dataset.ref);
    let type = this.closest(`.pnlBoxLayer`).dataset.type;
    type = type.replace(type.charAt(0), type.charAt(0).toUpperCase());
    let category = `pnlBox${type}`;
    let newKey = this.value;

    /////////////////ENCODE RENAME HISTORY//////////
    checkMaxHistory();
    history[h] = "\nRenamed*";
    history[h] += `\nref: ${f}`;
    history[h] += `\npnlBox${type}: ${this.value}`;
    history[h] += `\npnlBox${type}: ${renameDefault}\n`;

    /////////////////ENCODE ALL REF DATA TOO///////////////
    if(type == "Pattern") {
        dataSwitcher(dataPattern, f, category, newKey);
    }
    else {
        dataSwitcher(dataLayer, f, category, newKey)
    }
}

function encodeBasicsFromCanvas(event) {

    checkMaxHistory();

    history[h] = "\nModified";
    
    for(let a = 0; a < focusObj.length; a++) {
        if(focusObj[a] != null) {
            
            let f = focusObj[a].dataset.ref;
            let type = focusObj[a].dataset.type;
        
            let panelName = focusObj[a].dataset.type;
            panelName = panelName.replace(panelName.charAt(0), panelName.charAt(0).toUpperCase());

            let name = f2Panel(f).querySelector('.txtHeader').value;

            if(event == "scale" || event == "resize") {
            
                history[h] += `*`;
                history[h] += `\nref: ${f}`;
                history[h] += `\npnlBox${panelName}: ${name}`;
                history[h] += `\ntxtWidthLayer: ${Math.round(focusObj[a].clientWidth)}`;
                history[h] += `\ntxtHeightLayer: ${Math.round(focusObj[a].clientHeight)}`;
                history[h] += `\ntxtXLayer: ${Math.round(focusObj[a].offsetLeft)}`;
                history[h] += `\ntxtYLayer: ${Math.round(focusObj[a].offsetTop)}`;

                //[!]INJECT THIS PART IF THE TYPE IS TEXT
                //AS THIS WILL AFFECT THE AUTOWIDTH, AUTOHEIGHT OR FIXED SIZE
                if(type == "text") {
                    history[h] += `\nselTextResize: ${currResizeBox}`;
                } 

                history[h] += `\n_`;

                //process current history and get old value
                oldValue = valueFinder(dataLayer[f], `txtWidthLayer`);
                history[h] += `\ntxtWidthLayer: ${oldValue}`;

                oldValue = valueFinder(dataLayer[f], `txtHeightLayer`);
                history[h] += `\ntxtHeightLayer: ${oldValue}`;

                oldValue = valueFinder(dataLayer[f], `txtXLayer`);
                history[h] += `\ntxtXLayer: ${oldValue}`;

                oldValue = valueFinder(dataLayer[f], `txtYLayer`);
                history[h] += `\ntxtYLayer: ${oldValue}`;

                if(type == "text") {
                    oldValue = valueFinder(dataLayer[f], 'selTextResize');
                    history[h] += `\nselTextResize: ${valueFinder(dataLayer[f], oldValue)}`;
                }

                dataLayer[f] = valueSwitcher(dataLayer[f], 'txtWidthLayer', Math.round(focusObj[a].clientWidth));
                dataLayer[f] = valueSwitcher(dataLayer[f], 'txtHeightLayer', Math.round(focusObj[a].clientHeight));

                dataLayer[f] = valueSwitcher(dataLayer[f], 'txtXLayer', Math.round(focusObj[a].offsetLeft));
                dataLayer[f] = valueSwitcher(dataLayer[f], 'txtYLayer', Math.round(focusObj[a].offsetTop));
                
                if(type == "text") {
                    dataLayer[f] = valueSwitcher(dataLayer[f], 'selTextResize', currResizeBox);
                }

            }
            else if(event == "drag") {

                history[h] += `*`;
                history[h] += `\nref: ${f}`;
                history[h] += `\npnlBox${panelName}: ${name}`;
                history[h] += `\ntxtXLayer: ${Math.round(focusObj[a].offsetLeft)}`;
                history[h] += `\ntxtYLayer: ${Math.round(focusObj[a].offsetTop)}`;
                history[h] += `\n_`;

                
                oldValue = valueFinder(dataLayer[f], `txtXLayer`);
                history[h] += `\ntxtXLayer: ${oldValue}`;

                oldValue = valueFinder(dataLayer[f], `txtYLayer`);
                history[h] += `\ntxtYLayer: ${oldValue}\n`;

                dataLayer[f] = valueSwitcher(dataLayer[f], 'txtXLayer', Math.round(focusObj[a].offsetLeft));
                dataLayer[f] = valueSwitcher(dataLayer[f], 'txtYLayer', Math.round(focusObj[a].offsetTop));
                
                
            }
            else if(event == "rotate") {
                

                history[h] += `*`;
                history[h] += `\nref: ${f}`;
                history[h] += `\npnlBox${panelName}: ${name}`;
                history[h] += `\ntxtRotationLayer: ${Math.round(focusObj[a].dataset.rotation)}`;
                history[h] += `\n_`;

                oldValue = valueFinder(dataLayer[f], `txtRotationLayer`);
                history[h] += `\ntxtRotationLayer: ${oldValue}\n`;

                dataLayer[f] = valueSwitcher(dataLayer[f], 'txtRotationLayer', Math.round(focusObj[a].dataset.rotation));
            }
                
        }
    }

    checkUndoDuplicate();
   
}

///////////////////////////////////////UNDO / REDO PROPERTIES////////////////////////////

function undoProperties() {

    let pnlBox;

    //check first if canvas
    if(history[h].includes('pnlBoxCanvas: Canvas')) {

        pnlBox = document.getElementById('pnlBoxCanvas');
        
    }   
    else if(history[h].includes('pnlBoxPattern:')) {

        pnlBox = document.getElementById('pnlBoxPattern');
    }

    else if(history[h].includes('pnlBoxImage:')) {

        pnlBox = document.getElementById('pnlBoxImage');
    }

    else if(history[h].includes('pnlBoxVector:')) {

        pnlBox = document.getElementById('pnlBoxVector');
    }

    else if(history[h].includes('pnlBoxElement:')) {

        pnlBox = document.getElementById('pnlBoxElement');
    }

    else if(history[h].includes('pnlBoxLine:')) {

        pnlBox = document.getElementById('pnlBoxLine');
    }

    else if(history[h].includes('pnlBoxText:')) {

        pnlBox = document.getElementById('pnlBoxText');
    }

    let partHistory = history[h].trim().split('*');

    if(partHistory.length > 2) {
        multiSelect = true;
    }
    else {
        multiSelect = false;
    }

    for(let a = 1; a < partHistory.length; a++) {
    //scrape each lines first
        if(partHistory[a] != null) {

            let data = partHistory[a].split('_');
            let f = valueFinder(data[0], 'ref');
            let canvas, type;

            if(f != null) {
                canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
                panel2Focus(f2Panel(f));
                type = f2Panel(f).dataset.type;
            }
            
            let oldData = data[1].trim().split('\n');

            for(let b = 0; b < oldData.length; b++) {

                //for each data, split and get category
                let category = oldData[b].split(': ')[0];
                let key = oldData[b].split(': ')[1];

                if(category.includes('txt')) {

                    //remove first encoding
                    pnlBox.querySelector(`.${category}`).removeEventListener('change', encodeTextMulti);

                    ////////THESE HEX LINES ARE SAFE THEY ARE FOR COLOR PICKER/////////
                    txtHexValue.value = key;
                    hex2Thumb();

                    if(multiSelect) {

                        pnlBox.querySelector(`.${category}`).value = key;

                        if(category == "txtXLayer") {
                            canvas.style.left = key + 'px';
                        }
                        else if(category == "txtYLayer") {
                            canvas.style.top = key + 'px';
                        }
                        else if(category == "txtWidthLayer") {
                            canvas.style.width = key + 'px';
                        }
                        else if(category == "txtHeightLayer") {
                            canvas.style.height = key + 'px';
                        }
                        else {
                            pnlBox.querySelector(`.${category}`).dispatchEvent(new Event('change')); 
                        }
                    }
                    else {
                        //trigger change using undo data
                        pnlBox.querySelector(`.${category}`).value = key;
                        pnlBox.querySelector(`.${category}`).dispatchEvent(new Event('change')); 
                    }
                    //restore event listener encoding for manual addition
                    pnlBox.querySelector(`.${category}`).addEventListener('change', encodeTextMulti);
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
                    pnlBox.querySelector(`.${category}`).click();
                    pnlBox.querySelector(`.${category}`).dispatchEvent(new Event ('pointerleave'));
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

                    canvas.children[0].value = key;
                }
                //UPDATE DATA LAYER OR DATA PATTERN DEPENDS ON PARTHISTORY
                if(partHistory[a].includes('pnlBoxCanvas:')) {
                    //EMPTY CONDITION FOR PNLBOXCANVAS BEC. NO 'F'
                    swapPanels('canvas');
                }
                else if(partHistory[a].includes('pnlBoxPattern:')) {
                    dataPattern[f] = valueSwitcher(dataPattern[f], category, key);
                    swapPanels(type);
                }
                else {
                    dataLayer[f] = valueSwitcher(dataLayer[f], category, key);
                    swapPanels(type);
                }
            }

            
        }
    }

    adjustBorder();
       
    if (h > 0) {
        redoHistory[rh] = history[h];
        history[h] = null;
        h--;
        rh++;
    }
    else {
        h = 1;
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

function redoProperties() {

    checkMaxHistory();
    history[h] = redoHistory[rh-1];
    redoHistory[rh-1] = null;
    (rh > 0) ? rh--: rh=0;

    let pnlBox;

    //check first if canvas
    if(history[h].includes('pnlBoxCanvas: Canvas')) {

        pnlBox = document.getElementById('pnlBoxCanvas');
        
    }   
    else if(history[h].includes('pnlBoxPattern:')) {

        pnlBox = document.getElementById('pnlBoxPattern');
    }

    else if(history[h].includes('pnlBoxImage:')) {

        pnlBox = document.getElementById('pnlBoxImage');
    }

    else if(history[h].includes('pnlBoxVector:')) {

        pnlBox = document.getElementById('pnlBoxVector');
    }

    else if(history[h].includes('pnlBoxElement:')) {

        pnlBox = document.getElementById('pnlBoxElement');
    }

    else if(history[h].includes('pnlBoxLine:')) {

        pnlBox = document.getElementById('pnlBoxLine');
    }

    else if(history[h].includes('pnlBoxText:')) {

        pnlBox = document.getElementById('pnlBoxText');
    }

    let partHistory = history[h].trim().split('*');

    for(let a = 1; a < partHistory.length; a++) {

        //scrape each lines first
        let data = partHistory[a].split('_');
        let f = valueFinder(data[0], 'ref');
        let type;

        if(f != null) {
            panel2Focus(f2Panel(f));
            canvas2Focus(f2Canvas(f));
            type = f2Panel(f).dataset.type;
        }
       
        let newData = data[0].trim().split('\n');
    
        for(let b = 0; b < newData.length; b++) {
            //for each data, split and get category
            
            let category = newData[b].split(': ')[0];
            let key = newData[b].split(': ')[1];

            if(category.includes('txt')) {
                
                //remove first encoding
                pnlBox.querySelector(`.${category}`).removeEventListener('change', encodeTextMulti);

                //trigger change using undo data
                pnlBox.querySelector(`.${category}`).value = key;
                pnlBox.querySelector(`.${category}`).dispatchEvent(new Event('change')); 
                txtHexValue.value = key;
                hex2Thumb();

                //restore event listener encoding for manual addition
                pnlBox.querySelector(`.${category}`).addEventListener('change', encodeTextMulti);

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
                pnlBox.querySelector(`.${category}`).click();
                pnlBox.querySelector(`.${category}`).dispatchEvent(new Event ('pointerleave'));
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

                canvas.children[0].value = key;
            }

            //UPDATE DATA LAYER OR DATA PATTERN DEPENDS ON PARTHISTORY
            if(partHistory[a].includes('pnlBoxCanvas:')) {
                //EMPTY CONDITION FOR PNLBOXCANVAS BEC. NO 'F'
                swapPanels('canvas');
            }
            else if(partHistory[a].includes('pnlBoxPattern:')) {
                dataPattern[f] = valueSwitcher(dataPattern[f], category, key);
                swapPanels(type);
            }
            else {
                dataLayer[f] = valueSwitcher(dataLayer[f], category, key);
                swapPanels(type);
            }

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

///////////////////////////////////////UNDO / REDO DELETE///////////////////////////////

function undoDelete() {

    let partHistory = history[h].trim().split('*');
    let configScroll = document.getElementsByClassName('configScroll');
    
    //RUN LOOP AND STARTS AT 1
    //SINCE PARTHISTORY[0] IS JUST THE TITLE 'DELETED'
    
    for(let a = 2; a < partHistory.length; a++) {

        let tempCanvas = document.createElement('div');
        let f = Number(valueFinder(partHistory[a], 'ref'));
        

        if(partHistory[a].includes('pnlBoxPattern:')) {
            
            /////////////////RESTORE PATTERN/////////////////
            let name = valueFinder(partHistory[a], "pnlBoxPattern");
            let id = valueFinder(partHistory[a], "id");

            //transfer redoHistory to dataPattern
            dataPattern[f] = '*' + partHistory[a];
            
            recreatePnlBoxPattern(f, name, id);
            
        }

        else if(partHistory[a].includes('pnlBoxThumb:')) {

            let tempThumb = document.createElement('div');
            let tempPanel = document.createElement('div');
            let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');

            let n = Number(valueFinder(partHistory[a], "thumbno"));
            
            //transfer redoHistory to dataPattern
            dataThumb[n] = '*' + partHistory[a];
        
            //////////////////////RESTORE THUMBS////////////////////
            for(let b = 0; b < restoreThumb.length; b++) {
                
                if(restoreThumb[b] != null) {

                    if(restoreThumb[b].includes(`thumbno="${n}"`)) {

                        tempThumb.innerHTML = restoreThumb[n];

                        focusPanel[n] = tempThumb.children[0];
                        configScroll[2].children[0].children[0].appendChild(tempThumb.children[0])
                        
                        restoreThumb[n] = null;
                        tempThumb = null;
                    }
                }
                
            }

            ////////////////////REARRANGE PNLBOXTHUMBS////////////////////
            for(let b = pnlBoxThumb.length + 1; b >= 0; b--) {
                if(pnlBoxThumb[b] != null) {

                    let current;
                    let before;

                    if(b > 0) {
                        current = Number(pnlBoxThumb[b].dataset.thumbno);
                        before = Number(pnlBoxThumb[b-1].dataset.thumbno);
    
                        if(current > before) {
                            configScroll[2].children[0].children[0].insertBefore(pnlBoxThumb[b], pnlBoxThumb[b-1]);
                        }
                    }
                    else {
                        configScroll[2].children[0].children[0].prepend(pnlBoxThumb[b]);
                    } 

                    //////////////////RE-ADDING FUNCTIONS/////////////

                    pnlBoxThumb[b].removeEventListener('dblclick', dblClickThumb)
                    pnlBoxThumb[b].removeEventListener('pointerover', pointerOverThumb);
                    pnlBoxThumb[b].removeEventListener('pointerleave', pointerLeaveThumb);

                    pnlBoxThumb[b].addEventListener('dblclick', dblClickThumb)
                    pnlBoxThumb[b].addEventListener('pointerover', pointerOverThumb);
                    pnlBoxThumb[b].addEventListener('pointerleave', pointerLeaveThumb);

                    ////////////////FOCUS ON THUMBS/////////////////
                    if(pnlBoxThumb[b].style.borderColor == "rgb(104, 133, 204)") {
                
                        pnlBoxThumb[b].style.borderWidth = "1px"; //highlight
                        pnlBoxThumb[b].children[0].style.filter = "saturate(.7) blur(.2px)";
                
                    }
                    else {
                        pnlBoxThumb[b].style.borderColor = "transparent";
                        pnlBoxThumb[b].style.backgroundColor = "transparent";
                        pnlBoxThumb[b].style.borderWidth = "1px";
                        pnlBoxThumb[b].children[0].style.filter = "saturate(.5) brightness(60%) blur(.2px)";

                    }
                }
            }

            //////////////////////RESTORE PANELS//////////////////////
            for(let b = 0; b < restorePanel.length; b++) {

                if(restorePanel[b] != null) {
                    
                    if(restorePanel[b].includes(`thumbno="${n}"`)) {

                        tempPanel.innerHTML = restorePanel[b];

                        let f = Number(tempPanel.children[0].dataset.ref);

                        configScroll[5].prepend(tempPanel.children[0]);
                        
                        tempCanvas.innerHTML = restoreCanvas[f];

                        cnvLayers[f] = tempCanvas.children[0]; 

                        cnvGrpLayers.prepend(cnvLayers[f]);

                        addBorderLayer(cnvLayers[f], f)

                        restorePanel[b] = null;
                        tempPanel = null;

                        tempCanvas = null;
                        restoreCanvas[f] = null;
                    }
                }
                    
            } 
            
            rearrangePanelBoxes(history[h]);

        }

        else {

            if (partHistory[a].includes('pnlBoxImage:')) {

                let n = valueFinder(partHistory[a], 'thumbno');
                let name = valueFinder(partHistory[a], 'pnlBoxImage');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxImage(f, n, name);
            }
            
            else if (partHistory[a].includes('pnlBoxVector:')) {

                let n = valueFinder(partHistory[a], 'thumbno');
                let name = valueFinder(partHistory[a], 'pnlBoxVector');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxVector(f, n, name);
            }

            else if (partHistory[a].includes('pnlBoxElement:')) {

                let f = valueFinder(partHistory[a], 'ref');
                let n = valueFinder(partHistory[a], 'thumbno');
                let name = valueFinder(partHistory[a], 'pnlBoxElement');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxElement(f, n, name);
            }

            else if (partHistory[a].includes('pnlBoxLine:')) {

                let n = valueFinder(partHistory[a], 'thumbno');
                let name = valueFinder(partHistory[a], 'pnlBoxLine');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxLine(f, n, name);
            }

            else if (partHistory[a].includes('pnlBoxText:')) {
                
                let name = valueFinder(partHistory[a], 'pnlBoxText');
                let fontName = valueFinder(partHistory[a], 'fontName');
                let fontClass = valueFinder(partHistory[a], 'fontClass');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxText(f, name, fontName, fontClass);

            }

            tempCanvas.innerHTML = restoreCanvas[f];

            cnvLayers[f] = tempCanvas.children[0]; 
            cnvGrpLayers.prepend(cnvLayers[f]);

            tempCanvas = null;
            restoreCanvas[f] = null;

            addBorderLayer(cnvLayers[f], f);
            canvas2Focus(cnvLayers[f]);   
        }

        let type = f2Panel(f).dataset.type;
        swapPanels(type);
    } 
    
    //////////////////////RESTORE PANEL SHOW HIDE AND RENAME/////////////////
    rearrangePanelBoxes(history[h]);

    if (h > 0) {
        redoHistory[rh] = history[h];
        history[h] = null;
        h--;
        rh++;
    }
    else {
        h = 1;
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

function redoDelete() {
  
    checkMaxHistory();
    history[h] = redoHistory[rh-1];
    redoHistory[rh-1] = null;
    (rh > 0) ? rh--: rh=0;

    let partHistory = history[h].trim().split('*');
    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');
    
    //RUN LOOP AND STARTS AT 1
    //SINCE PARTHISTORY[0] IS JUST THE TITLE 'DELETED'
    
    for(let a = 2; a < partHistory.length; a++) {

        let f = Number(valueFinder(partHistory[a], 'ref'));

        if (partHistory[a].includes('pnlBoxPattern:')) {

            deleteAllPatterns(f)

            removeData(dataPattern, f)
        }
        else if (history[h].includes('pnlBoxThumb:')) {

            let n = Number(valueFinder(partHistory[a], 'thumbno'));

            deleteAllThumbs(n)

        }
        else {

            deleteAllLayers(f)
        }
    }

    swapPanels("canvas");

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

///////////////////////////////////////UNDO / REDO CREATE///////////////////////////////
function undoCreate() {
    
    let f = Number(valueFinder(history[h], "ref"));

    if (history[h].includes('pnlBoxPattern:')) {
  
        removeData(dataPattern, f);
        deleteAllPatterns(f);
        
    }
    
    else {

        removeData(dataLayer, f)
        deleteAllLayers(f);
        
    }

    swapPanels('canvas')
    resetLeadDrag();
    resetAllFocus();
    
    if (h > 0) {
        redoHistory[rh] = history[h];
        history[h] = null;
        h--;
        rh++;
    }
    else {
        h = 1;
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

function redoCreate() { 

    checkMaxHistory();
    history[h] = redoHistory[rh-1];
    redoHistory[rh-1] = null;
    (rh > 0) ? rh--: rh=0;

    let partHistory = history[h].trim().split('*');
    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');

    //RUN LOOP AND STARTS AT 1
    //SINCE PARTHISTORY[0] IS JUST THE TITLE 'DELETED'

    for(let a = 1; a < partHistory.length; a++) {

        let tempCanvas = document.createElement('div');
        let f = Number(valueFinder(partHistory[a], 'ref'));

        if(partHistory[a].includes('pnlBoxPattern:')) {
            
            /////////////////RESTORE PATTERN/////////////////
            let name = valueFinder(partHistory[a], "pnlBoxPattern");
            let id = valueFinder(partHistory[a], "id");

            //transfer redoHistory to dataPattern
            dataPattern[f] = '*' + partHistory[a];
            
            pauseEncoding();
            recreatePnlBoxPattern(f, name, id);
        
        }
        
        else {

            if (partHistory[a].includes('pnlBoxImage:')) {

                let n = valueFinder(partHistory[a], 'thumbno');
                let name = valueFinder(partHistory[a], 'pnlBoxImage');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxImage(f, n, name);
            }
            
            else if (partHistory[a].includes('pnlBoxVector:')) {

                let n = valueFinder(partHistory[a], 'thumbno');
                let name = valueFinder(partHistory[a], 'pnlBoxVector');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxVector(f, n, name);
            }

            else if (partHistory[a].includes('pnlBoxElement:')) {

                let f = valueFinder(partHistory[a], 'ref');
                let n = valueFinder(partHistory[a], 'thumbno');
                let name = valueFinder(partHistory[a], 'pnlBoxElement');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxElement(f, n, name);
            }

            else if (partHistory[a].includes('pnlBoxLine:')) {

                let n = valueFinder(partHistory[a], 'thumbno');
                let name = valueFinder(partHistory[a], 'pnlBoxLine');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxLine(f, n, name);
            }

            else if (partHistory[a].includes('pnlBoxText:')) {
                
                let name = valueFinder(partHistory[a], 'pnlBoxText');
                let fontName = valueFinder(partHistory[a], 'fontName');
                let fontClass = valueFinder(partHistory[a], 'fontClass');

                dataLayer[f] = '*' + partHistory[a];

                recreatePnlBoxText(f, name, fontName, fontClass);

            }

            tempCanvas.innerHTML = restoreCanvas[f];

            cnvLayers[f] = tempCanvas.children[0]; 
            cnvGrpLayers.prepend(cnvLayers[f]);

            tempCanvas = null;
            restoreCanvas[f] = null;

            addBorderLayer(cnvLayers[f], f);
            canvas2Focus(cnvLayers[f]);   
            
        }

        let type = f2Panel(f).dataset.type; 
        swapPanels(type);
    }

    /////////////////////////RESTORE CANVAS/////////////////
    
    for(let b = 0; b < pnlBoxLayer.length; b++) {

        if(pnlBoxLayer[b] != null && pnlBoxLayer[b].dataset.type != "pattern") {

            let tempCanvas = document.createElement('div');
            let f = Number(pnlBoxLayer[b].dataset.ref);

            if(cnvLayers[f] == null) {

                tempCanvas.innerHTML = restoreCanvas[f];

                cnvLayers[f] = tempCanvas.children[0]; 
                
                if(e == 0) {
                    cnvGrpLayers.prepend(cnvLayers[f]);
                }
                else {
                    cnvGrpLayers.insertBefore(cnvLayers[f], cnvLayers[e+1]);
                }

                restoreCanvas[f] = null;
                addBorderLayer(cnvLayers[f], f)
            
            }
            
        }
    }
    
    //////////////////////RESTORE PANEL SHOW HIDE AND RENAME/////////////////
    readdPanelEvents();

    
    //console.clear();
    /*
    for(let a = 0; a < 10; a++) {
       console.log(history[a])
    }
    console.log("--------REDO---------")
    for(let a = 0; a < 10; a++) {
       console.log(redoHistory[a])
    }
    */
}

///////////////////////////////////////UNDO / REDO UPLOAD///////////////////////////////

function undoUpload() {

    let partHistory = history[h].trim().split('*');

    //starts at 2 since created** has double stars
    for(let a = 1; a < partHistory.length; a++) {

        let n = Number(valueFinder(partHistory[a], "thumbno"));

        if(!isNaN(n) || n != null) {
            deleteAllThumbs(n)
        } 
        
    }

    if (h > 0) {
        redoHistory[rh] = history[h];
        history[h] = null;
        h--;
        rh++;
    }
    else {
        h = 1;
    }
    
    swapPanels('canvas');

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

function redoUpload() {

    checkMaxHistory();
    history[h] = redoHistory[rh-1];
    redoHistory[rh-1] = null;
    (rh > 0) ? rh--: rh=0;

    let partHistory = history[h].trim().split('*');
    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');
    let configScroll = document.getElementsByClassName('configScroll');

    for(let a = 1; a < partHistory.length; a++) {

        let tempThumb = document.createElement('div');

        let n = Number(valueFinder(partHistory[a], "thumbno"));
        let f = Number(valueFinder(partHistory[a], "ref"));
        dataThumb[n] = '*' + partHistory[a];
        
        //////////////////////RESTORE THUMBS////////////////////

        for(let b = 0; b < restoreThumb.length; b++) {
            
            if(restoreThumb[b] != null) {

                if(restoreThumb[b].includes(`thumbno="${n}"`)) {

                    tempThumb.innerHTML = restoreThumb[n];

                    configScroll[2].children[0].children[0].appendChild(tempThumb.children[0])
                    
                    restoreThumb[n] = null;
                    tempThumb = null;
                }
            } 
        }

         ////////////////////REARRANGE PNLBOXTHUMBS////////////////////
         for(let b = pnlBoxThumb.length + 1; b >= 0; b--) {
            if(pnlBoxThumb[b] != null) {

                if(b > 0) {
                    let current = Number(pnlBoxThumb[b].dataset.thumbno);
                    let before = Number(pnlBoxThumb[b-1].dataset.thumbno);

                    if(current > before) {
                        configScroll[2].children[0].children[0].insertBefore(pnlBoxThumb[b], pnlBoxThumb[b-1]);
                    }
                }
                else {
                    configScroll[2].children[0].children[0].prepend(pnlBoxThumb[b]);
                } 

                //////////////////READDING FUNCTIONS/////////////

                pnlBoxThumb[b].removeEventListener('dblclick', dblClickThumb)
                pnlBoxThumb[b].removeEventListener('pointerover', pointerOverThumb);
                pnlBoxThumb[b].removeEventListener('pointerleave', pointerLeaveThumb);

                pnlBoxThumb[b].addEventListener('dblclick', dblClickThumb)
                pnlBoxThumb[b].addEventListener('pointerover', pointerOverThumb);
                pnlBoxThumb[b].addEventListener('pointerleave', pointerLeaveThumb);

                pnlBoxThumb[b].style.borderColor = "transparent";
                pnlBoxThumb[b].style.backgroundColor = "transparent";
                pnlBoxThumb[b].style.borderWidth = "1px";
   
            }
        }

        let type = f2Panel(f).dataset.type; 
        swapPanels(type);
    }
}

///////////////////////////////////////UNDO / REDO STACKING///////////////////////////////

function undoStacking() {
    
    let partStacking = history[h].split('*');
    let prevStack = partStacking[0];
    let ref = prevStack.split(' ');
    let cnvPin = document.getElementById('cnvPin');
    let configScroll = document.getElementsByClassName('configScroll');
    let cnvGrpLayers = document.getElementById('cnvGrpLayers');
    
    for(let a = 1; a < ref.length; a++) {

        if(ref[a] != '') {
            let panel = configScroll[5].querySelector(`[data-ref="${ref[a]}"]`)
            configScroll[5].appendChild(panel)

            let canvas = cnvGrpLayers.querySelector(`[data-ref="${ref[a]}"]`);
            cnvGrpLayers.prepend(canvas);

            let pin = cnvPin.querySelector(`[data-ref="${ref[a]}"]`);
            cnvPin.prepend(pin);

            swapPanels(panel.dataset.type);
        }

    }
    

    if (h > 0) {
        redoHistory[rh] = history[h];
        history[h] = null;
        h--;
        rh++;
    }
    else {
        h = 1;
    }
}

function redoStacking() {

    checkMaxHistory();
    history[h] = redoHistory[rh-1];
    redoHistory[rh-1] = null;
    (rh > 0) ? rh--: rh=0;

    let partStacking = history[h].split('*');
    let prevStack = partStacking[1];
    let ref = prevStack.split(' ');
    let cnvPin = document.getElementById('cnvPin');
    let configScroll = document.getElementsByClassName('configScroll');
    let cnvGrpLayers = document.getElementById('cnvGrpLayers');

    for(let a = 1; a < ref.length; a++) {

        if(ref[a] != '') {
            let panel = configScroll[5].querySelector(`[data-ref="${ref[a]}"]`)
            configScroll[5].appendChild(panel)

            let canvas = cnvGrpLayers.querySelector(`[data-ref="${ref[a]}"]`);
            cnvGrpLayers.prepend(canvas);

            let pin = cnvPin.querySelector(`[data-ref="${ref[a]}"]`);
            cnvPin.prepend(pin);

            swapPanels(panel.dataset.type);
        }

    }
    
    rearrangeCanvasLayers();

}

///////////////////////////////////////UNDO / REDO RENAMING///////////////////////////////
function undoRenaming() {

    let part = history[h].split('*');
    let data = part[1].split('\n');
    let configScroll = document.getElementsByClassName('configScroll');

    let f = valueFinder(data[1], 'ref');
    let category = data[2].split(': ')[0];
    let oldTxtHeader = data[3].split(': ')[1];

    let panel = configScroll[5].querySelector(`[data-ref="${f}"]`);

    panel.querySelector('.txtHeader').value = oldTxtHeader;

    /////////////////ENCODE ALL REF DATA TOO///////////////
    if(category == "pnlBoxPattern") {
        dataSwitcher(dataPattern, f, category, oldTxtHeader);
    }
    else {
        dataSwitcher(dataLayer, f, category, oldTxtHeader)
    }

    swapPanels(panel.dataset.type);
    
    if (h > 0) {
        redoHistory[rh] = history[h];
        history[h] = null;
        h--;
        rh++;
    }
    else {
        h = 1;
    }

}

function redoRenaming() {

    checkMaxHistory();
    history[h] = redoHistory[rh-1];
    redoHistory[rh-1] = null;
    (rh > 0) ? rh--: rh=0;

    let part = history[h].split('*');
    let data = part[1].split('\n');
    let configScroll = document.getElementsByClassName('configScroll');

    let f = valueFinder(data[1], 'ref');
    let category = data[2].split(': ')[0];
    let newTxtHeader = data[2].split(': ')[1];

    let panel = configScroll[5].querySelector(`[data-ref="${f}"]`);
    panel.querySelector('.txtHeader').value = newTxtHeader;

    /////////////////ENCODE ALL REF DATA TOO///////////////
    if(category == "pnlBoxPattern") {
        dataSwitcher(dataPattern, f, category, newTxtHeader);
    }
    else {
        dataSwitcher(dataLayer, f, category, newTxtHeader)
    }

    swapPanels(panel.dataset.type)

}

///////////////////////////////UNDO / REDO EDITING FOR EDITING TEXT///////////////////////////

function undoEditing() {
    
    let part = history[h].split('*');

    for(let a = 1; a < part.length; a++) {

        if(part[a] != null && part[a].trim().length > 0) {

            let data = part[a].split('_');

            let width = valueFinder(data[1], 'txtWidthLayer');
            let height = valueFinder(data[1], 'txtHeightLayer');
            let x = valueFinder(data[1], 'txtXLayer');
            let y = valueFinder(data[1], 'txtYLayer');
            let innerText = valueFinder(data[1], 'innerText');
        
            let f = valueFinder(data[0], 'ref');
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);

            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            canvas.style.left = x + 'px';
            canvas.style.top = y + 'px';

            canvas.children[0].innerText = innerText;

            inputFormatResizeBox(f);
        }
    }
    
    if (h > 0) {
        redoHistory[rh] = history[h];
        history[h] = null;
        h--;
        rh++;
    }
    else {
        h = 1;
    }
}

function redoEditing() {

    checkMaxHistory();
    history[h] = redoHistory[rh-1];
    redoHistory[rh-1] = null;
    (rh > 0) ? rh--: rh=0;

    let part = history[h].split('*');

    for(let a = 1; a < part.length; a++) {

        if(part[a] != null && part[a].trim().length > 0) {

            let data = part[a].split('_');

            let width = valueFinder(data[0], 'txtWidthLayer');
            let height = valueFinder(data[0], 'txtHeightLayer');
            let x = valueFinder(data[0], 'txtXLayer');
            let y = valueFinder(data[0], 'txtYLayer');
            let innerText = valueFinder(data[0], 'innerText');
        
            let f = valueFinder(data[0], 'ref');
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);

            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            canvas.style.left = x + 'px';
            canvas.style.top = y + 'px';

            canvas.children[0].innerText = innerText;

            inputFormatResizeBox(f);

            /*
            canvas.children[0].style.whiteSpace = "normal";

            canvas.children[0].style.width = canvas.clientWidth + 'px';
            canvas.children[0].style.height = 1 + 'px';
            canvas.children[0].style.height = canvas.children[0].scrollHeight + 'px';
                            
            if(canvas.children[0].clientHeight * z > canvas.clientHeight * z && currVertiAlignment == "Middle") {
                let val = canvas.children[0].clientHeight * z - canvas.clientHeight * z;
                canvas.children[0].style.position = "absolute";
                canvas.children[0].style.top = 0 - val + 'px';
            }
            else if(canvas.children[0].clientHeight * z > canvas.clientHeight * z && currVertiAlignment == "Bottom") {
                let val = canvas.children[0].clientHeight * z - canvas.clientHeight * z;
                canvas.children[0].style.position = "absolute";
                canvas.children[0].style.top = 0 - val * 2 + 'px';
            }
            else {
                canvas.children[0].style.position = "static"; // need return to static for margin auto
            }

            var panel = document.getElementById('pnlBoxText');
            panel.querySelector('.btnFixedSize').children[0].style.filter = "saturate(0) brightness(2)";
            panel.querySelector('.btnAutoWidth').children[0].style.filter = "none";
            panel.querySelector('.btnAutoHeight').children[0].style.filter = "none";
            
            currResizeBox = "FixedSize";

            panel.querySelector('.selTextResize').dataset.value = currResizeBox;

            adjustBorder();
            */
        }
    }
}

function readdPanelEvents() {

    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');

    for(let a = 0; a < pnlBoxLayer.length; a++) {

        pnlBoxLayer[a].querySelector('.txtHeader').removeEventListener('keypress', validateTxtHeader);
        pnlBoxLayer[a].querySelector('.txtHeader').removeEventListener('dblclick', renameTxtHeader);
        pnlBoxLayer[a].querySelector('.txtHeader').removeEventListener('change', saveTxtHeader);
        pnlBoxLayer[a].querySelector('.txtHeader').removeEventListener('click', blurTxtHeader);
        pnlBoxLayer[a].querySelector('.txtHeader').removeEventListener('focusout', saveTxtHeader);

        //add the show and hide control
        pnlBoxLayer[a].querySelector('.btnShowHide').removeEventListener('click', showHideLayers);

        pnlBoxLayer[a].querySelector('.txtHeader').addEventListener('keypress', validateTxtHeader);
        pnlBoxLayer[a].querySelector('.txtHeader').addEventListener('dblclick', renameTxtHeader);
        pnlBoxLayer[a].querySelector('.txtHeader').addEventListener('change', saveTxtHeader);
        pnlBoxLayer[a].querySelector('.txtHeader').addEventListener('click', blurTxtHeader);
        pnlBoxLayer[a].querySelector('.txtHeader').addEventListener('focusout', saveTxtHeader);

        //add the show and hide control
        pnlBoxLayer[a].querySelector('.btnShowHide').addEventListener('click', showHideLayers);
    }
    
}

///////////////////////////////UNDO / REDO EDITING FOR SELECT ALL///////////////////////////

function undoSelectAll() {

    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');

    for(let a = 0; a < pnlBoxLayer.length; a++) {
        panelUnfocus(pnlBoxLayer[a]);
    }

    multiSelect = false;
    selectedAll = false;
    resetLeadDrag();

    //transfer to redo
    if (h > 0) {
        redoHistory[rh] = history[h];
        history[h] = null;
        h--;
        rh++;
    }
    else {
        h = 1;
    }
}

function redoSelectAll() {

    let pnlBoxLayer = document.getElementsByClassName('pnlBoxLayer');

    for(let a = pnlBoxLayer.length-1; a >= 0; a--) {
        panel2Focus(pnlBoxLayer[a]);
    }

    //leadpanel should be the last
    leadPanel = pnlBoxLayer[pnlBoxLayer.length-1];
    leadDrag = cnvPin.querySelector(`[data-ref="${leadPanel.dataset.ref}"]`)
    swapPanels(leadPanel.dataset.type);
    checkMultiSelect();

    selectedAll = true;

    //transfer back to history
    checkMaxHistory();
    history[h] = redoHistory[rh-1];
    redoHistory[rh-1] = null;
    (rh > 0) ? rh--: rh=0;
}

function undo() {
    if(h > 0) {

        if(history[h].includes('Modified*')) {
            undoProperties();
        }
        else if(history[h].includes('Created*')) {
            undoCreate();  
        }
        else if(history[h].includes('Deleted*')) {
            undoDelete(); 
        }
        else if(history[h].includes('Uploaded*')) {
            undoUpload();
        }
        else if(history[h].includes('Stacked:')) {
            undoStacking();
        }
        else if(history[h].includes('Renamed*')) {
            undoRenaming();
        }
        else if(history[h].includes('Edited*')) {
            undoEditing();
        }
        else if(history[h].includes('Select All*')) {
            undoSelectAll();
        }
    }
}

function redo() {
    //limit the redo
    if(h > 0 || rh > 0) {

        if(redoHistory[rh-1] != null || !isNaN(redoHistory[rh-1])) {
            //rh-1 since rh is ++ every after undo
            //so rh-1 will get the latest rh with value
            if(redoHistory[rh-1].includes('Modified*')) {
                redoProperties();
            }
            else if(redoHistory[rh-1].includes('Created*')) {
                redoCreate();
            }
            else if(redoHistory[rh-1].includes('Deleted*')) {
                redoDelete();
            }
            else if(redoHistory[rh-1].includes('Uploaded*')) {                      
                redoUpload();
            }
            else if(redoHistory[rh-1].includes('Stacked:')) {
                redoStacking();
            }
            else if(redoHistory[rh-1].includes('Renamed*')) {
                redoRenaming();
            }
            else if(redoHistory[rh-1].includes('Edited*')) {
                redoEditing();
            }
            else if(redoHistory[rh-1].includes('Select All*')) {
                redoSelectAll();
            }
        }  

    } 
}
