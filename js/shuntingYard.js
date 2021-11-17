/**
 * implements shunting yard element to convert from infix to posfix notation
 * @param {array} tokens - an array of Tokens objects
 * @returns {array} returns an array composed by array of Tokens objects in posfix notation and array composed by partial output and stack 
 */
function shuntingYard(tokens) {
  let posfix = [];
  let s = new Stack();
  let steps = [];
  index = 0;
  while (index < tokens.length) {
    let token = tokens[index];
    if (token.type == "PREP") {
      posfix.push(token);
    } else if (token.type == "OPER" || token.type == "NEG") {
      if (s.isEmpty()) {
        s.push(token);
      } else {
        while (checkOperatorPriority(s.top().token, token.token)) {
          posfix.push(s.pop());
          if (s.isEmpty()) {
            break;
          }
        }
        s.push(token);
      }
    } else if (token.type == "LEFTPAR") {
      s.push(token);
    } else if (token.type == "RIGHTPAR") {
      while (s.top().token != "(") {
        posfix.push(s.pop());
      }
      s.pop();
    } else {
      return "error";
    }
    let step = [Array.from(posfix), Array.from(s.items), index];
    steps.push(step);
    index++;
  }
  while (!s.isEmpty()) {
    posfix.push(s.pop());
    let step = [Array.from(posfix), Array.from(s.items), index];
    steps.push(step);
  }
  return [posfix, steps];
}

/**
 * check if operator A has higher priority than operator B
 * @param {string} operatorA - an operator A (character)
 * @param {string} operatorB - an operator B (character)
 * @returns {boolean} returns true if operator A has higher priority than operator B, false if not.
 */
function checkOperatorPriority(operatorA, operatorB) {
  priorityA = getPriority(operatorA);
  priorityB = getPriority(operatorB);
  if (priorityA < priorityB) {
    return true;
  }
  return false;
}

/**
 * returns operator's priorty
 * @param {string} operator - a character
 * @returns {number} priority of operator from 1 (highest priority) to 6 (lowest priority)
 */
function getPriority(operator) {
  switch (operator) {
    case charOpNeg:
      return 1;
    case charOpConj:
      return 2;
    case charOpDisy:
      return 3;
    case charOpImp:
      return 4;
    case charOpBicond:
      return 5;
    case charOpDisyExc:
      return 6;
    default:
      return "error";
  }
}
