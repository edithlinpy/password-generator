// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Object of user input
let pwdOption = {
  length: 0,
  withSpecialChar: undefined,
  withNumericChar: undefined,
  withLowerCasedChar: undefined,
  withUpperCasedChar: undefined
};

// Function to check if user clicked cancel button
function checkUserInput(msg) {
  let val = prompt(msg);

  console.log("val: "+val);
  if (val === null) { // user clicked cancel
    return false;
  } else {
    pwdOption.length = +val;
    return true;
  }
}

// Function to prompt user for password options
function getPasswordOptions() {
  let inputValid = false;
  let returnVal = false;

  // prompt user to input a number
  returnVal = checkUserInput("How long would you like your password to be? \nPlease enter a number between 10 and 64 (inclusive).");
  console.log("ReturnVal1: "+returnVal);
  if (!returnVal) {
    return;
  }
 
  // check if user's input is a  number between 10 and 64
  while ((!Number.isInteger(pwdOption.length)) || (pwdOption.length < 10 || pwdOption.length > 64)) { 
    returnVal = checkUserInput("Please enter a valid number between 10 and 64 (inclusive).");
    console.log("ReturnVal2: "+returnVal);
    if (!returnVal) {
      pwdOption.length = 0;
      return;
    }
  }

  console.log("Length: "+pwdOption.length);
  while (!inputValid) { // if user didn't choose any options, ask user again
    pwdOption.withSpecialChar = confirm("Would you like to include special characters? \nIf yes, please press 'OK', otherwise, please press 'Cancel"); 
    pwdOption.withNumericChar = confirm("Would you like to include numeric characters? \nIf yes, please press 'OK', otherwise, please press 'Cancel"); 
    pwdOption.withLowerCasedChar = confirm("Would you like to include lowercase characters? \nIf yes, please press 'OK', otherwise, please press 'Cancel"); 
    pwdOption.withUpperCasedChar = confirm("Would you like to include uppercase characters? \nIf yes, please press 'OK', otherwise, please press 'Cancel"); 
    if (!pwdOption.withSpecialChar && !pwdOption.withNumericChar &&  
        !pwdOption.withLowerCasedChar && !pwdOption.withUpperCasedChar) {
      alert("Please choose at least one character type.");
    } else {
      inputValid = true;
    }
  }
}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate password with user input
function generatePassword() {
  let charArray = [];
  let pwd = "";

  getPasswordOptions();

  if (pwdOption.length == 0) {
    return pwd;
  }

  if (pwdOption.withSpecialChar) {
    charArray = specialCharacters;
  }
  if (pwdOption.withNumericChar) {
    charArray = charArray.concat(numericCharacters);
  } 
  if (pwdOption.withLowerCasedChar) {
    charArray = charArray.concat(lowerCasedCharacters);
  }
  if (pwdOption.withUpperCasedChar) {
    charArray = charArray.concat(upperCasedCharacters);
  }

  for (let i=0; i<pwdOption.length; i++) {
    pwd += getRandom(charArray);
  }

  return pwd;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);