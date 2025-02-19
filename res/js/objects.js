
const supabaseUrl = 'https://mdskbqpghlptskglsekp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kc2ticXBnaGxwdHNrZ2xzZWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNjg5MzQsImV4cCI6MjA1MzY0NDkzNH0.73MEv89D96Uzm0Ft65lRPhY0gQghia8jvVdwK1G5UkU";
const initSupabase = supabase.createClient(supabaseUrl, supabaseKey, { db: {schema: 'wondr'} })

//////////////////////////AUTH USER//////////////////

function authUser() {
    let {error } = initSupabase.auth.signInWithPassword({
        email: 'e1x2.a9sR7eZ1_h4@savvy.com',
        password: '4d9f3a67@#bc2e8e81!a7bba214*d7f3b02d$'
    })

    if(!error) {
        return true;
    }
    else {
        console.log('cant auth')
        return false;
    }
}

//////////////////////////FILTERS////////////////////

async function fetchLimitedCategory(table, start, limit) {

    let {data} = await initSupabase
    .from(`res_${table.toLowerCase()}_category`)
    .select()
    .gte('index', start)
    .lte('index', limit)
    .order('index', { ascending: true })

    return data;
}

async function fetchLimitedRowsByTags(table, category, limit) {

    let {data} = await initSupabase
    .from(`res_${table.toLowerCase()}`)
    .select()
    .ilike('tags', `%${category.toLowerCase()}%`)
    .limit(limit)
    .order('index', { ascending: true })

    return data;
}

async function fetchAllRowsByTags(table, category) {

    let {data} = await initSupabase
    .from(`res_${table.toLowerCase()}`)
    .select()
    .ilike('tags', `%${category.toLowerCase()}%`)
    .order('index', { ascending: true })

    return data;
}

async function fetchRowById(table, id) {

    let {data} = await initSupabase
    .from(`res_${table.toLowerCase()}`)
    .select()
    .eq('id', id)

    return data;
}

async function fetchElementByIndex(index) {
    let {data} = await initSupabase
    .from(`res_elements`)
    .select()
    .eq('index', index)

    return data;
}

async function fetchLimitedFonts(table, start, limit) {
    let {data} = await initSupabase
    .from(`res_font_${table}`)
    .select()
    .gte('index', start)
    .lte('index', limit)
    .order('index', { ascending: true })

    return data;
}

async function fetchFontByClass(table, font) {
    let {data} = await initSupabase
    .from(`res_font_${table}`)
    .select()
    .eq('name', font)

    return data;
}

async function fetchFontByName(table, font) {
    let {data} = await initSupabase
    .from(`res_font_${table}`)
    .select()
    .ilike('name', font)

    return data;
}

async function fetchFontLength(table) {
    let {data} = await initSupabase
    .from(`res_font_${table}`)
    .select();  // Only return count, not data

    return data;
}

async function fetchFontByTag(table, keyword) {
    let {data} = await initSupabase
    .from(`res_font_${table}`)
    .select()
    .ilike('tags', `%${keyword}%`)

    return data;
}

////////////////////SEARCHING ON CONTENT PREVIEW//////////////////////////

async function searchContentPreview(configScroll, table, keyword) {

    //DO NOT RELOCATE SHOWFILLERS
    //THIS SEQUENCE IS CORRECT
    showFillers(configScroll);

    let content = configScroll.querySelector(`.${configScroll.dataset.content}`);
    let wrapEntries = content.querySelectorAll('.wrapEntries');
    
    let dataCategory = await fetchLimitedCategory(table, 0, content.childElementCount);

    for(let a = 0; a < dataCategory.length; a++) {

        let append = "";
        let count = 0;
        let limit = 3; //LIMIT 3 THUMBNAILS PER CATEGORY
        let category = dataCategory[a].category;
        
        //FETCH ALL ROWS USING CATEGORY
        let dataTag = await fetchAllRowsByTags(table, category)
        
        //APPEND 3 THUMBS STRING
        for(let b = 0; b < dataTag.length; b++) {

            if(count <= limit) {

                let tag = dataTag[b].tags.split(', ');

                for(let c = 0; c < tag.length; c++) {

                    if(tag[c].startsWith(keyword.toLowerCase()) || tag[c].includes(keyword.toLowerCase())) {
                        
                        count++;
                        append += 
                        `<div class="optPreviewMini" data-thumbno = "${dataTag[b].index}">
                            <div class = "hoverPreviewMini">
                                ${dataTag[b].source}
                            </div>
                        </div>`;
                        
                        break;

                    }
                }
            }
            else {

                break;

            }
        }

        if(append != "") {

            //APPEND THE 3 THUMBS INSIDE THE WRAPENTRIES
            wrapEntries[a].innerHTML = 
            `<div class="previewTitle"><h2 style="color: white; letter-spacing: 1px;">${category}</h2><div class="btnViewAll" data-category="${category}"><h2 style="margin:auto;">View all</h2></div></div>
            <div class="wrapThumbs">${append}</div>`;

        }

        //THIS FUNCTION WILL REMOVE BACKGROUND
        await checkLoadedEntries(wrapEntries[a], dataTag.length, table);
        
    }

    removeEmptyFillers(wrapEntries);
}

