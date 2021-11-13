function shuntingYard(tokens) {
  let posfix = [];
  let s = new Stack();
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
    index++;
  }
  while (!s.isEmpty()) {
    posfix.push(s.pop());
  }
  return posfix;
}

function checkOperatorPriority(operatorA, operatorB) {
  priorityA = getPriority(operatorA);
  priorityB = getPriority(operatorB);
  if (priorityA < priorityB) {
    return true;
  }
  return false;
}

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
