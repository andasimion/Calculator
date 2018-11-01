let numericKeys = document.querySelectorAll("button.numeric-key"),
    binaryOperationKeys = document.querySelectorAll('button.binary-operation-key'),
    unaryOperationKeys = document.querySelectorAll('button.unary-operation-key'),
    equalKey = document.getElementById('equal-key'),
    cancelKey = document.getElementById('cancel-key'),
    calcDisplay = document.getElementById('calculator-display');


let model = new Model();


for (let numericElement of numericKeys) {
    numericElement.addEventListener('click', function(){
        model.numericKeyPressed(numericElement.textContent);
        calcDisplay.textContent = model.currentOperand;
    });
};

for (let binaryOperation of binaryOperationKeys) {
    binaryOperation.addEventListener('click', function(){
        model.binaryOperationKeyPressed(binaryOperation.textContent);
        calcDisplay.textContent = model.currentOperand;
    });
};

for (let unaryOperation of unaryOperationKeys){
    unaryOperation.addEventListener('click', function(){
        model.unaryOperationKeyPressed(unaryOperation.textContent);
        calcDisplay.textContent = model.currentOperand;
    });
};
    
equalKey.addEventListener('click', function(){
    model.equalKeyPressed();
    calcDisplay.textContent = model.currentOperand;
});
    
cancelKey.addEventListener('click', function(){
    model.cancelKeyPressed();
    calcDisplay.textContent = model.currentOperand;
});



