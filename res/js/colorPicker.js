
//============================START DECLARING COMPONENTS==============

var colorBoardBool = false;
var colorBarBool = false;
var hue = 0;
var red = 255;
var green = 255;
var blue = 255;
var hexcode = "FFFFFF";
var huePercent = 0;
var sat = 0;
var bright = 100;
var chroma, chroma2, minLight;
var colorPickerTrigger = null;


//===========VALIDATE AND FORMAT ALL COLOR PICKER TEXTS=============
//validate all colorpicker input as well
var inputs = document.querySelector('#colorPickerPanel').querySelectorAll('input[type="number"]');
inputs.forEach(input => {
    input.addEventListener('change', function() {

        let max = Number(this.max);
        let min = Number(this.min);
        let val = Number(this.value);

        if(val > max) {
            this.value = max;
        }
        else if(val < min) {
            this.value = min;
        }

        this.blur();
    })
})

//==============SELECT TEXT WHEN FOCUSED=================

for(var a=0; a < document.querySelectorAll(".txtColorValues").length; a++) {
    document.querySelectorAll(".txtColorValues")[a].addEventListener('focus', function() {
        this.select();
    })
}

//==============SUMMON THIS COLOR PICKER TO EXISTENCE==========

function letsSummonColorPicker() {

    let colorPickerPanel = document.getElementById('colorPickerPanel');

    colorPickerTrigger = this;
    let meLeft = this.getBoundingClientRect().left;
    let meTop = this.getBoundingClientRect().top;
    let meWidth = this.clientWidth;
    let meHeight = this.clientHeight;

    colorPickerTrigger.previousElementSibling.removeEventListener('change', encodeTextMulti);

    if(colorPickerPanel.dataset.show == "false") {
        
        colorPickerPanel.dataset.show = "true";
        colorPickerPanel.style.display = "flex";
        colorPickerPanel.style.left = meLeft - (colorPickerPanel.clientWidth - 10) + (meWidth/2) + 'px';
        
        if(meTop + colorPickerPanel.clientHeight > window.innerHeight) {
            colorPickerPanel.style.top = meTop - colorPickerPanel.clientHeight - 8 + 'px';
        }
        else {
            colorPickerPanel.style.top = meTop + meHeight + 8 + 'px';
        }

        txtHexValue.value = (this.previousElementSibling.value !== null) ? this.previousElementSibling.value: this.nextElementSibling.value;
        hex2Thumb();

    }

    else if(colorPickerPanel.dataset.show == "true") {
    
        colorPickerPanel.dataset.show = "false";
        colorPickerPanel.style.display = "none";
        return
    }
    
}

function hex2Thumb() {
    var z = [];
    var s = [];
    var append = "";

    myTestHexCode(txtHexValue)

    if(txtHexValue.value.substring(0,1) == '#') {
        txtHexValue.value = txtHexValue.value.substring(1,7)
    }

    
    for(var a=0; a < 6; a++) {

        z[a] = txtHexValue.value.substring(a, a+1);

        //if(z[a] != '#') {

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
        //}
    }
    
    red = (z[0] * 16) + z[1];
    green = (z[2] * 16) + z[3];
    blue = (z[4] * 16) + z[5];

    txtRedValue.value = red;
    txtGreenValue.value = green;
    txtBlueValue.value = blue;
    
    hexcode = append.toUpperCase();


    //rgb to hsb-------------------------------------------------


    red = txtRedValue.value / 255;
    green = txtGreenValue.value / 255;
    blue = txtBlueValue.value / 255;

    var max = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);
    var delta = max - min;

    // Calculate hue and sat, default to 0 until calculated
    hue = 0;
    sat = 0;

    if (delta !== 0) {
        if (max === red) {
            hue = ((green - blue) / delta) % 6;
        } else if (max === green) {
            hue = (blue - red) / delta + 2;
        } else {
            hue = (red - green) / delta + 4;
        }

        hue = Math.round(hue * 60);

        if (hue < 0) hue += 360;

        // Calculate saturation
        if(max != 0) {
            sat = delta/max;
        }
        else {
            sat = 0;
        }
    }


    // Calculate value of brightness
    bright = max;

    //RGB2HSB
    txtHueValue.value = Math.round(hue);
    txtSatValue.value = Math.round(sat * 100);
    txtBrightValue.value = Math.round(bright * 100);

    //hsb to thumb----------------------------------------------

    //color bar hue
    huePercent = Math.round((txtHueValue.value/360)*93);
    colorBarThumb.style.left = Math.round((huePercent/100) * colorBarHue.clientWidth) + "px";

    //color board 
    //saturation from txtbox
    colorBoardThumb.style.left = ((txtSatValue.value/100) * colorBoard.clientWidth) - 6 + 'px';  
    //brightness from txtbox
    colorBoardThumb.style.top = ((1-(txtBrightValue.value/100)) * colorBoard.clientHeight) - 6 + 'px';  

    colorBoard.style.background = `linear-gradient(to right, white, hsl(${txtHueValue.value}, 100%, 50%))`;
}

