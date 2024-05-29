/* eslint-disable no-unused-vars */
const  RED_COLOR = 'hsl(0, 100%, 66%)';
const LIGHT_GRAYISH_VIOLET = 'hsl(270, 3%, 87%)';

const ERROR_MESSAGE_BLANK = `Can't be blank`;

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
    if(isEmptyField(month.value)) {
        makeInvalidInputField(month, ERROR_MESSAGE_BLANK);
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

const isPositiveNumber = (value) => {
    return !isNaN(value);
//     value = parseInt(value);
//     return value > 0 && Number.isInteger(value);
}

const numberOfDigits = value => {
    return Math.max(Math.floor(Math.log10(Math.abs(value))), 0) + 1;
    // return value.toString().length;
}

const validateCardNumber = value => {
    let error = '';

    if(isEmptyField(value)){
        error = "can't be blank";
    } else if(!isPositiveNumber(value)) {
        error = 'Wrong format, numbers only';
    } else if(numberOfDigits(value) !==  16) {
        error = 'Wrong format, must be 16 digits only';
    }
    return error;
}

const validateExpiryDate = (month, year) => {
    let error = '';

    if(isEmptyField(month) || isEmptyField(year)) {
        error = "can't be blank";
    } else if(!isPositiveNumber(month) || !isPositiveNumber(year)){
        error = 'Wrong format, numbers only';
    } else if(!isValidMonth(month)) {
        error = 'month must be between 1 and 12';
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
    } else if(!isPositiveNumber(year)) {
        error = 'Wrong format, numbers only';
    } else if(numberOfDigits(year) !== 2){
        error = 'wrong format, year must be in YY format';
    } else if(year < lastTwoDigitsOfYear) {
        error = `year must be greater than or equal to ${lastTwoDigitsOfYear} "current year"`;
    }
    
    return error;
}

const isValidMonth = month => {
    return isPositiveNumber(month) && month >= 1 && month <= 12;
}

const validateCVC = value => {
    let error = '';

    if(isEmptyField(value)) {
        error = "can't be blank";
    } else if(!isPositiveNumber(value)) {
        error = 'wrong format, numbers only';
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