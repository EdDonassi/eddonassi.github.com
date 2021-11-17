let audio1 = new Audio('Ayah.mp3');
let btn = document.getElementById('goodanswer');
let testbtn = document.getElementById('button');

function playAudio () {
    audio1.play();
};

//btn.addEventListener('click', playAudio());

//testbtn.addEventListener('click', playAudio());

testbtn.addEventListener('click', function() {
    testbtn.classList.toggle('activiti');
});

testbtn.addEventListener('click', audio1.play())