//after summoning color picker, convert current hex to all values
function letsConvertSourceHex2All() {

    let z = [];
    let s = [];
    let append = "";
    let text = colorPickerTrigger.previousElementSibling;

    for(var a=0; a < 6; a++) {

        z[a] = text.value.substring(a, a+1);

        //if(z[a] != '#') {

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
        //}
    }
    
    red = (z[0] * 16) + z[1];
    green = (z[2] * 16) + z[3];
    blue = (z[4] * 16) + z[5];

    txtRedValue.value = red;
    txtGreenValue.value = green;
    txtBlueValue.value = blue;
    

    red = txtRedValue.value / 255;
    green = txtGreenValue.value / 255;
    blue = txtBlueValue.value / 255;

    var max = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);
    var delta = max - min;

    // Calculate hue and sat, default to 0 until calculated
    hue = 0;
    sat = 0;

    if (delta !== 0) {
        if (max === red) {
            hue = ((green - blue) / delta) % 6;
        } else if (max === green) {
            hue = (blue - red) / delta + 2;
        } else {
            hue = (red - green) / delta + 4;
        }

        hue = Math.round(hue * 60);

        if (hue < 0) hue += 360;

        // Calculate saturation
        if(max != 0) {
            sat = delta/max;
        }
        else {
            sat = 0;
        }
    }


    // Calculate value of brightness
    bright = max;

    //RGB2HSB
    txtHueValue.value = Math.round(hue);
    txtSatValue.value = Math.round(sat * 100);
    txtBrightValue.value = Math.round(bright * 100);
}

//===============HEX FORMAT===================
function myTestHexCode(me) {

    var match = false;

    var hex = me.value.toUpperCase();

    var regex = /^#?([0-9A-Fa-f]{6})$/;

    if(!regex.test(hex)) {
        for(var a = 0; a < colorName.length; a++) {
            if(colorName[a].name == hex.replace(" ", "").toLowerCase()) {

                match = true;

                me.value = colorName[a].hex;

                //if(me.nextElementSibling != null) {
                    //me.nextElementSibling.style.backgroundColor = "#" + me.value;
                //}

            }
        }
    
        if(match == false) {
            
            me.value = "FFFFFF";
        }
    }
    else {
        
        if(hex.substring(0,1) == '#') {
            me.value = hex.substr(1,7).toUpperCase();
        }
        else {
            me.value = hex.toUpperCase();
        }
    }
}

//===============SHOW HEX TEXT VALUES===========

document.querySelector('.divColorValues').style.display = "flex";

//===============ADD DROPDOWN FUNCTION=============

function switchColorSpace() {

    let divColorValues = document.getElementsByClassName('divColorValues');
    
    //hide all textbox containers
    for(var a=0; a < divColorValues.length; a++) {
        divColorValues[a].style.display = "none";
    }

    if(this.children[0].innerText == "Hex") {
        
        this.children[0].innerText = "RGB";
        divColorValues[1].style.display = "flex";
    }

    else if(this.children[0].innerText == "RGB") {
  
        this.children[0].innerText = "HSB";
        divColorValues[2].style.display = "flex";
    }

    else if(this.children[0].innerText == "HSB") {

        this.children[0].innerText = "Hex";
        divColorValues[0].style.display = "flex";
    }
}
document.getElementById("dropdownColorValue").addEventListener('click', switchColorSpace);

