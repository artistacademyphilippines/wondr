var fontSelected = "Stylish";
var currFontSize = 48; 
var currFontColor = "#949EFF";
var currLetterSpacing = 0;
var currLineHeight = "Auto";
var currCase = "None";
var currResizeBox = "AutoWidth";
var currHoriAlignment = "Left";
var currVertiAlignment = "Top"
var currTextDecor = "NoDecor";

//=================RESIZE TABSLIDER AND TABFONTCATEGORY================

function resizeContent() {
    tabFontCategory.style.height = tabFontCategory.parentElement.clientHeight + 'px';
    tabSliderFont.style.height = tabSliderFont.parentElement.clientHeight + 'px';
}
resizeContent();

//=================SEARCH ALL FONTS===============

function searchAllFonts() {
    
    this.nextElementSibling.style.visibility = "visible"
    
    if(this.value.length >= 3) {

        //open the dropoption
        this.closest('.pnlDropHeader').children[1].style.display = "block";

        var searchFound = false;
        //remove all results first
        menuText.querySelector('.dropOptionHeader').innerHTML = "";

        //search each serif for tags
        for(var a = 0; a < serif.length; a++) {
           
            if(serif[a].name.toLowerCase().includes(this.value) || this.value.includes(serif[a].name.toLowerCase()) || serif[a].tags.includes(this.value) || this.value.includes(serif[a].tags)) {

                
                    document.head.insertAdjacentHTML('beforeend', serif[a].source);
                    menuText.querySelector('.dropOptionHeader').innerHTML +=
                    `<div class="optFonts" data-font="${serif[a].name}" data-class="${serif[a].class}" style="font-family: ${serif[a].name};">${serif[a].name}</div>`
                
                
                searchFound = true;

                for(var b=0; b < optFonts.length; b++) {
                    
                    optFonts[b].addEventListener('click', function() {
                        createPnlBoxText(this);
                        
                    });
                }
            }
        }

        //search each sans serif for tags
        for(var a = 0; a < sansSerif.length; a++) {
           
            if(sansSerif[a].name.toLowerCase().includes(this.value) || this.value.includes(sansSerif[a].name.toLowerCase()) || sansSerif[a].tags.includes(this.value) || this.value.includes(sansSerif[a].tags)) {
                
                if(document.head.querySelector(`[href *= '${sansSerif[a].name}']`) == null) {
                    document.head.insertAdjacentHTML('beforeend', sansSerif[a].source);
                    menuText.querySelector('.dropOptionHeader').innerHTML +=
                    `<div class="optFonts" data-font="${sansSerif[a].name}" data-class="${sansSerif[a].class}" style="font-family: ${sansSerif[a].name};">${sansSerif[a].name}</div>`
                }
                else {  
                    menuText.querySelector('.dropOptionHeader').innerHTML +=
                    `<div class="optFonts" data-font="${sansSerif[a].name}" data-class="${sansSerif[a].class}" style="font-family: ${sansSerif[a].name};">${sansSerif[a].name}</div>`
                }

                searchFound = true;

                for(var b=0; b < optFonts.length; b++) {
                    
                    optFonts[b].addEventListener('click', function() {
                        createPnlBoxText(this);
                        
                    });
                }
            }
        }

        //search each stylish for tags
        for(var a = 0; a < stylish.length; a++) {
            
            if(stylish[a].name.toLowerCase().includes(this.value) || this.value.includes(stylish[a].name.toLowerCase()) || stylish[a].tags.includes(this.value) || this.value.includes(stylish[a].tags)) {

                //check first if the font is loaded
                var fontFace = new FontFace(`${stylish[a].name}`, `url(${stylish[a].source})`,);
                //add first the font to the document
                document.fonts.add(fontFace);
                
                fontFace.loaded.then(
                menuText.querySelector('.dropOptionHeader').innerHTML +=
                `<div class="optFonts" data-font="${stylish[a].name}" data-class="${stylish[a].class}" style="font-family: ${stylish[a].name};">${stylish[a].name}</div>`
                )

                searchFound = true;

                for(var b=0; b < optFonts.length; b++) {
                    
                    optFonts[b].addEventListener('click', function() {
                        createPnlBoxText(this);
                        
                    });
                }
            }
        }

        if(!searchFound) {
            menuText.querySelector('.dropOptionHeader').innerHTML = 
            `<div class="optResults">No results found</div>`;
        }
    }
    else {
        hideAllOptions();

    }

    if(this.value == "") {
        this.nextElementSibling.style.visibility = "hidden"
    }
    
}
//document.getElementById('txtSearchText').addEventListener('input', searchAllFonts)

menuText.querySelector('.txtSearch').addEventListener('input', function() {

    if(this.value.trim().length >= 3) {
        
        searchFontSuggestions(this, this.value);
    }
    else {

        this.parentElement.nextElementSibling.style.display = "none";
    }

    if(this.value.trim().length == 0) {
        menuText.querySelector('.btnDelSearch').style.visibility = "hidden";
    }
    else {
        menuText.querySelector('.btnDelSearch').style.visibility = "visible";
    }
})

//ENTER OR CHANGE EVENT
menuText.querySelector('.txtSearch').addEventListener('keydown', function(e) {
    if(e.key == 'Enter') {
        e.preventDefault();
        this.click();
        searchPreviewOrCategory.call(this)
    }
})

////////////////////////////////////DELETE SEARCH PATTERN/////////////////////////
menuText.querySelector('.btnDelSearch').addEventListener('click', function() {
    this.style.visibility = "hidden";
    this.previousElementSibling.value = "";
    this.dispatchEvent(new Event('change'));
})

async function resetStylish() {

    let append = "";
    let configScroll = document.getElementsByClassName('configScroll')[4];
    let tabStylish = configScroll.querySelector('#tabStylish');
    let maxEntries = Math.round(configScroll.clientHeight / 66) + 1; //50px for wrapFonts + 1em margin

    await showFontFillers(configScroll, tabStylish);
    
    let wrapFonts = tabStylish.querySelectorAll('.wrapFonts');

    let stylish = await fetchLimitedFonts('stylish', 0, maxEntries-1).then((data) => {return data})
    
    for(let a = 0; a < stylish.length; a++) {

        if(stylish[a] != null) {

            let fontCase = "";

            document.head.insertAdjacentHTML('beforeend', stylish[a].source)

            if(stylish[a].tags.includes('cursive')) {
                append += `<h2 style="font-family: '${stylish[a].name}'; font-size: 130%; font-weight: 400; font-style:'normal'; font-display: swap; text-transform: capitalize;">${stylish[a].name}</h2>`
                fontCase = "capitalize";
            }
            else {
                append += `<h2 style="font-family: '${stylish[a].name}'; font-weight: 400; font-style:'normal'; font-display: swap;">${stylish[a].name.toUpperCase()}</h2>`
                fontCase = "upper";
            }
        
        wrapFonts[a].dataset.font = stylish[a].name;
        wrapFonts[a].dataset.class = stylish[a].class;
        wrapFonts[a].dataset.case = fontCase;
        wrapFonts[a].dataset.thumbno = a;

        wrapFonts[a].innerHTML = append;

        append = "";

        await checkLoadedFonts(wrapFonts[a]);
        
        }
    }
    
    removeEmptyFontFillers(tabStylish);

}
resetStylish();

async function resetSansSerif() {

    let append = "";
    let configScroll = document.getElementsByClassName('configScroll')[4];
    let maxEntries = Math.round(configScroll.clientHeight / 66) + 1; //50px for wrapFonts + 1em margin
    let tabSansSerif = configScroll.querySelector('#tabSansSerif');

    await showFontFillers(configScroll, tabSansSerif);

    let wrapFonts = tabSansSerif.querySelectorAll('.wrapFonts');

    let sansSerif = await fetchLimitedFonts('sans_serif', 0, maxEntries-1).then((data) => {return data})

    for(let a = 0; a < sansSerif.length; a++) {

        if(wrapFonts[a] != null) {

            document.head.insertAdjacentHTML('beforeend', sansSerif[a].source)
            append += `<h2 style="font-family: '${sansSerif[a].name}'; font-weight: 400; font-style:'normal'; font-display: swap;">${sansSerif[a].name.toUpperCase()}</h2>`
            fontCase = "upper";

            wrapFonts[a].dataset.font = sansSerif[a].name;
            wrapFonts[a].dataset.class = sansSerif[a].class;
            wrapFonts[a].dataset.case = fontCase;

            wrapFonts[a].innerHTML = append;

            append = "";

            await checkLoadedFonts(wrapFonts[a]);
        }
    }

    removeEmptyFontFillers(tabSansSerif);
}
resetSansSerif();

async function resetSerif() {

    let append = "";
    let configScroll = document.getElementsByClassName('configScroll')[4];
    let maxEntries = Math.round(configScroll.clientHeight / 66) + 1; //50px for wrapFonts + 1em margin
    let tabSerif = configScroll.querySelector('#tabSerif');

    await showFontFillers(configScroll, tabSerif);

    let wrapFonts = tabSerif.querySelectorAll('.wrapFonts');

    let serif = await fetchLimitedFonts('serif', 0, maxEntries-1).then((data) => {return data})

    for(var a = 0; a < serif.length; a++) {

        if(wrapFonts[a] != null) {

            document.head.insertAdjacentHTML('beforeend', serif[a].source)
            append += `<h2 style="font-family: '${serif[a].name}'; font-weight: 400; font-style:'normal'; font-display: swap;">${serif[a].name.toUpperCase()}</h2>`
            fontCase = "upper";

            wrapFonts[a].dataset.font = serif[a].name;
            wrapFonts[a].dataset.class = serif[a].class;
            wrapFonts[a].dataset.case = fontCase;

            wrapFonts[a].innerHTML = append;

            append = "";

            await checkLoadedFonts(wrapFonts[a]);
        }
    }

    removeEmptyFontFillers(tabSerif);
}
resetSerif();

//----------START SELECTING FONT TAB-----------------

