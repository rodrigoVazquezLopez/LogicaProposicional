function shuntingYard(tokens) {
    let posfix = [];
    index = 0;
    while (index < tokens.length) {
        let token = tokens[index];
        let s = new Stack();
        if (token.type == "PREP") {
            posfix.push(token);
        }
        else {

        }
        index++;
    }
    while (!s.isEmpty()) {
        posfix.push(s.pop());
    }
    return posfix;
}