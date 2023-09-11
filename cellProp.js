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
            bgColor: "#000000",

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

// attach property listener


bold.addEventListener("click",(e)=>{

});