function fontSelectClick() {

    let fontSelect = document.getElementsByClassName('fontSelect');

    for(var a = 0; a < fontSelect.length; a++) {

        fontSelect[a].removeEventListener('mouseover', fontSelectHover);
        fontSelect[a].removeEventListener('mouseleave', fontSelectLeave);
        fontSelect[a].removeEventListener('click', fontSelectClick);

        fontSelect[a].addEventListener('mouseover', fontSelectHover);
        fontSelect[a].addEventListener('mouseleave', fontSelectLeave);
        fontSelect[a].addEventListener('click', fontSelectClick);
   
        fontSelect[a].style.backgroundColor = "transparent";
        //fontSelect[a].style.border = "1px solid #363F52";
        fontSelect[a].children[0].style.filter = "none";
    }

    //this.style.border = "1px solid #647499";
    this.style.backgroundColor = "#6885CC";
    this.children[0].style.filter = "brightness(200)";
    this.removeEventListener('mouseleave', fontSelectLeave);

    if(this.id.includes('Stylish')) {

        breaklineThumbFonts.style.width = "33%";
        tabSansSerif.style.overflowY = "hidden";
        tabSerif.style.overflowY = "hidden";

        var timeOut = setTimeout(function() {
            tabStylish.style.overflowY = "auto";
            clearTimeout(timeOut);
        }, 200);

        breaklineThumbFonts.style.translate = "0%";
        tabSliderFont.style.translate = "0%";

    }
    else if(this.id.includes('SansSerif')) {

        breaklineThumbFonts.style.width = "33%";
        tabStylish.style.overflowY = "hidden";
        tabSerif.style.overflowY = "hidden";

        var timeOut = setTimeout(function() {
            tabSansSerif.style.overflowY = "auto";
            clearTimeout(timeOut);
        }, 200);

        breaklineThumbFonts.style.translate = "100%"
        tabSliderFont.style.translate = "-100%";

    }
    else if(this.id.includes('Serif')) {

        breaklineThumbFonts.style.width = "33%";
        tabStylish.style.overflowY = "hidden";
        tabSansSerif.style.overflowY = "hidden";
       
        var timeOut = setTimeout(function() {
            tabSerif.style.overflowY = "auto";
            clearTimeout(timeOut);
        }, 200);

        breaklineThumbFonts.style.translate = "200%";
        tabSliderFont.style.translate = "-200%";

    }
}

function fontSelectHover() {
    if(fontSelected != this.children[0].innerText) {
        this.children[0].style.filter = "brightness(200)";
    }
}

function fontSelectLeave() {
    if(fontSelected != this.children[0].innerText) {
        this.children[0].style.filter = "none";
    }
}

for(var a = 0; a < document.getElementsByClassName('fontSelect').length; a++) {
    document.getElementsByClassName('fontSelect')[a].addEventListener('mouseover', fontSelectHover);
    document.getElementsByClassName('fontSelect')[a].addEventListener('mouseleave', fontSelectLeave);
    document.getElementsByClassName('fontSelect')[a].addEventListener('click', fontSelectClick);
}

document.getElementsByClassName('fontSelect')[0].click();


///////////////////////////////LAZY LOAD ALL FONTS///////////////////////////

async function fontLazyLoad() {

    let font = "";
    
    
    if(this.id == 'tabStylish') {
        font = "stylish";
    }
    else if(this.id == 'tabSansSerif') {
        font = "sans_serif";
    }
    else if(this.id == 'tabSerif') {
        font = "serif";
    }

    //SCROLLING TO BOTTOM AND RELOADING FUTURE FONTS
    if(this.scrollTop == (this.scrollHeight - this.offsetHeight)) {

        //for stylish-----------------------------------
        let append = ""
        let maxEntries = 6;
        let i = Number(this.lastChild.dataset.thumbno);
        
        let dataLength = await fetchFontLength(font).then((data) => {return data.length});

        if(i < dataLength) {
            let remaining = dataLength - i;

            if(remaining > maxEntries) {
                await lazyFontFillers(this, maxEntries, "down");
            }
            else {
                await lazyFontFillers(this, remaining -1, "down");
            }
        }
        
        //let wrapFonts = this.querySelectorAll('.wrapFonts');
        let data = await fetchLimitedFonts(font, i + 1, i + maxEntries).then((data) => {return data});

        if(data.length > 0) {

            for(let a = 0; a < data.length; a++) {

                if(data[a] != null) {
    
                    let fontCase = "";
    
                    document.head.insertAdjacentHTML('beforeend', data[a].source)
                    if(data[a].tags.includes('cursive')) {
                        append += `<h2 style="font-family: '${data[a].name}'; font-size: 130%; font-weight: 400; font-style:'normal'; font-display: swap; text-transform: capitalize;">${data[a].name}</h2>`
                        fontCase = "capitalize";
                    }
                    else {
                        append += `<h2 style="font-family: '${data[a].name}'; font-weight: 400; font-style:'normal'; font-display: swap; text-transform: uppercase;">${data[a].name.toUpperCase()}</h2>`
                        fontCase = "upper";
                    }

                    let wrapFont = this.querySelector(`[data-thumbno='${data[a].index}']`);
                    
                    wrapFont.innerHTML = append;
                    wrapFont.dataset.font = data[a].name;
                    wrapFont.dataset.class = data[a].class;
                    wrapFont.dataset.case = fontCase;
                    wrapFont.dataset.thumbno = data[a].index;
            
                    append = "";
            
                    await checkLoadedFonts(wrapFont);
                    
                }
            }
            
            removeEmptyFontFillers(this);
            lazyDeleteUp.call(this);
        }
    }

    //SCROLLING TO TOP AND RELOADING PREVIOUS FONTS
    
    else if(this.scrollTop == 0) { 

        let append = ""
        let maxEntries = 6;
        let oldScrollH = this.scrollHeight;
        let i = Number(this.firstChild.dataset.thumbno);

        if(i >= maxEntries) {
            await lazyFontFillers(this, maxEntries, "up")
        }
        else {
            await lazyFontFillers(this, i, "up");
        }

        let newScrollH = this.scrollHeight;

        let diffScrollH = newScrollH - oldScrollH;

        let data = await fetchLimitedFonts(font, i-maxEntries, i).then((data) => {return data});
        
        if(data.length > 0) {

            for(let a = 0; a < data.length; a++) {

                if(data[a] != null) {
    
                    let fontCase = "";
    
                    document.head.insertAdjacentHTML('beforeend', data[a].source)
                    if(data[a].tags.includes('cursive')) {
                        append += `<h2 style="font-family: '${data[a].name}'; font-size: 130%; font-weight: 400; font-style:'normal'; font-display: swap; text-transform: capitalize;">${data[a].name}</h2>`
                        fontCase = "capitalize";
                    }
                    else {
                        append += `<h2 style="font-family: '${data[a].name}'; font-weight: 400; font-style:'normal'; font-display: swap; text-transform: uppercase;">${data[a].name.toUpperCase()}</h2>`
                        fontCase = "upper";
                    }
                    
                    let wrapFont = this.querySelector(`[data-thumbno='${data[a].index}']`);
                    wrapFont.innerHTML = append;
                    wrapFont.dataset.font = data[a].name;
                    wrapFont.dataset.class = data[a].class;
                    wrapFont.dataset.case = fontCase;
                    wrapFont.dataset.thumbno = data[a].index;
            
                    append = "";
                    
                    await checkLoadedFonts(wrapFont);
                    
                }
            }
            
            removeEmptyFontFillers(this);
            if(i > 0) this.scrollTop = 33;
            lazyDeleteDown.call(this);
            
        }
            
    }
        
}
tabStylish.addEventListener('scroll', fontLazyLoad);
tabSansSerif.addEventListener('scroll', fontLazyLoad);
tabSerif.addEventListener('scroll', fontLazyLoad);