async function searchContentCategory(configScroll, table, keyword) {
    
    let contentCategory = configScroll.querySelector('.contentCategory');
    let content = configScroll.querySelector(`.${configScroll.dataset.content}`);
    let category = contentCategory.querySelector('.previewTitle').firstChild.innerText;

    //DO NOT RELOCATE SHOWFILLERS
    //THIS SEQUENCE IS CORRECT
    showFillers(configScroll);

    let wrapEntries = content.querySelectorAll('.wrapEntries');
    
    let append = "";
    //FETCH ALL ROWS USING CATEGORY
    let dataTag = await fetchAllRowsByTags(table, category)
    
    //APPEND 3 THUMBS STRING
    for(let a = 0; a < dataTag.length; a++) {

        let tag = dataTag[a].tags.split(', ');

        for(let b = 0; b < tag.length; b++) {

            if(tag[b].startsWith(keyword.toLowerCase()) || tag[b].includes(keyword.toLowerCase())) {
                
                append += 
                `<div class="optPreviewMini" data-thumbno = "${dataTag[a].index}">
                    <div class = "hoverPreviewMini">
                        ${dataTag[a].source}
                    </div>
                </div>`;
                
                break;

            }
        }
        
    }

    //APPEND THE 3 THUMBS INSIDE THE WRAPENTRIES
    wrapEntries[0].innerHTML = 
    `<div class="previewTitle"><h2 style="color: white; letter-spacing: 1px;">${category}</h2><div class="btnViewAll" data-category="${category}" style="visibility: hidden;"><h2 style="margin:auto;">View all</h2></div></div>
    <div class="wrapThumbs">${append}</div>`;

    //THIS FUNCTION WILL REMOVE BACKGROUND
    await checkLoadedEntries(wrapEntries[0], dataTag.length, table);
        
    removeEmptyFillers(wrapEntries);
}

function searchPreviewOrCategory() {

    let menu = this.closest(`[id*=menu]`);
    let table = menu.id.replace('menu', '').toLowerCase();
    let txtSearch = menu.querySelector('.txtSearch');
   
    let configScroll = menu.querySelector('.configScroll');

    if(configScroll.dataset.content == 'contentPreview') {
        searchContentPreview(configScroll, table, txtSearch.value);
    }
    else if(configScroll.dataset.content == 'contentCategory') {
        searchContentCategory(configScroll, table, txtSearch.value)
    }
}

function resetPreviewOrCategory() {

    let menu = this.closest(`[id*=menu]`);
    let table = menu.id.replace('menu', '').toLowerCase();
   
    let configScroll = menu.querySelector('.configScroll');

    if(configScroll.dataset.content == 'contentPreview') {
        showFillers(configScroll)
        resetContentPreview(configScroll, table)
    }
    else if(configScroll.dataset.content == 'contentCategory') {
        let contentCategory = configScroll.querySelector('.contentCategory');
        let me = contentCategory.querySelector('.btnViewAll');
        resetContentCategory(me, configScroll)
    }
}

/////////////////////////SEARCHING FOR SUGGESTIONS////////////////////

