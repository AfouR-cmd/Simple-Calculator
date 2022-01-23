class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand;
    this.currentOperand = currentOperand;
    this.clear();
  }

  clear() {
    this.currentData = '';
    this.previousData = '';
    this.operators = undefined;
  }

  delete() {
    this.currentData = this.currentData.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentData.includes('.')) return;
    this.currentData = this.currentData.toString() + number.toString();
  }
  chooseOperator(operators) {
    if (this.currentData === '') return;
    if (this.previousData === '') {
      this.compute();
    }
    this.operators = operators;
    this.previousData = this.currentData;
    this.currentData = '';
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousData);
    console.log(previous);
    const current = parseFloat(this.currentData);
    console.log(current);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operators) {
      case '+':
        computation = previous + current;
        break;
      case '-':
        computation = previous - current;
        break;
      case '*':
        computation = previous * current;
        break;
      case '÷':
        computation = previous / current;
        break;
      default:
        return;
    }
    this.currentData = computation;
    this.operators = undefined;
    this.previousData = '';

    console.log(computation);
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateResult() {
    this.currentOperand.innerText = this.getDisplayNumber(this.currentData);
    if (this.operators != null) {
      this.previousOperand.innerText = `${this.getDisplayNumber(
        this.previousData
      )} ${this.operators}`;
    } else {
      this.previousOperand.innerText = '';
    }
  }
}

const numberBtns = [...document.querySelectorAll('[data-number]')];
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[previous-operand]');
const currentOperand = document.querySelector('[current-operand]');

const calculator = new Calculator(previousOperand, currentOperand);

numberBtns.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateResult();
  });
});
operationBtns.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateResult();
  });
});
equalsBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateResult();
});
allClearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateResult();
});
deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateResult();
});