//////////////////////////////LAZY REMOVE EXCESS FONTS///////////////////////
function lazyDeleteUp() {

    this.querySelectorAll('.wrapFonts').forEach((wrapFont) => {
        if(wrapFont.getBoundingClientRect().bottom < 0) {
    
            let font = wrapFont.dataset.font;
            let checkFont = cnvGrpLayers.querySelector(`[data-font="${font}"]`);

            if(checkFont) {
            
                if(wrapFont) {
                    wrapFont.remove();
                }
            }
            else {

                let newFontName = wrapFont.dataset.font.replace(/'/g, "").replace(/ /g, "+");
                let linkFont = document.head.querySelector(`head link[href*='${newFontName}']`);
                
                if(linkFont != null) {
                    linkFont.remove();
                } 
                if(wrapFont) {
                    wrapFont.remove();
                } 
            }
        }
    })
}

function lazyDeleteDown() {

    this.querySelectorAll('.wrapFonts').forEach((wrapFont) => {
        if(wrapFont.getBoundingClientRect().top > window.innerHeight) {
    
            let font = wrapFont.dataset.font;
            let checkFont = cnvGrpLayers.querySelector(`[data-font="${font}"]`);

            if(checkFont) {
            
                if(wrapFont) {
                    wrapFont.remove();
                }
            }
            else {

                let newFontName = wrapFont.dataset.font.replace(/'/g, "").replace(/ /g, "+");
                let linkFont = document.head.querySelector(`head link[href*='${newFontName}']`);
                
                if(linkFont != null) {
                    linkFont.remove();
                } 
                if(wrapFont) {
                    wrapFont.remove();
                } 
            }
        }
    })
}


//============================LAYER BLEND======================
//function already exist, just add event listeners
for(let b = 0; b < document.getElementById('pnlBoxText').querySelectorAll('.optLayerBlend').length; b++) {
    document.getElementById('pnlBoxText').querySelectorAll('.optLayerBlend')[b].addEventListener('click', chooseLayerBlend);
}

document.getElementById('pnlBoxText').querySelector('.txtWidthLayer').addEventListener('change', adjustLayerWidth);
document.getElementById('pnlBoxText').querySelector('.txtHeightLayer').addEventListener('change', adjustLayerHeight);

//=============================LAYER X / Y COORDINATES====================

document.getElementById('pnlBoxText').querySelector('.txtXLayer').addEventListener('change', adjustLayerX);
document.getElementById('pnlBoxText').querySelector('.txtYLayer').addEventListener('change', adjustLayerY);

//=============================FLIP X COORDINATES====================
document.getElementById('pnlBoxText').querySelector('.chkFlipX').addEventListener('click', adjustFlipX);

//=============================FLIP Y COORDINATES====================

document.getElementById('pnlBoxText').querySelector('.chkFlipY').addEventListener('click', adjustFlipY);

//==============================LAYER OPACITY========================

document.getElementById('pnlBoxText').querySelector('.txtOpacityLayer').addEventListener('change', chooseLayerOpacity);
document.getElementById('pnlBoxText').querySelector('.txtOpacityLayer').previousElementSibling.addEventListener('input', chooseLayerOpacity);

//==============================LAYER ROTATION========================

document.getElementById('pnlBoxText').querySelector('.txtRotationLayer').addEventListener('change', chooseLayerRotation);
document.getElementById('pnlBoxText').querySelector('.txtRotationLayer').previousElementSibling.addEventListener('input', chooseLayerRotation);

function adjustTextArea(f) {

    let z = rngZoom.value / 100;
    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)
    
    canvas.children[0].style.width = 1 + 'px';
    canvas.children[0].style.width = canvas.children[0].scrollWidth + 'px';
    canvas.children[0].style.height = 1 + 'px';
    canvas.children[0].style.height = canvas.children[0].scrollHeight + 'px';

    
    if(currResizeBox == "AutoWidth") {
        canvas.style.width = canvas.children[0].scrollWidth + 'px';
        canvas.style.height = canvas.children[0].scrollHeight + 'px';
    }
    else if(currResizeBox == "AutoHeight") {
        canvas.style.width = canvas.children[0].clientWidth + 'px';
        canvas.style.height = canvas.children[0].scrollHeight + 'px';
    }
    
    adjustBorder();

    //enable back cnvGrpLayers css
    cnvGrpLayers.style.boxSizing = "border-box";
    cnvGrpLayers.style.overflow = "hidden";
    
}

//==============================FONT WEIGHTS==========================

async function addFontWeights() {
  
    if(leadPanel != null) {

        let font = leadPanel.dataset.font;
        let clas = leadPanel.dataset.class;

        let append = ""

        if(clas == "serif") {

            let serif = await fetchFontByClass('serif', font).then((data) => {return data});

            let normal = serif[0].normal.split(', ');

            for(let b = 0; b < normal.length; b++) {
                append += `<div class="optTextWeight">${normal[b]}</div>`;
            }

            if(serif[0].italics != "") {
                append += `<div class="breaklineVerti"></div> `;

                let italics = serif[0].italics.split(', ');

                for(let b = 0; b < italics.length; b++) {
                    append += `<div class="optTextWeight">${italics[b]} Italic</div>`;
                }
            }
          
        }

        else if(clas == "sans serif") {

            let sansSerif = await fetchFontByClass('sans_serif', font).then((data) => {return data});
            
            let normal = sansSerif[0].normal.split(', ');
            
            for(var b = 0; b < normal.length; b++) {
                append += `<div class="optTextWeight">${normal[b]}</div>`;
            }

            if(sansSerif[0].italics != "") {
                append += `<div class="breaklineVerti"></div> `;

                let italics = sansSerif[0].italics.split(', ');

                for(let b = 0; b < italics.length; b++) {
                    append += `<div class="optTextWeight">${italics[b]} Italic</div>`;
                }
            }

        }

        else if(clas == "stylish") {

            let stylish = await fetchFontByClass('stylish', font).then((data) => {return data});

            let normal = stylish[0].normal.split(', ');

            for(let b = 0; b < normal.length; b++) {
                append += `<div class="optTextWeight">${normal[b]}</div>`;
            }

            if(stylish[0].italics != "") {
                append += `<div class="breaklineVerti"></div> `;

                let italics = stylish[0].italics.split(', ');

                for(let b = 0; b < italics.length; b++) {
                    append += `<div class="optTextWeight">${italics[b]} Italic</div>`;
                }
            }
        }

        
        var drop = document.getElementById('pnlBoxText').querySelectorAll('.dropOptionVerti');
        drop[1].innerHTML = append;
        
        drop[1].querySelectorAll('.optTextWeight').forEach((opt) => {
            opt.addEventListener('click', chooseTextWeight);
        })
            
    }
}


function chooseTextWeight() {
   
    //change dropoptionverti text
    let f = Number(leadPanel.dataset.ref);
    let panel = document.getElementById('pnlBoxText');

    let drop = panel.querySelectorAll('.dropdown');

    drop[1].children[0].innerText = this.innerText; 

    if(this.innerText.includes('Italic')) {

        if(cnvLayers[f].children[0].style.fontStyle != "italic") {
            cnvLayers[f].children[0].style.fontStyle = "italic";
        }
        
        let weight = this.innerText.replace(" Italic", "");

        if(cnvLayers[f].children[0].style.fontWeight != convertWeight(weight)) {
            cnvLayers[f].children[0].style.visibility = "hidden";
            cnvLayers[f].children[0].style.fontWeight = convertWeight(weight);

            setTimeout(function() {
                cnvLayers[f].children[0].style.visibility = "visible";
            }, 100); 
        }
        
    }

    else {

        if(cnvLayers[f].children[0].style.fontStyle != "normal") {
            cnvLayers[f].children[0].style.fontStyle = "normal";
        }

        let weight = this.innerText;

        if(cnvLayers[f].children[0].style.fontWeight != convertWeight(weight)) {
            cnvLayers[f].children[0].style.visibility = "hidden";
            cnvLayers[f].children[0].style.fontWeight = convertWeight(weight);

            setTimeout(function() {
                cnvLayers[f].children[0].style.visibility = "visible";
            }, 100); 
        }
    }

    if(currResizeBox == "AutoHeight" || currResizeBox == "AutoWidth") {
        adjustTextArea(f);
    }

    dataLayer[f] = valueSwitcher(dataLayer[f], 'dropdown 1', this.innerText);
}

function convertWeight(weight) {
   
    if(weight == "Thin") {
        return "100";
    }
    else if(weight == "Extra Light") {
        return "200";
    }
    else if(weight == "Light") {
        return "300";
    }
    else if(weight == "Regular") {
        return "400";
    }
    else if(weight == "Medium") {
        return "500";
    }
    else if(weight == "Semi Bold") {
        return "600";
    }
    else if(weight == "Bold") {
        return "700";
    }
    else if(weight == "Extra Bold") {
        return "800";
    }
    else if(weight == "Black") {
        return "900";
    }

}

function adjustTextSize() {

    currFontSize = this.value;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                canvas.children[0].style.fontSize = this.value + 'px';
            }

            adjustTextArea(f);
        }
    }

}
document.getElementById('pnlBoxText').querySelector('.txtResizeText').addEventListener('change', adjustTextSize);


function adjustTextColor() {

    //validate hex format
    testHexCode(this);
    currFontColor = this.value;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                
                canvas.children[0].style.color = '#' + this.value;
                this.nextElementSibling.style.backgroundColor = '#' + this.value;
            }
        }
    }

}
document.getElementById('pnlBoxText').querySelector('.txtTextColor').addEventListener('change',  adjustTextColor);
document.getElementById('pnlBoxText').querySelector('.txtTextColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustLetterSpacing() {
    
    let panel = document.getElementById('pnlBoxText');
    panel.querySelector('.txtLetterSpacing').value = this.value;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                canvas.children[0].style.letterSpacing = this.value + 'px';
                adjustTextArea(f);
            }
        }
    }

    currLetterSpacing = this.value;

}
document.getElementById('pnlBoxText').querySelector('.txtLetterSpacing').addEventListener('change', adjustLetterSpacing);

function adjustLineHeight() {

    let panel = document.getElementById('pnlBoxText');

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {

                if(Number.isInteger(Number(this.value)) && this.value !== null && this.value !== "" && this.value.trim() !== '') {

                    panel.querySelector('.txtLineHeight').value = this.value.trim();
                    canvas.children[0].style.lineHeight = this.value.trim() / 10;
                    currLineHeight = this.value.trim();
                }
            
                else {
            
                    panel.querySelector('.txtLineHeight').value = "Auto";
                    canvas.children[0].style.lineHeight = "normal";
                    currLineHeight = "normal";
                }
            }
        }
    }

}

function rollLineHeight(e) {

    let panel = document.getElementById('pnlBoxText');
    //start formatting
    if(e.key == "ArrowDown") {
        if(Number.isInteger(Number(this.value))) {
            if(this.value > 0) {
                this.value--;
            }
            else {
                this.value = "Auto";
                currLineHeight = "normal";
            }
        }
        else {

            this.value = "Auto";
            currLineHeight = "normal";

        }
    }

    else if(e.key == "ArrowUp") {
        if(Number.isInteger(Number(this.value))) {
            
            this.value++;
            currLineHeight = this.value /10;
            
        }
        else {

            this.value = 0;
            currLineHeight = this.value /10;

        }
    }

    else if(e.key == " ") {
        e.preventDefault();
    }

    else {
        return;
    }

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {

                if(Number.isInteger(Number(this.value))) {
                    canvas.children[0].style.lineHeight = this.value / 10;
                    panel.querySelector('.txtLineHeight').value = this.value;
                    currLineHeight = this.value /10;
                }
                
                else {
                    canvas.children[0].style.lineHeight = "normal";
                    panel.querySelector('.txtLineHeight').value = "Auto";
                    currLineHeight = "normal";
                }
            
                adjustTextArea(f);

            }
        }
    }

  
}

document.getElementById('pnlBoxText').querySelector('.txtLineHeight').addEventListener('keydown', rollLineHeight);
document.getElementById('pnlBoxText').querySelector('.txtLineHeight').addEventListener('change', adjustLineHeight);

function adjustNoneCase() {

    let panel = document.getElementById('pnlBoxText');
  
    //curr settings
    currCase = "None";
    panel.querySelector('.selTextCase').dataset.value = currCase;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {

                canvas.children[0].style.textTransform = "none";

                if(currResizeBox == "AutoHeight" || currResizeBox == "AutoWidth") {
                    adjustTextArea(f);
                }
            }
        }
    }
}
document.getElementById('pnlBoxText').querySelector('.btnNone').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnNone').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnNone').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnNone').addEventListener('click', adjustNoneCase);
document.getElementById('pnlBoxText').querySelector('.btnNone').children[0].style.filter = "saturate(0) brightness(2)";

