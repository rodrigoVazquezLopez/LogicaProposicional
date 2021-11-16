/**
 * gets the number of prepositions in array of tokenized string
 * @param {array} tokens - array of tokens objects
 * @returns {number} number of prepositions
 */
function getNumberOfPrepositions(tokens) {
  let prep = [];
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token.type == "PREP") {
      if (prep.indexOf(token.token) == -1) {
        prep.push(token.token);
      }
    }
  }
  return prep.length;
}

/**
 * gets the number of operations in array of tokenized string
 * @param {array} tokens - array of tokens objects
 * @returns {number} number of operations
 */
function getNumberOfOperations(tokens) {
  let cnt = 0;
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token.type == "OPER" || token.type == "NEG") {
      cnt++;
    }
  }
  return cnt;
}

/**
 * generate truth table's inputs bidimensional array
 * @param {number} numOfPrepositions - number of prepositions 
 * @returns {array} a table of inputs
 */
function generateInputTable(numOfPrepositions) {
  let max = Math.pow(2, numOfPrepositions);
  let table = [];
  let numOfColumns = max.toString(2).length - 1;
  for (let i = 0; i < max; i++) {
    let binary = i.toString(2);
    let x = binary.padStart(numOfColumns, 0);
    let row = x.split("");
    table.push(row);
  }
  return table;
}

/**
 * generate truth table's output bidimensional array
 * @param {number} numOfPrepositions - number of prepositions
 * @param {number} numOfOperations - number of operations
 * @returns {array} a table of outputs
 */
function generateOutputTable(numOfPrepositions, numOfOperations) {
  let max = Math.pow(2, numOfPrepositions);
  let table = [];

  for (let i = 0; i < max; i++) {
    let row = [];;
    for (let j = 0; j < numOfOperations; j++) {
      row.push("0");
    }
    table.push(row);
  }
  return table;
}

/**
 * generate an array of truth table inputs labels
 * @param {array} tokens - array of tokens objets
 * @returns {array} array of inputs labels
 */
function getInputLabels(tokens) {
  let labels = [];
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token.type == "PREP") {
      if (labels.indexOf(token.token) == -1) {
        labels.push(token.token);
      }
    }
  }
  labels.sort();
  return labels;
}

/**
 * implements negation operation truth table
 * @param {string} propA - an input character
 * @returns {string} an output character
 */
function negation(propA) {
  if (propA == "0") {
    return "1";
  } else {
    return "0";
  }
}

/**
 * implements conjunction operation truth table
 * @param {string} propA - proposition A input character
 * @param {string} propB - proposition B input character
 * @returns {string} an output character
 */
function conjunction(propA, propB) {
  if (propA == "1" && propB == "1") {
    return "1";
  } else {
    return "0";
  }
}

/**
 * implements disjunction operation truth table
 * @param {string} propA - proposition A input character
 * @param {string} propB - proposition B input character
 * @returns {string} an output character
 */
function disjunction(propA, propB) {
  if (propA == "0" && propB == "0") {
    return "0";
  } else {
    return "1";
  }
}

/**
 * implements implication operation truth table
 * @param {string} propA - proposition A input character
 * @param {string} propB - proposition B input character
 * @returns {string} an output character
 */
function implication(propA, propB) {
  if (propA == "1" && propB == "0") {
    return "0";
  } else {
    return "1";
  }
}

/**
 * implements biconditional operation truth table
 * @param {string} propA - proposition A input character
 * @param {string} propB - proposition B input character
 * @returns {string} an output character
 */
function biconditional(propA, propB) {
  if (propA == propB) {
    return "1";
  } else {
    return "0";
  }
}

/**
 * implements exclusive disjunction operation truth table
 * @param {string} propA - proposition A input character
 * @param {string} propB - proposition B input character
 * @returns {string} an output character
 */
function exclusiveDisjunction(propA, propB) {
  if (propA == propB) {
    return "0";
  } else {
    return "1";
  }
}

/**
 * evaluate an expresion and generate its truth table
 * @param {array} posfix - array of tokenized string in posfix notation 
 * @returns {array} array composed by input labels,output labels, input data and output data 
 */