async function searchSuggestions(me, keyword) {

    let drop =  me.parentElement.nextElementSibling;
    let table = me.closest(`[id*=menu]`).id.replace('menu', '').toLowerCase();
    
    let data = await fetchAllRowsByTags(table, keyword);

    if(data.length > 0) {
    
        drop.innerHTML = ``

        for(let a = 0; a < data.length; a++) {
            let keys = data[a].tags.split(', ');

            for(let b = 0; b < keys.length; b++) {

                if(keys[b].startsWith(keyword.toLowerCase()) || keys[b].includes(keyword.toLowerCase())) {
                    if(!drop.outerHTML.includes(keys[b])) {
                        drop.innerHTML += 
                        `<div class="optSearch">
                            <div class="searchIcon" style="margin-left: 0px; background-color: transparent;">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.47653 10.8907C8.49571 11.5892 7.29583 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 7.29583 11.5892 8.49572 10.8907 9.47653L13.9498 12.5356L12.5356 13.9498L9.47653 10.8907ZM10 6C10 8.20914 8.20914 10 6 10C3.79086 10 2 8.20914 2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6Z" fill="white"/>
                                </svg>
                            </div>
                            ${keys[b]}
                        </div>`;
                    }
                }
            }
        }

        drop.querySelectorAll('.optSearch').forEach((opt) => {
            opt.addEventListener('click', function() {
                let txtSearch = opt.closest('.pnlDropHeader').querySelector('.txtSearch');
                txtSearch.value = opt.innerText;
                searchPreviewOrCategory.call(this)
            })
        })

        
    }
    //IF NO RESULTS FOUND
    else {

        drop.innerHTML = 
        `<div style="width: 100%; height: 32px; display:flex;">
        <h2 style="color: white; font-size: 12px; font-weight: 600; letter-spacing: 1px; margin: auto;">
            No ${table} found
        </h2></div>`;
    }

    drop.style.display = "block";
    drop.previousElementSibling.dataset.on = 'true';
}

