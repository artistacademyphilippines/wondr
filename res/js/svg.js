//======================CREATE VECTOR===================

function createSVG(f, n, source, post) {

    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
    let txtSizeWidth = document.querySelector('.txtSizeWidth');
    let txtSizeHeight = document.querySelector('.txtSizeHeight');

    //USE AWAIT AND THEN SINCE THERE'S ISSUE IF JUST USING AWAIT
    //ISSUE IS THE DATA NOT BEING USED FIRST EVEN WITH 'AWAIT'

    canvas.innerHTML = source;

    //process the svg and add <g> tag
    let svgChild = "";
    
    for(let a = 0; a < canvas.querySelector('svg').childElementCount; a++) {
        svgChild += canvas.querySelector('svg').children[a].outerHTML;
    }
    
    //add the <g> tag
    canvas.children[0].innerHTML = `<g style="mix-blend-mode:normal" opacity="1"></g>`;

    //add the svgChild back
    canvas.children[0].children[0].innerHTML = svgChild;

    let aspectRatio;
    let bbox = canvas.querySelector('svg').getBBox();
    let bboxW = Number(bbox.width);
    let bboxH = Number(bbox.height);

    //check the element position
    if(post == 'center') {

        if(Number(txtSizeWidth.value) > Number(txtSizeHeight.value)) {
            if(bboxW > bboxH) {
                aspectRatio = bboxH / bboxW;
                canvas.style.height = `${Math.round(txtSizeHeight.value * 0.25)}px`;
                canvas.style.width =  `${canvas.clientHeight / aspectRatio}px`;
            }
            else if(bboxW < bboxH) {
                aspectRatio = bboxW / bboxH;

                canvas.style.height = `${Math.round(txtSizeHeight.value * 0.25)}px`;
                canvas.style.width =  `${canvas.clientHeight * aspectRatio}px`;
            }
            else if(bboxW == bboxH) {
                aspectRatio = bboxW / bboxH;

                canvas.style.height = `${Math.round(txtSizeHeight.value * 0.25)}px`;
                canvas.style.width =  `${canvas.clientHeight / aspectRatio}px`;
            }
           
        }
        else if(Number(txtSizeWidth.value) < Number(txtSizeHeight.value)) {
            if(bboxW > bboxH) {
                aspectRatio = bboxH / bboxW;
                canvas.style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                canvas.style.height = `${canvas.clientWidth * aspectRatio}px`;
            }
            else if(bboxW < bboxH) {
                aspectRatio = bboxW / bboxH;
                canvas.style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                canvas.style.height = `${canvas.clientWidth / aspectRatio}px`;
            }

            else if(bboxW == bboxH) {
                aspectRatio = bboxH / bboxW;
                canvas.style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                canvas.style.height = `${canvas.clientWidth / aspectRatio}px`;
            }
        }
    
        else if(Number(txtSizeWidth.value) == Number(txtSizeHeight.value)) {
         
            if(bboxW > bboxH) {
                aspectRatio = bboxH / bboxW;
                canvas.style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                canvas.style.height = `${canvas.clientWidth * aspectRatio}px`;
            }
            else if(bboxW < bboxH) {
                aspectRatio = bboxW / bboxH;
                canvas.style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                canvas.style.height = `${canvas.clientWidth / aspectRatio}px`;
            }

            else if(bboxW == bboxH) {
                aspectRatio = bboxH / bboxW;
                canvas.style.width = `${Math.round(txtSizeWidth.value * 0.25)}px`;
                canvas.style.height = `${canvas.clientWidth / aspectRatio}px`;
            }
            
        }
        
    }

    canvas.style.left = `${(txtSizeWidth.value / 2) - (canvas.clientWidth/2)}px`;
    canvas.style.top = `${(txtSizeHeight.value / 2) - (canvas.clientHeight/2)}px`;

    //register the default Width and Height of this SVG
    svgOldW[f] = Number(canvas.children[0].getAttribute('viewBox').split(' ')[2]);
    svgOldH[f] = Number(canvas.children[0].getAttribute('viewBox').split(' ')[3]);

    //get fill and stroke color
    let fillColor = "A9AEFF";
    let strokeColor = "647499";
    let strokeWidth = 20;
    
    //position both children as absolute
    canvas.children[0].style.position = "absolute";
    canvas.children[0].setAttribute('width', canvas.clientWidth);
    canvas.children[0].setAttribute('height', canvas.clientHeight);
    canvas.children[0].setAttribute('viewBox', `0 0 ${canvas.clientWidth} ${canvas.clientHeight}`)

    let newW = Number(canvas.children[0].getAttribute('width'));
    let newH = Number(canvas.children[0].getAttribute('height'));
    let scaleX = newW / svgOldW[f];
    let scaleY = newH / svgOldH[f];

    let svgType = canvas.querySelector('g').children[0].tagName;

    let match;
    let newPath = "";

    if(svgType == 'path') {

        //get path string
        let path = canvas.querySelector('path').getAttribute('d');
        
        //create regex
        const regex = /([a-zA-Z])([^a-zA-z]*)/gi;
    
        while ((match = regex.exec(path)) !== null) {
            
            if(match[1].toUpperCase() != 'Z') {
            
                if(match[1].toUpperCase() == 'M') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'L') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'H') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
            
                    newPath += `${match[1]} ${val1}`;

                }
                else if(match[1].toUpperCase() == 'V') {
                    let val2 = Number(match[2].split(' ')[0]) * scaleY;

                    newPath += `${match[1]} ${val2}`;
                }
                
                else if(match[1].toUpperCase() == 'C') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    let val3 = Number(match[2].split(' ')[2]) * scaleX;
                    let val4 = Number(match[2].split(' ')[3]) * scaleY;

                    let val5 = Number(match[2].split(' ')[4]) * scaleX;
                    let val6 = Number(match[2].split(' ')[5]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6}`;

                }
                
                else if(match[1].toUpperCase() == 'S') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    let val3 = Number(match[2].split(' ')[2]) * scaleX;
                    let val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'Q') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    let val3 = Number(match[2].split(' ')[2]) * scaleX;
                    let val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'T') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;

                }
                else if(match[1].toUpperCase() == 'A') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    let val3 = Number(match[2].split(' ')[0]);
                    let val4 = Number(match[2].split(' ')[1]);

                    let val5 = Number(match[2].split(' ')[0]);
                    let val6 = Number(match[2].split(' ')[1]) * scaleY;

                    let val7 = Number(match[2].split(' ')[0]) * scaleX;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6} ${val7}`;
                }
            }
            else {
                newPath += 'Z';
            }
        }

        //append the scaled path
        let appendDefs = `
        <mask id="vectorMask${f}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g>
                <path d="${newPath}" fill="black" />
            </g>
        </mask>`
        canvas.children[0].insertAdjacentHTML('afterbegin', appendDefs);
        canvas.children[0].children[1].querySelector('path').setAttribute('d', newPath);

        
        let node  = canvas.children[0].children[1];
        let clone = node.cloneNode(true);
        canvas.children[0].appendChild(clone);

        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${f})`);
        canvas.querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        canvas.querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        canvas.querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }   

    else if(svgType == 'ellipse') {
        let cx = Number(canvas.querySelector('ellipse').getAttribute('cx'));
        let cy = Number(canvas.querySelector('ellipse').getAttribute('cy'));
        let rx = Number(canvas.querySelector('ellipse').getAttribute('rx'));
        let ry = Number(canvas.querySelector('ellipse').getAttribute('ry'));

        let appendDefs = `
        <mask id="vectorMask${f}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g>
                <ellipse cx="${cx * scaleX}" cy="${cy * scaleY}" rx="${rx * scaleX}" ry="${ry * scaleY}" fill="black" />
            </g>
        </mask>`

        canvas.children[0].insertAdjacentHTML('afterbegin', appendDefs);
        canvas.children[0].children[1].querySelector('ellipse').setAttribute('cx', cx * scaleX);
        canvas.children[0].children[1].querySelector('ellipse').setAttribute('cy', cy * scaleY);
        canvas.children[0].children[1].querySelector('ellipse').setAttribute('rx', rx * scaleX);
        canvas.children[0].children[1].querySelector('ellipse').setAttribute('ry', ry * scaleY);

        let node  = canvas.children[0].children[1];
        let clone = node.cloneNode(true);
        canvas.children[0].appendChild(clone);

        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${f})`);
        canvas.querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        canvas.querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        canvas.querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }

    else if(svgType == 'rect') {
        
        let rx = 0;
        let ry = 0;
        let rw = canvas.clientWidth;
        let rh = canvas.clientHeight;

        let appendDefs = `
        <mask id="vectorMask${f}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g>
                <rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="black" />
            </g>
        </mask>`

        canvas.children[0].insertAdjacentHTML('afterbegin', appendDefs);
        canvas.children[0].children[1].querySelector('rect').setAttribute('x', rx);
        canvas.children[0].children[1].querySelector('rect').setAttribute('y', ry);
        canvas.children[0].children[1].querySelector('rect').setAttribute('width', rw);
        canvas.children[0].children[1].querySelector('rect').setAttribute('height', rh);

        let node  = canvas.children[0].children[1];
        let clone = node.cloneNode(true);
        canvas.children[0].appendChild(clone);

        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${f})`);
        canvas.querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        canvas.querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        canvas.querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }
    
    canvas.children[0].setAttribute('width', canvas.clientWidth + strokeWidth*2);
    canvas.children[0].setAttribute('height', canvas.clientHeight + strokeWidth*2);
    canvas.children[0].setAttribute('viewBox', `0 0 ${canvas.clientWidth + strokeWidth*2} ${canvas.clientHeight + strokeWidth*2}`);

    canvas.children[0].style.left = 0 - (canvas.children[0].clientWidth - canvas.clientWidth) / 2 + 'px';
    canvas.children[0].style.top = 0 - (canvas.children[0].clientHeight - canvas.clientHeight) / 2 + 'px';

    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtWidthLayer', `${canvas.clientWidth}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtHeightLayer', `${canvas.clientHeight}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtXLayer', `${canvas.offsetLeft}`);
    dataLayer[f] = valueSwitcher(dataLayer[f], 'txtYLayer', `${canvas.offsetTop}`);
    
}

