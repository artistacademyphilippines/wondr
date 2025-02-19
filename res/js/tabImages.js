var dataLayer = [];

//===========================IMAGE LAYER======================

//this will format the pnlBoxPatterns header name to avoid duplicate

function autoIncrementLayer(name) {

    let counter = 1;
    let arrName = null;
    let txtHeader = document.getElementsByClassName('txtHeader');

    for(var a = 0; a < txtHeader.length; a++) {
        arrName = txtHeader[a].value.split(" ");
        if(arrName[0] == name) {
            if(Number(arrName[1]) >= counter ) {
                counter = Number(arrName[1]) + 1;
            }
        }
    }
    
    return newLayerHeader = name + " " + counter;
}

//============================LAYER BLEND======================

for(var b = 0; b < document.getElementById('pnlBoxImage').querySelectorAll('.optLayerBlend').length; b++) {
    document.getElementById('pnlBoxImage').querySelectorAll('.optLayerBlend')[b].addEventListener('click', chooseLayerBlend);
}

//=============================LAYER WIDTH / HEIGHT SIZE=====================

document.getElementById('pnlBoxImage').querySelector('.txtWidthLayer').addEventListener('change', adjustLayerWidth);
document.getElementById('pnlBoxImage').querySelector('.txtHeightLayer').addEventListener('change', adjustLayerHeight);

//=============================LAYER X /Y COORDINATES====================

document.getElementById('pnlBoxImage').querySelector('.txtXLayer').addEventListener('change', adjustLayerX);
document.getElementById('pnlBoxImage').querySelector('.txtYLayer').addEventListener('change', adjustLayerY);

//=============================FLIP X COORDINATES====================

document.getElementById('pnlBoxImage').querySelector('.chkFlipX').addEventListener('click', adjustFlipX);

//=============================FLIP Y COORDINATES====================

document.getElementById('pnlBoxImage').querySelector('.chkFlipY').addEventListener('click', adjustFlipY);

//==============================IMAGE OPACITY========================

document.getElementById('pnlBoxImage').querySelector('.txtOpacityLayer').addEventListener('change', chooseLayerOpacity);
document.getElementById('pnlBoxImage').querySelector('.txtOpacityLayer').previousElementSibling.addEventListener('input', chooseLayerOpacity);

//==============================IMAGE ROTATION========================

document.getElementById('pnlBoxImage').querySelector('.txtRotationLayer').addEventListener('change', chooseLayerRotation);
document.getElementById('pnlBoxImage').querySelector('.txtRotationLayer').previousElementSibling.addEventListener('input', chooseLayerRotation);

//==============================IMAGE BLUR========================
function adjustBlur() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {
                if(canvas.style.filter.includes('blur')) {
                    canvas.style.filter = canvas.style.filter.replace(/blur\([^\)]+\)/, `blur(${this.value}px)`)
                }
                else {
                    canvas.style.filter += `blur(${this.value}px)\n`;
                }
            }
        }
    }

}
document.getElementById('pnlBoxImage').querySelector('.txtBlur').addEventListener('change', adjustBlur);
document.getElementById('pnlBoxImage').querySelector('.txtBlur').previousElementSibling.addEventListener('input', adjustBlur);


function adjustBrightness() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {
                
                if(canvas.style.filter.includes('brightness')) {
                    canvas.style.filter = canvas.style.filter.replace(/brightness\([^\)]+\)/, `brightness(${this.value}%)`)
                }
                else {
                    canvas.style.filter += `brightness(${this.value}%)\n`;
                }
            }
        }
    }

}
document.getElementById('pnlBoxImage').querySelector('.txtBrightness').addEventListener('change', adjustBrightness);
document.getElementById('pnlBoxImage').querySelector('.txtBrightness').previousElementSibling.addEventListener('input', adjustBrightness);

function adjustContrast() {

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {

                if(canvas.style.filter.includes('contrast')) {
                    canvas.style.filter = canvas.style.filter.replace(/contrast\([^\)]+\)/, `contrast(${this.value}%)`)
                }
                else {
                    canvas.style.filter += `contrast(${this.value}%)\n`;
                }
            }
        }
    }
    
}
document.getElementById('pnlBoxImage').querySelector('.txtContrast').addEventListener('change', adjustContrast);
document.getElementById('pnlBoxImage').querySelector('.txtContrast').previousElementSibling.addEventListener('input', adjustContrast);

