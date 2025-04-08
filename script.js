let lastOperation = null;

function calculate() {
  const num1Input = document.getElementById('number1');
  const num2Input = document.getElementById('number2');
  const operation = document.getElementById('operation-selector').value;
  const resultValueDiv = document.getElementById('value');
  const resultHistoryDiv = document.getElementById('history');

  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);

  num1Input.classList.remove("error");
  num2Input.classList.remove("error");
  resultValueDiv.classList.remove("error-text");

  if (isNaN(num1) && isNaN(num2)) {
    num1Input.classList.add("error");
    num2Input.classList.add("error");
    resultValueDiv.textContent = 'Ошибка: Введите корректные числа';
    resultValueDiv.classList.add("error-text");
    return;
  }

  if (isNaN(num1)) {
    num1Input.classList.add("error");
    resultValueDiv.textContent = 'Ошибка: Введите корректное первое число';
    resultValueDiv.classList.add("error-text");
    return;
  }

  if (isNaN(num2)) {
    num2Input.classList.add("error");
    resultValueDiv.textContent = 'Ошибка: Введите корректное второе число';
    resultValueDiv.classList.add("error-text");
    return;
  }

  let result;
  switch (operation) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (Math.abs(num2) < Number.EPSILON) {
        resultValueDiv.textContent = 'Ошибка: Деление на ноль';
        resultValueDiv.classList.add("error-text");
        num2Input.classList.add("error");
        return;
      }
      result = num1 / num2;
      break;
    case '%':
      if (Math.abs(num2) < Number.EPSILON) {
        resultValueDiv.textContent = 'Ошибка: Деление на ноль';
        resultValueDiv.classList.add("error-text");
        num2Input.classList.add("error");
        return;
      }
      result = num1 % num2;
      break;
    case '^':
      result = Math.pow(num1, num2);
      break;
    default:
      resultValueDiv.textContent = 'Ошибка: Некорректная операция';
      resultValueDiv.classList.add("error-text");
      return;
  }

  resultValueDiv.textContent = `${num1} ${operation} ${num2} = ${result}`;

  if (lastOperation) {
    const historyEntry = document.createElement('div');
    historyEntry.textContent = lastOperation;
    resultHistoryDiv.appendChild(historyEntry);

    while (resultHistoryDiv.children.length > 2) {
      resultHistoryDiv.removeChild(resultHistoryDiv.firstChild);
    }
  }

  lastOperation = `${num1} ${operation} ${num2} = ${result}`;
}