function getNumberOfPrepositions(tokens) {
    let cnt = 0;
    let index = 0;
    while (index < tokens.length) {
        let token = tokens[index];
        if (token.type == "PREP") {
            cnt++;
        }
        index++;
    }
    return cnt;
}

function getNumberOfOperations(tokens) {
    let cnt = 0;
    let index = 0;
    while (index < tokens.length) {
        let token = tokens[index];
        if (token.type == "OPER" || token.type == "NEG") {
            cnt++;
        }
        index++;
    }
    return cnt;
}

function generateInputTable(numOfPrepositions) {
    let max = Math.pow(2, numOfPrepositions) - 1;
    let table = [];
    let numOfColumns = max.toString(2).length;
    let index = 0;
    while (index <= max) {
        let x = max.toString(2);
        table.push(x.padStart(numOfColumns, 0));
        index++;
    }
    return table;
}

function getInputLabels(tokens) {
    let labels = [];
    
}