function adjustSaturation() {
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {

                if(canvas.style.filter.includes('saturate')) {
                    canvas.style.filter = canvas.style.filter.replace(/saturate\([^\)]+\)/, `saturate(${this.value}%)\n`)
                }
                else {
                    canvas.style.filter += `saturate(${this.value}%)\n`;
                }
            }
        }
    }
}
document.getElementById('pnlBoxImage').querySelector('.txtSaturation').addEventListener('change', adjustSaturation);
document.getElementById('pnlBoxImage').querySelector('.txtSaturation').previousElementSibling.addEventListener('input', adjustSaturation);

function createImgTemp(canvas, temp) {

    //add canvas temperature
    let f = canvas.dataset.ref;
    let cnvTemp = document.createElement('canvas');
    cnvTemp.width = canvas.clientWidth;
    cnvTemp.height = canvas.clientHeight;
    let ctxTemp = cnvTemp.getContext('2d');
   
    //draw image on canvas
    ctxTemp.drawImage(canvas.children[1], 0, 0, cnvTemp.width, cnvTemp.height);

    const imageData = ctxTemp.getImageData(0, 0, cnvTemp.width, cnvTemp.height);
    const data = imageData.data;

    if(temp == "cold") {
            // Loop through each pixel in the image data
        for (let i = 0; i < data.length; i += 4) {

            data[i] = 0;
            data[i + 1] = 87;
            data[i + 2] = 255;
            
        }

        ctxTemp.putImageData(imageData, 0, 0);

        let img = new Image();
        img.dataset.value = "cold";
        img.src = cnvTemp.toDataURL('image/png');
        img.onload = function() {
            canvas.append(img);
            img.style.opacity = 0 + '%';
            img.style.mixBlendMode = "soft-light";
            validateData(dataLayer[f], document.getElementById('pnlBoxImage'));
            
            initPanel++;
            if(initPanel == panelCountMax) {
                resetAllFocus();
                rearrangeUploadedPanels();
            }
        }
    }
    else {
        for (let i = 0; i < data.length; i += 4) {

            data[i] = 255;
            data[i + 1] = 153;
            data[i + 2] = 0;
        }
    
        ctxTemp.putImageData(imageData, 0, 0);
    
        let img = new Image();
        img.dataset.value = "warm";
        img.src = cnvTemp.toDataURL('image/png');
        img.onload = function() {
            canvas.append(img);
            img.style.opacity = 0 + '%';
            img.style.mixBlendMode = "soft-light";
            validateData(dataLayer[f], document.getElementById('pnlBoxImage'));
            
            initPanel++;

            if(initPanel == panelCountMax) {
                resetAllFocus();
                rearrangeUploadedPanels();
            }
        }
    }

}

function adjustTemperature() {

    //get opacity
    let o = Math.abs(this.value) * 0.5;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {
                 //get color
                
                if(Number(this.value) < 0) {
                    
                    //check if there's already an image temp over
                    canvas.dataset.temp = "cold";
                    if(canvas.children[2] == null) {
                        createImgTemp(canvas, "cold")
                    }
                    else {
                        if(canvas.children[2].dataset.value == "cold") {
                            canvas.children[2].style.opacity = o + '%';
                        }
                        else {
                            canvas.children[2].remove();
                            canvas.children[2] = null;
                            createImgTemp(canvas, "cold");
                        }
                        
                    }
                    
                }
                else if(Number(this.value) > 0) {
                    
                    //check if there's already an image temp over
                    canvas.dataset.temp = "warm";
                    if(canvas.children[2] == null) {
                       
                        createImgTemp(canvas, "warm")
                    }
                    else {
                        if(canvas.children[2].dataset.value == "warm") {
                            canvas.children[2].style.opacity = o + '%';
                        }
                        else {
                            canvas.children[2].remove();
                            canvas.children[2] = null;
                            createImgTemp(canvas, "warm");
                        }
                    }
                }
                else if(Number(this.value) == 0) {
                    if(canvas.children[2] != null) {
                        canvas.children[2].innerHTML = "";
                        canvas.children[2].remove();
                        canvas.children[2] =  null;
                    }

                    initPanel++;

                    if(initPanel == panelCountMax) {
                        resetAllFocus();
                        rearrangeUploadedPanels();
                    }
                }
                
            }
        }
    }
}
document.getElementById('pnlBoxImage').querySelector('.txtTemperature').addEventListener('change', adjustTemperature);
document.getElementById('pnlBoxImage').querySelector('.txtTemperature').previousElementSibling.addEventListener('change', adjustTemperature);

