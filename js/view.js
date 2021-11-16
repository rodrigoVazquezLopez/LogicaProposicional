/**
 * write a proposition character on input box.
 * @param {string} char - a character between A-I
 */
function prepBtn(char) {
  if (char.charCodeAt(0) > 64 && char.charCodeAt(0) < 91) {
    const entrada = document.getElementById("entrada");
    if (entrada.textContent == "0") {
      entrada.textContent = char;
    } else {
      entrada.textContent = entrada.textContent + char;
    }
  }
}

/**
 *  write an operation or parenthesis character on input box.
 * @param {object} value - a number between 1-6 or characters '(', ')'.
 * @returns {string} error if the input data is invlid
 */
function btnOper(value) {
  let char;
  const entrada = document.getElementById("entrada");
  switch (value) {
    case 1:
      char = charOpNeg;
      break;
    case 2:
      char = charOpConj;
      break;
    case 3:
      char = charOpDisy;
      break;
    case 4:
      char = charOpImp;
      break;
    case 5:
      char = charOpBicond;
      break;
    case 6:
      char = charOpDisyExc;
      break;
    case "(":
      char = "(";
      break;
    case ")":
      char = ")";
      break;
    default:
      return "error";
  }
  if (entrada.textContent == "0") {
    entrada.textContent = char;
  } else {
    entrada.textContent = entrada.textContent + char;
  }
}

/**
 * delete a character on input box.
 */
function btnFunDEL() {
  const entrada = document.getElementById("entrada");
  if (entrada.textContent != "0") {
    if (entrada.textContent.length == 1) {
      entrada.textContent = "0";
    } else {
      entrada.textContent = entrada.textContent.slice(0, entrada.textContent.length - 1);
    }
  }
}

function btnFunAC() {
  const entrada = document.getElementById("entrada");
  entrada.textContent = "0";
}

/**
 * main function
 */
function showResults() {
  const entrada = document.getElementById("entrada");
  let tokens = tokenizer(entrada.textContent);
  displayTokens(tokens);
  // aqui va el analizador sintactico
  let posfix = shuntingYard(tokens);
  displayPosfix(posfix);
  let results = evaluateExpression(posfix[0]);
  displayTruthTable(results);
}

function displayTokens(arr) {
  let textA = '<div class="card-token-element"><p class="token-data">';
  let textB = '</p><p class="token-type-data">';
  let textC = "</p></div>";
  let tokens = "";
  for (let i = 0; i < arr.length; i++) {
    tokens = tokens + textA + arr[i].token + textB + arr[i].type + textC;
  }
  document.getElementById("tokenizer").innerHTML = tokens;
}

function displayPosfix(arr) {
  let posfix = arr[0];
  let steps = arr[1];

  let itTxtA = '<div class="iteration-container"><div class="iteration-container-internal"><div class="iteration-title">';
  let itTxtB = '</div><div class="iteration-border"></div></div></div>';

  let txtA = '<div class="card-token-element"><p class="token-data">';
  let txtB = '</p><p class="token-type-data">';
  let txtC = "</p></div>";
  let txt = "";

  for (let i = 0; i < steps.length; i++) {
    txt = txt + itTxtA + "Iteration " + (i+1) + itTxtB;
    txt = txt + '<div class="partial-container"><p class="output-subtitle">Output</p><div class="posfix-partial-values-container">';
    for (let j = 0; j < steps[i][0].length; j++) {
      txt = txt + txtA + steps[i][0][j].token + txtB + steps[i][0][j].type + txtC;
    }

    txt = txt + '</div></div><div class="partial-container"><p class="stack-subtitle">Stack</p><div class="stack-values-container">';
    for (let j = steps[i][1].length-1; j >= 0 ; j--) {
      txt = txt + txtA + steps[i][1][j].token + txtB + steps[i][1][j].type + txtC;
    }
    txt = txt + "</div></div>";
  }
  document.getElementById("partial_results").innerHTML = txt;

  let txtShnt = itTxtA + "Result" itTxtB;
  txtShnt = txtShnt + '<div class="posfix-output-container"><p class="output-subtitle">Output</p><div class="posfix-partial-values-container">';
  for (let i = 0; i < posfix.length; i++) {
    txtShnt = txtShnt + txtA + posfix[i].token + txtB + posfix[i].type + txtC;
  }
  document.getElementById("shunting").innerHTML = txtShnt + '</div></div>';
}

function displayTruthTable(arr) {
  let inputLabels = arr[0];
  let outputLabels = arr[1];
  let inputTable = arr[2];
  let outputTable = arr[3];

  headers = "";
  for (let i = 0; i < inputLabels.length; i++) {
    headers = headers + "<th>" + inputLabels[i] + "</th>";
  }
  content = "";
  for (let i = 0; i < inputTable.length; i++) {
    content = content + "<tr>";
    for (let j = 0; j < inputTable[i].length; j++) {
      content = content + "<td>" + inputTable[i][j] + "</td>";
    }
    content = content + "</tr>";
  }
  document.getElementById("inputs").innerHTML = headers + content;

  headers = "";
  for (let i = 0; i < outputLabels.length; i++) {
    headers = headers + "<th>" + outputLabels[i] + "</th>";
  }
  content = "";
  for (let i = 0; i < outputTable.length; i++) {
    content = content + "<tr>";
    for (let j = 0; j < outputTable[i].length; j++) {
      content = content + "<td>" + outputTable[i][j] + "</td>";
    }
    content = content + "</tr>";
  }
  document.getElementById("outputs").innerHTML = headers + content;
}
