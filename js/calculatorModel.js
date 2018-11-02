// abstract representation of the state of a calculator
function Model() { 
    return{
        currentOperand: "0",
        previousOperand: null,
        currentOperation: null,
        resetCurrentOperand: false,
        lastKeyPressed: null,


        numericKeyPressed(value) {
            if (this.currentOperand === "0" && value === "0") {
                this.currentOperand = "0";
            } else if ((this.currentOperand === "0" || this.resetCurrentOperand) && value === ".") {
                this.currentOperand = "0.";
            } else if (this.currentOperand.toString().includes('.') && value ===".") {
                //leave currentOperand unchanged
            } else if (this.currentOperand === "0" && value !== "0") {
                this.currentOperand = value;
            } else if (this.resetCurrentOperand) {
                this.previousOperand = this.currentOperand;
                this.currentOperand = value;
            } else {
                this.currentOperand += value;
            }
            this.resetCurrentOperand = false;
            this.lastKeyPressed = value;
        },
        
        unaryOperationKeyPressed(value) {
            if (this.currentOperand === "ERROR") {
                // do nothing
            } else {
                this.currentOperand = Number.parseFloat(this.currentOperand) / 100;
                this.resetModel();
            };    
            this.lastKeyPressed = value;
        },

        binaryOperationKeyPressed(value) {
            this.resetCurrentOperand = true;
            if (this.previousOperand === "ERROR"){
                this.currentOperand = "ERROR";
                this.resetModel();
            } else if (this.lastKeyPressed === "=") {
                this.currentOperation = value;
            } else if (this.previousOperand !== null && this.isNumericKey(this.lastKeyPressed)) {
                this.equalKeyPressed();
                this.currentOperation = value; 
            } else {
                this.previousOperand = this.currentOperand;
                this.currentOperation = value;
            }
            this.lastKeyPressed = value;

        },
        
        isNumericKey(key) {
            numericKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
            return numericKeys.includes(key);
        },

        calculate(operand1, operator, operand2) { return eval(`${operand1}${operator}${operand2}`)},

        equalKeyPressed() {
            if (this.previousOperand === "ERROR") {
                this.currentOperand = "ERROR";
                this.resetModel();
            } else if (this.previousOperand === null && this.currentOperation === null){
                //leave currentOperand unchanged
            } else if (this.currentOperation === "/" && this.currentOperand === "0") {
                this.currentOperand = "ERROR";
                this.previousOperand = null;
                this.resetModel();
            } else if (this.lastKeyPressed === "=") {
                temporarOperand = this.previousOperand;
                this.currentOperand = this.calculate(Number.parseFloat(this.currentOperand),
                                                            this.currentOperation,
                                                            Number.parseFloat(temporarOperand));
                
            } else {
                temporarOperand = this.currentOperand;
                this.currentOperand = this.calculate(Number.parseFloat(this.previousOperand),
                                                            this.currentOperation,
                                                            Number.parseFloat(this.currentOperand));
                this.previousOperand = temporarOperand;
                this.resetModel();
            }
            this.lastKeyPressed = "=";
        },

        resetModel() {
            this.resetCurrentOperand = true;
            this.lastKeyPressed = null;
        },

        cancelKeyPressed() {
            this.currentOperand = "0";
            this.currentOperation = null;
            this.previousOperand = null;
            this.resetCurrentOperand = false;
            this.lastKeyPressed = null;
        }
    };
}