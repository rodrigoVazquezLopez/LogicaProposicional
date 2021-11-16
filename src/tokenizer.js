/**
 * Class representing a Token
 */
class Token {
  /**
   * constructor
   * @param {string} token - a character
   * @param {string} type - type of token: PREP, NEG, OPER, LEFTPAR, RIGHTPAR, ERR, PARTIALRES
   */
  constructor(token, type) {
    this.token = token;
    this.type = type;
  }
}

/**
 * Check if a character represents a proposition (Letter A-I).
 * @param {string} char - a character
 * @returns {boolean} true if is a character between A-I, false if not.
 */
function isProposition(char) {
  if (char.charCodeAt(0) > 64 && char.charCodeAt(0) < 91) {
    return true;
  }
  return false;
}

/**
 * Check if a character is negation operation symbol
 * @param {string} char - a character
 * @returns {boolean} true if is negation symbol, false if not.
 */
function isNegation(char) {
  if (char == charOpNeg) {
    return true;
  }
  return false;
}

/**
 * Check if a character represents a valid binary operation
 * @param {string} char - a character
 * @returns {boolean} true if is a valid binary logic operator, false if not.
 */
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

/**
 * Check if a character is right or left parethesis
 * @param {string} char - a character
 * @returns {boolean} true if is a parenthesis, false if not.
 */
function isParenthesis(char) {
  if (char == "(" || char == ")") {
    return true;
  }
  return false;
}

/**
 * create an array of tokens from a 
 * @param {string} str - an input string to tokenize
 * @returns {Array} array of Token objects
 */
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
