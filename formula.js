//attaching blur event to all cells

for (let i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellProp] = getActiveCell(address);
            let enteredData = activeCell.innerText;


            if(enteredData === cellProp.value) return;


            // if data changes, remove p-c relation, empty formula, update children with new hardcoded value
            cellProp.value = enteredData;
            removeChildFromParent(cellProp.formula);
            console.log("cellProp is == ", cellProp);
            cellProp.formula = "";
            updateChildrenCells(address); 
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");

// if there is any formula in formula bar, that time
// first evaluate that formula
// and second put the result value into select cell prop and also show that value in that cell on screen.
// and also save that formula for that particular cell in its cell prop

formulaBar.addEventListener("keydown", (e) => {
    let inputFormula = formulaBar.value;
    if (e.key === "Enter" && inputFormula) {
        console.log("enter event called");
        let evaluatedValue = evaluateFormula(inputFormula);


        //if there is change in formula, break old parent child relation
        // evaluate new formula
        // add new p-c relation

        let address = addressBar.value;
        let [cell, cellProp] = getActiveCell(address);

        if (inputFormula !== cellProp.formula) {
            removeChildFromParent(cellProp.formula);
        }
        // update ui and cell prop in db

        setCellUIAndCellProp(evaluatedValue, inputFormula, address);
        addChildToParent(inputFormula);
        console.log("sheetDb are == ", sheetDb);
        updateChildrenCells(address);
    }
})

function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = getActiveCell(parentAddress);
    let children = parentCellProp.children;

    for (let i = 0; i < children.length; i++) {
        let childAddress = children[i];
        let [childCell, childCellProp] = getActiveCell(childAddress);
        let childFormula = childCellProp.formula;

        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
        updateChildrenCells(childAddress);
    }
}

function addChildToParent(formula) {
    let childAddress = addressBar.value;
    console.log("childAddress == ", childAddress);
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, parentCellProp] = getActiveCell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
            console.log("parentCellProp is == ", parentCellProp);
            console.log("cell is == ", cell);
        }
    }
}

function removeChildFromParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, parentCellProp] = getActiveCell(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);
        }
    }
}

// this evaluateFormula function only evaluate a form which have space
// ( A1 + A2 )
// (A1+A2) this formula will not work.

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            console.log("encoded formula is == ", encodedFormula);
            let [cell, cellProp] = getActiveCell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;

        }
    }

    let decodedFormula = encodedFormula.join(" ");

    return eval(decodedFormula);
}



function setCellUIAndCellProp(evaluatedValue, formula, address) {
    let [cell, cellProp] = getActiveCell(address);

    //ui update
    cell.innerText = evaluatedValue;

    //db update
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
}