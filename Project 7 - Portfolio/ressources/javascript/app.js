let navLinks = document.querySelector('.links');
let menuIcon = document.querySelector('#menu-icon');

let aboutLink = document.querySelector('#about-link');
let skillsLink = document.querySelector('#skills-link');
let projectsLink = document.querySelector('#projects-link');
let contactLink = document.querySelector('#contact-link');

let aboutSection = document.querySelector('.about-me');
let skillsSection = document.querySelector('.skills');
let projectsSection = document.querySelector('.projects');
let contactSection = document.querySelector('.contact');

const sections = document.querySelectorAll('.section');


// Manages the menu in small screens
menuIcon.addEventListener('click', function () {
    navLinks.classList.toggle('is-active');
})
pagesManagement()

function pagesManagement() { //manages des about-me, skills, projects and contact pages displaying and hidding
    aboutLink.addEventListener('click', () => {    
    sections.forEach(section => {
        section.classList.remove('active');
    })
    aboutSection.classList.add('active');
    navLinks.classList.toggle('is-active');
})


skillsLink.addEventListener('click', () => {    
    sections.forEach(section => {
        section.classList.remove('active');
    })
    skillsSection.classList.add('active');
    navLinks.classList.toggle('is-active');
})

projectsLink.addEventListener('click', () => {    
    sections.forEach(section => {
        section.classList.remove('active');
    })
    projectsSection.classList.add('active');
    navLinks.classList.toggle('is-active');    
})

contactLink.addEventListener('click', () => {    
    sections.forEach(section => {
        section.classList.remove('active');
    })
    contactSection.classList.add('active');
    navLinks.classList.toggle('is-active');
})
}

