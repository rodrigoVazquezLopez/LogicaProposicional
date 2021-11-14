/**
 * Class representing a basic stack
 */
class Stack {
  /**
   * create a stack
   */
  constructor() {
    this.items = [];
  }

  /**
   * push an element in stack
   * @param {object} element - an element to push in the stack
   */
  push(element) {
    this.items.push(element);
  }

  /**
   * pop an element from stack
   * @returns {object}
   */
  pop() {
    if (this.items.length == 0) {
      return "underfow";
    }
    return this.items.pop();
  }

  /**
   * returns the value of element from the top of stack
   * @returns {object}
   */
  top() {
    return this.items[this.items.length - 1];
  }

  /**
   * check if stack is empty
   * @returns {boolean} 
   */
  isEmpty() {
    return this.items.length == 0;
  }
}
