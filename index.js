const app = require('./app');
const prompt = require('prompt-sync')();

const valuesInput = prompt('Enter the values separated by a comma without a space, like: "1,2,3,4,5": ');
const values = valuesInput.split(',').map(val => +val);
const target = prompt('Enter the target: ');

app(values, +target);