function convertHexToRGB(me) {
    var z = [];
    var s = [];
    var append = "";

    myTestHexCode(txtHexValue)

    for(var a=0; a < 6; a++) {

        z[a] = txtHexValue.value.substring(a, a+1);

        if(z[a] != '#') {

            var NAN = Number(z[a]);
            
            if(isNaN(NAN)) {

                s[a] = z[a].toUpperCase();
                z[a] = hexaToDecimal(z[a])
            }
            else {
                s[a] = z[a];
                z[a] = Number(z[a]);
            }
            
            append += s[a];
        }
    }
    
    red = (z[0] * 16) + z[1];
    green = (z[2] * 16) + z[3];
    blue = (z[4] * 16) + z[5];

    txtRedValue.value = red;
    txtGreenValue.value = green;
    txtBlueValue.value = blue;

    hexcode = append.toUpperCase();
    me.value = hexcode;
    me.nextElementSibling.style.backgroundColor = '#' + hexcode;
        
}

//====================================OUTLINE==============================
function adjustImageOutlineColor() {

    txtHexValue.value = this.value;
    convertHexToRGB(this);
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type != "image") {

                canvas.children[0].style.borderColor = `rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, 1)`;

            }
        }
    }

}
document.getElementById('pnlBoxImage').querySelector('.txtOutlineColor').addEventListener('change', adjustImageOutlineColor);
document.getElementById('pnlBoxImage').querySelector('.txtOutlineColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustImageOutlineOpacity() {

    let panel = this.closest(`[id*=pnlBox]`);
    let color = panel.querySelector('.txtOutlineColor').value;
    let opacity = this.value;

    txtHexValue.value = color;
    convertHexToRGB(panel.querySelector('.txtOutlineColor'));

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {
                canvas.children[0].style.filter = `opacity(${opacity}%)`;
            }
        }
    }


}
document.getElementById('pnlBoxImage').querySelector('.txtOutlineOpacity').addEventListener('change', adjustImageOutlineOpacity);
document.getElementById('pnlBoxImage').querySelector('.txtOutlineOpacity').previousElementSibling.addEventListener('input', adjustImageOutlineOpacity);

function adjustImageOutlineSize() {

    let panel = this.closest(`[id*=pnlBox]`);
    let size = panel.querySelector('.txtOutlineSize').value * 2;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {
                canvas.children[0].style.borderWidth = `${size}px`;
    
                canvas.children[0].style.left = 0 -  size + 'px';
                canvas.children[0].style.top =  0 - size + 'px';
            }
        }
    }

}
document.getElementById('pnlBoxImage').querySelector('.txtOutlineSize').addEventListener('change', adjustImageOutlineSize);
document.getElementById('pnlBoxImage').querySelector('.txtOutlineSize').previousElementSibling.addEventListener('input', adjustImageOutlineSize);

function showImageOutline(me) {

    let panel = me.closest(`[id*=pnlBox]`);
    let size = panel.querySelector('.txtOutlineSize').value * 2;
    let opacity = panel.querySelector('.txtOutlineOpacity').value / 100;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {
                //remove other styles first
                canvas.children[1].style.filter = "none";

                txtHexValue.value = panel.querySelector('.txtOutlineColor').value;
                convertHexToRGB(me);

                canvas.children[0].style.left = 0 -  size + 'px';
                canvas.children[0].style.top =  0 - size + 'px';

                canvas.children[0].style.borderWidth = `${size}px`;
                canvas.children[0].style.borderStyle = `solid`;
                canvas.children[0].style.borderColor = `rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})`;
            }
        }
    }

}

//===================================GLOW==================================

