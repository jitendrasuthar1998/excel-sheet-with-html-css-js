let rows = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressBar = document.querySelector(".address-bar");

for(let i=0; i<rows;i++){
    let addressCol = document.createElement("span");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}

let addressRowCont = document.querySelector(".address-row-cont");


for(let i=0; i<cols; i++){
    let addressRow = document.createElement("span");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText =  String.fromCharCode(65+i);
    addressRowCont.appendChild(addressRow);
}

let cellsCont = document.querySelector(".cells-cont");

for(let i=0; i<rows; i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for(let j=0;j<cols;j++){
        let cell = document.createElement("div");
        cell.setAttribute("class","cell")
        cell.setAttribute("contenteditable",true);
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j)
        cell.setAttribute("spellcheck",false);
        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell,i,j);
    }

    cellsCont.appendChild(rowCont);
    
}

function addListenerForAddressBarDisplay(cell,i,j){
    cell.addEventListener("click",(e)=>{
        let rowId = i+1;
        let colId = String.fromCharCode(65+j);
        addressBar.value = `${colId}${rowId}`;
    })
}

// by default click on first cell

let firstCell = document.querySelector(".cell");
firstCell.click();