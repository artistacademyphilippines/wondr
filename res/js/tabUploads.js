
var dataThumb = [];

function uploadImg() {
    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');
    let configScroll = document.getElementsByClassName('configScroll');
    let inputFile = document.createElement('input');
    inputFile.type = "file";
    inputFile.accept ="image/png, image/gif, image/jpeg, image/jpg, image/webp, image/avif, image/svg+xml";
    inputFile.setAttribute('multiple', 'multiple')
    inputFile.click();

    inputFile.onchange = function() { //once selected a file
        
        //init reader array
        var reader = [];
        h++;
        history[h] = 'Uploaded';

        for(let a = 0; a < inputFile.files.length; a++) {

            var fileExt = inputFile.files[a].name.split('.'); // get file extension if SVG or raster

            if(fileExt[fileExt.length-1].toLowerCase() != "svg") { //if image file is raster
                
                reader[a] = new FileReader(); //create a file reader to read the format
                reader[a].readAsDataURL(inputFile.files[a]); //read the file to dataURL for raster output

                reader[a].onload = function() {
                    
                    //use pnlBoxThumb.length as it will always default to existing count
                    //it will help to skip [0] index
                    var img = new Image();
                    img.src = this.result;
                    img.setAttribute('draggable', 'false');
                    img.onload = function() {
                        
                        var div = document.createElement('div');
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

                        dataThumb[div.dataset.thumbno] = '\n*';
                        dataThumb[div.dataset.thumbno] += `\npnlBoxThumb:`;
                        dataThumb[div.dataset.thumbno] += `\nthumbno: ${div.dataset.thumbno}`;
                        dataThumb[div.dataset.thumbno] += `\nsource: ${img.src}`;

                        history[h] += `*`;
                        history[h] += `\npnlBoxThumb:`;
                        history[h] += `\nthumbno: ${div.dataset.thumbno}`;
                        history[h] += `\nsource: ${img.src}\n`;
                        
                        
                    }
                
                }
            }

            else {

                reader[a] = new FileReader(); //create a file reader to read the format
                reader[a].readAsText(inputFile.files[a]); //read the file as text since it's SVG
                reader[a].onload = function() {
                    
                    //use pnlBoxThumb.length as it will always default to existing count
                    //it will help to skip [0] index

                    var div = document.createElement('div');
                    div.classList.add('pnlBoxThumb');
                    div.setAttribute('draggable', 'false');
                    div.dataset.thumbno = pnlBoxThumb.length;
                    div.dataset.type = "vector";
                    div.innerHTML = this.result;

                    //format and add global for mix blend
                    
                    var svgChild = "";
                    var getSVGTag;

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
                    
                    dataThumb[div.dataset.thumbno] = '\n*';
                    dataThumb[div.dataset.thumbno] += `\npnlBoxThumb:`;
                    dataThumb[div.dataset.thumbno] += `\nthumbno: ${div.dataset.thumbno}`;
                    dataThumb[div.dataset.thumbno] += `\nsource: ${this.result}`;

                    history[h] += '*';
                    history[h] += `\npnlBoxThumb:`;
                    history[h] += `\nthumbno: ${div.dataset.thumbno}`;
                    history[h] += `\nsource: ${this.result}\n`;
                    
                }
            }

            
        }
    }
}
document.getElementById('btnUploadImg').addEventListener('click', uploadImg);

