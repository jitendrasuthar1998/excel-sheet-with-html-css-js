//Storage

let sheetDb = [];

for (let i = 0; i < rows; i++) {
    let sheetRow = [];

    for (let j = 0; j < cols; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            bgColor: "",

        }
        sheetRow.push(cellProp)
    }

    sheetDb.push(sheetRow);
}

console.log("sheetDb is == ", sheetDb);

// Selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let fontColor = document.querySelector(".font-color-prop");
let bgColor = document.querySelector(".bg-color-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let backgroundColorProp = document.querySelector(".background-color-prop");
let textColorProp = document.querySelector(".text-color-prop");
//application of two way binding

// attach property listener

let activeColorProp = "#d1d8d0";
let inactiveColorProp = "";

bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] =  activeCell(address);

    //modification

    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
});


italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] =  activeCell(address);

    //modification

    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
});

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] =  activeCell(address);

    //modification

    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
});

fontSize.addEventListener("change",(e)=>{
    let address = addressBar.value;
    let [cell, cellProp] =  activeCell(address);

    //modification
    cellProp.fontSize = fontSize.value; //data change
    cell.style.fontSize = cellProp.fontSize+"px";
    fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change",(e)=>{
    let address = addressBar.value;
    let [cell, cellProp] =  activeCell(address);

    //modification
    cellProp.fontFamily = fontFamily.value; //data change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener("change",(e)=>{
    let address = addressBar.value;
    let [cell, cellProp] =  activeCell(address);

    cellProp.fontColor = fontColor.value; //data change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
    textColorProp.style.color = cellProp.fontColor;
})

bgColor.addEventListener("change",(e)=>{
    let address = addressBar.value;
    let [cell, cellProp] =  activeCell(address);

    cellProp.bgColor = bgColor.value; //data change
    cell.style.backgroundColor = cellProp.bgColor;
    bgColor.value = cellProp.bgColor;
    backgroundColorProp.style.color = cellProp.bgColor;
});

alignment.forEach((alignElem)=>{
    alignElem.addEventListener("click",(e)=>{
        let address = addressBar.value;
        let [cell, cellProp] =  activeCell(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;
        cell.style.textAlign = alignValue; // ui change
        switch(alignValue){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }        
    })
})

let allCells = document.querySelectorAll(".cell");

for(let i=0;i<allCells.length;i++){
    addEventListenerToAttachCellProperties(allCells[i]);
}

function addEventListenerToAttachCellProperties(cell){
    cell.addEventListener("click",(e)=>{

        //apply cell properties

        let address = addressBar.value;
        let [rid,cid]=decodeRowAndColId(address);
        let cellProp = sheetDb[rid][cid];

        cell.style.fontSize = cellProp.fontSize+"px";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.bgColor;
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.textAlign = cellProp.alignment; 
        
        // apply properties to ui container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        fontFamily.value = cellProp.fontFamily;
        fontSize.value = cellProp.fontSize;
        bgColor.value = cellProp.bgColor;
        backgroundColorProp.style.color = cellProp.bgColor;
        textColorProp.style.color = cellProp.fontColor;

        switch(cellProp.alignment){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        } 
        
    });
}

function activeCell(address) {
    let [rid, cid] = decodeRowAndColId(address);
    console.log("rid and cid == ", rid, cid);

    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDb[rid][cid];
    return [cell, cellProp];
}

function decodeRowAndColId(address) {
    let rid = Number(address.slice(1)) - 1;
    let cid = Number(address.charCodeAt(0)) - 65;
    return [rid, cid];
}