function getNewVector(Ax, Ay, Bx, By, r) {

    var ABx = Bx - Ax;
    var ABy = By - Ay;
    var magnitudeAB = Math.sqrt((ABx ** 2) + (ABy ** 2));
    var normalizeX = ABx / magnitudeAB;
    var normalizeY = ABy / magnitudeAB;

    var newAx, newBx, newAy, newBy, cpAx, cpAy, cpBx, cpBy;

    newAx = Ax + (r * normalizeX);
    newBx = Bx - (r * normalizeX);

    newAy = Ay + (r * normalizeY);
    newBy = By - (r * normalizeY);

    cpAx = Ax + (r / 2 * normalizeX);
    cpAy = Ay + (r / 2 * normalizeY);

    cpBx = Bx - (r / 2 * normalizeX);
    cpBy = By - (r / 2 * normalizeY);

    return [newAx, newAy, newBx, newBy, cpAx, cpAy, cpBx, cpBy];

}

function resizeDefaultPath(f) {
    
    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)
    let n = Number(canvas.dataset.thumbno);

    let configScroll = document.getElementsByClassName('configScroll');

    let getSVG = configScroll[3].querySelector(`[data-thumbno = "${n}"]`).children[0].children[0];

    canvas.innerHTML = getSVG.outerHTML;

    //process the svg and add <g> tag
    let svgChild = canvas.children[0].children[0].outerHTML;
    
    //add the <g> tag
    canvas.children[0].innerHTML = `<g style="mix-blend-mode:normal" opacity="1"></g>`;

    //add the svgChild back
    canvas.children[0].children[0].innerHTML = svgChild;

    //register the default Width and Height of this SVG
    svgOldW[f] = Number(canvas.children[0].getAttribute('viewBox').split(' ')[2]);
    svgOldH[f] = Number(canvas.children[0].getAttribute('viewBox').split(' ')[3]);
    
    let panel = document.getElementById('pnlBoxElement');

    //get fill and stroke color
    let fillColor = panel.querySelector('.txtElementFillColor').value;
    let strokeColor = panel.querySelector('.txtElementStrokeColor').value;
    let strokeWidth = Number(panel.querySelector('.txtElementStrokeWidth').value);
    
    //position both children as absolute
    canvas.children[0].setAttribute('width', canvas.clientWidth);
    canvas.children[0].setAttribute('height', canvas.clientHeight);
    canvas.children[0].setAttribute('viewBox', `0 0 ${canvas.clientWidth} ${canvas.clientHeight}`)

    let newW = Number(canvas.children[0].getAttribute('width'));
    let newH = Number(canvas.children[0].getAttribute('height'));
    let scaleX = newW / svgOldW[f];
    let scaleY = newH / svgOldH[f];

    let svgType = canvas.querySelector('g').children[0].tagName;

    if(svgType == 'path') {

        //get path string
        var path = canvas.querySelector('path').getAttribute('d');
    
        //create regex
        const regex = /([a-zA-Z])([^a-zA-z]*)/gi;
        
        var match;
        var newPath = "";

        while ((match = regex.exec(path)) !== null) {
            
            if(match[1].toUpperCase() != 'Z') {
            
                if(match[1].toUpperCase() == 'M') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'L') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'H') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
            
                    newPath += `${match[1]} ${val1}`;

                }
                else if(match[1].toUpperCase() == 'V') {
                    var val2 = Number(match[2].split(' ')[0]) * scaleY;

                    newPath += `${match[1]} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'C') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    var val5 = Number(match[2].split(' ')[4]) * scaleX;
                    var val6 = Number(match[2].split(' ')[5]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6}`;

                }
                else if(match[1].toUpperCase() == 'S') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'Q') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[2]) * scaleX;
                    var val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'T') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;

                }
                else if(match[1].toUpperCase() == 'A') {
                    var val1 = Number(match[2].split(' ')[0]) * scaleX;
                    var val2 = Number(match[2].split(' ')[1]) * scaleY;

                    var val3 = Number(match[2].split(' ')[0]);
                    var val4 = Number(match[2].split(' ')[1]);

                    var val5 = Number(match[2].split(' ')[0]);
                    var val6 = Number(match[2].split(' ')[1]) * scaleY;

                    var val7 = Number(match[2].split(' ')[0]) * scaleX;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6} ${val7}`;
                }

            }
            else {
                newPath += 'Z';
            }

        }

        var appendDefs = `
        <mask id="vectorMask${f}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g style="mix-blend-mode:normal" opacity="1">
                <path d="${newPath}" fill="black" />
            </g>
        </mask>`
        canvas.children[0].insertAdjacentHTML('afterbegin', appendDefs);
        canvas.children[0].children[1].querySelector('path').setAttribute('d', newPath);
        
        var node  = canvas.children[0].children[1];
        var clone = node.cloneNode(true);
        canvas.children[0].appendChild(clone);

        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${f})`);
        canvas.querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        canvas.querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        canvas.querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }
    
    canvas.children[0].setAttribute('width', canvas.clientWidth + strokeWidth*2);
    canvas.children[0].setAttribute('height', canvas.clientHeight + strokeWidth*2);
    canvas.children[0].setAttribute('viewBox', `0 0 ${canvas.clientWidth + strokeWidth*2} ${canvas.clientHeight + strokeWidth*2}`);

    canvas.children[0].style.left = 0 - (canvas.children[0].clientWidth - canvas.clientWidth) / 2 + 'px';
    canvas.children[0].style.top = 0 - (canvas.children[0].clientHeight - canvas.clientHeight) / 2 + 'px';
    
    return newPath;

}