async function searchFontSuggestions(me, keyword) {

    let find = 0;
    let drop =  me.parentElement.nextElementSibling;
    
    let stylish = await fetchFontByTag('stylish', keyword);

    if(stylish.length > 0) {
        
        drop.innerHTML = ``

        for(let a = 0; a < stylish.length; a++) {
            let keys = stylish[a].tags.split(', ');
            let fontCase;

            if(stylish[a].tags.includes('cursive')) fontCase = "capitalize";
            else fontCase = "upper";

            for(let b = 0; b < keys.length; b++) {

                if(keys[b].startsWith(keyword.toLowerCase()) || keys[b].includes(keyword.toLowerCase())) {
                    if(!drop.outerHTML.includes(keys[b])) {
                        drop.innerHTML += 
                        `<div class="optSearch" data-font="${stylish[a].name}" data-class="stylish" data-case="${fontCase}" data-source="${stylish[a].source}">
                            <div class="searchIcon" style="margin-left: 0px; background-color: transparent;">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.47653 10.8907C8.49571 11.5892 7.29583 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 7.29583 11.5892 8.49572 10.8907 9.47653L13.9498 12.5356L12.5356 13.9498L9.47653 10.8907ZM10 6C10 8.20914 8.20914 10 6 10C3.79086 10 2 8.20914 2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6Z" fill="white"/>
                                </svg>
                            </div>
                            ${stylish[a].name}
                        </div>`;
                        find++;
                    }
                }
            }
        }
    }

    let sansSefif = await fetchFontByTag('sans_serif', keyword);

    if(sansSefif.length > 0) {
        
        drop.innerHTML = ``

        for(let a = 0; a < sansSefif.length; a++) {
            let keys = sansSefif[a].tags.split(', ');
            let fontCase;

            if(sansSefif[a].tags.includes('cursive')) fontCase = "capitalize";
            else fontCase = "upper";

            for(let b = 0; b < keys.length; b++) {

                if(keys[b].startsWith(keyword.toLowerCase()) || keys[b].includes(keyword.toLowerCase())) {
                    if(!drop.outerHTML.includes(keys[b])) {
                        drop.innerHTML += 
                        `<div class="optSearch" data-font="${sansSefif[a].name}" data-class="sansSerif" data-case="${fontCase}" data-source="${sansSefif[a].source}">
                            <div class="searchIcon" style="margin-left: 0px; background-color: transparent;">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.47653 10.8907C8.49571 11.5892 7.29583 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 7.29583 11.5892 8.49572 10.8907 9.47653L13.9498 12.5356L12.5356 13.9498L9.47653 10.8907ZM10 6C10 8.20914 8.20914 10 6 10C3.79086 10 2 8.20914 2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6Z" fill="white"/>
                                </svg>
                            </div>
                            ${sansSefif[a].name}
                        </div>`;
                        find++;
                    }
                }
            }
        }
    }

    let serif = await fetchFontByTag('serif', keyword);

    if(serif.length > 0) {
        
        drop.innerHTML = ``

        for(let a = 0; a < serif.length; a++) {
            let keys = serif[a].tags.split(', ');
            let fontCase;

            if(serif[a].tags.includes('cursive')) fontCase = "capitalize";
            else fontCase = "upper";

            for(let b = 0; b < keys.length; b++) {

                if(keys[b].startsWith(keyword.toLowerCase()) || keys[b].includes(keyword.toLowerCase())) {
                    if(!drop.outerHTML.includes(keys[b])) {
                        drop.innerHTML += 
                        `<div class="optSearch" data-font="${serif[a].name}" data-class="serif" data-case="${fontCase}" data-source='${serif[a].source}'>
                            <div class="searchIcon" style="margin-left: 0px; background-color: transparent;">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.47653 10.8907C8.49571 11.5892 7.29583 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 7.29583 11.5892 8.49572 10.8907 9.47653L13.9498 12.5356L12.5356 13.9498L9.47653 10.8907ZM10 6C10 8.20914 8.20914 10 6 10C3.79086 10 2 8.20914 2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6Z" fill="white"/>
                                </svg>
                            </div>
                            ${serif[a].name}
                        </div>`;
                        find++;
                    }
                }
            }
        }
        
    }

    if(find == 0) {
        drop.innerHTML = 
        `<div style="width: 100%; height: 32px; display:flex;">
        <h2 style="color: white; font-size: 12px; font-weight: 600; letter-spacing: 1px; margin: auto;">
            No fonts found
        </h2></div>`;
    }

    drop.querySelectorAll('.optSearch').forEach((opt) => {
        opt.addEventListener('click', function() {

            document.head.insertAdjacentHTML('beforeend', this.dataset.source)

            let txtSearch = opt.closest('.pnlDropHeader').querySelector('.txtSearch');
            txtSearch.value = "";
            createPnlBoxText(this, this.dataset.case);

        })
    })


    drop.style.display = "block";
    drop.previousElementSibling.dataset.on = 'true';
}

/////////////////////SWITCHING TO PREVIEW OR CATEGORY//////////////////

function showPreviewOrCategory() {
    let menu = this.closest(`[id*=menu]`);
    let table = menu.id.replace('menu', '').toLowerCase();
    let txtSearch = menu.querySelector('.txtSearch');
    let configScroll = menu.querySelector('.configScroll');
    let contentPreview = configScroll.querySelector('.contentPreview');
    let contentCategory = configScroll.querySelector('.contentCategory');

    txtSearch.value = "";
    txtSearch.nextElementSibling.style.visibility = "hidden";

    if(this.innerText == 'View all') {
        configScroll.dataset.content = "contentCategory";
        contentPreview.style.display = "none";
        contentCategory.style.display = "block";

        if(!contentCategory.firstChild) {
            
            resetContentCategory(this, configScroll);
        }
        else {
            if(this.dataset.category != contentCategory.querySelector('.previewTitle').firstChild.innerText) {
                resetContentCategory(this, configScroll);
            }
        }
    
    }
    else {
        configScroll.dataset.content = "contentPreview";
        contentPreview.style.display = "block";
        contentCategory.style.display = "none";

        if(!contentPreview.firstChild) {
            resetContentPreview(configScroll, table);
        }
        
    }
}

//////////////////////////RESET CONTENT PREVIEW///////////////////////

