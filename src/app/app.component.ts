import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'simple_calculator';

  //for the first number and the second number to be caculated.
  firstNumber : any = 0;//the previous string after parsing.
  secondNumber : any = 0;//the current string after parsing.
  result : any = 0;//the result of the firstNumber and the secondNumber after doing an operation on them.

  //for the previous number and the current number propreties such as sign and value.
  public previousSign = "";//the previous number sign (+ve or -ve).
  public previous = "";//the previous number value.
  public currentSign = "";//the current number sign (+ve or -ve).
  public current = "0";//the current number value.
  public currentDotFlag = false; //check if there are a decimal point in a number.
  public currentDigitsFlag = false; //check if we added any digits in the number or not.
  public operation = "";//the operation (/ , * , + , -)
  public operationFlag = false; //check if we added an operation

  private setPreviousPropreties(previousSign : string, previous : string){
    this.previousSign = previousSign;
    this.previous = previous;
  }

  private setCurrentPropreties(currentSign : string, current : string, currentDotFlag : boolean, currentDigitsFlag : boolean){
    this.currentSign = currentSign;
    this.current = current;
    this.currentDotFlag = currentDotFlag;
    this.currentDigitsFlag = currentDigitsFlag;
  }

  private setOperationPropreties(operation : string, operationFlag : boolean){
    this.operation = operation;
    this.operationFlag = operationFlag;
  }

  private absolute(value : any){
    if(value < 0){
      value *= -1.0;
    }
    return value;
  }

  insertNumber(number: string) {
    if(!(this.currentDigitsFlag == false && number == '0') && !(this.currentDotFlag == true && number == '.')){
      if(this.currentDigitsFlag == false && number != '.'){
        this.current = number;
      }
      else{
        this.current += number;
      }
      if(number == '.') this.currentDotFlag = true;//set it true when adding '.'
      this.currentDigitsFlag = true;//set it true when adding digits
    }
  }

  insertOperation(operation: string) {
    if(!this.operationFlag){
      this.setPreviousPropreties(this.currentSign, this.current);
      this.setCurrentPropreties("", "0", false, false);
      this.setOperationPropreties(operation, true);
    }
  }

  changeSign() {
    if(this.currentSign == ""){
      this.currentSign = "- ";
    }
    else if(this.currentSign == "- "){
      this.currentSign = "";
    }
  }

  percentage() {
    if(this.current != "0"){
      this.secondNumber = parseFloat(this.current);
      this.secondNumber /= 100;
      this.current = this.secondNumber;
      if(this.secondNumber - parseInt(this.secondNumber) != 0){
        this.currentDotFlag = true;
      }
    }
  }

  inverse() {
    this.secondNumber = parseFloat(this.current);
    this.secondNumber = 1 / this.secondNumber;
    this.current = this.secondNumber;
    if(this.secondNumber - parseInt(this.secondNumber) != 0){
      this.currentDotFlag = true;
    }
  }

  square() {
    if(this.current != "0"){
      this.secondNumber = parseFloat(this.current);
      this.secondNumber *= this.secondNumber;
      this.current = this.secondNumber;
      this.currentSign = "";
    }
  }

  squareRoot() {
    if(this.currentSign != "- " && this.current != "0"){
      this.secondNumber = parseFloat(this.current);
      this.secondNumber = Math.sqrt(this.secondNumber);
      this.current = this.secondNumber;
      if(this.secondNumber - parseInt(this.secondNumber) != 0){
        this.currentDotFlag = true;
      }
    }
  }

  calculate() {
    if(this.previous != ""){
      this.firstNumber = parseFloat(this.previous);
      this.secondNumber = parseFloat(this.current);
      if(this.previousSign == "- "){
        this.firstNumber *= -1.0;
      }
      if(this.currentSign == "- "){
        this.secondNumber *= -1.0;
      }
  
      if(this.operation == "+"){
        this.result = this.firstNumber + this.secondNumber;
      }
      else if(this.operation == "-"){
        this.result = this.firstNumber - this.secondNumber;
      }
      else if(this.operation == "x"){
        this.result = this.firstNumber * this.secondNumber;
      }
      else if(this.operation == "÷"){
        this.result = this.firstNumber / this.secondNumber;
      }

      this.reset();
      this.current = this.absolute(this.result);
      if(this.result < 0){
        this.currentSign = "- ";
      }
      if(this.result - parseInt(this.result) != 0){
        this.currentDotFlag = true;
      }
      if(this.result > 0){
        this.currentDigitsFlag = true;
      }
    }
  }

  backSpace() {
    if(this.current.length == 1){
      this.setCurrentPropreties(this.currentSign, "0", false, false);
    }
    else if(this.current.length > 1){
      if(this.current[this.current.length - 1] == "."){
        this.currentDotFlag = false;
      }
      this.current = this.current.substring(0, this.current.length - 1);
    }
  }

  reset() {
    this.setPreviousPropreties("", "");
    this.setCurrentPropreties("", "0", false, false);
    this.setOperationPropreties("", false);
  }

}