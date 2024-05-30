/* eslint-disable no-unused-vars */
const  RED_COLOR = 'hsl(0, 100%, 66%)';
const LIGHT_GRAYISH_VIOLET = 'hsl(270, 3%, 87%)';

const ERROR_MESSAGE_BLANK = `Can't be blank`;
const ERROR_MESSAGE_NEGATIVE_NUMBER = `wrong format, positive numbers only`;

const handleSubmit = (formThis) => {
    // e.preventDefault();
    const { name, cardNumber, month, year, cvc } = formThis;
    
    if(isEmptyField(name.value)){
        makeInvalidInputField(name, ERROR_MESSAGE_BLANK);
    } else {
        makeValidInputField(name);
    }

    let error = validateCardNumber(cardNumber.value);
    if(error !== '') {
        makeInvalidInputField(cardNumber, error);
    } else {
        makeValidInputField(cardNumber);
    }

    error = validateExpiryDate(month.value, year.value);
    if(error !== '') {
        makeInvalidExpirationField(error)
    } else {
        makeValidExpirationField();
    }
    if(validatMonth(month.value) !== '') {
        makeInvalidInputField(month, validatMonth(month.value));
    } else {
        makeValidInputField(month);
    }
    if(validateYear(year.value) !== ''){
        makeInvalidInputField(year, validateYear(year.value));
    } else {
        makeValidInputField(year);
    }
    error = validateCVC(cvc.value);
    if(error !== ''){
       makeInvalidInputField(cvc, error); 
    } else {
        makeValidInputField(cvc);
    }

    return false; // prevent default event
}

const isEmptyField = (value) => {
    return value.trim() === "" || !value;
}

const isNumber = (value) => {
    return !isNaN(value);
}

const isPositiveNumber = value => {
    return value > 0;
}

const numberOfDigits = value => {
    return Math.max(Math.floor(Math.log10(Math.abs(value))), 0) + 1;
    // return value.toString().length;
}

const validateCardNumber = value => {
    let error = '';
    value = value.replaceAll(" ", "");

    if(isEmptyField(value)){
        error = "can't be blank";
    } else if(!isNumber(value)) {
        error = 'Wrong format, numbers only';
    } else if(!isPositiveNumber(value)) {
        error = ERROR_MESSAGE_NEGATIVE_NUMBER;
    } else if(numberOfDigits(value) !==  16) {
        error = 'Wrong format, must be 16 digits only';
    }
    return error;
}

const validateExpiryDate = (month, year) => {
    let error = '';

    if(isEmptyField(month) || isEmptyField(year)) {
        error = "can't be blank";
    } else if(!isNumber(month) || !isNumber(year)){
        error = 'Wrong format, numbers only';
    } else if(validatMonth(month) !== '') {
        error = validatMonth(month);
    } else if(validateYear(year) !== ''){
        error = validateYear(year);
    }

    return error;
}

const validateYear = year => {
    let error = '';
    const lastTwoDigitsOfYear = new Date().getFullYear()% 100; 

    if(isEmptyField(year)) {
        error = "can't be blank";
    } else if(!isNumber(year)) {
        error = 'Wrong format, numbers only';
    } else if(!isPositiveNumber(year)) {
        error = ERROR_MESSAGE_NEGATIVE_NUMBER;
    } else if(numberOfDigits(year) !== 2){
        error = 'wrong format, year must be in YY format';
    } else if(year < lastTwoDigitsOfYear) {
        error = `year must be greater than or equal to ${lastTwoDigitsOfYear} "current year"`;
    }
    
    return error;
}

const validatMonth = month => {
    let error = '';

    if(isEmptyField(month)) {
        error = "can't be blank";
    } else if(!isNumber(month)) {
        error = 'Wrong format, numbers only';
    } else if(!isPositiveNumber(month)) {
        error = ERROR_MESSAGE_NEGATIVE_NUMBER;
    } else if(month < 1 || month > 12) {
        error = 'month must be between 1 and 12';
    }

    return error;
}

const validateCVC = value => {
    let error = '';

    if(isEmptyField(value)) {
        error = "can't be blank";
    } else if(!isNumber(value)) {
        error = 'wrong format, numbers only';
    } else if(!isPositiveNumber(value)) {
        error = ERROR_MESSAGE_NEGATIVE_NUMBER;
    } else if(numberOfDigits(value) !== 3) {
        error = 'wrong, must be 3 digits only'
    }
    return error;
}

const makeInvalidInputField = (field, message) => {
    let elementStyle = field.style;
    elementStyle.border = `1px solid ${RED_COLOR}`;
    let nextElement = field.nextElementSibling;
    if(nextElement) {
        nextElement.innerHTML = message;
        nextElement.style.display = 'block';
    }
}

const makeValidInputField = field => {
    let elementStyle = field.style;
    elementStyle.border = `1px solid ${LIGHT_GRAYISH_VIOLET}`;
    let nextElement = field.nextElementSibling;
    if(nextElement) {
        nextElement.innerHTML = '';
    }
}

const makeInvalidExpirationField = message => {
    let expirationFieldError = document.getElementById('error-exp-date');
    expirationFieldError.innerHTML = message;
}

const makeValidExpirationField = () =>{
    let expirationFieldError = document.getElementById('error-exp-date');
    expirationFieldError.innerHTML = '';
}

// add space between every 4 numbers in card number
const input = document.getElementById("card-number");
input.addEventListener("input", () => 
    input.value = formatNumber(input.value.replaceAll(" ", "")));

const formatNumber = (number) => number.split("").reduce((seed, next, index) => {
  if (index !== 0 && !(index % 4)) seed += " ";
  return seed + next;
}, "");

const changeName = name => {
    const nameField = document.getElementById('card-username');
    nameField.innerHTML = name;
}

const changeCardNumber = number => {
    const cardNumberField = document.getElementById('front-card-number');
    cardNumberField.innerHTML = number;
}

const changeExpirationMonth = number => {
    const expirationMonthField = document.getElementById('card-expiration-date-month');
    expirationMonthField.innerHTML = number
}


const changeExpirationYear = number => {
    const expirationYearField = document.getElementById('card-expiration-date-year');
    expirationYearField.innerHTML = number
}

const changeCVC = number => {
    const cvcField = document.getElementById('back-cvc');
    cvcField.innerHTML = number;
}