function curveSVG(f, option) {

    var i = 0;
    var newPath = [];
    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
    var svgShape = canvas.querySelector('svg').id;
    var svgType = canvas.querySelector('g').children[0].tagName;
    var panel = document.getElementById('pnlBoxElement')
    var cornerRadius = panel.querySelector('.txtElementCornerRadius').value;

    if(svgType == 'path') {

        var lastCP;
        var lastCoor;

        //get reformatted path string
        var splitPath = resizeDefaultPath(f).split(/(?=\s*[a-zA-Z])/);

        //REFORMAT SPLITPATH
        for(var a = 0; a < splitPath.length; a++) {
            //CONVERT ANY HORIZONTAL TO LINE ATTRIBUTE
            if(splitPath[a].charAt(0) == 'H') {
                var currX = splitPath[a].split(' ')[1];
                var prevY = splitPath[a-1].split(' ')[2];
                splitPath[a] = 'L ' + currX + ' ' + prevY;
                
            }
            //CONVERT ANY VERTICAL TO LINE ATTRIBUTE
            else if(splitPath[a].charAt(0) == 'V') {
                var currY = splitPath[a].split(' ')[1];
                var prevX = splitPath[a-1].split(' ')[1];
                splitPath[a] = 'L ' + prevX + ' ' + currY;
            }
        }

        for(var a = 0; a < splitPath.length; a++) {

            if(splitPath[a+1] != null) {

                var Ax = Number(splitPath[a].split(' ')[1]);
                var Ay = Number(splitPath[a].split(' ')[2]);

                //if splitpath is not null or go back from the start
                var Bx = Number(splitPath[a+1].split(' ')[1]);
                var By = Number(splitPath[a+1].split(' ')[2]);

                var newAx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[0];
                var newAy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[1];
                var newBx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[2];
                var newBy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[3];
                var newCPAx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[4];
                var newCPAy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[5];
                var newCPBx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[6];
                var newCPBy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[7];
                
                ////CHECK IF MOVE TO LINE
                if(splitPath[a].charAt(0).toUpperCase() == 'M' && splitPath[a+1].charAt(0).toUpperCase() == 'L') {
                    
                    if(svgShape.search('star') < 0) {
                        //prepare last control point
                        lastCP = [newCPAx, newCPAy];
                        //copy first coordinates to last
                        lastCoor = [newAx, newAy, 'Z'];

                        newPath[i]  = ['M', newAx, newAy];
                        i++;
                        newPath[i] = ['L', newBx, newBy];
                        i++;
                        newPath[i] = ['C', newCPBx, newCPBy];
                        i++;
                    }
                    else {
                        //prepare last control point
                        lastCP = [newCPAx, newCPAy];
                        //copy first coordinates to last
                        lastCoor = [newAx, newAy, 'Z'];

                        newPath[i]  = ['M', newAx, newAy];
                        i++;
                        newPath[i] = ['L', Bx, By];
                        i++;  
                    }
                }

                //CHECK IF MOVE TO CURVE
                else if(splitPath[a].charAt(0).toUpperCase() == 'M' && splitPath[a+1].charAt(0).toUpperCase() == 'C') {
                    
                    lastCoor = [splitPath[a].split(' ')[1], splitPath[a].split(' ')[2], 'Z'];

                    newPath[i] = [];
                    for(var b = 0; b < splitPath[a].split(' ').length; b++) {
                        newPath[i].push(splitPath[a].split(' ')[b]);
                    }
                    i++;

                }

                //CHECK IF LINE TO LINE
                else if(splitPath[a].charAt(0).toUpperCase() == 'L' && splitPath[a+1].charAt(0).toUpperCase() == 'L') {
                    
                    if(svgShape.search('star') < 0) {
                        newPath[i] = [newCPAx, newCPAy, newAx, newAy];
                        i++;
                        newPath[i] = ['L', newBx, newBy];
                        i++;
                        newPath[i] = ['C', newCPBx, newCPBy];
                        i++;
                    }
                    else {
                        if(a%2 != 0) {
                            newPath[i] = ['L', newBx, newBy];
                            i++;
                            newPath[i] = ['C', newCPBx, newCPBy];
                            i++;
                        }
                        else {
                            newPath[i] = [newCPAx, newCPAy, newAx, newAy];
                            i++;
                            newPath[i] = ['L', Bx, By];
                            i++;
                  
                        }
                    } 
                }

                //CHECK IF CURVE TO CURVE
                else if(splitPath[a].charAt(0).toUpperCase() == 'C' && splitPath[a+1].charAt(0).toUpperCase() == 'C') {
                    
                    newPath[i] = [];
                    for(var b = 0; b < splitPath[a].split(' ').length; b++) {
                        newPath[i].push(splitPath[a].split(' ')[b]);
                    }
                    i++;
                }
            }
            else {
                
                var Ax = Number(splitPath[a].split(' ')[1]);
                var Ay = Number(splitPath[a].split(' ')[2]);

                //if splitpath is not null or go back from the start
               
                var Bx = Number(splitPath[0].split(' ')[1]);
                var By = Number(splitPath[0].split(' ')[2]);

                var newAx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[0];
                var newAy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[1];
                var newBx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[2];
                var newBy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[3];
                var newCPAx = getNewVector(Ax, Ay, Bx, By, cornerRadius)[4];
                var newCPAy = getNewVector(Ax, Ay, Bx, By, cornerRadius)[5];

                
                //check then if initial line is straight
                if(splitPath[a].charAt(0).toUpperCase() == 'Z' && splitPath[0].charAt(0).toUpperCase() == 'M') {
                    
                    if(splitPath[a-1].split(' ')[0] == 'L') {
                        newPath[i] = lastCP;
                        i++;
                        newPath[i] = lastCoor;
                    }
                    else if(splitPath[a-1].split(' ')[0] == 'C') {
                        newPath[i] = [];
                        for(var b = 0; b < splitPath[a-1].split(' ').length; b++) {
                            newPath[i].push(splitPath[a-1].split(' ')[b]);
                        }
                        i++;
                        newPath[i] = ['Z'];

                    }
                    
            
                }
            }
            
        }

        //now connect the loose ends
        var finalPath = "";
        for(var a = 0; a < newPath.length; a++) {
            
            if(newPath[a].length > 0) {
                for(var b = 0; b < newPath[a].length; b++) {
                    finalPath += newPath[a][b];
                    finalPath += ' ';
                }
            }
         
        }
        
        canvas.querySelectorAll('path')[0].setAttribute('d', finalPath);
        canvas.querySelectorAll('path')[1].setAttribute('d', finalPath);
        canvas.querySelectorAll('path')[2].setAttribute('d', finalPath);
    }

    else if(svgType == 'rect') {
        canvas.querySelectorAll('rect')[1].setAttribute('rx', cornerRadius);
        canvas.querySelectorAll('rect')[2].setAttribute('rx', cornerRadius);
        canvas.querySelectorAll('rect')[3].setAttribute('rx', cornerRadius);
    }

    if(option == "upload") {
        initPanel++;
        if(initPanel == panelCountMax) {
            useVectorPanel();
        }
    }
}

