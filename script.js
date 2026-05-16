 /* abhi is html code me JS ke function lagane hai to  
   slider ko  km jyada krnese password length number me change ho rha hai ..aur password ki length ye 10 by_Default hai*/

const inputSlider = document.querySelector("[data-length-slider]");

const lengthDisplay = document.querySelector("[data-length-number]");

/*to jha jha changes krne hai unhe JS me search krna hai aur unpr function create krne hai  */
const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");

const lowercaseCheck = document.querySelector("#lowercase");

const numbersCheck = document.querySelector("#numbers");

const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");

const generatorBtn = document.querySelector(".generateButton");


const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*():;"<,>.?/';
/*sare ke sare checkbox ko select krna hai to querryselectorAll */

let password = "";
let passwordLength = 10;
let checkCount =0;
handleSlider();
// set strength circle color is grey
setIndicator("#ccc");
/*jo bhi pehlese alredy bne honge vo let krna hai */

/*ab konse function ki need hai vo dekhna hai
copyContent() - copy ho rha hai button pe click krenpr
handleSlider() - ek slider ka aage piche hona 
generatePassword() 
setIndicator() - jo colour change kr hrha hai vo circle
getRandomInteger(min, max) - randomly passoword bn rha hai
getRandomLowercase() -
getRandomUppercase() -
getRandomNumber() -
getRandomSymbol() -
*/

// set Password length
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  /*to by Default pehle se hi 10 value hai */
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize = ( (passwordLength - min) * 100/(max-min)) + "% 100%"
}

function setIndicator(color){
  indicator.style.backgroundColor = color;
  // color aur shadow  set krta hai
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}

function getRndInteger(min, max) {
 return Math.floor(Math.random() * (max - min))+ min;
 /*math.random functionye (0-inclusive ,,1-exclusive) ke bich me random number deta hai ...math.floor se roundOff value aati hai
 min se max ek random integer aata hai */
}


function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateLowerCase(){
 return String.fromCharCode(getRndInteger(97, 123));
  // ye a-97, z-123 lower case me aur uhe fir chahracter me convert
}
function generateUpperCase(){
 return String.fromCharCode(getRndInteger(65, 91));
  // ye A-65, Z-91 Upper case me aur uhe fir chahracter me convert
}

function generateSymbol() {
  const randNum = getRndInteger(0, symbols.length);  
  return symbols.charAt(randNum);

}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if(uppercaseCheck.checked) hasUpper = true;
  if(lowercaseCheck.checked) hasLower = true;
  if(numbersCheck.checked) hasNum = true;
  if(symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
  setIndicator("#0f0"); // Strong - Green
} 
  else if (
  (hasLower || hasUpper) &&
  (hasNum || hasSym) &&
  passwordLength >= 6
) {
  setIndicator("#ff0"); // Medium - Yellow
} 
  else {
  setIndicator("#f00"); // Weak - Red
}
}
//waek aur strog passsword ke liye rules

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
  // clipBoard pe copy  krne ke liye ..ye async operation hai ...await- agr operation complete na hi tb tk aage ni badega isse
    copyMsg.innerText = "copied";
  //copy hone ke bad copied vala text show krna hai
}

  catch(e) {
    copyMsg.innerText = "failed";
  }
  // error handling
  copyMsg.classList.add("active");
// copy vala span visible krne ke liye
   

  setTimeout( () => {
    copyMsg.classList.remove("active");
  }, 2000);

  }

  function shufflePassword (array) {
    // fisher Yates method
    for(let i= array.length -1; i>0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      //find j , find out using random function
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      //swap at i index and j index
    }
    let str = "";
     array.forEach((el) => {
        str += el;
    });
    return str;

  }

  function handleCheckBoxChanges() {
    checkCount = 0;
    allCheckBox.forEach( (checkBox) => {
      if(checkBox.checked)
        checkCount++;
    });

    // special condition
    if(passwordLength < checkCount) {
      passwordLength = checkCount;
      handleSlider();
    }
  }
  //checkboxes ke check krnepr hi pssword create hota hai atleast ek checbox to  chenck krna hi hoga
// to ek aur function banana hai ki checkbox kitne tick hai  countCheckBox banana  


allCheckBox.forEach( (checkBox) =>{
  checkBox.addEventListener('change', handleCheckBoxChanges);
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = parseInt(e.target.value);
    handleSlider();
});
  // slide o move krense value me channge aayega
  //password ko change krne ke liye ek eventListener

  //handleSlider() function ye password length ko UI pe reflect krta hai
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value) {
        copyContent();
    }
});


generatorBtn.addEventListener('click', () =>{
  //none of the checkBox are selected
  if(checkCount == 0) 
  return;

  if(passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
  }

  //lets start the the journy to find new password
  console.log("Starting the Journey");
  // remove old password
  password = "";

  // lets put the stuff mentioned by checkboxesssssss
  //jo check boxes ke andr mangi hayi chize sari dalni hai ..to jo bhi character dalne vo eandomly dalna hai

  // if(uppercaseCheck.checked){
  //   password += generateUpperCase();
  // }
  // if(lowercaseCheck.checked){
  //   password += generateLowerCase();
  // }
  // if(numbersCheck.checked){
  //   password += generateRandomNumber();
  // }
  // if(symbolsCheck.checked){
  //   password += generateSymbol();
  // }

  /*to inko ek hi jgh randomly lena hai password me to isa direct arraya bna lena hai */
  let funcArr = [];

  if(uppercaseCheck.checked)
    funcArr.push(generateUpperCase);

  if(lowercaseCheck.checked)
    funcArr.push(generateLowerCase);

  if(numbersCheck.checked)
    funcArr.push(generateRandomNumber);

  if(symbolsCheck.checked)
    funcArr.push(generateSymbol);

  /*jo jo checkox check hai usne sare function yha array me dal diye hai ab fir array ke ansr randomly sb form hoga
   */

  //conmulsory addtion
  for(let i =0; i<funcArr.length; i++) {
    password += funcArr[i]();
  }
    console.log("Compulsory Addition Done");
  /*jo tick kiye hai unko password me add krega */

  //remaining addition
  for(let i=0; i<passwordLength-funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    console.log("randIndex" + randIndex);
    password += funcArr[randIndex]();
  }
  console.log("Remaining Addition Done");
  /*jo tick  nhi kiye hai unke liye */
/*to yha tk 10 length ka password bn gya hai leki jaise sequence me hai vaisehi password aayega to inko shuffle krna 
pdega  */

//shuffle the password
  password = shufflePassword(Array.from(password));
  console.log("Shuffling Done");
  /*ab password ko input me dispaly krna hai  */
  //show in UI
  passwordDisplay.value = password;
  console.log("UI Addition Done");
  //calculated Strength
  calcStrength();


})