async function resetContentPreview(configScroll, table) {

    //DO NOT RELOCATE SHOWFILLERS
    //THIS SEQUENCE IS CORRECT
    showFillers(configScroll)
    
    let limit = configScroll.querySelector('.contentPreview').childElementCount;
    let wrapEntries = configScroll.querySelectorAll('.wrapEntries');

    //FETCH CATEGORIES
    let dataCategory = await fetchLimitedCategory(table, 0, limit)
    
    for(let a = 0; a < dataCategory.length; a++) {

        let limit = 3; //LIMIT 3 THUMBNAILS PER CATEGORY
        let category = dataCategory[a].category;
        
        //FETCH ALL PATTERNS USING CATEGORY
        let dataTag = await fetchLimitedRowsByTags(table, category, limit)
       
        let append = "";
        //APPEND 3 THUMBS STRING
        for(let b = 0; b < dataTag.length; b++) {
            append += 
            `<div class="optPreviewMini" data-thumbno = "${dataTag[b].index}" data-post="${dataTag[b].post}">
                <div class = "hoverPreviewMini">
                    ${dataTag[b].source}
                </div>
            </div>`;
        }

        //APPEND THE 3 THUMBS INSIDE THE WRAPENTRIES

        wrapEntries[a].innerHTML = 
        `<div class="previewTitle"><h2 style="color: white; letter-spacing: 1px;">${category}</h2><div class="btnViewAll" data-category="${category}"><h2 style="margin:auto;">View all</h2></div></div>
        <div class="wrapThumbs">${append}</div>`;

        //THIS FUNCTION WILL REMOVE BACKGROUND
        await checkLoadedEntries(wrapEntries[a], dataTag.length, table, dataTag);
    }

    removeEmptyFillers(wrapEntries)

}

//////////////////////////RESET CONTENT CATEGORY/////////////////////

async function resetContentCategory(me, configScroll) {

    //DO NOT RELOCATE SHOWFILLERS
    //THIS SEQUENCE IS CORRECT
    showFillers(configScroll)

    let contentCategory = configScroll.querySelector('.contentCategory');
    let category = me.dataset.category;
    let table = configScroll.closest(`[id*='menu']`).id.replace('menu', '').toLowerCase();
    let wrapEntries = contentCategory.querySelectorAll('.wrapEntries');

    let limit = contentCategory.childElementCount * 4;
    let data = await fetchAllRowsByTags(table, category);
    let append = "";

    for(let a = 0; a < limit; a++) {

        if(data[a] != null) {

            if(a < 3) {
                append += 
                `<div class="optPreviewMini" data-thumbno = "${data[a].index}" data-post="${data[a].post}">
                    <div class = "hoverPreviewMini">
                        ${data[a].source}
                    </div>
                </div>`;
            }
            else {
                append += 
                `<div class="optPreviewMini" data-thumbno = "${data[a].index}" style="display: none;" data-post="${data[a].post}">
                    <div class = "hoverPreviewMini">
                        ${data[a].source}
                    </div>
                </div>`;
            }
            
        }

        else {
            break;
        }
    }

    wrapEntries[0].innerHTML =
    `<div class="previewTitle"><h2 style="color: white; letter-spacing: 1px;">${category}</h2><div class="btnViewAll" data-category="${category}"><h2 style="margin:auto;">Go back</h2></div></div>
    <div class="wrapThumbs">${append}</div>`;
        
    //THIS FUNCTION WILL REMOVE BACKGROUND
    setTimeout(async function() {
        await checkLoadedEntries(wrapEntries[0], data.length, table);
        removeEmptyFillers(wrapEntries)}, 300)
    
}

/////////////////////LOAD ENTRIES OPT AND ADDING EVENTS//////////////////

async function checkLoadedEntries(entry, count, table) {

    let opt = entry.querySelectorAll(`[class*='opt']`);
    let btnViewAll = entry.querySelector('.btnViewAll');

    for(let a = 0; a < count; a++) {
        //AWAIT IF THUMBNAIL HAS LOADED
        if(opt[a] != null) {

            await opt[a].firstChild.firstChild
            opt[a].style.display = "flex";
            //ADD FUNCTIONS TO OPTS
            opt[a].addEventListener('pointerover', function() {
                this.style.borderColor = "#647499";
                //this.style.backgroundColor = "#343C4F";
            });
            opt[a].addEventListener('pointerleave', function() {
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";
            });
            opt[a].addEventListener('dblclick', function() {
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";

                if(table.includes('pattern')) {
                    createPnlBoxPattern(this.querySelector('svg').id, this.querySelector('svg').outerHTML);
                }
                else if (table.includes('elements')) {
                    
                    if(this.querySelector('svg').getAttribute('id').toLowerCase().includes('line')) {
                        createPnlBoxLine(this.dataset.thumbno);

                    }
                    else {
                        createPnlBoxElement(this.dataset.thumbno, this.querySelector('svg').outerHTML, this.dataset.post);
                    }
                }
                
            }); 
        }
    }

    btnViewAll.addEventListener('click', showPreviewOrCategory);
}