function evaluateExpression(posfix) {
  let numPrepositions = getNumberOfPrepositions(posfix);
  let numOperations = getNumberOfOperations(posfix);
  let inputTable = generateInputTable(numPrepositions);
  let inputLabels = getInputLabels(posfix);
  let outputTable = generateOutputTable(numPrepositions, numOperations);

  let s = new Stack();
  
  let operatorIndex = 0;
  let searchIndexOp1 = 0;
  let searchIndexOp2 = 0;

  let outputLabels = [];
  let max = Math.pow(2, numPrepositions);

  for (let i = 0; i < posfix.length; i++) {
    let op1, op2;

    let token = posfix[i];
    if (token.type == "PREP") {
      //si es proposición
      s.push(token);
    } else if (token.type == "NEG") {
      // si es negacion
      op1 = s.pop();
      if (op1.type == "PARTIALRES") {
        searchIndexOp1 = outputLabels.indexOf(op1.token);
        for (let j = 0; j < max; j++) {
          outputTable[j][operatorIndex] = negation(outputTable[j][searchIndexOp1]);
        }
      } else {
        searchIndexOp1 = inputLabels.indexOf(op1.token);
        for (let j = 0; j < max; j++) {
          outputTable[j][operatorIndex] = negation(inputTable[j][searchIndexOp1]);
        }
      }
      let t = new Token(token.token + op1.token, "PARTIALRES");
      outputLabels.push(t.token);
      s.push(t);
      operatorIndex++;
    } else {
      // si es otro operador
      op2 = s.pop();
      op1 = s.pop();

      if (op1.type == "PARTIALRES" && op2.type == "PARTIALRES") {
        searchIndexOp1 = outputLabels.indexOf(op1.token);
        searchIndexOp2 = outputLabels.indexOf(op2.token);
        console.log("searchIndexOp1 = " + searchIndexOp1 + "searchIndexOp2 = " + searchIndexOp2);

        switch (token.token) {
          case charOpConj:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = conjunction(outputTable[j][searchIndexOp1], outputTable[j][searchIndexOp2]);
            }
            break;
          case charOpDisy:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = disjunction(outputTable[j][searchIndexOp1], outputTable[j][searchIndexOp2]);
            }
            break;
          case charOpImp:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = implication(outputTable[j][searchIndexOp1], outputTable[j][searchIndexOp2]);
            }
            break;
          case charOpBicond:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = biconditional(outputTable[j][searchIndexOp1], outputTable[j][searchIndexOp2]);
            }
            break;
          case charOpDisyExc:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = exclusiveDisjunction(outputTable[j][searchIndexOp1], outputTable[j][searchIndexOp2]);
            }
            break;
        }
      } else if (op1.type == "PREP" && op2.type == "PARTIALRES") {
        searchIndexOp1 = inputLabels.indexOf(op1.token);
        searchIndexOp2 = outputLabels.indexOf(op2.token);
        switch (token.token) {
          case charOpConj:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = conjunction(inputTable[j][searchIndexOp1], outputTable[j][searchIndexOp2]);
            }
            break;
          case charOpDisy:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = disjunction(inputTable[j][searchIndexOp1], outputTable[j][searchIndexOp2]);
            }
            break;
          case charOpImp:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = implication(inputTable[j][searchIndexOp1], outputTable[j][searchIndexOp2]);
            }
            break;
          case charOpBicond:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = biconditional(inputTable[j][searchIndexOp1], outputTable[j][searchIndexOp2]);
            }
            break;
          case charOpDisyExc:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = exclusiveDisjunction(inputTable[j][searchIndexOp1], outputTable[j][searchIndexOp2]);
            }
            break;
        }
      } else if (op1.type == "PARTIALRES" && op2.type == "PREP") {
        searchIndexOp1 = outputLabels.indexOf(op1.token);
        searchIndexOp2 = inputLabels.indexOf(op2.token);
        switch (token.token) {
          case charOpConj:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = conjunction(outputTable[j][searchIndexOp1], inputTable[j][searchIndexOp2]);
            }
            break;
          case charOpDisy:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = disjunction(outputTable[j][searchIndexOp1], inputTable[j][searchIndexOp2]);
            }
            break;
          case charOpImp:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = implication(outputTable[j][searchIndexOp1], inputTable[j][searchIndexOp2]);
            }
            break;
          case charOpBicond:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = biconditional(outputTable[j][searchIndexOp1], inputTable[j][searchIndexOp2]);
            }
            break;
          case charOpDisyExc:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = exclusiveDisjunction(outputTable[j][searchIndexOp1], inputTable[j][searchIndexOp2]);
            }
            break;
        }
      } else {
        searchIndexOp1 = inputLabels.indexOf(op1.token);
        searchIndexOp2 = inputLabels.indexOf(op2.token);
        switch (token.token) {
          case charOpConj:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = conjunction(inputTable[j][searchIndexOp1], inputTable[j][searchIndexOp2]);
            }
            break;
          case charOpDisy:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = disjunction(inputTable[j][searchIndexOp1], inputTable[j][searchIndexOp2]);
            }
            break;
          case charOpImp:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = implication(inputTable[j][searchIndexOp1], inputTable[j][searchIndexOp2]);
            }
            break;
          case charOpBicond:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = biconditional(inputTable[j][searchIndexOp1], inputTable[j][searchIndexOp2]);
            }
            break;
          case charOpDisyExc:
            for (let j = 0; j < max; j++) {
              outputTable[j][operatorIndex] = exclusiveDisjunction(inputTable[j][searchIndexOp1], inputTable[j][searchIndexOp2]);
            }
            break;
        }
      }
      let t = new Token(op1.token + token.token + op2.token, "PARTIALRES");
      outputLabels.push(t.token);
      s.push(t);
      console.log(s);
      operatorIndex++;
    }
  }
  return [inputLabels, outputLabels, inputTable, outputTable];
}