//==================CREATE IMAGE PANELBOX========================
function createPnlBoxImage(n) {

    let f = maxF; //get the length of pnlBoxPatterns and use it as layer count
    maxF++;
    let name = autoIncrementHeader("Image");
    let configScroll = document.getElementsByClassName('configScroll');

    var newImage = 
    `<div class="pnlBoxLayer" data-type="image" data-thumbno="${n}" data-ref="${f}">
        <div class="pnlTitleLayer" style="height: 40px;">
            <div class="iconLayer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.895431 0 2V18C0 19.1046 0.895431 20 2 20H18C19.1046 20 20 19.1046 20 18V2C20 0.895431 19.1046 0 18 0H2ZM18 1H2C1.44772 1 1 1.44772 1 2V17.2571C1.04921 17.2139 1.10424 17.174 1.16529 17.1381L5.83303 14.3923C6.22576 14.1613 6.72498 14.225 7.04716 14.5472L8.79289 16.2929C9.18342 16.6834 9.81658 16.6834 10.2071 16.2929L14.7929 11.7071C15.1834 11.3166 15.8166 11.3166 16.2071 11.7071L19 14.5V2C19 1.44772 18.5523 1 18 1Z" fill="white"/>
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

    configScroll[5].insertAdjacentHTML('afterbegin', newImage); //add the child on top of the previous one
    configScroll[5].querySelector('.txtHeader').addEventListener('dblclick', renameTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('keypress', validateTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('click', clickTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('focusout', saveTxtHeader);
    configScroll[5].querySelector('.txtHeader').addEventListener('change', encodeTxtHeader);

    //add the show and hide control
    configScroll[5].querySelector('.btnShowHide').addEventListener('click', showHideLayers);
    
    addPnlBoxImage(f, name, n);

}

//==================CREATE IMAGE PANELBOX========================
function recreatePnlBoxImage(f, n, name) {

    let configScroll = document.getElementsByClassName('configScroll');

    var newImage = 
    `<div class="pnlBoxLayer" data-type="image" data-thumbno="${n}" data-ref="${f}">
        <div class="pnlTitleLayer" style="height: 40px;">
            <div class="iconLayer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.895431 0 2V18C0 19.1046 0.895431 20 2 20H18C19.1046 20 20 19.1046 20 18V2C20 0.895431 19.1046 0 18 0H2ZM18 1H2C1.44772 1 1 1.44772 1 2V17.2571C1.04921 17.2139 1.10424 17.174 1.16529 17.1381L5.83303 14.3923C6.22576 14.1613 6.72498 14.225 7.04716 14.5472L8.79289 16.2929C9.18342 16.6834 9.81658 16.6834 10.2071 16.2929L14.7929 11.7071C15.1834 11.3166 15.8166 11.3166 16.2071 11.7071L19 14.5V2C19 1.44772 18.5523 1 18 1Z" fill="white"/>
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
    temp.innerHTML = newImage;

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

//===================CREATE VECTOR PANELBOX======================

function createPnlBoxVector(n) {

    let f = maxF; //get the length of pnlBoxPatterns and use it as layer count
    maxF++;
    
    let name = autoIncrementHeader("Vector");
    let configScroll = document.getElementsByClassName('configScroll');

    var newVector = 
    `<div class="pnlBoxLayer" data-type="vector" data-thumbno="${n}" data-ref="${f}">
        <div class="pnlTitleLayer" style="height: 40px;">
            <div class="iconLayer">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0C0.447715 0 0 0.447715 0 1V4C0 4.55228 0.447715 5 1 5H2V17H1C0.447715 17 0 17.4477 0 18V21C0 21.5523 0.447715 22 1 22H4C4.55228 22 5 21.5523 5 21V20H17V21C17 21.5523 17.4477 22 18 22H21C21.5523 22 22 21.5523 22 21V18C22 17.4477 21.5523 17 21 17H20V5H21C21.5523 5 22 4.55228 22 4V1C22 0.447715 21.5523 0 21 0H18C17.4477 0 17 0.447715 17 1V2H5V1C5 0.447715 4.55228 0 4 0H1ZM17 3H5V4C5 4.55228 4.55228 5 4 5H3V17H4C4.55228 17 5 17.4477 5 18V19H17V18C17 17.4477 17.4477 17 18 17H19V5H18C17.4477 5 17 4.55228 17 4V3Z" fill="white"/>
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
    
    addPnlBoxVector(f, name, n);
}

//===================RECREATE VECTOR PANELBOX======================

function recreatePnlBoxVector(f, n, name) {
    
    let configScroll = document.getElementsByClassName('configScroll');

    var newVector = 
    `<div class="pnlBoxLayer" data-type="vector" data-thumbno="${n}" data-ref="${f}">
        <div class="pnlTitleLayer" style="height: 40px;">
            <div class="iconLayer">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0C0.447715 0 0 0.447715 0 1V4C0 4.55228 0.447715 5 1 5H2V17H1C0.447715 17 0 17.4477 0 18V21C0 21.5523 0.447715 22 1 22H4C4.55228 22 5 21.5523 5 21V20H17V21C17 21.5523 17.4477 22 18 22H21C21.5523 22 22 21.5523 22 21V18C22 17.4477 21.5523 17 21 17H20V5H21C21.5523 5 22 4.55228 22 4V1C22 0.447715 21.5523 0 21 0H18C17.4477 0 17 0.447715 17 1V2H5V1C5 0.447715 4.55228 0 4 0H1ZM17 3H5V4C5 4.55228 4.55228 5 4 5H3V17H4C4.55228 17 5 17.4477 5 18V19H17V18C17 17.4477 17.4477 17 18 17H19V5H18C17.4477 5 17 4.55228 17 4V3Z" fill="white"/>
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

//=================DROPPING ON CONFIGSCROLL[2]====================

//this is for configcontainer color
menuUploads.addEventListener('dragover', function(e) {
    
    let configScroll = document.getElementsByClassName('configScroll');

    if(e.target.closest('.configContainer')) {
        configScroll[2].children[0].style.backgroundColor = "#242833";
    }
    else {
        e.preventDefault();
        e.stopPropagation();
        configScroll[2].children[0].style.backgroundColor = "transparent";
    }

})

document.getElementById('toolbox').addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    let configScroll = document.getElementsByClassName('configScroll');
    configScroll[2].children[0].style.backgroundColor = "transparent";
})

