  
  /**
   * Remove background an image
   */
async function removeBackground(img, leadPanel) {
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    // Loading the model
    const net = await bodyPix.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2
    });
    
    // Segmentation
    const { data:map } = await net.segmentPerson(canvas, {
      internalResolution: 'medium',
    });
    
    
     // Extracting image data
    const { data:imgData } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Creating new image data
    const newImg = ctx.createImageData(canvas.width, canvas.height);
    const newImgData = newImg.data;
    
    for(let i=0; i<map.length; i++) {
      //The data array stores four values for each pixel
      const [r, g, b, a] = [imgData[i*4], imgData[i*4+1], imgData[i*4+2], imgData[i*4+3]];
      [
        newImgData[i*4],
        newImgData[i*4+1],
        newImgData[i*4+2],
        newImgData[i*4+3]
      ] = !map[i] ? [255, 255, 255, 0] : [r, g, b, a];
    }
    
    // Draw the new image back to canvas
    ctx.putImageData(newImg, 0, 0);

    let src = canvas.toDataURL();

    let f = leadPanel.dataset.ref;
    let cnvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`)
    let image = cnvas.querySelector(`img`);
    image.style.visibility = "hidden";
    image.src = src;

    image.onload = function() {
        image.style.visibility = "visible";
    }
  }