//=====================COLOR BOARD======================

function selectFromTheColorBoard(e) {
    e.preventDefault();

    colorBoardBool = true;
    
    if(colorBoardBool) {

        var rect = colorBoard.getBoundingClientRect();

        if(e.clientX >= rect.left && e.clientX <= rect.right) {
            
            colorBoardThumb.style.left = e.clientX - rect.left - 6 + "px"; //-5 is half the thumb width
        }

        if(e.clientY >= rect.top && e.clientY <= rect.bottom) {
        
            colorBoardThumb.style.top = e.clientY - rect.top - 6 + "px"; //-5 is half the thumb height
        }

        thumb2All();

    }
    
}
colorBoard.addEventListener('pointerdown', selectFromTheColorBoard);

function moveFromTheColorBoard(e) {
    e.preventDefault();

    if(colorBoardBool) {

        var rect = colorBoard.getBoundingClientRect();

        if(e.clientX >= rect.left && e.clientX <= rect.right) {
            
            colorBoardThumb.style.left = e.clientX - rect.left - 6 + "px"; //-5 is half the thumb width
        }

        if(e.clientY >= rect.top && e.clientY <= rect.bottom) {
            
            colorBoardThumb.style.top = e.clientY - rect.top - 6 + "px"; //-5 is half the thumb height
        }

        thumb2All();

        //txtHexValue.value = colorPickerTrigger.previousElementSibling.value;
    }   
    
}
document.addEventListener('pointermove', moveFromTheColorBoard);

//=====================COLOR BAR========================

function selectFromTheColorBar(e) {
    e.preventDefault();
    colorBarBool = true;

    if(colorBarBool) {

        var rect = colorBarHue.getBoundingClientRect();

        if(e.clientX >= rect.left + 7 && e.clientX <= rect.right - 7) {
            
            colorBarThumb.style.left = e.clientX - rect.left - 7 + "px"; //-7 is half the thumb width

        }
        
        thumb2All();

        //txtHexValue.value = colorPickerTrigger.previousElementSibling.value;
    }   
    
}
colorBarHue.addEventListener('pointerdown', selectFromTheColorBar);


function moveFromTheColorBar(e) {
    e.preventDefault();

    if(colorBarBool) {

        var rect = colorBarHue.getBoundingClientRect();

        if(e.clientX >= rect.left + 7 && e.clientX <= rect.right - 7) {
            //saturation
            colorBarThumb.style.left = e.clientX - rect.left - 7 + "px"; //-7 is half the thumb width
        }

        thumb2All();

        //txtHexValue.value = colorPickerTrigger.previousElementSibling.value;

    }   
}
document.addEventListener('pointermove', moveFromTheColorBar);



