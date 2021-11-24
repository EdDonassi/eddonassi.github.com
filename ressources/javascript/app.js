let navLinks = document.querySelector('.links');
let menuIcon = document.querySelector('#menu-icon');

menuIcon.addEventListener('click', function () {
    navLinks.classList.toggle('is-active');
})