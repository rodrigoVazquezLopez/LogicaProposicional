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
  let index = 0;
  while (index < tokens.length) {
    let token = tokens[index];
    if (token.type == "PREP") {
      labels.push(token.token);
    }
  }
  labels.sort();
  return labels;
}

function negation(propA) {
  if (propA == "0") {
    return "1";
  } else {
    return "0";
  }
}

function conjuction(propA, propB) {
  if (propA == "1" && propB == "1") {
    return "1";
  } else {
    return "0";
  }
}

function disjunction(propA, propB) {
  if (propA == "0" && propB == "0") {
    return "0";
  } else {
    return "1";
  }
}

function implication(propA, propB) {
  if (propA == "1" && propB == "0") {
    return "0";
  } else {
    return "1";
  }
}

function biconditional(propA, propB) {
  if (propA == propB) {
    return "1";
  } else {
    return "0";
  }
}

function exclusiveDisjunction(propA, propB) {
  if (propA == propB) {
    return "0";
  } else {
    return "1";
  }
}