function thumb2All() {

    //saturation
    //sat = Math.ceil(((e.clientX - rect.left)/colorBoard.clientWidth)*100);
    sat = Math.round((((colorBoardThumb.getBoundingClientRect().left + 6) - colorBoard.getBoundingClientRect().left)/colorBoard.clientWidth)*100);
    //lightness
    //bright = Math.ceil(((rect.bottom - e.clientY)/colorBoard.clientHeight)*100);
    bright = Math.round(((colorBoard.getBoundingClientRect().bottom -(colorBoardThumb.getBoundingClientRect().top + 6))/colorBoard.clientHeight)*100);

    //huePercent = Math.ceil(((e.clientX - rect.left)/colorBarHue.clientWidth)*100);
    huePercent = Math.round((((colorBarThumb.getBoundingClientRect().left + 7) - colorBoard.getBoundingClientRect().left)/colorBarHue.clientWidth)*100);
    //360 is max hue degree divided by 93, since bar starts at 4 and maxed at 97, out of 100 it's missing 7 hence only use 93
    hue = Math.round((360/92) * (huePercent-4)); //huePercent starts at 4 and deduct by 4 to get 0 as base value
    colorBoard.style.background = `linear-gradient(to right, white, hsl(${hue}, 100%, 50%))`;

    txtHueValue.value = hue;
    txtSatValue.value = sat;
    txtBrightValue.value = bright;

    //------------HSB TO RGB--------------

    chroma = (txtBrightValue.value/100) * (txtSatValue.value/100);
    chroma2 = chroma * (1- Math.abs(((txtHueValue.value/60) % 2) - 1));
    minLight = (txtBrightValue.value/100) - chroma;

    if(txtHueValue.value >= 0 && txtHueValue.value < 60) {
        red = (chroma + minLight) * 255;
        green = (chroma2 + minLight) * 255;
        blue = (0 + minLight) * 255;
    }
    else if(txtHueValue.value >= 60 && txtHueValue.value < 120) {
        red = (chroma2 + minLight) * 255;
        green = (chroma + minLight) * 255;
        blue = (0 + minLight) * 255;
    }
    else if(txtHueValue.value >= 120 && txtHueValue.value < 180) {
        red = (0 + minLight) * 255;
        green = (chroma + minLight) * 255;
        blue = (chroma2 + minLight) * 255;
    }
    else if(txtHueValue.value >= 180 && txtHueValue.value < 240) {
        red = (0 + minLight) * 255;
        green = (chroma2 + minLight) * 255;
        blue = (chroma + minLight) * 255;
    }
    else if(txtHueValue.value >= 240 && txtHueValue.value < 300) {
        red = (chroma2 + minLight) * 255;
        green = (0 + minLight) * 255;
        blue = (chroma + minLight) * 255;
    }
    else if(txtHueValue.value >= 300 && txtHueValue.value < 360) {
        red = (chroma + minLight) * 255;
        green = (0 + minLight) * 255;
        blue = (chroma2 + minLight) * 255;
    }
    else {
        red = (chroma + minLight) * 255;
        green = (chroma2 + minLight) * 255;
        blue = (0 + minLight) * 255;
    }

    red = Math.round(red);
    green = Math.round(green);
    blue = Math.round(blue);

    txtRedValue.value = red;
    txtGreenValue.value = green;
    txtBlueValue.value = blue;

    //--------------RGB TO HEX--------------
    
    var channel = [];

    for(var a=0; a < 3; a++) {
        if(a == 0) {
            channel[a] = "";
            channel[a] += decimalToHexa(Math.floor(txtRedValue.value / 16));
            channel[a] += decimalToHexa(Math.floor(txtRedValue.value % 16));
        }
        else if(a == 1) {
            channel[a] = "";
            channel[a] += decimalToHexa(Math.floor(txtGreenValue.value / 16));
            channel[a] += decimalToHexa(Math.floor(txtGreenValue.value % 16));
        }
        else if(a == 2) {
            channel[a] = "";
            channel[a] += decimalToHexa(Math.floor(txtBlueValue.value / 16));
            channel[a] += decimalToHexa(Math.floor(txtBlueValue.value % 16));
        }    
    }

    hexcode = channel[0] + channel[1] + channel[2]; 
    txtHexValue.value = hexcode;

    //-------------HEX TO SOURCE HEX-----------

    colorPickerTrigger.style.backgroundColor = '#' + txtHexValue.value.toUpperCase();

    //pass txtHexValue to the link txtHex
    if(colorPickerTrigger.previousElementSibling != null) {

        colorPickerTrigger.previousElementSibling.removeEventListener('change', encodeTextMulti);
        colorPickerTrigger.previousElementSibling.value = txtHexValue.value;
        
    }
    
    colorPickerTrigger.previousElementSibling.removeEventListener('change', encodeTextMulti);
    colorPickerTrigger.previousElementSibling.dispatchEvent(new Event('change'));
}