function dragDropUploadThumb(e) {

    var reader = [];
    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');
    let configScroll = document.getElementsByClassName('configScroll');
    
    h++;
    history[h] = 'Uploaded';

    for(let a = 0; a < e.dataTransfer.files.length; a++) {

        //if dropped is a file
        if(e.dataTransfer.items[a].kind == "file") {

            //if file is an image
            if(e.dataTransfer.items[a].type.match("image")) {

                //check if file is svg
                let chkSVG = /svg/;

                let resultSVG = chkSVG.test(e.dataTransfer.items[a].type);

                if(!resultSVG) {

                    reader[a] = new FileReader();

                    reader[a].readAsDataURL(e.dataTransfer.files[a]);

                    reader[a].onload = function() {

                        var img = new Image();
                        img.src = this.result;
                        img.setAttribute('draggable', 'false');
                        img.onload = function() {

                            var div = document.createElement('div');
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

                else {

                    reader[a] = new FileReader(); //create a file reader to read the format
                    reader[a].readAsText(e.dataTransfer.files[a]); //read the file to dataURL for raster output
                    reader[a].onload = function() {
                        
                        //use pnlBoxThumb.length as it will always default to existing count
                        //it will help to skip [0] index

                        var div = document.createElement('div');
                        div.classList.add('pnlBoxThumb');
                        div.setAttribute('draggable', 'false');
                        div.dataset.thumbno = pnlBoxThumb.length;
                        div.dataset.type = "vector";
                        div.innerHTML = this.result;

                        var svgChild = "";
                        var getSVGTag;

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

    }

    isDragUpload = false;
    configScroll[2].children[0].style.backgroundColor = "transparent";
}
document.querySelectorAll('.configScroll')[2].addEventListener('drop', dragDropUploadThumb);

//================HOVER AND LEAVE FROM THUMB=================-

function dblClickThumb() {

    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');

    for(var b = 0; b < focusPanel.length; b++) {
        focusPanel[b] = null;
    }

    for(var a = 0; a < pnlBoxThumb.length; a++) {
        pnlBoxThumb[a].style.borderColor = "transparent";
        pnlBoxThumb[a].style.borderWidth = "1px";
        this.style.backgroundColor = "transparent"
        //pnlBoxThumb[a].children[0].style.filter = "saturate(.7) blur(.2px)";
    }

    if(this.dataset.type == "image") {
        createPnlBoxImage(this.dataset.thumbno);
    }
    else if(this.dataset.type == "vector") {
        createPnlBoxVector(this.dataset.thumbno);
    }

    this.removeEventListener('pointerover', pointerOverThumb);
}

function pointerOverThumb() {

    let leadPanel = this.closest('.pnlBoxThumb');
    let matching = false;

    for(let a = 0; a < focusPanel.length; a++) {
        if(leadPanel == focusPanel[a]) {
            matching = true;
            break;
        }
    }

    if(matching) {
        
        //this.style.borderColor = "#6885CC";
        this.style.borderColor = "#647499";
        this.style.borderWidth = "1px";
        //this.style.backgroundColor = "#343C4F"
    }
    else {
        //this.style.borderColor = "#6885CC"; //highlight
        this.style.borderColor = "#647499";
        this.style.borderWidth = "1px"; //highlight
        //this.style.backgroundColor = "#343C4F"
    }

}

function pointerLeaveThumb() {

    let leadPanel = this.closest('.pnlBoxThumb');
    let matching = false;

    for(let a = 0; a < focusPanel.length; a++) {
        if(leadPanel == focusPanel[a]) {
            matching = true;
            break;
        }
    }

    if(matching) {
        
        //this.style.borderColor = "#6885CC";
        this.style.borderColor = "#647499";
        this.style.borderWidth = "1px";
        //this.style.backgroundColor = "#343C4F"
 
    }
    else {
        this.style.borderColor = "transparent";
        this.style.borderWidth = "1px";
        this.style.backgroundColor = "transparent"
        this.addEventListener('pointerover', pointerOverThumb)
    }
    
}

//=================DRAG AND DROP ON CNVPIN / WORKAREA=================

function createCanvasFromThumb() {

    let partHistory = history[h].trim().split('*');

    for(let a = 1; a < partHistory.length; a++) {

        let n = valueFinder(partHistory[a], 'thumbno');

        if(n != null) {
   
            if(partHistory[a].includes('<svg')) {
                createPnlBoxVector(n);
            }
            else if(partHistory[a].includes('data:image/')) {
                createPnlBoxImage(n);
            }
        }

    }
}

function dragDropUpload(e) {

    var initFiles = 0;
    let reader = [];
    let pnlBoxThumb = document.getElementsByClassName('pnlBoxThumb');
    let configScroll = document.getElementsByClassName('configScroll');

    h++;
    history[h] = 'Uploaded';

    var maxFiles = e.dataTransfer.files.length;

    for(var a = 0; a < e.dataTransfer.files.length; a++) {

        //if dropped is a file
        if(e.dataTransfer.items[a].kind == "file") {

            //if file is an image
            if(e.dataTransfer.items[a].type.match("image")) {

                //check if file is svg
                var chkSVG = /svg/;

                var resultSVG = chkSVG.test(e.dataTransfer.items[a].type);

                if(!resultSVG) {

                    reader[a] = new FileReader();

                    reader[a].readAsDataURL(e.dataTransfer.files[a]);

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
                    reader[a].readAsText(e.dataTransfer.files[a]); //read the file to dataURL for raster output
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

    resetAllFocus();
   
}
cnvPin.addEventListener('drop', dragDropUpload);

function draggingUpload(e) {
    let configScroll = document.getElementsByClassName('configScroll');
    configScroll[2].children[0].style.backgroundColor = "transparent";
}
cnvPin.addEventListener('dragover', draggingUpload);