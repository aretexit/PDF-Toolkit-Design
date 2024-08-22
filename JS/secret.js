const { v4: uuidv4 } = require('uuid'); 

const HARD_CODED_API_KEY = "kzM40Xj5zlJlaUoo"; 

const user_input = document.getElementById('user_input');
let computerId = localStorage.getItem('computerId'); 

if (!computerId) {
    computerId = uuidv4(); 
    localStorage.setItem('computerId', computerId); 
}

const body = document.querySelector('.whole-content');

document.addEventListener('DOMContentLoaded', () => {
    // Directly set the API key
    user_input.value = HARD_CODED_API_KEY;
    body.style.display = 'block';
});
