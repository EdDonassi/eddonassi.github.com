let audio1 = new Audio('Ayah.mp3');
let btn = document.getElementById('goodanswer');
let testBtn = document.getElementById('button');
let ayah = document.getElementById('ayah-text');


btn.addEventListener('click', function() {
    audio1.play();
    ayah.classList.toggle('.activiti');
    
    ayah.style.display= 'block';
});

testBtn.addEventListener('click', function() {
    ayah.style.display= 'block';
});



/* 
testBtn.addEventListener('click', playAudio());

testbtn.addEventListener('click', function() {
    testBtn.classList.toggle('activiti');
});

testbtn.addEventListener('click', function () {
} );
*/
