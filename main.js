class Calculator{
  constructor(prevOperandTextElement,currOperandTextElement){
    this.prevOperandTextElement=prevOperandTextElement;
    this.currOperandTextElement=currOperandTextElement;
    this.clear();
  }


  clear(){
    this.currOperand='';
    this.prevOperand='';
    this.operation=undefined;
  }

  delete(){
  this.currOperand=this.currOperand.toString().slice(0,-1);
  }

  appendno(number){
  if(number==='.' && this.currOperand.includes('.'))return;
  this.currOperand=this.currOperand.toString()+number.toString();
  }

  chooseoperation(operation){
       if(this.currOperand === '')return;
       if(this.prevOperand !== ''){
         this.compute();
       }
       this.operation= operation;
       this.prevOperand=this.currOperand;
       this.currOperand='';
  }

  compute(){
  let computation;
  const prev=parseFloat(this.prevOperand);
  const curr=parseFloat(this.currOperand);
  if(isNaN(prev) || isNaN(curr))return;
  switch (this.operation) {
    case '+':
    computation=prev+curr;
    break;
    case '-':
    computation=prev-curr;
    break;
    case '*':
    computation=prev*curr;
    break;
    case '÷':
    computation=prev/curr;
    break;
    default:
    return;
  }
  this.currOperand=computation;
  this.operation=undefined;
  this.prevOperand='';
  }
getDisplayNumber(number){
  const stringno=number.toString();
  const integerDigits=parseFloat(stringno.split('.')[0]);
  const decimalDigits=stringno.split('.'[1]);
  let integerdisplay;
  if(isNaN(integerdisplay)){
    integerdisplay='';
  }
  else{
    integerdisplay=integerDigits.toLocaleString('en',{
      maximumFractiondigits:0 })
  }
  if(decimalDigits != null){
    return `${integerdisplay}${decimalDigits}`
  }else{
    return integerdisplay;
  }
}
  update(){
  this.currOperandTextElement.innerText=this.getDisplayNumber(this.currOperand);
  if(this.operation!=null){
    this.prevOperandTextElement.innerText=`${this.prevOperand} ${this.operation}`;
  }else{
    this.prevOperandTextElement.innerText='';
  }
  }
}




const numberbuttons=document.querySelectorAll('[data-no]');
const operationbuttons=document.querySelectorAll('[data-operation]');
const equalbutton=document.querySelector('[data-equals]');
const allclearbutton=document.querySelector('[data-all-clear]');
const delbutton=document.querySelector('[data-delete]');
const prevOperandTextElement=document.querySelector('[data-prev]');
const currOperandTextElement=document.querySelector('[data-curr]');


const calculator=new Calculator(prevOperandTextElement,currOperandTextElement);

numberbuttons.forEach(button=>{
  button.addEventListener('click',()=>{
    calculator.appendno(button.innerText);
    calculator.update();
  })
})

operationbuttons.forEach(button=>{
  button.addEventListener('click',()=>{
    calculator.chooseoperation(button.innerText);
    calculator.update();
  })
})


equalbutton.addEventListener('click',button=>{
calculator.compute();
calculator.update();
})

allclearbutton.addEventListener('click',button=>{
calculator.clear();
calculator.update();
})

delbutton.addEventListener('click',button=>{
calculator.delete();
calculator.update();
})
