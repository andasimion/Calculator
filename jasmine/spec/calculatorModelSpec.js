describe("Calculator", function() {
  let model;

  beforeEach(function() {
    model =  new Model();
  });

  it("should not allow numbers with leading zeros", function() {
    model.numericKeyPressed("0");
    expect(model.currentOperand).toEqual("0");
    expect(model.resetCurrentOperand).toBeFalsy;
  });

  it("should allow a decimal dot for numbers smaller than one", function() {
    model.numericKeyPressed(".");
    expect(model.currentOperand).toEqual("0.");
    expect(model.resetCurrentOperand).toBeFalsy;
  });

  it("should allow a decimal dot for the second operand", function() {
    model.numericKeyPressed("2");
    model.binaryOperationKeyPressed("+");
    expect(model.resetCurrentOperand).toBeTruthy;
    model.numericKeyPressed(".");
    expect(model.currentOperand).toEqual("0.");
    expect(model.resetCurrentOperand).toBeFalsy;
  });

  it("should not allow more than one decimal dot", function() {
    model.numericKeyPressed("2");
    model.numericKeyPressed(".");
    model.numericKeyPressed("3");
    model.numericKeyPressed(".");
    expect(model.currentOperand).toEqual("2.3");
    expect(model.resetCurrentOperand).toBeFalsy;
  });

  it("should not allow a number greater than one to start with zero", function() {
    model.numericKeyPressed("1");
    expect(model.currentOperand).toEqual("1");
  });
  
  it("should swap the two operands after pressing a binary operation key", function() {
    model.numericKeyPressed("1");
    model.binaryOperationKeyPressed("+");
    expect(model.resetCurrentOperand).toBeTruthy;
    expect(model.currentOperand).toEqual("1");
    expect(model.previousOperand).toEqual("1");
    model.numericKeyPressed("5");
    expect(model.currentOperand).toEqual("5");
    expect(model.previousOperand).toEqual("1");
    expect(model.resetCurrentOperand).toBeFalsy;
  });

  it("should allow operand greater than 9", function(){
    model.numericKeyPressed("1");
    model.numericKeyPressed("7");
    model.numericKeyPressed("5");
    expect(model.currentOperand).toEqual("175");
  });

  it("should calculate percentage from a number", function(){
    model.numericKeyPressed("5");
    model.unaryOperationKeyPressed("%");
    expect(model.currentOperand).toEqual(0.05);
  });

  it("should not do anything when pressing equal key at the begging", function(){
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual("0");
    expect(model.previousOperand).toBeFalsy;
    expect(model.currentOperation).toBeFalsy;
    expect(model.resetCurrentOperand).toBeFalsy;
    expect(model.equalKeyPressed).toBeFalsy;
  });

  it("should do very simple arithmetic", function() {
    model.numericKeyPressed("2");
    model.binaryOperationKeyPressed("+");
    model.numericKeyPressed("3");
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(5);
    expect(model.equalKeyPressed).toBeTruthy();
    expect(model.resetCurrentOperand).toBeTruthy();
  });

  it("should do more complex arithmetics", function(){
    model.numericKeyPressed("3");
    model.binaryOperationKeyPressed("+");
    model.numericKeyPressed("5");
    model.binaryOperationKeyPressed("-");
    expect(model.currentOperand).toEqual(8);
    model.numericKeyPressed("7");
    expect(model.currentOperand).toEqual("7");
    model.binaryOperationKeyPressed("*");
    model.numericKeyPressed("4");
    expect(model.currentOperand).toEqual("4");
    model.binaryOperationKeyPressed("/");
    model.numericKeyPressed("2");
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(2);
  });

  it("should return error for division by zero", function() {
    model.numericKeyPressed("1");
    model.binaryOperationKeyPressed("/");
    model.numericKeyPressed("0");
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual("ERROR");
    expect(model.equalKeyPressed).toBeTruthy();
  });

  it("should return error after a division by zero regardless of the following operations made", function(){
    model.numericKeyPressed("1");
    model.binaryOperationKeyPressed("/");
    model.numericKeyPressed("0");
    model.binaryOperationKeyPressed("+");
    expect(model.currentOperand).toEqual("ERROR");
    model.numericKeyPressed("2");
    model.binaryOperationKeyPressed("-");
    expect(model.currentOperand).toEqual("ERROR");
    model.numericKeyPressed("3");
    model.binaryOperationKeyPressed("*");
    expect(model.currentOperand).toEqual("ERROR");
    model.numericKeyPressed("4");
    model.binaryOperationKeyPressed("/");
    expect(model.currentOperand).toEqual("ERROR");
    model.unaryOperationKeyPressed("%");
    expect(model.currentOperand).toEqual("ERROR");
  });

  it("should remember the last operation when pressing consecutively the equal key", function(){
    model.numericKeyPressed("1");
    model.binaryOperationKeyPressed("+");
    model.numericKeyPressed("2");
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(3);
    expect(model.equalKeyPressed).toBeTruthy();
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(5);
    expect(model.equalKeyPressed).toBeTruthy();
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(7);
    expect(model.equalKeyPressed).toBeTruthy();
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(9);
    expect(model.equalKeyPressed).toBeTruthy();
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(11);
    expect(model.equalKeyPressed).toBeTruthy();
    model.binaryOperationKeyPressed("-");
    model.numericKeyPressed("3");
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(8);
    expect(model.equalKeyPressed).toBeTruthy();
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(5);
    expect(model.equalKeyPressed).toBeTruthy();
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(2);
    expect(model.equalKeyPressed).toBeTruthy();
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(-1);
    expect(model.equalKeyPressed).toBeTruthy();
  });

  it("should reset the model after pressing the cancel key", function(){
    model.numericKeyPressed("2");
    model.binaryOperationKeyPressed("+");
    model.numericKeyPressed("3");
    model.equalKeyPressed();
    model.cancelKeyPressed();
    expect(model.currentOperand).toEqual("0");
    expect(model.previousOperand).toBeFalsy;
    expect(model.currentOperation).toBeFalsy;
    expect(model.resetCurrentOperand).toBeFalsy;
    expect(model.equalKeyPressed).toBeFalsy;
  });

});
