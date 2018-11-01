// abstract representation of the state of a calculator
function Model() { 
    return{
        currentOperand: "0",
        previousOperand: null,
        currentOperation: null,
        resetCurrentOperand: false,
        equalKeyWasPressed: false,


        numericKeyPressed(value) {
            if (this.currentOperand === "0" && value === "0") {
                this.currentOperand = "0";
            } else if ((this.currentOperand === "0" || this.resetCurrentOperand) && value === ".") {
                this.currentOperand = "0.";
            } else if (this.currentOperand.toString().includes('.') && value ===".") {
                return;
            } else if (this.currentOperand === "0" && value !== "0") {
                this.currentOperand = value;
            } else if (this.resetCurrentOperand) {
                this.previousOperand = this.currentOperand;
                this.currentOperand = value;
            } else {
                this.currentOperand += value;
            }
            this.resetCurrentOperand = false;
        },
        
        unaryOperationKeyPressed(value) {
            if (this.currentOperand === "ERROR") {
                return;
            }
            this.currentOperand = Number.parseFloat(this.currentOperand) / 100;
            this.resetModel();
        },

        binaryOperationKeyPressed(value) {
            if (this.previousOperand === "ERROR"){
                this.currentOperand = "ERROR";
                this.resetModel();
            } else if (this.equalKeyWasPressed) {
                this.currentOperation = value;
                this.resetCurrentOperand = true;
                this.equalKeyWasPressed = false;
                return;
            } else if (this.previousOperand !== null) {
                this.equalKeyPressed();
                this.currentOperation = value; 
                this.equalKeyWasPressed = false;
                return;
            };
            this.previousOperand = this.currentOperand;
            this.currentOperation = value;
            this.resetCurrentOperand = true;
            this.equalKeyWasPressed = false;
        },
            
        calculate(operand1, operator, operand2) { return eval(`${operand1}${operator}${operand2}`)},

        equalKeyPressed() {
            if (this.previousOperand === "ERROR") {
                this.currentOperand = "ERROR";
                this.resetModel();
            } else if (this.previousOperand === null && this.currentOperation === null){
                return;
            } else if (this.currentOperation === "/" && this.currentOperand === "0") {
                this.currentOperand = "ERROR";
                this.previousOperand = null;
                this.resetModel();
            } else if (this.equalKeyWasPressed) {
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
        },

        resetModel() {
            this.resetCurrentOperand = true;
            this.equalKeyWasPressed = true;
        },

        cancelKeyPressed() {
            this.currentOperand = "0";
            this.currentOperation = null;
            this.previousOperand = null;
            this.resetCurrentOperand = false;
            this.equalKeyWasPressed = false;
        }
    };
}