let input = ["",""]; 
let signs = []; 
let index = 0; 
let elem = document.getElementById('display'); 
let calc = false; 
let checkCalc = true; 
let checkEqual = true; 

function numbers(keyId){
  if ((''+input[index]).length<18){ 
      if (!(input[index]=='0' && keyId == '0')){ 
          if (calc && checkCalc && checkEqual){ 
              input[0] = "";
          }
          if (input[index] == '0'){ 
              input[index] = "";
          }
          console.log({input});
          input[index] = input[index] + (keyId);    
          elem.value = input[index]; 
          check();
          checkCalc = true;
          calc = false;
      }
  }
}

function check(){ 
  if ((''+input[index]).length>15) {
      elem.style.fontSize = '20px';
  }
  else {
      elem.style.fontSize = '28px';
  }
}

function operator(keyId){
  calc = false;
  checkCalc = true;
  checkEqual = true;
  if (input[0] != "" && input[1] != "") { 
      calculate();
      checkCalc = false; 
  }
  if (input[0] != "") { 
      index =1 ;
  }
  signs = keyId; 
  console.log(signs);
}

function calculate(){
  let result = 0;
  x = parseFloat(input[0]); 
  y = parseFloat(input[1]);
  switch(signs) {
      case 'multiply':
          result = x * y;
         
      break;
      case 'subtract':
          result = x - y;
      break;
      case 'add':
          result = x + y;
      break;
      case 'divide':
          if (input[1] == "0" || input[1] == "") 
          {
              elem.value = "Error";
          }
          else {
              result = x / y;
          }
         
      break;
      }
 
      if (input[index] == ""){ 
          elem.value = "Error"
      }

      if (elem.value != "Error"){
          if ((''+result).length>15) { 
              elem.style.fontSize = '20px'; 
              result = result.toFixed(14); 
          }
          else {
              elem.style.fontSize = '28px';
          }
          elem.value = result; 
      }
  
      console.log(result);
      input[0] = result.toString(); 
      input[1] = ""; 
      index = 0; 
      calc = true; 
}
 
function handleClick(keyId){ 
   if (keyId == 'dot'){
       if (!input[index].includes(".")){ 
           input[index] = input[index] + '.';
           elem.value = input[index];
           checkEqual = false;
       }
      
   }
   else if (keyId =='negate') {
       input[index] = (-parseFloat(input[index])).toString(); 
       elem.value = input[index];
       checkEqual = false;
   }
   else if (keyId == 'percent') {
       input[index] = (0.01*parseFloat(input[index])).toString(); 
       elem.value = input[index];
       checkEqual = false;
   }
   else if (keyId == 'clear') {
       location.reload(); 
   }
   else if (!isNaN(parseInt(keyId))){ 
       numbers(keyId);
   }
   else if (keyId == 'equal'){ 
       if (!calc) { 
           calculate();
       }
   }
   else { 
       operator(keyId);
   }
}

  document.querySelectorAll(".key").forEach( 
  el => {
      el.addEventListener('click', () => handleClick(el.id)) 
      
});