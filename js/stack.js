class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element)
    }

    pop() {
        if (this.items.length == 0) {
            return "underfow"
        }
        return this.items.pop();
    }

    isEmpty() {
        return this.items.length == 0;
    }

}