function adjustUpperCase() {

    let panel = document.getElementById('pnlBoxText');

    //curr settings
    currCase = "UpperCase";
    panel.querySelector('.selTextCase').dataset.value = currCase;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {

                canvas.children[0].innerText = canvas.children[0].innerText.toUpperCase();
                canvas.children[0].style.textTransform = "uppercase";

                if(currResizeBox == "AutoHeight" || currResizeBox == "AutoWidth") {
                    adjustTextArea(f);
                }

            }
        }
    }
}
document.getElementById('pnlBoxText').querySelector('.btnUpperCase').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnUpperCase').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnUpperCase').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnUpperCase').addEventListener('click', adjustUpperCase);

function adjustLowerCase() {
    
    let panel = document.getElementById('pnlBoxText');

    //curr settings
    currCase = "LowerCase";
    panel.querySelector('.selTextCase').dataset.value = currCase;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {

                canvas.children[0].innerText = canvas.children[0].innerText.toLowerCase();
                canvas.children[0].style.textTransform = "lowercase";
            
                if(currResizeBox == "AutoHeight" || currResizeBox == "AutoWidth") {
                    adjustTextArea(f);
                }
            }
        }
    }

}
document.getElementById('pnlBoxText').querySelector('.btnLowerCase').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnLowerCase').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnLowerCase').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnLowerCase').addEventListener('click', adjustLowerCase);

function adjustAutoWidth() {
   
    let panel = document.getElementById('pnlBoxText');

    //curr settings
    currResizeBox = "AutoWidth";

    panel.querySelector('.selTextResize').dataset.value = currResizeBox;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;

            if(type == "text") {
                inputFormatResizeBox(f);
            }
        }
    }

    adjustBorder();
}
document.getElementById('pnlBoxText').querySelector('.btnAutoWidth').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnAutoWidth').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnAutoWidth').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnAutoWidth').addEventListener('click', adjustAutoWidth);
document.getElementById('pnlBoxText').querySelector('.btnAutoWidth').children[0].style.filter = "saturate(0) brightness(2)";

function adjustAutoHeight() {
    
    let panel = document.getElementById('pnlBoxText');

    //curr settings
    currResizeBox = "AutoHeight";
    panel.querySelector('.selTextResize').dataset.value = currResizeBox;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;

            if(type == "text") {
                inputFormatResizeBox(f);
            }
        }
    }

    adjustBorder();

}
document.getElementById('pnlBoxText').querySelector('.btnAutoHeight').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnAutoHeight').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnAutoHeight').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnAutoHeight').addEventListener('click', adjustAutoHeight);

function adjustFixedSize() {

    let panel = document.getElementById('pnlBoxText');

    //curr settings
    currResizeBox = "FixedSize";
    panel.querySelector('.selTextResize').dataset.value = currResizeBox;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;

            if(type == "text") {
                inputFormatResizeBox(f);
            }
        }
    }

    adjustBorder();
}

document.getElementById('pnlBoxText').querySelector('.btnFixedSize').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnFixedSize').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnFixedSize').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnFixedSize').addEventListener('click', adjustFixedSize);

function adjustAlignHori() {

    let panel = document.getElementById('pnlBoxText');
    let hori = this.className.replace('btnAlign', '');
    
    currHoriAlignment = hori;
    panel.querySelector('.selTextHori').dataset.value = 'Align' + hori;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                canvas.children[0].style.textAlign = hori;
                layerL[f] = canvas.offsetLeft;
            }
        }
    }

}
document.getElementById('pnlBoxText').querySelector('.btnAlignLeft').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnAlignLeft').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnAlignLeft').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnAlignLeft').children[0].style.filter = "saturate(0) brightness(2)";
document.getElementById('pnlBoxText').querySelector('.btnAlignLeft').addEventListener('click', adjustAlignHori);

document.getElementById('pnlBoxText').querySelector('.btnAlignCenter').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnAlignCenter').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnAlignCenter').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnAlignCenter').addEventListener('click', adjustAlignHori);

document.getElementById('pnlBoxText').querySelector('.btnAlignRight').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnAlignRight').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnAlignRight').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnAlignRight').addEventListener('click', adjustAlignHori);

function adjustAlignVerti() {
    
    let z = rngZoom.value/100;
    let panel = document.getElementById('pnlBoxText');
    let verti = this.className.replace('btnAlign', '');
    
    currVertiAlignment = verti;

    panel.querySelector('.selTextVerti').dataset.value = 'Align' + verti;
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {

                if(verti == "Top") {
                    canvas.children[0].style.position = "static";
                    canvas.children[0].style.marginTop = "0px";
                    canvas.children[0].style.marginBottom = "auto";
                }
            
                else if(verti == "Middle") {
                    canvas.children[0].style.marginTop = "auto";
                    canvas.children[0].style.marginBottom = "auto";
            
                    //align if overflowing
                    if(canvas.children[0].clientHeight * z > canvas.clientHeight * z) {
                        var val = canvas.children[0].clientHeight * z - canvas.clientHeight * z;
                        canvas.children[0].style.position = "absolute";
                        canvas.children[0].style.top = 0 - val + 'px';
                    }
                }
            
                else if(verti == "Bottom") {
                    canvas.children[0].style.marginTop = "auto";
                    canvas.children[0].style.marginBottom = "0px";
            
                    //align if overflowing
                    if(canvas.children[0].clientHeight * z > canvas.clientHeight * z) {
                        var val = canvas.children[0].clientHeight * z - canvas.clientHeight * z;
                        canvas.children[0].style.position = "absolute";
                        canvas.children[0].style.top = 0 - val * 2 + 'px';
                    }
                }
            }
        }
    }
}
document.getElementById('pnlBoxText').querySelector('.btnAlignTop').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnAlignTop').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnAlignTop').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnAlignTop').children[0].style.filter = "saturate(0) brightness(2)";
document.getElementById('pnlBoxText').querySelector('.btnAlignTop').addEventListener('click', adjustAlignVerti);

document.getElementById('pnlBoxText').querySelector('.btnAlignMiddle').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnAlignMiddle').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnAlignMiddle').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnAlignMiddle').addEventListener('click', adjustAlignVerti);

document.getElementById('pnlBoxText').querySelector('.btnAlignBottom').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnAlignBottom').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnAlignBottom').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnAlignBottom').addEventListener('click', adjustAlignVerti);

function adjustDecor() {
 
    let decor = this.className.replace('btn', '');
    let panel = document.getElementById('pnlBoxText');

    currTextDecor = decor;
    panel.querySelector('.selTextDecor').dataset.value = decor;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                if(decor == "NoDecor") {

                    canvas.children[0].style.textDecoration = "none";
                }
            
                else if(decor == "Underline") {
            
                    canvas.children[0].style.textDecoration = "underline";
                }
            
                else if(decor == "Strike") {
            
                    canvas.children[0].style.textDecoration = "line-through";
                }
            }
        }
    }

}

document.getElementById('pnlBoxText').querySelector('.btnNoDecor').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnNoDecor').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnNoDecor').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnNoDecor').children[0].style.filter = "saturate(0) brightness(2)";
document.getElementById('pnlBoxText').querySelector('.btnNoDecor').addEventListener('click', adjustDecor);

document.getElementById('pnlBoxText').querySelector('.btnUnderline').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnUnderline').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnUnderline').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnUnderline').addEventListener('click', adjustDecor);

document.getElementById('pnlBoxText').querySelector('.btnStrike').addEventListener('click', btnOptionClick);
document.getElementById('pnlBoxText').querySelector('.btnStrike').addEventListener('mouseover', btnOptionHover);
document.getElementById('pnlBoxText').querySelector('.btnStrike').addEventListener('mouseleave', btnOptionLeave);
document.getElementById('pnlBoxText').querySelector('.btnStrike').addEventListener('click', adjustDecor);


for(var b = 0; b < document.getElementById('pnlBoxText').querySelectorAll('.optLayerStyle').length; b++) {
    document.getElementById('pnlBoxText').querySelectorAll('.optLayerStyle')[b].addEventListener('click', chooseTextStyle);
    if(b == 3) {
        document.getElementById('pnlBoxText').querySelectorAll('.optLayerStyle')[b].style.color = "salmon";
        document.getElementById('pnlBoxText').querySelectorAll('.optLayerStyle')[b].addEventListener('mouseover', hoverLayerStyle)
        document.getElementById('pnlBoxText').querySelectorAll('.optLayerStyle')[b].addEventListener('mouseout', outLayerStyle)
    }
}

//===========================REMOVE ALL TEXT STYLE======================
function removeTextStyle() {
 
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {

                canvas.children[0].style.webkitTextStroke = "";
                canvas.children[0].style.textShadow = "none";
            }
        }
    }

}
//======================================================================

function chooseTextStyle() {

    let f = Number(leadPanel.dataset.ref);
    let panel = document.getElementById('pnlBoxText');
    let drop = panel.querySelectorAll('.dropdown');
    drop[2].children[0].innerText = this.innerText;
    
    if(this.innerText == "Outline") {
        panel.querySelector('.tabOutlineLayer').style.display = "block";
        panel.querySelector('.tabGlowLayer').style.display = "none";
        panel.querySelector('.tabShadowLayer').style.display = "none";
        showTextOutline(panel.querySelector('.txtOutlineColor'));
        
    }
    else if(this.innerText == "Glow") {
        panel.querySelector('.tabGlowLayer').style.display = "block";
        panel.querySelector('.tabOutlineLayer').style.display = "none";
        panel.querySelector('.tabShadowLayer').style.display = "none";
        showTextGlow(panel.querySelector('.txtGlowColor'));
    }
    else if(this.innerText == "Shadow") {

        panel.querySelector('.tabShadowLayer').style.display = "block";
        panel.querySelector('.tabOutlineLayer').style.display = "none";
        panel.querySelector('.tabGlowLayer').style.display = "none";
        showTextShadow(panel.querySelector('.txtShadowColor'));
    }
    else {

        panel.querySelector('.tabShadowLayer').style.display = "none";
        panel.querySelector('.tabOutlineLayer').style.display = "none";
        panel.querySelector('.tabGlowLayer').style.display = "none";
        panel.querySelector('.tabStyleBox').querySelector('.dropdown').children[0].innerText = "Choose style";
        removeTextStyle();

    }  

}

