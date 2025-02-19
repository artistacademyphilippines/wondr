
var maxH = 50;
var includeHistory = false;


function checkMaxHistory() {
    if(h < maxH - 1) {
        h++;
    }
    else {
        for(let a = 0; a < maxH; a++) {
            if(history[a+1] != null) {
                history[a] = history[a+1];
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