//======================CONVERSIONS===================
function hex2All() {

    this.blur();

    //---------HEX TO RGB-----------

    let z = [];
    let s = [];
    let append = "";

    myTestHexCode(txtHexValue)
    
    for(var a=0; a < 6; a++) {

        z[a] = txtHexValue.value.substring(a, a+1);

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
    
    red = (z[0] * 16) + z[1];
    green = (z[2] * 16) + z[3];
    blue = (z[4] * 16) + z[5];

    txtRedValue.value = red;
    txtGreenValue.value = green;
    txtBlueValue.value = blue;
    
    hexcode = append.toUpperCase();

    //---------RGB TO HSB------------

    red = txtRedValue.value / 255;
    green = txtGreenValue.value / 255;
    blue = txtBlueValue.value / 255;

    var max = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);
    var delta = max - min;

    // Calculate hue and sat, default to 0 until calculated
    hue = 0;
    sat = 0;

    if (delta !== 0) {
        if (max === red) {
            hue = ((green - blue) / delta) % 6;
        } else if (max === green) {
            hue = (blue - red) / delta + 2;
        } else {
            hue = (red - green) / delta + 4;
        }

        hue = Math.round(hue * 60);

        if (hue < 0) hue += 360;

        // Calculate saturation
        if(max != 0) {
            sat = delta/max;
        }
        else {
            sat = 0;
        }
    }

    // Calculate value of brightness
    bright = max;

    //RGB2HSB
    txtHueValue.value = Math.round(hue);
    txtSatValue.value = Math.round(sat * 100);
    txtBrightValue.value = Math.round(bright * 100);


    //-----------HSB TO THUMB-----------

    //color bar hue
    huePercent = Math.round((txtHueValue.value/360)*93);
    colorBarThumb.style.left = Math.round((huePercent/100) * colorBarHue.clientWidth) + "px";

    //color board 
    //saturation from txtbox
    colorBoardThumb.style.left = ((txtSatValue.value/100) * colorBoard.clientWidth) - 6 + 'px';  
    //brightness from txtbox
    colorBoardThumb.style.top = ((1-(txtBrightValue.value/100)) * colorBoard.clientHeight) - 6 + 'px';  

    colorBoard.style.background = `linear-gradient(to right, white, hsl(${txtHueValue.value}, 100%, 50%))`;


    //-------------HEX TO SOURCE HEX-----------

    colorPickerTrigger.style.backgroundColor = '#' + txtHexValue.value.toUpperCase();

    //pass txtHexValue to the link txtHex
    if(colorPickerTrigger.previousElementSibling != null) {

        colorPickerTrigger.previousElementSibling.value = txtHexValue.value;
        colorPickerTrigger.previousElementSibling.addEventListener('change', encodeTextMulti);
        colorPickerTrigger.previousElementSibling.dispatchEvent(new Event('change'));
        
    }

}
txtHexValue.addEventListener('change', hex2All);