function showTextOutline(me) {

    let panel = document.getElementById('pnlBoxText');

    var size = Number(panel.querySelector('.txtOutlineSize').value);
    var opacity = panel.querySelector('.txtOutlineOpacity').value / 100;

    txtHexValue.value = panel.querySelector('.txtOutlineColor').value;
    convertHexToRGB(me);
  
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                //remove other styles first
                canvas.children[0].style.textShadow = "none";
                canvas.children[0].style.webkitTextStroke = `${size}px  rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
            }
        }
    }

    adjustBorder();

}

function adjustTextOutlineColor() {

    let panel = document.getElementById('pnlBoxText');
    let color = panel.querySelector('.txtOutlineColor').value;
    let size = panel.querySelector('.txtOutlineSize').value * 2;
    let opacity = panel.querySelector('.txtOutlineOpacity').value / 100;

    txtHexValue.value = color;
    convertHexToRGB(this);

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                
                canvas.children[0].style.webkitTextStroke = `${size}px  rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
            }
        }
    }


}
document.getElementById('pnlBoxText').querySelector('.txtOutlineColor').addEventListener('change', adjustTextOutlineColor);
document.getElementById('pnlBoxText').querySelector('.txtOutlineColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustTextOutline() {

    let panel = document.getElementById('pnlBoxText');
    let color = panel.querySelector('.txtOutlineColor').value;
    let size = panel.querySelector('.txtOutlineSize').value * 2;
    let opacity = panel.querySelector('.txtOutlineOpacity').value / 100;

    txtHexValue.value = color;
    convertHexToRGB(panel.querySelector('.txtOutlineColor'));

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                canvas.children[0].style.webkitTextStroke = `${size}px  rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
            }
        }
    }

    adjustBorder();
  
}
document.getElementById('pnlBoxText').querySelector('.txtOutlineOpacity').addEventListener('change', adjustTextOutline);
document.getElementById('pnlBoxText').querySelector('.txtOutlineOpacity').previousElementSibling.addEventListener('input', adjustTextOutline);

document.getElementById('pnlBoxText').querySelector('.txtOutlineSize').addEventListener('change', adjustTextOutline);
document.getElementById('pnlBoxText').querySelector('.txtOutlineSize').previousElementSibling.addEventListener('input', adjustTextOutline);

function showTextGlow(me) {
    
    let panel = document.getElementById('pnlBoxText');

    var spread = panel.querySelector('.txtGlowSpread').value * .12;
    var opacity = panel.querySelector('.txtGlowOpacity').value / 100;

    txtHexValue.value = panel.querySelector('.txtGlowColor').value;
    convertHexToRGB(me);

    for(let a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null) {

            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {

                canvas.children[0].style.webkitTextStroke = "";

                layerW[f] = canvas.clientWidth;
                layerL[f] = canvas.offsetLeft;

                    //expand as per glow spread
                canvas.children[0].style.textShadow = `0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
            }
        }
    }

    adjustBorder();
}

function adjustTextGlowColor() {

    let panel = document.getElementById('pnlBoxText');
    let color = panel.querySelector('.txtGlowColor').value;
    let spread = panel.querySelector('.txtGlowSpread').value * .1;
    let opacity = panel.querySelector('.txtGlowOpacity').value / 100;

    txtHexValue.value = color;
    convertHexToRGB(this);

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                canvas.children[0].style.textShadow = `0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`
            }
        }
    }
                                            
}

document.getElementById('pnlBoxText').querySelector('.txtGlowColor').addEventListener('change', adjustTextGlowColor);
document.getElementById('pnlBoxText').querySelector('.txtGlowColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustTextGlow() {

    let panel = document.getElementById('pnlBoxText');
    var color = panel.querySelector('.txtGlowColor').value;
    var spread = panel.querySelector('.txtGlowSpread').value * .12;
    var opacity = panel.querySelector('.txtGlowOpacity').value / 100;

    txtHexValue.value = color;
    convertHexToRGB(panel.querySelector('.txtGlowColor'));
    
    for(let a = 0; a < focusPanel.length; a++) {

        if(focusPanel[a] != null) {

            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                canvas.children[0].style.textShadow = `0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                0px 0px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
            }
        }
    }

    adjustBorder();

}

document.getElementById('pnlBoxText').querySelector('.txtGlowOpacity').addEventListener('change', adjustTextGlow);
document.getElementById('pnlBoxText').querySelector('.txtGlowOpacity').previousElementSibling.addEventListener('input', adjustTextGlow);

document.getElementById('pnlBoxText').querySelector('.txtGlowSpread').addEventListener('change', adjustTextGlow);
document.getElementById('pnlBoxText').querySelector('.txtGlowSpread').previousElementSibling.addEventListener('input', adjustTextGlow);


function showTextShadow(me) {
    
    let panel = document.getElementById('pnlBoxText');
    var size = panel.querySelector('.txtShadowSize').value/2;
    var spread = panel.querySelector('.txtShadowSpread').value / 5;
    var opacity = panel.querySelector('.txtShadowOpacity').value / 100;
    var rotation = Number(panel.querySelector('.txtShadowRotation').value) + 90;
    
    //remove other styles first
    txtHexValue.value = panel.querySelector('.txtShadowColor').value;
    convertHexToRGB(me);
     
    var coorX = size * Math.cos(rotation * (Math.PI/ 180));
    var coorY = size * Math.sin(rotation * (Math.PI / 180));
        
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {

            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                canvas.children[0].style.webkitTextStroke = "";

                canvas.children[0].style.textShadow = `${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                                                ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
            }
        }
    }                                       
}

function adjustTextShadowColor() {

    let panel = document.getElementById('pnlBoxText');
    let color = panel.querySelector('.txtShadowColor').value;
    let size = panel.querySelector('.txtShadowSize').value/2;
    let spread = panel.querySelector('.txtShadowSpread').value / 5;
    let opacity = panel.querySelector('.txtShadowOpacity').value / 100;
    let rotation = Number(panel.querySelector('.txtShadowRotation').value) + 90;
    
    txtHexValue.value = color;
    convertHexToRGB(this);
            
    var coorX = size * Math.cos(rotation * (Math.PI/ 180));
    var coorY = size * Math.sin(rotation * (Math.PI / 180));
        
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                
                canvas.children[0].style.textShadow = `${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
                
            }
        }
    }

    
}
document.getElementById('pnlBoxText').querySelector('.txtShadowColor').addEventListener('change', adjustTextShadowColor);
document.getElementById('pnlBoxText').querySelector('.txtShadowColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustTextShadow() {

    let panel = document.getElementById('pnlBoxText');
    let color = panel.querySelector('.txtShadowColor').value;
    let size = panel.querySelector('.txtShadowSize').value/2;
    let spread = panel.querySelector('.txtShadowSpread').value / 5;
    let opacity = panel.querySelector('.txtShadowOpacity').value / 100;
    let rotation = Number(panel.querySelector('.txtShadowRotation').value) + 90;
    
    txtHexValue.value = color;
    convertHexToRGB(panel.querySelector('.txtShadowColor'));

    var coorX = size * Math.cos(rotation * (Math.PI/ 180));
    var coorY = size * Math.sin(rotation * (Math.PI / 180));
        
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "text") {
                canvas.style.border = "none";

                canvas.children[0].style.textShadow = `${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity}),
                ${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;

            }
        }
    }

}
document.getElementById('pnlBoxText').querySelector('.txtShadowOpacity').addEventListener('change', adjustTextShadow);
document.getElementById('pnlBoxText').querySelector('.txtShadowOpacity').previousElementSibling.addEventListener('input', adjustTextShadow);

document.getElementById('pnlBoxText').querySelector('.txtShadowSize').addEventListener('change', adjustTextShadow);
document.getElementById('pnlBoxText').querySelector('.txtShadowSize').previousElementSibling.addEventListener('input', adjustTextShadow);

document.getElementById('pnlBoxText').querySelector('.txtShadowSpread').addEventListener('change', adjustTextShadow);
document.getElementById('pnlBoxText').querySelector('.txtShadowSpread').previousElementSibling.addEventListener('input', adjustTextShadow);

document.getElementById('pnlBoxText').querySelector('.txtShadowRotation').addEventListener('change', adjustTextShadow);
document.getElementById('pnlBoxText').querySelector('.txtShadowRotation').previousElementSibling.addEventListener('input', adjustTextShadow);

function checkCurrTextSettings(f) {

    let panel = document.getElementById('pnlBoxText');
    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);

    if(currFontSize != null) {
        canvas.dataset.fontSize = currFontSize;
        canvas.children[0].style.fontSize = currFontSize + 'px';

        adjustTextArea(f);
    }

    
    if(currFontColor != null) {
        canvas.children[0].style.color = currFontColor;
    }

    if(currLetterSpacing != null) {
        canvas.children[0].style.letterSpacing = currLetterSpacing + 'px';
        adjustTextArea(f);
    }

    if(currLineHeight != null) {
        
        if(Number.isInteger(Number(currLineHeight))) {
            canvas.children[0].style.lineHeight = currLineHeight / 10;
        }
        else {
            canvas.children[0].style.lineHeight = "normal"; 
        }

        adjustTextArea(f);
    }

    if(currCase != null) {

        for(var b = 0; b < panel.querySelector('.selTextCase').childElementCount; b++) {
            panel.querySelector('.selTextCase').children[b].children[0].style.color = "#647499";
        }

        panel.querySelector(`.btn${currCase}`).children[0].style.color = "white";

        /*
        if(currCase == "TitleCase") {
            panel.querySelector('.btnTitleCase').children[0].style.color = "white";
        }
        else if(currCase == "LowerCase") {
            panel.querySelector('.btnLowerCase').children[0].style.color = "white";
        }
        else if(currCase == "UpperCase") {
            panel.querySelector('.btnUpperCase').children[0].style.color = "white";
        }
        */
    }

    if(currResizeBox != null) {

        for(var b = 0; b < panel.querySelector('.selTextResize').childElementCount; b++) {
            panel.querySelector('.selTextResize').children[b].children[0].style.filter = "none";  
        }

        panel.querySelector(`.btn${currResizeBox}`).children[0].style.filter = "saturate(0) brightness(2)";
    }

    if(currHoriAlignment != null) {

        for(var b = 0; b < panel.querySelector('.selTextHori').childElementCount; b++) {
            panel.querySelector('.selTextHori').children[b].children[0].style.filter = "none";  
        }

        panel.querySelector(`.btnAlign${currHoriAlignment}`).children[0].style.filter = "saturate(0) brightness(2)";
    }

    if(currVertiAlignment != null) {

        for(var b = 0; b < panel.querySelector('.selTextVerti').childElementCount; b++) {
            panel.querySelector('.selTextVerti').children[b].children[0].style.filter = "none";  
        }

        panel.querySelector(`.btnAlign${currVertiAlignment}`).children[0].style.filter = "saturate(0) brightness(2)";

    }

    if(currTextDecor != null) {

        for(var b = 0; b < panel.querySelector('.selTextDecor').childElementCount; b++) {
            panel.querySelector('.selTextDecor').children[b].children[0].style.filter = "none";  
        }

        panel.querySelector(`.btn${currTextDecor}`).children[0].style.filter = "saturate(0) brightness(2)";

    }

}

