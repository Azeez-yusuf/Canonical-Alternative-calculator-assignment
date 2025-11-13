/**
 * Evaluates an arithmetic expression written in Prefix Notation (Operator Operand1 Operand2).
 * The expression is expected as a single string with tokens separated by spaces (e.g., "* + 3 4 5").
 *
 * This implementation uses a stack and processes tokens from right-to-left.
 *
 * @param {string} expression - The prefix notation arithmetic expression string.
 * @returns {number} The numerical result of the expression.
 * @throws {Error} If the expression is invalid or involves division by zero.
 */
export function calculate(expression) {

    const tokens = expression.split(' ').filter(token => token.trim() !== '');
    const stack = [];

  
    for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i];

       
        const numberValue = parseFloat(token);
        
        
        if (!isNaN(numberValue) && isFinite(numberValue)) {
            stack.push(numberValue);
            continue;
        }

        
        if (stack.length < 2) {
            
            throw new Error("Invalid prefix expression: insufficient operands for operator '" + token + "'");
        }

  
        const operand1 = stack.pop(); 
        const operand2 = stack.pop(); 

        let result;

        switch (token) {
            case '+':
              
                result = operand1 + operand2;
                break;
            case '-':
              
                result = operand1 - operand2;
                break;
            case '*':
              
                result = operand1 * operand2;
                break;
            case '/':
             
                if (operand2 === 0) {
                    throw new Error("Division by zero");
                }
                result = operand1 / operand2;
                break;
            default:
                throw new Error(`Unknown operator or invalid token: ${token}`);
        }

        
        stack.push(result);
    }

    
    if (stack.length !== 1) {
        throw new Error("Invalid prefix expression: calculation resulted in too many or too few values.");
    }

    return stack[0];
}