function adjustImageGlowColor() {

    let panel = this.closest(`[id*=pnlBox]`);
    let color = panel.querySelector('.txtGlowColor').value;
    let size = panel.querySelector('.txtGlowSize').value * 0.02;
    let spread = panel.querySelector('.txtGlowSpread').value / 10;
    let opacity = panel.querySelector('.txtGlowOpacity').value / 100;

    txtHexValue.value = color;
    convertHexToRGB(this);

    var append = "";

    for(var b = 0; b < 360; b+=60) {
   
        if(b == 60 || b == 120) {
            
            var coorX = .01 * Math.cos(b * (Math.PI/ 180));
            var coorY = .01 * Math.sin(b * (Math.PI / 180));
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
        }
        
        else {

            var coorX = .01 * Math.cos(b * (Math.PI/ 180));
            var coorY = .01 * Math.sin(b * (Math.PI / 180));
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
        
        }
    }

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {
                canvas.children[1].style.filter = append;
            }
        }
    }


}
document.getElementById('pnlBoxImage').querySelector('.txtGlowColor').addEventListener('change', adjustImageGlowColor);
document.getElementById('pnlBoxImage').querySelector('.txtGlowColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustImageGlow() {

    let panel = this.closest(`[id*=pnlBox]`);
    let color = panel.querySelector('.txtGlowColor').value;
    let size = panel.querySelector('.txtGlowSize').value * 0.02;
    let spread = panel.querySelector('.txtGlowSpread').value / 10;
    let opacity = panel.querySelector('.txtGlowOpacity').value / 100;

    var append = "";

    txtHexValue.value = color;
    convertHexToRGB(panel.querySelector('.txtGlowColor'));
    
    for(var b = 0; b < 360; b+=60) {

        if(b == 60 || b == 120) {
            
            var coorX = .01 * Math.cos(b * (Math.PI/ 180));
            var coorY = .01 * Math.sin(b * (Math.PI / 180));
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
        }
        
        else {

            var coorX = .01 * Math.cos(b * (Math.PI/ 180));
            var coorY = .01 * Math.sin(b * (Math.PI / 180));
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
        
        }
    }

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {
                canvas.children[1].style.filter = append;
            }
        }
    }

}
document.getElementById('pnlBoxImage').querySelector('.txtGlowOpacity').addEventListener('change', adjustImageGlow);
document.getElementById('pnlBoxImage').querySelector('.txtGlowOpacity').previousElementSibling.addEventListener('input', adjustImageGlow);

document.getElementById('pnlBoxImage').querySelector('.txtGlowSize').addEventListener('change', adjustImageGlow);
document.getElementById('pnlBoxImage').querySelector('.txtGlowSize').previousElementSibling.addEventListener('input', adjustImageGlow);

document.getElementById('pnlBoxImage').querySelector('.txtGlowSpread').addEventListener('change', adjustImageGlow);
document.getElementById('pnlBoxImage').querySelector('.txtGlowSpread').previousElementSibling.addEventListener('input', adjustImageGlow);

function showImageGlow(me) {

    let panel = me.closest(`[id*=pnlBox]`);
    let size = panel.querySelector('.txtGlowSize').value * 0.02;
    let spread = panel.querySelector('.txtGlowSpread').value / 10;
    let opacity = panel.querySelector('.txtGlowOpacity').value / 100;
    
    txtHexValue.value = panel.querySelector('.txtGlowColor').value;
    convertHexToRGB(me);
    
    var append = "";
    
    for(var b = 0; b < 360; b+=60) {

        if(b == 60 || b == 120) {
            
            var coorX = .01 * Math.cos(b * (Math.PI/ 180));
            var coorY = .01 * Math.sin(b * (Math.PI / 180));
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${ size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${ size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
        }
        
        else {

            var coorX = .01 * Math.cos(b * (Math.PI/ 180));
            var coorY = .01 * Math.sin(b * (Math.PI / 180));
            append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${ size + spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity - (spread/30)})) `;
        }
    }

    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {

                ///////////////REMOVE FIRST OTHER EFFECTS//////////////
                //children[1] is the shadow and glow
                canvas.children[1].style.filter = "none";

                //children[0] is the borderwidth
                canvas.children[0].style.borderWidth = "0px";

                canvas.children[0].style.left = 0 + 'px';
                canvas.children[0].style.top = 0 + 'px';

                ////////////////NOW IMPLEMENT //////////////
                canvas.children[1].style.filter = append;
                canvas.dataset.borderOn = "false";
                
            }
        }
    }

    adjustBorder()

}

//===================================SHADOW==================================

function adjustImageShadowColor() {

    let panel = this.closest(`[id*=pnlBox]`);
    let color = panel.querySelector('.txtShadowColor').value;
    let size = panel.querySelector('.txtShadowSize').value / 2;
    let spread = panel.querySelector('.txtShadowSpread').value / 5;
    let opacity = panel.querySelector('.txtShadowOpacity').value / 100;
    let rotation = Number(panel.querySelector('.txtShadowRotation').value) + 90;

    txtHexValue.value = color;
    convertHexToRGB(this);

    var append = "";

    var coorX = size * Math.cos(rotation * (Math.PI/ 180));
    var coorY = size * Math.sin(rotation * (Math.PI / 180));
    append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})) `;
    

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {
                
                canvas.children[1].style.filter = append;

            }
        }
    }

}
document.getElementById('pnlBoxImage').querySelector('.txtShadowColor').addEventListener('change', adjustImageShadowColor);
document.getElementById('pnlBoxImage').querySelector('.txtShadowColor').nextElementSibling.addEventListener('click', letsSummonColorPicker);