function createPnlBoxText(me, fontCase) {

    let newText;
    let f = maxF; //get the length of pnlBoxPatterns and use it as layer count
    maxF++;
    let name = autoIncrementHeader("Text");
    let configScroll = document.getElementsByClassName('configScroll');

    newText = 
    `<div class="pnlBoxLayer" data-font="${me.dataset.font}" data-class="${me.dataset.class}" data-type = "text" data-ref="${f}">
        <div class="pnlTitleLayer"style="height: 40px;">
            <div class="iconLayer">
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4023 0.785156V5.44434H15.9453C15.6745 4.36947 15.374 3.59928 15.0439 3.13379C14.7139 2.65983 14.2611 2.2832 13.6855 2.00391C13.3639 1.85156 12.8011 1.77539 11.9971 1.77539H10.7148V15.0547C10.7148 15.9349 10.7614 16.485 10.8545 16.7051C10.9561 16.9251 11.1465 17.1198 11.4258 17.2891C11.7135 17.4499 12.1029 17.5303 12.5938 17.5303H13.165V18H4.15137V17.5303H4.72266C5.22201 17.5303 5.62402 17.4414 5.92871 17.2637C6.14876 17.1452 6.32227 16.9421 6.44922 16.6543C6.54232 16.4512 6.58887 15.918 6.58887 15.0547V1.77539H5.34473C4.18522 1.77539 3.3431 2.02083 2.81836 2.51172C2.08203 3.19727 1.61654 4.1748 1.42188 5.44434H0.939453V0.785156H16.4023Z" fill="white"/>
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
    temp.innerHTML = newText;

    configScroll[5].prepend(temp.children[0]); //add the child on top of the previous one
    configScroll[5].querySelector('.txtHeader').addEventListener('dblclick', renameTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('keypress', validateTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('click', clickTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('focusout', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', encodeTxtHeader);

    //add the show and hide control
    configScroll[5].querySelector('.btnShowHide').addEventListener('click', showHideLayers);

    addPnlBoxText(f, name, me.dataset.font, me.dataset.class, fontCase);
}


function recreatePnlBoxText(f, name, fontName, fontClass) {

    let newText;
    let configScroll = document.getElementsByClassName('configScroll');

    newText = 
    `<div class="pnlBoxLayer" data-font="${fontName}" data-class="${fontClass}" data-type = "text" data-ref="${f}">
        <div class="pnlTitleLayer" style="height: 40px;">
            <div class="iconLayer">
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4023 0.785156V5.44434H15.9453C15.6745 4.36947 15.374 3.59928 15.0439 3.13379C14.7139 2.65983 14.2611 2.2832 13.6855 2.00391C13.3639 1.85156 12.8011 1.77539 11.9971 1.77539H10.7148V15.0547C10.7148 15.9349 10.7614 16.485 10.8545 16.7051C10.9561 16.9251 11.1465 17.1198 11.4258 17.2891C11.7135 17.4499 12.1029 17.5303 12.5938 17.5303H13.165V18H4.15137V17.5303H4.72266C5.22201 17.5303 5.62402 17.4414 5.92871 17.2637C6.14876 17.1452 6.32227 16.9421 6.44922 16.6543C6.54232 16.4512 6.58887 15.918 6.58887 15.0547V1.77539H5.34473C4.18522 1.77539 3.3431 2.02083 2.81836 2.51172C2.08203 3.19727 1.61654 4.1748 1.42188 5.44434H0.939453V0.785156H16.4023Z" fill="white"/>
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
    temp.innerHTML = newText;

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

//actual function to create pnlBoxProperties
function addPnlBoxText(f, name, font, clas, fontCase) {  //adding controls only for 'IMAGE' panel boxes
    
    dataLayer[f] = '\n*';
    dataLayer[f] += `\nref: ${f}`;
    dataLayer[f] += `\npnlBoxText: ${name}`;
    dataLayer[f] += `\nfontName: ${font}`;
    dataLayer[f] += `\nfontClass: ${clas}`;
    dataLayer[f] += `\nshow: visible`;
    dataLayer[f] += `\nlock: false`;
    dataLayer[f] += `\ntxtWidthLayer: 0`;
    dataLayer[f] += `\ntxtHeightLayer: 0`;
    dataLayer[f] += `\ntxtXLayer: 0`;
    dataLayer[f] += `\ntxtYLayer: 0`;
    dataLayer[f] += `\nchkFlipX: false`;
    dataLayer[f] += `\nchkFlipY: false`;
    dataLayer[f] += `\ntxtOpacityLayer: 100`;
    dataLayer[f] += `\ntxtRotationLayer: 0`;

    dataLayer[f] += `\ntxtResizeText: 48`;
    dataLayer[f] += `\ntxtTextColor: 949EFF`;
    dataLayer[f] += `\ntxtLetterSpacing: 0`;
    dataLayer[f] += `\ntxtLineHeight: Auto`;
    dataLayer[f] += `\nselTextCase: UpperCase`;
    dataLayer[f] += `\nselTextResize: AutoWidth`;
    dataLayer[f] += `\nselTextHori: AlignLeft`;
    dataLayer[f] += `\nselTextVerti: AlignTop`;
    dataLayer[f] += `\nselTextDecor: NoDecor`;
 
    dataLayer[f] += `\ntxtOutlineColor: 6885CC`;
    dataLayer[f] += `\ntxtOutlineOpacity: 100`;
    dataLayer[f] += `\ntxtOutlineSize: 10`;

    dataLayer[f] += `\ntxtGlowColor: 6885CC`;
    dataLayer[f] += `\ntxtGlowOpacity: 50`;
    dataLayer[f] += `\ntxtGlowSize: 100`;
    dataLayer[f] += `\ntxtGlowSpread: 100`;

    dataLayer[f] += `\ntxtShadowColor: 000000`;
    dataLayer[f] += `\ntxtShadowOpacity: 100`;
    dataLayer[f] += `\ntxtShadowSize: 20`;
    dataLayer[f] += `\ntxtShadowSpread: 0`;
    dataLayer[f] += `\ntxtShadowRotation: 0`;

    dataLayer[f] += `\ndropdown 0: Normal`;
    dataLayer[f] += `\ndropdown 1: Regular`;
    dataLayer[f] += `\ndropdown 2: Remove`;

    //after all assigned controls then create the actual pattern layer
    createCanvasText(f, name, font, clas, fontCase);

}

function createCanvasText(f, name, font, clas, fontCase) {
    
    let txtSizeWidth = document.querySelector('.txtSizeWidth');
    let txtSizeHeight = document.querySelector('.txtSizeHeight');

    cnvLayers[f] = document.createElement('div');
    cnvLayers[f].style.visibility = "visible";
    cnvLayers[f].classList.add('cnvLayers');
    cnvLayers[f].dataset.rotation = 0;
    cnvLayers[f].dataset.ref = f;
    cnvLayers[f].dataset.font = font;
    cnvLayers[f].dataset.type = "text";
    cnvLayers[f].dataset.fontSize = 48;
    cnvLayers[f].style.minWidth = 14 + 'px';
    cnvLayers[f].style.minHeight = 14 + 'px';
    cnvLayers[f].style.width = "auto";

    //create textarea
    var textArea = document.createElement('p');
    textArea.innerText = font;

    if(fontCase == "upper") textArea.style.textTransform = "uppercase";
    else textArea.style.textTransform = "capitalize";

    textArea.style.fontFamily = font;
    textArea.style.fontWeight = 400;
    textArea.style.fontStyle = 'normal';
    textArea.style.fontSize = 48 + 'px';

    textArea.classList.add('textArea');

    //append textarea
    cnvLayers[f].prepend(textArea);

    //append cnvLayers[f] to cnvGrpLayers
    cnvGrpLayers.appendChild(cnvLayers[f]);
    
    //position cnvlayer to center
    cnvLayers[f].style.left = `${(txtSizeWidth.value / 2) - (cnvLayers[f].clientWidth/2)}px`;
    cnvLayers[f].style.top = `${(txtSizeHeight.value / 2) - (cnvLayers[f].clientHeight/2)}px`;

    layerL[f] = cnvLayers[f].offsetLeft;
    layerT[f] = cnvLayers[f].offsetTop;
    layerW[f] = cnvLayers[f].clientWidth;
    layerH[f] = cnvLayers[f].clientHeight;

    //append the content of the textarea
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtWidthLayer', `${cnvLayers[f].clientWidth}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtHeightLayer', `${cnvLayers[f].clientHeight}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtXLayer', `${cnvLayers[f].offsetLeft}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtYLayer', `${cnvLayers[f].offsetTop}`);
    dataLayer[f] += `\ninnerText: ${cnvLayers[f].children[0].innerText}`;

    //create history stamp
    createHistory(f, name, 'text', font, clas);

    //add border
    addBorderLayer(cnvLayers[f], f);
    
    let configScroll = document.getElementsByClassName('configScroll');
    configScroll[5].children[0].click();
   
    //reformat using the current settings
    checkCurrTextSettings(f);
}

function recreateCanvasText(f, font, pnlBox) {

    cnvLayers[f] = document.createElement('div');
    cnvLayers[f].classList.add('cnvLayers');
    cnvLayers[f].dataset.rotation = Number(valueFinder(dataLayer[f], 'txtRotationLayer'));
    cnvLayers[f].dataset.ref = f;
    cnvLayers[f].dataset.font = font;
    cnvLayers[f].dataset.type = "text";
    cnvLayers[f].dataset.fontSize = valueFinder(dataLayer[f], 'txtResizeText');
    cnvLayers[f].style.minWidth = 14 + 'px';
    cnvLayers[f].style.minHeight = 14 + 'px';
    cnvLayers[f].style.visibility = "hidden";

    //create textarea
    var textArea = document.createElement('p');
    textArea.innerText = font.toUpperCase();
    textArea.style.fontFamily = font;
    textArea.style.fontSize = 48 + 'px';

    textArea.classList.add('textArea');

    //append textarea
    cnvLayers[f].prepend(textArea);

    //append cnvLayers[f] to cnvGrpLayers
    cnvGrpLayers.appendChild(cnvLayers[f]);

    textArea.style.width = valueFinder(dataLayer[f], 'txtWidthLayer') + 'px';
    textArea.style.height = valueFinder(dataLayer[f], 'txtHeightLayer') + 'px';
    
    cnvLayers[f].style.width = valueFinder(dataLayer[f], 'txtWidthLayer') + 'px';
    cnvLayers[f].style.height = valueFinder(dataLayer[f], 'txtHeightLayer') + 'px';
    
    //position cnvlayer to center
    cnvLayers[f].style.left = valueFinder(dataLayer[f], 'txtXLayer') + 'px';
    cnvLayers[f].style.top = valueFinder(dataLayer[f], 'txtYLayer') + 'px';

    //add border
    addBorderLayer(cnvLayers[f], f);

    let configScroll = document.getElementsByClassName('configScroll');
    configScroll[5].children[0].click();

    //FOR SOME REASONS, VALIDATE DATA CAUSES SOME BUGS
    //BUT WITHOUT IT, IT SOMEHOW WORKS
    validateData(dataLayer[f], pnlBox);

    layerL[f] = cnvLayers[f].offsetLeft;
    layerT[f] = cnvLayers[f].offsetTop;
    layerW[f] = cnvLayers[f].clientWidth;
    layerH[f] = cnvLayers[f].clientHeight;

    //reformat using the current settings
    checkCurrTextSettings(f);

    initPanel++;
    if(initPanel == panelCountMax) {
        useVectorPanel();
    }
    
}

function editCanvasTextLayer(e) {
    
    let txtEditorBox = document.getElementsByClassName('txtEditorBox')[0];

    if(e.target != cnvPin && e.target.className == "pinBody") {
        
        let f = Number(e.target.dataset.ref);
        let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);

        //check if cnvlayers is text
        if(canvas.children[0].className == "textArea") {

            isDragging = false;

            clearInterval(tmrDrag);
            tmrDrag = null;
            
            swapPanels('textEditor');

            txtEditorBox.focus();
            txtEditorBox.value = canvas.children[0].innerText;
            txtEditorBox.select();
            txtEditorBox.addEventListener('click', clickEditorBox);
            highlight = true;
        
        }
    }
    
}

