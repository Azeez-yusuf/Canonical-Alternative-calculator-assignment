function evaluateRecursive(tokens) {
    const token = tokens.shift();

    if (token === undefined) {
        throw new Error("Malformed expression: unexpected end of tokens.");
    }

    const numberValue = Number(token);
    if (!isNaN(numberValue)) {
        return numberValue;
    }

    const operator = token;

    const operand1 = evaluateRecursive(tokens);
    const operand2 = evaluateRecursive(tokens);

    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            if (operand2 === 0) {
                throw new Error("Division by zero is not allowed.");
            }
            return operand1 / operand2;
        default:
            throw new Error(`Invalid operator or token: ${token}`);
    }
}

function calculate(expression) {
    const tokens = expression.split(/\s+/).filter(t => t.length > 0);

    if (tokens.length === 0) {
        return 0;
    }

    const result = evaluateRecursive(tokens);

    if (tokens.length > 0) {
        throw new Error("Malformed expression: extra tokens found after calculation.");
    }

    return result;
}

module.exports = { calculate };