/* eslint-disable no-unused-vars */
const handleSubmit = (formThis) => {
    // e.preventDefault();
    const { name, cardNumber, month, year, cvc } = formThis;
    console.log('name', name.value)
    console.log('cardNumber', cardNumber.value)
    console.log('month', month.value)
    console.log('year', year.value)
    console.log('cvc', cvc.value)
    return false; // prevent default event
}

const isEmptyField = (value) => {
    return value.trim() === "" || !value;
}

const isPositiveNumber = (value) => {
    return value > 0 && Number.isInteger(value);
}

const numberOfDigits = value => {
    return Math.max(Math.floor(Math.log10(Math.abs(value))), 0) + 1;
    // return value.toString().length;
}

const isValidCardNumber = value => {
    return isPositiveNumber(value) && numberOfDigits(value) ===  16;
}

const isValidExpiryDate = (month, year) => {
    return isValidMonth(month) && isValidYear(year);
}

const isValidYear = year => {
    const lastTwoDigitsOfYear = new Date().getFullYear()/ 100; 
    return isPositiveNumber(year) && year >= lastTwoDigitsOfYear;
}

const isValidMonth = month => {
    return isPositiveNumber(month) && month >= 1 && month <= 12;
}

const isValidCVC = value => {
    return isPositiveNumber(value) && numberOfDigits(value) === 3;
}