function rgb2All() {

    //-----------------RGB TO HEX----------------

    let channel = [];

    for(var a=0; a < 3; a++) {
        if(a == 0) {
            channel[a] = "";
            channel[a] += decimalToHexa(Math.floor(txtRedValue.value / 16));
            channel[a] += decimalToHexa(Math.floor(txtRedValue.value % 16));
        }
        else if(a == 1) {
            channel[a] = "";
            channel[a] += decimalToHexa(Math.floor(txtGreenValue.value / 16));
            channel[a] += decimalToHexa(Math.floor(txtGreenValue.value % 16));
        }
        else if(a == 2) {
            channel[a] = "";
            channel[a] += decimalToHexa(Math.floor(txtBlueValue.value / 16));
            channel[a] += decimalToHexa(Math.floor(txtBlueValue.value % 16));
        }    
    }

    hexcode = channel[0] + channel[1] + channel[2]; 
    txtHexValue.value = hexcode;

    //-----------------RGB TO HSB------------------

    red = txtRedValue.value / 255;
    green = txtGreenValue.value / 255;
    blue = txtBlueValue.value / 255;

    var max = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);
    var delta = max - min;

    // Calculate hue and sat, default to 0 until calculated
    hue = 0;
    sat = 0;

    if (delta !== 0) {
        if (max === red) {
            hue = ((green - blue) / delta) % 6;
        } else if (max === green) {
            hue = (blue - red) / delta + 2;
        } else {
            hue = (red - green) / delta + 4;
        }

        hue = Math.round(hue * 60);

        if (hue < 0) hue += 360;

        // Calculate saturation
        if(max != 0) {
            sat = delta/max;
        }
        else {
            sat = 0;
        }
    }

    // Calculate value of brightness
    bright = max;

    //RGB2HSB
    txtHueValue.value = Math.round(hue);
    txtSatValue.value = Math.round(sat * 100);
    txtBrightValue.value = Math.round(bright * 100);


    //----------------HSB TO THUMB-----------------

    //color bar hue
    huePercent = Math.round((txtHueValue.value/360)*93);
    colorBarThumb.style.left = Math.round((huePercent/100) * colorBarHue.clientWidth) + "px";

    //color board 
    //saturation from txtbox
    colorBoardThumb.style.left = ((txtSatValue.value/100) * colorBoard.clientWidth) - 6 + 'px';  
    //brightness from txtbox
    colorBoardThumb.style.top = ((1-(txtBrightValue.value/100)) * colorBoard.clientHeight) - 6 + 'px';  

    colorBoard.style.background = `linear-gradient(to right, white, hsl(${txtHueValue.value}, 100%, 50%))`;


    //-------------HEX TO SOURCE HEX-----------

    colorPickerTrigger.style.backgroundColor = '#' + txtHexValue.value.toUpperCase();

    //pass txtHexValue to the link txtHex
    if(colorPickerTrigger.previousElementSibling != null) {

        colorPickerTrigger.previousElementSibling.value = txtHexValue.value;
        colorPickerTrigger.previousElementSibling.addEventListener('change', encodeTextMulti);
        colorPickerTrigger.previousElementSibling.dispatchEvent(new Event('change'));
        
    }

}
txtRedValue.addEventListener('change', rgb2All);
txtGreenValue.addEventListener('change', rgb2All);
txtBlueValue.addEventListener('change', rgb2All);


function hsb2All() {

    //------------HSB TO RGB--------------

    chroma = (txtBrightValue.value/100) * (txtSatValue.value/100);
    chroma2 = chroma * (1- Math.abs(((txtHueValue.value/60) % 2) - 1));
    minLight = (txtBrightValue.value/100) - chroma;

    if(txtHueValue.value >= 0 && txtHueValue.value < 60) {
        red = (chroma + minLight) * 255;
        green = (chroma2 + minLight) * 255;
        blue = (0 + minLight) * 255;
    }
    else if(txtHueValue.value >= 60 && txtHueValue.value < 120) {
        red = (chroma2 + minLight) * 255;
        green = (chroma + minLight) * 255;
        blue = (0 + minLight) * 255;
    }
    else if(txtHueValue.value >= 120 && txtHueValue.value < 180) {
        red = (0 + minLight) * 255;
        green = (chroma + minLight) * 255;
        blue = (chroma2 + minLight) * 255;
    }
    else if(txtHueValue.value >= 180 && txtHueValue.value < 240) {
        red = (0 + minLight) * 255;
        green = (chroma2 + minLight) * 255;
        blue = (chroma + minLight) * 255;
    }
    else if(txtHueValue.value >= 240 && txtHueValue.value < 300) {
        red = (chroma2 + minLight) * 255;
        green = (0 + minLight) * 255;
        blue = (chroma + minLight) * 255;
    }
    else if(txtHueValue.value >= 300 && txtHueValue.value < 360) {
        red = (chroma + minLight) * 255;
        green = (0 + minLight) * 255;
        blue = (chroma2 + minLight) * 255;
    }
    else {
        red = (chroma + minLight) * 255;
        green = (chroma2 + minLight) * 255;
        blue = (0 + minLight) * 255;
    }

    red = Math.round(red);
    green = Math.round(green);
    blue = Math.round(blue);

    txtRedValue.value = red;
    txtGreenValue.value = green;
    txtBlueValue.value = blue;


    //-----------HSB TO THUMB-----------

    huePercent = Math.round((txtHueValue.value/360)*93);
    colorBarThumb.style.left = Math.round((huePercent/100) * colorBarHue.clientWidth) + "px";

    //color board 
    //saturation from txtbox
    colorBoardThumb.style.left = ((txtSatValue.value/100) * colorBoard.clientWidth) - 6 + 'px';  
    //brightness from txtbox
    colorBoardThumb.style.top = ((1-(txtBrightValue.value/100)) * colorBoard.clientHeight) - 6 + 'px';  

    colorBoard.style.background = `linear-gradient(to right, white, hsl(${txtHueValue.value}, 100%, 50%))`;

    //--------------RGB TO HEX--------------

    
    var channel = [];

    for(var a=0; a < 3; a++) {
        if(a == 0) {
            channel[a] = "";
            channel[a] += decimalToHexa(Math.floor(txtRedValue.value / 16));
            channel[a] += decimalToHexa(Math.floor(txtRedValue.value % 16));
        }
        else if(a == 1) {
            channel[a] = "";
            channel[a] += decimalToHexa(Math.floor(txtGreenValue.value / 16));
            channel[a] += decimalToHexa(Math.floor(txtGreenValue.value % 16));
        }
        else if(a == 2) {
            channel[a] = "";
            channel[a] += decimalToHexa(Math.floor(txtBlueValue.value / 16));
            channel[a] += decimalToHexa(Math.floor(txtBlueValue.value % 16));
        }    
    }

    hexcode = channel[0] + channel[1] + channel[2]; 
    txtHexValue.value = hexcode;

    //-------------HEX TO SOURCE HEX-----------

    colorPickerTrigger.style.backgroundColor = '#' + txtHexValue.value.toUpperCase();

    //pass txtHexValue to the link txtHex
    if(colorPickerTrigger.previousElementSibling != null) {

        colorPickerTrigger.previousElementSibling.value = txtHexValue.value;
        colorPickerTrigger.previousElementSibling.addEventListener('change', encodeTextMulti);
        colorPickerTrigger.previousElementSibling.dispatchEvent(new Event('change'));
        
    }
    
}
txtHueValue.addEventListener('change', hsb2All);
txtSatValue.addEventListener('change', hsb2All);
txtBrightValue.addEventListener('change', hsb2All);