function inputCanvasTextLayer() {

    let f = this.closest('.cnvLayers').dataset.ref;

    inputFormatResizeBox(f);
    
    cnvGrpLayers.style.boxSizing = "none";
    cnvGrpLayers.style.overflow = "visible";
}

function inputFormatResizeBox(f) {

    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

    if(currResizeBox == "AutoWidth" || currResizeBox == null) {

        canvas.children[0].style.whiteSpace = "nowrap";
        canvas.children[0].style.wordBreak = "normal";

        canvas.children[0].style.width = 'auto';
        canvas.children[0].style.height = 'auto';
        canvas.children[0].style.display = "inline";

        canvas.style.width = 'auto';
        canvas.style.height = 'auto';
    }
    else if(currResizeBox == "AutoHeight") {

        canvas.children[0].style.whiteSpace = "normal";
        canvas.children[0].style.wordBreak = "break-all";

        canvas.children[0].style.width = canvas.clientWidth + 'px';
        canvas.children[0].style.height = 'auto';
        canvas.children[0].style.display = "block";

        canvas.style.height = 'auto';
        
    }
    else if(currResizeBox == "FixedSize") {
        
        canvas.children[0].style.whiteSpace = "normal";
        canvas.children[0].style.wordBreak = "break-all";
 
        canvas.children[0].style.width = canvas.clientWidth + 'px';
        //canvas.children[0].style.height = canvas.clientHeight + 'px';
        canvas.children[0].style.display = "block";

    }

    /*
    if(currHoriAlignment == "Center") {

        let minus = (layerW[f] - cnvLayers[f].clientWidth) / 2;
        cnvLayers[f].style.left = layerW[f] + minus + 'px'
    }
        */

    adjustBorder()
}



/////////////////////////////////////TEXT EDITOR/////////////////////////
let caretPost = 0;

function setCaretPosition() {
    let txtEditorBox = document.getElementsByClassName('txtEditorBox')[0];
    txtEditorBox.setSelectionRange(caretPost, caretPost);
    
}
document.getElementsByClassName('txtEditorBox')[0].addEventListener('focus', setCaretPosition);

function getCaretPosition(e) {
    let txtEditorBox = document.getElementsByClassName('txtEditorBox')[0];
    caretPost = txtEditorBox.selectionStart;
    highlight = false;

    txtEditorBox.addEventListener('click', clickEditorBox);

    //swapPanels('text');
}
document.getElementsByClassName('txtEditorBox')[0].addEventListener('blur', getCaretPosition);


function selectCaretPosition() {

    if(!highlight) {
        
        highlight = true;
        this.setSelectionRange(this.selectionEnd, this.selectionEnd);
      
    }   
    else if(highlight) {

        highlight = false;
    }
}
document.getElementsByClassName('txtEditorBox')[0].addEventListener('click', selectCaretPosition);

function inputEditorBox() {

    this.style.textTransform = currCase.toLowerCase();

    for(let a = 0; a < focusObj.length; a++) {

        if(focusObj[a] != null) {
            if(focusObj[a].dataset.type == "text") {
                let f = focusObj[a].dataset.ref;

                focusObj[a].children[0].innerText = this.value;

                inputFormatResizeBox(f);
            }
        }
    }
}

function clickEditorBox() {
    if(highlight == false) {

        this.select();
        highlight = true;
                
    }
    else {

        this.setSelectionRange(this.selectionEnd, this.selectionEnd);
        this.focus(); 
        highlight = false;
        this.removeEventListener('click', clickEditorBox);
        this.addEventListener('dblclick', dblClickEditorBox);
    }
}

function dblClickEditorBox() {
    this.select();
    highlight = true;
    this.addEventListener('click', clickEditorBox);
}

