let navLinks = document.querySelector('.links');
let menuIcon = document.querySelector('#menu-icon');
const boxi = document.querySelector('.box');

menuIcon.addEventListener('click', function () {
    navLinks.classList.toggle('is-active');
})
