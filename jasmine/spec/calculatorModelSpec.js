describe("Calculator", function() {
  let model;

  beforeEach(function() {
    model =  new Model();
  });

  it("should not allow numbers with leading zeros", function() {
    model.numericKeyPressed("0");
    expect(model.currentOperand).toEqual("0");
  });

  it("should allow a decimal dot", function() {
    model.numericKeyPressed(".");
    expect(model.currentOperand).toEqual("0.");
  });

  it("should allow a decimal dot for the second operand", function() {
    model.numericKeyPressed("2");
    model.binaryOperationKeyPressed("+");
    model.numericKeyPressed(".");
    expect(model.currentOperand).toEqual("0.");
  });

  it("should not allow more than one decimal dot", function() {
    model.numericKeyPressed("2");
    model.numericKeyPressed(".");
    model.numericKeyPressed("3");
    model.numericKeyPressed(".");
    expect(model.currentOperand).toEqual("2.3");
  });

  it("should not allow any number to start with zero", function() {
    model.numericKeyPressed("0");
    model.numericKeyPressed("1");
    expect(model.currentOperand).toEqual("1");
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
  });

  it("should do very simple arithmetic", function() {
    model.numericKeyPressed("2");
    model.binaryOperationKeyPressed("+");
    model.numericKeyPressed("3");
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(5);
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
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(5);
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(7);
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(9);
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(11);
    model.binaryOperationKeyPressed("-");
    model.numericKeyPressed("3");
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(8);
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(5);
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(2);
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(-1);
  });

  it("should reset the model after pressing the cancel key", function(){
    model.numericKeyPressed("2");
    model.binaryOperationKeyPressed("+");
    model.numericKeyPressed("3");
    model.equalKeyPressed();
    model.cancelKeyPressed();
    expect(model.currentOperand).toEqual("0");
    model.numericKeyPressed("4");
    model.binaryOperationKeyPressed("*");
    model.numericKeyPressed("5");
    model.equalKeyPressed();
    expect(model.currentOperand).toEqual(20);
  });

  it("should not repeat binary operations unless an operand was entered", function(){
    model.numericKeyPressed("2");
    model.binaryOperationKeyPressed("+");
    model.numericKeyPressed("3");
    model.binaryOperationKeyPressed("+");
    expect(model.currentOperand).toEqual(5);
    model.binaryOperationKeyPressed("+");
    expect(model.currentOperand).toEqual(5);
    model.binaryOperationKeyPressed("+");
    expect(model.currentOperand).toEqual(5);
    model.numericKeyPressed("8");
    model.binaryOperationKeyPressed("+");
    expect(model.currentOperand).toEqual(13);
  });

});
