let audio1 = new Audio('Ayah.mp3');
let btn = document.getElementById('goodanswer');
let testBtn = document.getElementById('button');
let ayah = document.getElementById('ayah-text');
let badBtn = document.getElementById('bad');
let love = document.getElementById('amour');



btn.addEventListener('click', function() {
    audio1.play();
    love.style.display= 'block';
    ayah.style.display= 'block';
});

testBtn.addEventListener('click', function() {
    ayah.style.display= 'block';
});

badBtn.addEventListener('click', function() {
    love.style.display = 'none';
})



/* 
testBtn.addEventListener('click', playAudio());

testbtn.addEventListener('click', function() {
    testBtn.classList.toggle('activiti');
});

testbtn.addEventListener('click', function () {
} );
*/
