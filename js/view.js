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

  let textA = '<div class="card-token-element"><p class="token-data">';
  let textB = '</p><p class="token-type-data">';
  let textC = "</p></div>";
  let txt = "";

  for (let i = 0; i < steps.length; i++) {
    txt = txt + '<div class="partial-container"><p class="posfix-subtitle">Output</p><div class="posfix-partial-values-container">';
    for (let j = 0; j < steps[i][0].length; j++) {
      txt = txt + textA + steps[i][0][j].token + textB + steps[i][0][j].type + textC;
    }

    txt = txt + '</div></div><div class="partial-container"><p class="posfix-subtitle">Stack</p><div class="stack-values-container">';
    for (let j = steps[i][1].length-1; j >= 0 ; j--) {
      txt = txt + textA + steps[i][1][j].token + textB + steps[i][1][j].type + textC;
    }
    txt = txt + "</div></div>";
  }
  document.getElementById("partial_results").innerHTML = txt;

  let txtShunting = "";
  txtShunting = txtShunting + '<div class="posfix-output-container"><p class="posfix-subtitle">Output</p><div class="posfix-partial-values-container">';
  for (let i = 0; i < posfix.length; i++) {
    txtShunting = txtShunting + textA + posfix[i].token + textB + posfix[i].type + textC;
  }
  document.getElementById("shunting").innerHTML = txtShunting + '</div></div>';
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