//==============LINK COLOR PICKER HEX WITH DEFAULT HEX========

document.addEventListener('pointerup', function(e){

    e.preventDefault();
    colorBoardBool = false;
    colorBarBool = false;

    if(colorPickerPanel.dataset.show == "true") {

        if(e.target.parentElement.className != "divColorValues" && !e.target.closest("#dropdownColorValue") && e.target != colorPickerTrigger) {
            colorPickerTrigger.previousElementSibling.addEventListener('change', encodeTextMulti);
            colorPickerTrigger.previousElementSibling.dispatchEvent(new Event('change'));
        }
    }
   
});

//=========================BIT CONVERSIONS======================

function decimalToHexa(e) {
    var hexa = "ABCDEF";
    if(e > 9) {
        var z = e-9;
        var y = z - 1;
        return (hexa.substring(y,z)).toString();
    }
    else {
        return e.toString();
    }
}

function hexaToDecimal(e) {
    var hexa = "ABCDEF";

    return hexa.search(e.toUpperCase()) + 10;
}

//===============LOSE FOCUS ON COLOR PICKER=================

function hideColorPickerPanel(e) {

    if(e.target.closest('#colorPickerPanel') == null && e.target != colorPickerTrigger) {
    //if(e.target.closest('#colorPickerPanel') == null && e.target.className != "thumbPicker" && e.target.className != "thumbPickerPattern" && e.target.className != "thumbPickerOutline" && e.target.className != "thumbPickerGlow" && e.target.className != "thumbPickerShadow" && e.target.className != "thumbPickerTextColor") {
        if(colorPickerPanel.dataset.show == "true") {

            colorPickerPanel.style.display = "none";
            colorPickerPanel.dataset.show = "false";

        }
    } 

}

document.addEventListener('pointerdown', hideColorPickerPanel);


function escColorPickerPanel(e) {
    if(e.keyCode === 27) {
        hideColorPickerPanel(e);
    }
}
document.addEventListener('keydown', escColorPickerPanel)

