function renderSVG(f, option) {

    let n = Number(cnvLayers[f].dataset.thumbno);
    let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
    let configScroll = document.getElementsByClassName('configScroll');

    let getSVG = configScroll[3].querySelector(`[data-thumbno = "${n}"]`).children[0].children[0];

    canvas.innerHTML = getSVG.outerHTML;

    //process the svg and add <g> tag
    let svgChild = canvas.children[0].children[0].outerHTML;
    
    //add the <g> tag
    canvas.children[0].innerHTML = `<g style="mix-blend-mode:normal" opacity="1"></g>`;

    //add the svgChild back
    canvas.children[0].children[0].innerHTML = svgChild;

    //register the default Width and Height of this SVG
    svgOldW[f] = Number(canvas.children[0].getAttribute('viewBox').split(' ')[2]);
    svgOldH[f] = Number(canvas.children[0].getAttribute('viewBox').split(' ')[3]);
    
    let panel = document.getElementById('pnlBoxElement');

    //get fill and stroke color
    let fillColor = panel.querySelector('.txtElementFillColor').value;
    let strokeColor = panel.querySelector('.txtElementStrokeColor').value;
    let strokeWidth = Number(panel.querySelector('.txtElementStrokeWidth').value);
    
    //position both children as absolute
    canvas.children[0].setAttribute('width', canvas.clientWidth);
    canvas.children[0].setAttribute('height', canvas.clientHeight);
    canvas.children[0].setAttribute('viewBox', `0 0 ${canvas.clientWidth} ${canvas.clientHeight}`)

    let newW = Number(canvas.children[0].getAttribute('width'));
    let newH = Number(canvas.children[0].getAttribute('height'));
    let scaleX = newW / svgOldW[f];
    let scaleY = newH / svgOldH[f];

    let svgType = canvas.querySelector('g').children[0].tagName;

    if(svgType == 'path') {

        //get path string
        let path = canvas.querySelector('path').getAttribute('d');
        
        //create regex
        const regex = /([a-zA-Z])([^a-zA-z]*)/gi;
        
        let match;
        let newPath = "";

        while ((match = regex.exec(path)) !== null) {
            
            if(match[1].toUpperCase() != 'Z') {
            
                if(match[1].toUpperCase() == 'M') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'L') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;
                }
                else if(match[1].toUpperCase() == 'H') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
            
                    newPath += `${match[1]} ${val1}`;

                }
                else if(match[1].toUpperCase() == 'V') {
                    let val2 = Number(match[2].split(' ')[0]) * scaleY;

                    newPath += `${match[1]} ${val2}`;
                }
                
                else if(match[1].toUpperCase() == 'C') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    let val3 = Number(match[2].split(' ')[2]) * scaleX;
                    let val4 = Number(match[2].split(' ')[3]) * scaleY;

                    let val5 = Number(match[2].split(' ')[4]) * scaleX;
                    let val6 = Number(match[2].split(' ')[5]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6}`;

                }
                
                else if(match[1].toUpperCase() == 'S') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    let val3 = Number(match[2].split(' ')[2]) * scaleX;
                    let val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'Q') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    let val3 = Number(match[2].split(' ')[2]) * scaleX;
                    let val4 = Number(match[2].split(' ')[3]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4}`;
                }
                else if(match[1].toUpperCase() == 'T') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    newPath += `${match[1]} ${val1} ${val2}`;

                }
                else if(match[1].toUpperCase() == 'A') {
                    let val1 = Number(match[2].split(' ')[0]) * scaleX;
                    let val2 = Number(match[2].split(' ')[1]) * scaleY;

                    let val3 = Number(match[2].split(' ')[0]);
                    let val4 = Number(match[2].split(' ')[1]);

                    let val5 = Number(match[2].split(' ')[0]);
                    let val6 = Number(match[2].split(' ')[1]) * scaleY;

                    let val7 = Number(match[2].split(' ')[0]) * scaleX;

                    newPath += `${match[1]} ${val1} ${val2} ${val3} ${val4} ${val5} ${val6} ${val7}`;
                }

            }
            else {
                newPath += 'Z';
            }

        }

        let appendDefs = `
        <mask id="vectorMask${f}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g style="mix-blend-mode:normal" opacity="1">
                <path d="${newPath}" fill="black" />
            </g>
        </mask>`
        canvas.children[0].insertAdjacentHTML('afterbegin', appendDefs);
        canvas.children[0].children[1].querySelector('path').setAttribute('d', newPath);
        
        let node  = canvas.children[0].children[1];
        let clone = node.cloneNode(true);
        canvas.children[0].appendChild(clone)

        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${f})`);
        canvas.querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);
        
        canvas.querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        canvas.querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }

    else if(svgType == 'ellipse') {
        let cx = Number(canvas.querySelector('ellipse').getAttribute('cx'));
        let cy = Number(canvas.querySelector('ellipse').getAttribute('cy'));
        let rx = Number(canvas.querySelector('ellipse').getAttribute('rx'));
        let ry = Number(canvas.querySelector('ellipse').getAttribute('ry'));

        let appendDefs = `
        <mask id="vectorMask${f}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g>
                <ellipse cx="${cx * scaleX}" cy="${cy * scaleY}" rx="${rx * scaleX}" ry="${ry * scaleY}" fill="black" />
            </g>
        </mask>`

        canvas.children[0].insertAdjacentHTML('afterbegin', appendDefs);
        canvas.children[0].children[1].querySelector('ellipse').setAttribute('cx', cx * scaleX);
        canvas.children[0].children[1].querySelector('ellipse').setAttribute('cy', cy * scaleY);
        canvas.children[0].children[1].querySelector('ellipse').setAttribute('rx', rx * scaleX);
        canvas.children[0].children[1].querySelector('ellipse').setAttribute('ry', ry * scaleY);

        let node  = canvas.children[0].children[1];
        let clone = node.cloneNode(true);
        canvas.children[0].appendChild(clone);

        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${f})`);
        canvas.querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        canvas.querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        canvas.querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);

    }

    else if(svgType == 'rect') {
 
        let rx = 0;
        let ry = 0;
        let rw = canvas.clientWidth;
        let rh = canvas.clientHeight;

        let appendDefs = `
        <mask id="vectorMask${f}" maskUnits="userSpaceOnUse" x="-${strokeWidth}" y="-${strokeWidth}">
            <rect x="-${strokeWidth}" y="-${strokeWidth}" width="100%" height="100%" fill="white" />
            <g>
                <rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="black" />
            </g>
        </mask>`

        canvas.children[0].insertAdjacentHTML('afterbegin', appendDefs);
        canvas.children[0].children[1].querySelector('rect').setAttribute('x', rx);
        canvas.children[0].children[1].querySelector('rect').setAttribute('y', ry);
        canvas.children[0].children[1].querySelector('rect').setAttribute('width', rw);
        canvas.children[0].children[1].querySelector('rect').setAttribute('height', rh);

        let node  = canvas.children[0].children[1];
        let clone = node.cloneNode(true);
        canvas.children[0].appendChild(clone);

        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke', "#" + strokeColor);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('stroke-width', strokeWidth);
        canvas.querySelectorAll('g')[1].children[0].setAttribute('mask', `url(#vectorMask${f})`);
        canvas.querySelectorAll('g')[2].children[0].setAttribute('fill', "#" + fillColor);

        canvas.querySelector('svg').children[1].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
        canvas.querySelector('svg').children[2].setAttribute('transform',  `translate(${strokeWidth}, ${strokeWidth})`);
    }
    
    canvas.children[0].setAttribute('width', canvas.clientWidth + strokeWidth*2);
    canvas.children[0].setAttribute('height', canvas.clientHeight + strokeWidth*2);
    canvas.children[0].setAttribute('viewBox', `0 0 ${canvas.clientWidth + strokeWidth*2} ${canvas.clientHeight + strokeWidth*2}`);

    canvas.children[0].style.left = 0 - (canvas.children[0].clientWidth - canvas.clientWidth) / 2 + 'px';
    canvas.children[0].style.top = 0 - (canvas.children[0].clientHeight - canvas.clientHeight) / 2 + 'px';

    curveSVG(f, option)

    
}