function saveTextEditor() {

    saveInnerTextData();
    document.getElementsByClassName('txtEditorBox')[0].blur();
    swapPanels('text');

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
document.getElementById('btnSaveEdit').addEventListener('click', saveTextEditor);


function saveInnerTextData() {

    checkMaxHistory();
    history[h] = `Edited*`;

    let txtEditorBox = document.getElementsByClassName('txtEditorBox')[0];

    for(let a = 0; a < focusObj.length; a ++) {

        if(focusObj[a] != null) {

            let f = focusObj[a].dataset.ref;

            let oldText = valueFinder(dataLayer[f], 'innerText');
            let newText = txtEditorBox.value;

            focusObj[a].children[0].innerText = txtEditorBox.value;

            if(oldText != newText) {

                let name = focusPanel[f].querySelector('.txtHeader').value;
                
                layerSequence = `\ntxtWidthLayer: ${valueFinder(dataLayer[f], 'txtWidthLayer')}`;
                layerSequence += `\ntxtHeightLayer: ${valueFinder(dataLayer[f], 'txtHeightLayer')}`;
                layerSequence += `\ntxtXLayer: ${valueFinder(dataLayer[f], 'txtXLayer')}`;
                layerSequence += `\ntxtYLayer: ${valueFinder(dataLayer[f], 'txtYLayer')}`;
                layerSequence += `\ninnerText: ${valueFinder(dataLayer[f], 'innerText')}`;

                history[h] += `\npnlBoxText: ${name}`;
                history[h] += `\nref: ${f}`;
                history[h] += `\ntxtWidthLayer: ${focusObj[f].clientWidth}`;
                history[h] += `\ntxtHeightLayer: ${focusObj[f].clientHeight}`;
                history[h] += `\ntxtXLayer: ${focusObj[f].offsetLeft}`;
                history[h] += `\ntxtYLayer: ${focusObj[f].offsetTop}`;
                history[h] += `\ninnerText: ${newText}`;
                history[h] += `\n_`;
                history[h] += layerSequence;
                history[h] += `\n*`;
        
                dataLayer[f] = valueSwitcher(dataLayer[f], 'txtWidthLayer', `${focusObj[f].clientWidth}`);
                dataLayer[f] = valueSwitcher(dataLayer[f], 'txtHeightLayer', `${focusObj[f].clientHeight}`);
                dataLayer[f] = valueSwitcher(dataLayer[f], 'txtXLayer', `${focusObj[f].offsetLeft}`);
                dataLayer[f] = valueSwitcher(dataLayer[f], 'txtYLayer', `${focusObj[f].offsetTop}`);
                dataLayer[f] = valueSwitcher(dataLayer[f], 'innerText', newText);
                
                inputFormatResizeBox(f);
            }
        }
    }

    /*
    console.clear();
    for(let a = 0; a < h; a++) {
        console.log(history[a])
    }
    console.log("--------REDO---------")
    for(let a = 0; a < rh; a++) {
        console.log(redoHistory[a])
    }
    */
}

/////////////////////////////////////LOAD ALL EMOJIS////////////////////

function resetAllEmojis() {

    let contEmoji = document.getElementById('contEmoji');
    let clickEmoji = document.getElementsByClassName('clickEmoji');

    let append0 = "";
    let append = "";

    for(let a = 0; a < emojiCategory.length; a++) {
        append0 += 
        `<div class="emojiTitle"><h2>${emojiCategory[a]}</h2></div>`;
        
        for(let b = 0; b < emojis.length; b++) {

            if(emojis[b] != null) {
    
                if(emojis[b].tags.includes(emojiCategory[a].toLowerCase())) {
    
                    append += `<div class="clickEmoji" id="${emojis[b].id}"><h2>${emojis[b].id};</h2></div>`;
                }
            }
        }

        append0 += `\n<div class="wrapEmoji">${append}</div>\n\n`;
        append = "";
    }

    contEmoji.style.display = "block";
    contEmoji.innerHTML = append0;
    append0 = "";

    
    for(var b = 0; b < clickEmoji.length; b++) {
       
        clickEmoji[b].addEventListener('click', function() {
            let txtEditorBox = document.getElementsByClassName('txtEditorBox')[0];

            let value1 = txtEditorBox.value.substring(0, caretPost);
            let value2 = txtEditorBox.value.substring(caretPost, txtEditorBox.length)
            
            txtEditorBox.value = value1 + this.id + value2;

        });
    }
}
resetAllEmojis();

function searchAllEmojis() {

    let append = "";
    let contEmoji = document.getElementById('contEmoji');

    if(this.placeholder.includes('emoji')) {
        if(this.value.length >=3) {
            for(let a = 0; a < emojis.length; a++) {
                if(emojis[a] != null) {
                    if(emojis[a].tags.includes(this.value)) {
                        append += 
                        `<div class="clickEmoji" id="${emojis[a].id}"><h2>${emojis[a].id};</h2></div>`;
                    }
                }
            }
    
            if(append != "") {
                contEmoji.style.display = "block";
                contEmoji.innerHTML = `<div class="wrapEmoji">${append}</div>`;
            }
            else {
                contEmoji.style.display = "flex";
                contEmoji.innerHTML = `<div class="emojiTitle" style="margin: auto; width:auto;"><h2>No emojis found</h2></div>`
            }
        }
        else if(this.value.length > 0 && this.value.length < 3) {
            contEmoji.style.display = "block";
            contEmoji.innerHTML = "";
        }
        else {
            resetAllEmojis();
        }
    }
    else if(this.placeholder.includes('symbol')) {
        if(this.value.length >=3) {
            for(let a = 0; a < symbols.length; a++) {
                if(symbols[a] != null) {
                    if(symbols[a].tags.includes(this.value)) {
                        append += 
                        `<div class="clickSymbol" id="${symbols[a].id}"><h2>${symbols[a].id};</h2></div>`;
                    }
                }
            }
    
            if(append != "") {
                contSymbol.style.display = "block";
                contSymbol.innerHTML = `<div class="wrapSymbol">${append}</div>`;
            }
            else {
                contSymbol.style.display = "flex";
                contSymbol.innerHTML = `<div class="symbolTitle" style="margin: auto; width:auto;"><h2>No symbols found</h2></div>`
            }
        }
        else if(this.value.length > 0 && this.value.length < 3) {
            contSymbol.style.display = "block";
            contSymbol.innerHTML = "";
        }
        else {
            resetAllSymbols();
        }
    }

}
document.getElementsByClassName('txtSearchEmojiSymbol')[0].addEventListener('input', searchAllEmojis);

function showEmojis() {
    let txtSearchEmojiSymbol = document.getElementsByClassName('txtSearchEmojiSymbol')[0];
    let pnlTopBoxThumb2 = document.getElementsByClassName('pnlTopBoxThumb2')[0];
    let tabSliderBoxText = document.getElementById('tabSliderBoxText');
    let btnSymbolsBox = document.getElementById('btnSymbolsBox');

    pnlTopBoxThumb2.style.translate = "0%";
    tabSliderBoxText.style.translate = "0%";

    txtSearchEmojiSymbol.placeholder = "Search emojis";

    this.children[0].style.color ="white";
    this.removeEventListener('pointerleave', leaveEmojis);

    btnSymbolsBox.children[0].style.color = "#647499";
    btnSymbolsBox.addEventListener('pointerover', hoverSymbols);
}
document.getElementById('btnEmojisBox').addEventListener('click', showEmojis);

function hoverEmojis() {
    this.children[0].style.color = "white";
}
document.getElementById('btnEmojisBox').addEventListener('pointerover', hoverEmojis);

function leaveEmojis() {
    this.children[0].style.color = "#647499";
}

////////////////////////////////SYMBOL OPTIONS TOP////////////////////

async function resetAllSymbols() {

    let contSymbol = document.getElementById('contSymbol');
    let clickSymbol = document.getElementsByClassName('clickSymbol');

    let append0 = "";
    let append = "";

    for(let a = 0; a < symbolCategory.length; a++) {
        append0 += 
        `<div class="symbolTitle"><h2>${symbolCategory[a]}</h2></div>`;
        
        for(let b = 0; b < symbols.length; b++) {

            if(symbols[b] != null) {
    
                if(symbols[b].tags.includes(symbolCategory[a].toLowerCase())) {
    
                    append += `<div class="clickSymbol" id="${symbols[b].id}"><h2>${symbols[b].id};</h2></div>`;
                }
            }
        }

        append0 += `\n<div class="wrapSymbol">${append}</div>\n\n`;
        append = "";
    }

    contSymbol.style.display = "block";
    contSymbol.innerHTML = append0;
    append0 = "";

    for(var b = 0; b < clickSymbol.length; b++) {
       
        clickSymbol[b].addEventListener('click', function() {
            let txtEditorBox = document.getElementsByClassName('txtEditorBox')[0];

            let value1 = txtEditorBox.value.substring(0, caretPost);
            let value2 = txtEditorBox.value.substring(caretPost, txtEditorBox.length)
            
            txtEditorBox.value = value1 + this.id + value2;

            txtEditorBox.dispatchEvent(new Event('input'));
            txtEditorBox.dispatchEvent(new Event('blur'));
        
        });
    }
    
    
}
resetAllSymbols();

function showSymbols() {
    let txtSearchEmojiSymbol = document.getElementsByClassName('txtSearchEmojiSymbol')[0];
    let pnlTopBoxThumb2 = document.getElementsByClassName('pnlTopBoxThumb2')[0];
    let tabSliderBoxText = document.getElementById('tabSliderBoxText');
    let btnEmojisBox = document.getElementById('btnEmojisBox');

    pnlTopBoxThumb2.style.translate = "100%";
    tabSliderBoxText.style.translate = "-100%";

    txtSearchEmojiSymbol.placeholder = "Search symbols";
    
    this.children[0].style.color ="white";
    this.removeEventListener('pointerleave', leaveSymbols);

    btnEmojisBox.children[0].style.color = "#647499";
    btnEmojisBox.addEventListener('pointerover', hoverEmojis);

}
document.getElementById('btnSymbolsBox').addEventListener('click', showSymbols);

function hoverSymbols() {
    this.children[0].style.color = "white";
}
document.getElementById('btnSymbolsBox').addEventListener('pointerover', hoverSymbols);

function leaveSymbols() {
    this.children[0].style.color = "#647499";
}
document.getElementById('btnSymbolsBox').addEventListener('pointerleave', leaveSymbols);














//////////////////////////////////////BOTTOM TAB///////////////////////////
function showBasicBoxText(){
    this.closest('#pnlBoxText').children[0].children[0].innerText = "Text Settings";
    this.closest('#pnlBoxText').querySelector('.tabSliderBox3').style.translate = "0%"; //slide tab
    this.closest('#pnlBoxText').querySelector('.pnlBottomBoxThumb3').style.translate = "0%"; //slide scroll thumb
}
document.querySelector('#pnlBoxText').querySelector('.btnBasicBox').addEventListener('click', btnBottomClick); //default the btnBasic to white
document.querySelector('#pnlBoxText').querySelector('.btnBasicBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxText').querySelector('.btnBasicBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxText').querySelector('.btnBasicBox').addEventListener('click', showBasicBoxText);
document.querySelector('#pnlBoxText').querySelector('.btnBasicBox').children[0].style.filter = "saturate(0) brightness(2)";
document.querySelector('#pnlBoxText').querySelector('.btnBasicBox').children[0].style.transition = ".2s";

function showFormatBoxText() {
    this.closest('#pnlBoxText').children[0].children[0].innerText = "Text Format";
    this.closest('#pnlBoxText').querySelector('.tabSliderBox3').style.translate = "-100%"; //slide tab to left
    this.closest('#pnlBoxText').querySelector('.pnlBottomBoxThumb3').style.translate = "100%"; //slide thumb to right
}
document.querySelector('#pnlBoxText').querySelector('.btnTextBox').addEventListener('click', btnBottomClick); //default the btnColor to white
document.querySelector('#pnlBoxText').querySelector('.btnTextBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxText').querySelector('.btnTextBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxText').querySelector('.btnTextBox').addEventListener('click', showFormatBoxText);
document.querySelector('#pnlBoxText').querySelector('.btnTextBox').children[0].style.transition = ".2s";

function showStyleBoxText() {
    this.closest('#pnlBoxText').children[0].children[0].innerText = "Text Style";
    this.closest('#pnlBoxText').querySelector('.tabSliderBox3').style.translate = "-200%"; //slide tab to left
    this.closest('#pnlBoxText').querySelector('.pnlBottomBoxThumb3').style.translate = "200%"; //slide thumb to right
}
document.querySelector('#pnlBoxText').querySelector('.btnStyleBox').addEventListener('click', btnBottomClick); //default the btnColor to white
document.querySelector('#pnlBoxText').querySelector('.btnStyleBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxText').querySelector('.btnStyleBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxText').querySelector('.btnStyleBox').addEventListener('click', showStyleBoxText);
document.querySelector('#pnlBoxText').querySelector('.btnStyleBox').children[0].style.transition = ".2s";

