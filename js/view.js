/**
 * @fileoverview view.js contiene las definiciones de las vistas de la UI
 *
 * @version 1.0
 *
 * @author Rodrigo Vázquez-López <rodrigo_em2@hotmail.com>
 * @copyright Rodrigo Vázquez-López
 *
 * History
 * v1.0 – Versión inicial
 * ----
 * Módulo de enlace entre apliación JSLógicaProposicional y la UI
*/

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
 * write an operation or parenthesis character on input box.
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

/**
 * clear input box
 */
function btnFunAC() {
  const entrada = document.getElementById("entrada");
  entrada.textContent = "0";
}

/**
 * main function
 */
function showResults() {
  const entrada = document.getElementById("entrada");
  document.getElementById("initial_expression").innerHTML = entrada.textContent;
  let tokens = tokenizer(entrada.textContent);
  displayTokens(tokens);
  // aqui va el analizador sintactico
  let posfix = shuntingYard(tokens);
  displayPosfix(posfix, tokens);
  let results = evaluateExpression(posfix[0]);
  displayTruthTable(results);
}

/**
 * display contents of tokenized input
 * @param {array} arr - an array returned by tokenizer() function
 */
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

/**
 *display contents of posfix and shunting yard algorithm
 * @param {array} arr - an array returned by shuntingYard() function
 */
function displayPosfix(arr, tokens) {
  let posfix = arr[0];
  let steps = arr[1];

  let itTxtA = '<div class="iteration-container"><div class="iteration-container-internal"><div class="iteration-title">';
  let itTxtB = '</div><div class="iteration-border"></div></div></div>';

  let inTxtA = '<div class="card-token-element"><p class="selected-token-data">';
  let inTxtB = '</p><p class="selected-token-type-data">';
  let inTxtC = '</p><div class="triangle-up"></div></div>';

  let outTxtA = '<div class="card-token-element"><p class="token-data">';
  let outTxtB = '</p><p class="token-type-data">';
  let outTxtC = "</p></div>";

  let staTxtA = '<div class="stack-cell"><div class="card-stack-element"><p class="stack-data">';
  let staTxtB = '</p><p class="stack-type-data">';
  let staTxtC = '</p></div><p class="stack-index">';
  let staTxtD = "</p></div>";

  let txt = "";

  for (let i = 0; i < steps.length; i++) {
    txt = txt + itTxtA + "Iteration " + (i + 1) + itTxtB;

    // shows input
    txt = txt + '<div class="partial-container"><p class="input-subtitle">Input</p><div class="posfix-partial-values-container">';
    for (let j = 0; j < tokens.length; j++) {
      if (j == steps[i][2]) {
        txt = txt + inTxtA + tokens[j].token + inTxtB + tokens[j].type + inTxtC;
      } else {
        txt = txt + outTxtA + tokens[j].token + outTxtB + tokens[j].type + outTxtC;
      }
    }

    // shows stack
    let k = 0;
    txt = txt + '</div></div><div class="partial-container"><p class="stack-subtitle">Stack</p><div class="stack-values-container">';
    for (let j = steps[i][1].length - 1; j >= 0; j--) {
      txt = txt + staTxtA + steps[i][1][j].token + staTxtB + steps[i][1][j].type + staTxtC + k++ + staTxtD;
    }

    // shows partial output
    txt = txt + '</div></div><div class="partial-container"><p class="output-subtitle">Output</p><div class="posfix-partial-values-container">';
    for (let j = 0; j < steps[i][0].length; j++) {
      txt = txt + outTxtA + steps[i][0][j].token + outTxtB + steps[i][0][j].type + outTxtC;
    }
    txt = txt + "</div></div>";
  }
  document.getElementById("partial_results").innerHTML = txt;

  let txtShnt = itTxtA + "Result" + itTxtB;
  txtShnt = txtShnt + '<div class="posfix-output-container"><p class="output-subtitle">Output</p><div class="posfix-partial-values-container">';
  for (let i = 0; i < posfix.length; i++) {
    txtShnt = txtShnt + outTxtA + posfix[i].token + outTxtB + posfix[i].type + outTxtC;
  }
  document.getElementById("shunting").innerHTML = txtShnt + "</div></div>";
}

/**
 * displays resulted truth table
 * @param {array} arr - array returned by evaluateExpression() function
 */
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
      if (inputTable[i][j] == "1") {
        content = content + '<td class="false-input-cell">' + inputTable[i][j] + "</td>";
      } else {
        content = content + "<td>" + inputTable[i][j] + "</td>";
      }
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
      if (outputTable[i][j] == "1") {
        content = content + '<td class="false-output-cell">' + outputTable[i][j] + "</td>";
      } else {
        content = content + "<td>" + outputTable[i][j] + "</td>";
      }
    }
    content = content + "</tr>";
  }
  document.getElementById("outputs").innerHTML = headers + content;
}