/////////////////////SHOW FILLERS FOR PATTERN OR ELEMENTS////////////////

function showFillers(configScroll) {

    let content = configScroll.dataset.content;
    let maxEntries = Math.round(configScroll.clientHeight / 133); //109px for wrapEntries + 1.5em margin
    
    configScroll.querySelector(`.${content}`).innerHTML = '';

    for(let a = 0; a < maxEntries; a++) { 
        configScroll.querySelector(`.${content}`).innerHTML += `<div class="wrapEntries"></div>`
    }
}

///////////////////////REMOVING EMPTY FILLERS///////////////

function removeEmptyFillers(wrapEntries) {

    for(let a = 0; a < wrapEntries.length; a++) {
        if(wrapEntries[a].childElementCount == 0) {
            wrapEntries[a].style.display = "none";
            wrapEntries[a].remove();
            wrapEntries[a] = null;
        }
        else {
            wrapEntries[a].style.backgroundColor = "transparent";
            wrapEntries[a].children[0].style.visibility = 'visible';
            wrapEntries[a].children[1].style.visibility = 'visible';
        }
    }
}

//////////////////////CHECK LOADED FONTS///////////////////////
async function checkLoadedFonts(wrapFonts) {

    //ADD FUNCTIONS TO OPTS
    wrapFonts.addEventListener('pointerenter', function() {
        //this.style.backgroundColor = "#343C4F";
        this.style.border = "1px solid #647499";
        this.children[0].style.color = "white";
    });
    wrapFonts.addEventListener('pointerleave', function() {
        this.style.backgroundColor = "transparent";
        this.style.border = "1px solid transparent";
        this.children[0].style.color = "#9DAFDB";
    });
    wrapFonts.addEventListener('dblclick', function() {
        this.style.borderColor = "#6885CC";
        createPnlBoxText(this, this.dataset.case);
    });

    await wrapFonts.firstChild
    wrapFonts.firstChild.style.display = "flex";
    wrapFonts.style.transition = '0s';

}
//////////////////////////SHOW FONT FILLERS///////////////////////

async function showFontFillers(configScroll, tab) {

    let maxEntries = Math.round(configScroll.clientHeight / 66) + 1; //50px for wrapFonts + 1em margin

    tab.innerHTML = '';

    for(let a = 0; a < maxEntries; a++) { 
        tab.innerHTML += `<div class="wrapFonts" data-thumbno = '${a}'></div>`;
    }
}

async function lazyFontFillers(tab, maxEntries, direction) {

    if(direction == "down") {
        let i = Number(tab.lastChild.dataset.thumbno);
        for(let a = 0; a < maxEntries; a++) { 

            tab.insertAdjacentHTML('beforeend', `<div class="wrapFonts" data-thumbno = '${i + 1 + a}'></div>`)
        }
    }
    else if(direction == "up") {
        let i = Number(tab.firstChild.dataset.thumbno);
        for(let a = 0; a < maxEntries; a++) { 

            tab.insertAdjacentHTML('afterbegin', `<div class="wrapFonts" style="background-color: transparent;" data-thumbno = '${i - 1 - a}'></div>`)
        }
    }
    
}

///////////////////////REMOVING EMPTY FONT FILLERS///////////////

function removeEmptyFontFillers(tab) {

    for(let a = 0; a < tab.childElementCount; a++) {
        
        if(tab.firstChild) {
            tab.children[a].style.backgroundColor = "transparent";
        }
        else {
            tab.display = "none";
            tab.remove();
            tab = null;
        }
        
    }
}






