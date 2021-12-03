const goodPassword = '14102021';
const password = document.getElementById('password');
let conectBtn = document.querySelector('.button');
const mainContainer = document.querySelector('.main-container');
const logIn = document.querySelector('.login')
const error = document.querySelector('#error')


conectBtn.addEventListener('click', checkPassword)

function checkPassword() {
    if(password.value === goodPassword) {
        mainContainer.style.backgroundColor='orange'
        console.log('Good password')
        logIn.classList.toggle('active')
        mainContainer.classList.toggle('active')
    } else {
        error.style.color = 'red'
        error.innerText = 'Mauvais mot de passe'
    }
}