function adjustImageShadow() {

    let panel = this.closest(`[id*=pnlBox]`);
    let color = panel.querySelector('.txtShadowColor').value;
    let size = panel.querySelector('.txtShadowSize').value / 2;
    let spread = panel.querySelector('.txtShadowSpread').value / 5;
    let opacity = panel.querySelector('.txtShadowOpacity').value / 100;
    let rotation = Number(panel.querySelector('.txtShadowRotation').value) + 90;
    
    txtHexValue.value = color;
    convertHexToRGB(panel.querySelector('.txtShadowColor'));

    var append = "";

    var coorX = size * Math.cos(rotation * (Math.PI/ 180));
    var coorY = size * Math.sin(rotation * (Math.PI / 180));
    append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})) `;
    
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {
                canvas.children[1].style.filter = append;
            }
        }
    }

}
document.getElementById('pnlBoxImage').querySelector('.txtShadowOpacity').addEventListener('change', adjustImageShadow);
document.getElementById('pnlBoxImage').querySelector('.txtShadowOpacity').previousElementSibling.addEventListener('input', adjustImageShadow);

document.getElementById('pnlBoxImage').querySelector('.txtShadowSize').addEventListener('change', adjustImageShadow);
document.getElementById('pnlBoxImage').querySelector('.txtShadowSize').previousElementSibling.addEventListener('input', adjustImageShadow);

document.getElementById('pnlBoxImage').querySelector('.txtShadowSpread').addEventListener('change', adjustImageShadow);
document.getElementById('pnlBoxImage').querySelector('.txtShadowSpread').previousElementSibling.addEventListener('input', adjustImageShadow);

document.getElementById('pnlBoxImage').querySelector('.txtShadowRotation').addEventListener('change', adjustImageShadow);
document.getElementById('pnlBoxImage').querySelector('.txtShadowRotation').previousElementSibling.addEventListener('input', adjustImageShadow);

function showImageShadow(me) {

    let panel = me.closest(`[id*=pnlBox]`);
    var size = panel.querySelector('.txtShadowSize').value/2;
    var spread = panel.querySelector('.txtShadowSpread').value / 5;
    var opacity = panel.querySelector('.txtShadowOpacity').value / 100;
    var rotation = Number(panel.querySelector('.txtShadowRotation').value) + 90;
    
    txtHexValue.value = panel.querySelector('.txtShadowColor').value;
    convertHexToRGB(me);

    var append = "";
            
    var coorX = size * Math.cos(rotation * (Math.PI/ 180));
    var coorY = size * Math.sin(rotation * (Math.PI / 180));
    append += `drop-shadow(${Math.round(coorX)}px ${Math.round(coorY)}px ${spread}px rgba(${txtRedValue.value}, ${txtGreenValue.value}, ${txtBlueValue.value}, ${opacity})) `;

    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {

                ///////////////////REMOVE FIRST ALL EXISING EFFECTS//////////////

                //children[1] is the shadow and glow
                canvas.children[1].style.filter = "none";

                //children[0] is the borderwidth
                canvas.children[0].style.borderWidth = "0px";

                canvas.children[0].style.left = 0 + 'px';
                canvas.children[0].style.top = 0 + 'px';

                //////////////////NOW ADD THE SHADOW//////////////

                canvas.dataset.borderOn = "false";

                canvas.children[1].style.filter = append;  
            }
        }
    }

}

//===================================LAYER STYLE==============================
function chooseLayerStyle() {

    let panel = this.closest(`[id*='pnlBox']`);
    
    panel.querySelectorAll('.dropdown')[1].children[0].innerText = this.innerText;
    
    if(this.innerText == "Outline") {
        panel.querySelector('.tabOutlineLayer').style.display = "block";
        panel.querySelector('.tabGlowLayer').style.display = "none";
        panel.querySelector('.tabShadowLayer').style.display = "none";
        showImageOutline(panel.querySelector('.txtOutlineColor'));
        
    }
    else if(this.innerText == "Glow") {
        panel.querySelector('.tabGlowLayer').style.display = "block";
        panel.querySelector('.tabOutlineLayer').style.display = "none";
        panel.querySelector('.tabShadowLayer').style.display = "none";
        showImageGlow(panel.querySelector('.txtGlowColor'));
    }
    else if(this.innerText == "Shadow") {

        panel.querySelector('.tabShadowLayer').style.display = "block";
        panel.querySelector('.tabOutlineLayer').style.display = "none";
        panel.querySelector('.tabGlowLayer').style.display = "none";
        showImageShadow(panel.querySelector('.txtShadowColor'));
    }
    else {

        panel.querySelector('.tabShadowLayer').style.display = "none";
        panel.querySelector('.tabOutlineLayer').style.display = "none";
        panel.querySelector('.tabGlowLayer').style.display = "none";
        panel.querySelectorAll('.dropdown')[1].children[0].innerText = "Choose style";
        removeImageStyle();
    }
}

//assign dropOptionVerti selection for blend mode
for(let b = 0; b < document.getElementById('pnlBoxImage').querySelectorAll('.optLayerStyle').length; b++) {
    document.getElementById('pnlBoxImage').querySelectorAll('.optLayerStyle')[b].addEventListener('click', chooseLayerStyle);
    if(b == 3) {
        document.getElementById('pnlBoxImage').querySelectorAll('.optLayerStyle')[b].style.color = "salmon";
        document.getElementById('pnlBoxImage').querySelectorAll('.optLayerStyle')[b].addEventListener('mouseover', hoverLayerStyle)
        document.getElementById('pnlBoxImage').querySelectorAll('.optLayerStyle')[b].addEventListener('mouseout', outLayerStyle)
    }
}

function hoverLayerStyle() {
    this.style.backgroundColor = "salmon";
    this.style.color = "white";
}

function outLayerStyle() {
    this.style.backgroundColor = "transparent";
    this.style.color = "salmon";
}

function removeImageStyle() {
    
    for(let a = 0; a < focusPanel.length; a++) {
        if(focusPanel[a] != null) {
            let f = Number(focusPanel[a].dataset.ref);
            let type = focusPanel[a].dataset.type;
            let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)

            if(type == "image") {
                //children[1] is the shadow and glow
                if(canvas.children[1] != null) {
                    canvas.children[1].style.filter = "none";
                }

                //children[0] is the borderwidth
                canvas.children[0].style.borderWidth = "0px";

                canvas.children[0].style.left = 0 + 'px';
                canvas.children[0].style.top = 0 + 'px';
            }
        }
    }


}

//=============================CREATE CANVAS FOR LAYERS=====================

//===================ADD CONTROLS TO PANEL IMAGE==================

//actual function to create pnlBoxProperties
function addPnlBoxImage(f, name, n) {  //adding controls only for 'IMAGE' panel boxes

    dataLayer[f] = '\n*';
    dataLayer[f] += `\nref: ${f}`;
    dataLayer[f] += `\npnlBoxImage: ${name}`;
    dataLayer[f] += `\nthumbno: ${n}`;
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

    dataLayer[f] += `\ntxtBlur: 0`;
    dataLayer[f] += `\ntxtBrightness: 100`;
    dataLayer[f] += `\ntxtContrast: 100`;
    dataLayer[f] += `\ntxtSaturation: 100`;
    dataLayer[f] += `\ntxtTemperature: 0`;
    
    dataLayer[f] += `\ntxtOutlineColor: 000000`;
    dataLayer[f] += `\ntxtOutlineOpacity: 100`;
    dataLayer[f] += `\ntxtOutlineSize: 10`;

    dataLayer[f] += `\ntxtGlowColor: 949EFF`;
    dataLayer[f] += `\ntxtGlowOpacity: 50`;
    dataLayer[f] += `\ntxtGlowSize: 100`;
    dataLayer[f] += `\ntxtGlowSpread: 100`;

    dataLayer[f] += `\ntxtShadowColor: 000000`;
    dataLayer[f] += `\ntxtShadowOpacity: 100`;
    dataLayer[f] += `\ntxtShadowSize: 20`;
    dataLayer[f] += `\ntxtShadowSpread: 0`;
    dataLayer[f] += `\ntxtShadowRotation: 0`;

    dataLayer[f] += `\ndropdown 0: Normal`;
    dataLayer[f] += `\ndropdown 1: Remove`;

    createCanvasImage(f, n, name)
    
}

//=============================CREATE CANVAS FOR LAYERS=====================
function createCanvasImage(f, n, name) {     

    let panel = document.getElementById('pnlBoxCanvas');
    let txtSizeWidth = panel.querySelector('.txtSizeWidth');
    let txtSizeHeight = panel.querySelector('.txtSizeHeight');
    let configScroll = document.getElementsByClassName('configScroll');

    cnvLayers[f] = document.createElement('div');
    cnvLayers[f].style.visibility = "visible";
    cnvLayers[f].classList.add('cnvLayers');
    cnvLayers[f].dataset.rotation = 0;
    cnvLayers[f].dataset.ref = f;
    cnvLayers[f].dataset.thumbno = n;
    cnvLayers[f].dataset.type = "image";

    //add a div for border outline
    let cnvLayersBorder = document.createElement('div');
    cnvLayersBorder.classList.add('cnvLayersBorder');

    cnvLayers[f].appendChild(cnvLayersBorder);

    //add first image  so we can adjust the left and right of the cnvlayer
    //use [e] to get pnlBoxLayer dataset of thumbNo 
    //index it back to pnlBoxThumb and get children[0] which is img and get src

    var img = new Image();
    img.src = configScroll[2].querySelector(`[data-thumbno="${n}"]`).children[0].src;
    img.onload = function() { 
        //when image is loaded, append img to cnvlayer
        cnvLayers[f].appendChild(img); 

        cnvLayers[f].children[0].style.filter = "none";

        //then append cnvlayer to cnvmain
        cnvGrpLayers.appendChild(cnvLayers[f]);
        
        //get which is smaller if canvas width or canvas height
        var aspectRatio;

        if(Number(txtSizeWidth.value) > Number(txtSizeHeight.value)) {
            aspectRatio = img.naturalWidth / img.naturalHeight;
            cnvLayers[f].style.height = `${Math.round(txtSizeHeight.value * 0.5)}px`;
            cnvLayers[f].style.width =  `${Math.round(cnvLayers[f].clientHeight * aspectRatio)}px`;
            
        }
        else if(Number(txtSizeWidth.value) < Number(txtSizeHeight.value)) {
            aspectRatio = img.naturalHeight / img.naturalWidth;

            cnvLayers[f].style.width = `${Math.round(txtSizeWidth.value * 0.5)}px`;
            cnvLayers[f].style.height = `${Math.round(cnvLayers[f].clientWidth * aspectRatio)}px`;
        }

        else if(Number(txtSizeWidth.value) == Number(txtSizeHeight.value)) {
            
            aspectRatio = img.naturalHeight / img.naturalWidth;

            cnvLayers[f].style.width = `${Math.round(txtSizeWidth.value * 0.5)}px`;
            cnvLayers[f].style.height = `${Math.round(cnvLayers[f].clientWidth * aspectRatio)}px`;
        }

        //set min width and height
        aspectRatio = img.naturalWidth / img.naturalHeight;
        cnvLayers[f].style.minWidth = 20 + 'px';
        cnvLayers[f].style.minHeight = 20 / aspectRatio + 'px';

        //position cnvlayer to center
        cnvLayers[f].style.left = `${(txtSizeWidth.value / 2) - (cnvLayers[f].clientWidth/2)}px`;
        cnvLayers[f].style.top = `${(txtSizeHeight.value / 2) - (cnvLayers[f].clientHeight/2)}px`;

        dataLayer[f] = valueSwitcher(dataLayer[f], 'txtWidthLayer', `${cnvLayers[f].clientWidth}`);
        dataLayer[f] = valueSwitcher(dataLayer[f], 'txtHeightLayer', `${cnvLayers[f].clientHeight}`);
        dataLayer[f] = valueSwitcher(dataLayer[f], 'txtXLayer', `${cnvLayers[f].offsetLeft}`);
        dataLayer[f] = valueSwitcher(dataLayer[f], 'txtYLayer', `${cnvLayers[f].offsetTop}`);

        layerL[f] = cnvLayers[f].offsetLeft;
        layerT[f] = cnvLayers[f].offsetTop;
        layerW[f] = cnvLayers[f].clientWidth;
        layerH[f] = cnvLayers[f].clientHeight;

        createHistory(f, name, 'image', n);
    
        addBorderLayer(cnvLayers[f], f)
        
        //DO NOT USE CLICK HERE [!]
        //USING CLICK IS MAKING UP ERROR
        //SINCE MULTIPLE IMAGES AND VECTORS
        //CAN BE UPLOADED AT ONCE
        //IT'S CAUSING CLICK ERROR
        //JUST USE FOCUS FUNCTION INSTEAD 
        canvas2Focus(cnvLayers[f]);
        
    }

}

//=============================CREATE CANVAS FOR LAYERS=====================
function recreateCanvasImage(f, n, pnlBox) {     

    let configScroll = document.getElementsByClassName('configScroll');

    cnvLayers[f] = document.createElement('div');
    cnvLayers[f].classList.add('cnvLayers');
    cnvLayers[f].dataset.rotation = valueFinder(dataLayer[f], 'txtRotationLayer');
    cnvLayers[f].dataset.ref = f;
    cnvLayers[f].dataset.thumbno = n;
    cnvLayers[f].dataset.type = "image";
    cnvLayers[f].style.visibility = "hidden";

    //add a div for border outline
    let cnvLayersBorder = document.createElement('div');
    cnvLayersBorder.classList.add('cnvLayersBorder');

    cnvLayers[f].appendChild(cnvLayersBorder);

    var img = new Image();
    img.src = configScroll[2].querySelector(`[data-thumbno="${n}"]`).children[0].src;
    img.onload = function() { 
        //when image is loaded, append img to cnvlayer
        cnvLayers[f].appendChild(img); 

        cnvLayers[f].children[0].style.filter = "none";

        //then append cnvlayer to cnvmain
        cnvGrpLayers.appendChild(cnvLayers[f]);

        //set min width and height
        let aspectRatio = img.naturalWidth / img.naturalHeight;
        cnvLayers[f].style.minWidth = 20 + 'px';
        cnvLayers[f].style.minHeight = 20 / aspectRatio + 'px';

        //add border
        addBorderLayer(cnvLayers[f], f)
        
        configScroll[5].children[0].click();

        validateData(dataLayer[f], pnlBox);

        layerL[f] = cnvLayers[f].offsetLeft;
        layerT[f] = cnvLayers[f].offsetTop;
        layerW[f] = cnvLayers[f].clientWidth;
        layerH[f] = cnvLayers[f].clientHeight;

    }

}

function showBasicBoxImage(){
    this.closest('#pnlBoxImage').children[0].children[0].innerText = "Image Settings";
    this.closest('#pnlBoxImage').querySelector('.tabSliderBox3').style.translate = "0%"; //slide tab
    this.closest('#pnlBoxImage').querySelector('.pnlBottomBoxThumb3').style.translate = "0%"; //slide scroll thumb
}
document.querySelector('#pnlBoxImage').querySelector('.btnBasicBox').addEventListener('click', btnBottomClick); //default the btnBasic to white
document.querySelector('#pnlBoxImage').querySelector('.btnBasicBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxImage').querySelector('.btnBasicBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxImage').querySelector('.btnBasicBox').addEventListener('click', showBasicBoxImage);
document.querySelector('#pnlBoxImage').querySelector('.btnBasicBox').children[0].style.filter = "saturate(0) brightness(2)";
document.querySelector('#pnlBoxImage').querySelector('.btnBasicBox').children[0].style.transition = ".2s";

function showColorBoxImage() {
    this.closest('#pnlBoxImage').children[0].children[0].innerText = "Image Color";
    this.closest('#pnlBoxImage').querySelector('.tabSliderBox3').style.translate = "-100%"; //slide tab to left
    this.closest('#pnlBoxImage').querySelector('.pnlBottomBoxThumb3').style.translate = "100%"; //slide thumb to right
}
document.querySelector('#pnlBoxImage').querySelector('.btnColorBox').addEventListener('click', btnBottomClick); //default the btnColor to white
document.querySelector('#pnlBoxImage').querySelector('.btnColorBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxImage').querySelector('.btnColorBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxImage').querySelector('.btnColorBox').addEventListener('click', showColorBoxImage);
document.querySelector('#pnlBoxImage').querySelector('.btnColorBox').children[0].style.transition = ".2s";

function showStyleBoxImage() {
    this.closest('#pnlBoxImage').children[0].children[0].innerText = "Image Style";
    this.closest('#pnlBoxImage').querySelector('.tabSliderBox3').style.translate = "-200%"; //slide tab to left
    this.closest('#pnlBoxImage').querySelector('.pnlBottomBoxThumb3').style.translate = "200%"; //slide thumb to right
}

document.querySelector('#pnlBoxImage').querySelector('.btnStyleBox').addEventListener('click', btnBottomClick); //default the btnStyle to white
document.querySelector('#pnlBoxImage').querySelector('.btnStyleBox').addEventListener('mouseover', btnBottomHover);
document.querySelector('#pnlBoxImage').querySelector('.btnStyleBox').addEventListener('mouseleave', btnBottomLeave);
document.querySelector('#pnlBoxImage').querySelector('.btnStyleBox').addEventListener('click', showStyleBoxImage);
document.querySelector('#pnlBoxImage').querySelector('.btnStyleBox').children[0].style.transition = ".2s";


