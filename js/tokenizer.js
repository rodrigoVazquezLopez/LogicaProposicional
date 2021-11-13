class Token {
  constructor(token, type) {
    this.token = token;
    this.type = type;
  }
}

/**
 * 
 * @param {*} char 
 * @returns 
 */
function isProposition(char) {
  if (char.charCodeAt(0) > 64 && char.charCodeAt(0) < 91) {
    return true;
  }
  return false;
}

function isNegation(char) {
  if (char == charOpNeg) {
    return true;
  }
  return false;
}

function isBinaryOperator(char) {
  switch (char) {
    case charOpConj:
    case charOpDisy:
    case charOpImp:
    case charOpBicond:
    case charOpDisyExc:
      return true;
  }
  return false;
}

function isParenthesis(char) {
  if (char == "(" || char == ")") {
    return true;
  }
  return false;
}

function tokenizer(str) {
  let tokens = [];
  let pos = 0;
  let type = "";
  while (pos < str.length) {
    char = str.charAt(pos);
    if (isProposition(char)) {
      type = "PREP";
    } else if (isNegation(char)) {
      type = "NEG";
    } else if (isBinaryOperator(char)) {
      type = "OPER";
    } else if (isParenthesis(char)) {
      if (char == "(") {
        type = "LEFTPAR";
      } else {
        type = "RIGHTPAR";
      }
    } else {
      type = "ERR";
    }
    let t = new Token(char, type);
    tokens.push(t);
    pos++;
  }
  return tokens;
}
