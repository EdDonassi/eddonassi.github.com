/*
0. createRosco() & initializeVariables()
1. start()
2. speakDefinition() & animate()

3. verifyResponse()
   if (!goodAnswers.contains(0) || !badAnswers.contains(0)); speech.definitions[0]
4.  Validate() response : if response == good, letter[0] = vert, definition ++
    Wrong() 
    Next()
*/


const letters = document.querySelectorAll('.letter');
const playBtn = document.querySelector('.play-btn');
const ppasseBtn = document.querySelector('.passe-btn');
const answerBtn = document.querySelector('.answer-btn');
const definitionAppend = document.querySelector('.definition');
const beginsByAppend = document.querySelector('.begins-by');
const centerCard = document.querySelector('.center-card');
const numberOfGoodAnswers = document.querySelector(".good-answers");
const numberOfBadAnswers = document.querySelector(".bad-answers");
const numberOfLettersLeft = document.querySelector(".letters-left");
const repeatBtn = document.querySelector(".repeat-btn");
const secondsAppend = document.querySelector(".seconds");
const minutesAppend = document.querySelector(".minutes");


const rosco = [
    { letter: "a", state: "orange", response : "ami", definition: "Personne très proche."},
    { letter: "b", state: "orange", response : "bébé", definition: "Humain qui vient de naître."},
    { letter: "c", state: "orange", response : "courir", definition: "Se déplacer très vite à pied."},
    { letter: "d", state: "orange", response : "distance", definition: "Longitud entre deux villes." },
    { letter: "e", state: "orange", response : "estirper", definition: "Arracher." },
    { letter: "f", state: "orange", response : "foudre", definition:"arc électrique venant du ciel"},
    { letter: "g", state: "orange", response : "gag", definition: "petit sketch" },
    { letter: "h", state: "orange", response : "hélicoptère", definition: "aeronef capable de faire du vol stationnaire" },
    { letter: "i", state: "orange", response : "iris", definition: "partie colorée de l'oeil" },
    { letter: "j", state: "orange", response : "jardin", definition: "parcelle verte devant ou derrière la maison" },
    { letter: "l", state: "orange", response : "lustrer", definition: "polir" },
    { letter: "m", state: "orange", response : "maintenir", definition:"garder dans le même état"},
    { letter: "n", state: "orange", response : "nier", definition: "ne pas admettre un fait" },
    { letter: "o", state: "orange", response : "orchestrer", definition: "organiser" },
    { letter: "p", state: "orange", response : "perdu", definition: "qui ne sait pas où il est" },
    { letter: "q", state: "orange", response : "qatari", definition: "né au qatar" },
    { letter: "r", state: "orange", response : "rare", definition: "peu commun" },
    { letter: "s", state: "orange", response : "scier", definition: "couper avec une scie" },
    { letter: "t", state: "orange", response : "toc", definition: "reflex non contrôlé du corps" },
    { letter: "u", state: "orange", response : "unir", definition: "joindre" },
    { letter: "v", state: "orange", response : "vitesse", definition: "la distance divisée par le temps" },
    { letter: "x", state: "orange", response : "texte", definition: "ensemble de mots" },
    { letter: "y", state: "orange", response : "paye", definition:"montant reçu periodiquement" },
    { letter: "z", state: "orange", response : "zèbre", definition: "animal avec lignes noires et blanches" }  
  ];
let currentLetter = 0;
let badAnswers = 0;
let goodAnswers = 0;
let lettersLeft = 24;
let actualResponse = "";
let timeLeft = 150;
let seconds = 0;
let minutes = 0;
let stopWatch;
let stopWatchStarted = false;

resetGame();
playBtn.addEventListener('click', () => {
  checkLetterIsPlayable();
  playBtn.removeEventListener('click', playNextLetter);
});
repeatBtn.addEventListener('click', () => {
  speakDefinition();
  listenResponse();
});

//---functions------------------


function playNextLetter() { 
  checkStopWatch();
  blinkLetter();
  speakDefinition();
  listenResponse();
}

function blinkLetter() {
  letters[currentLetter].classList.toggle('active');
}

function speakDefinition() {
  const speech = window.speechSynthesis;
  const def = new SpeechSynthesisUtterance(rosco[currentLetter].definition);
  def.lang = 'fr';
  // console.log("reading the definition for: " + letters[currentLetter].innerText);
  speech.speak(def);
}

function listenResponse(){
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'fr';
  recognition.start();
  // console.log("listening response for: " + letters[currentLetter].innerText)
  recognition.onresult = (e) => {
    actualResponse = e.results[0][0].transcript.toLowerCase();    
    console.log("Expected response: " + rosco[currentLetter].response);
    console.log("Listened response: " + actualResponse);
    verifyResponse(actualResponse);   
    }
}

function verifyResponse(response) {

  if(response == rosco[currentLetter].response) {
    letters[currentLetter].classList.add('green');
    letters[currentLetter].classList.remove('orange');
    letters[currentLetter].classList.toggle('active');    
    //console.log(letters[currentLetter].classList);
    rosco[currentLetter].state = "green";
    currentLetter ++;
    goodAnswers ++;
    lettersLeft --;
    setScores();
    lettersLeft === 0 ? endGame(): checkLetterIsPlayable();
    
  } else if(response == "je passe"){
      letters[currentLetter].classList.add('orange');
      letters[currentLetter].classList.toggle('active');    
      //console.log(letters[currentLetter].classList);
      rosco[currentLetter].state = "orange";
      currentLetter ++;
      checkLetterIsPlayable();
      
    } else{
        letters[currentLetter].classList.add('red');
        letters[currentLetter].classList.remove('orange');
        letters[currentLetter].classList.toggle('active');    
        //console.log(letters[currentLetter].classList);
        rosco[currentLetter].state = "red";
        currentLetter ++;
        badAnswers ++;
        lettersLeft --;
        setScores();
        lettersLeft === 0 ? endGame(): checkLetterIsPlayable();  
      }
}

function countTime() {
  seconds ++;
  if(seconds <10) {
    secondsAppend.innerText = "0" + seconds;
    } else if(seconds < 60) {    
      secondsAppend.innerText =  seconds;
      }else if(seconds === 60) {
        seconds = 0;
        secondsAppend.innerText = "0" + seconds;
        minutes ++;
        if(minutes < 10) {
          minutesAppend.innerText = "0" + minutes;
          } else {
              minutesAppend.innerText = minutes;
            }
      }
}

function setScores() {
  numberOfGoodAnswers.innerText = goodAnswers;
  numberOfBadAnswers.innerText = badAnswers;
  numberOfLettersLeft.innerText = lettersLeft;
}

function resetGame() {
   currentLetter = 0;
   badAnswers = 0;
   goodAnswers = 0;
   lettersLeft = 24;
   actualResponse = "";
   time = 0;
  
  numberOfGoodAnswers.innerText = goodAnswers;
  numberOfBadAnswers.innerText = badAnswers;
  numberOfLettersLeft.innerText = lettersLeft;
  secondsAppend.innerText = "00";
  minutesAppend.innerText = "00";
}

function endGame() {
  clearInterval(stopWatch);
}

function checkStopWatch() {
    if(!stopWatchStarted) {  // checks if the stopWatch has already been started
    stopWatch = setInterval(countTime, 1000);
    stopWatchStarted = true;
  }
}

function checkLetterIsPlayable() {
  
  if(currentLetter > 23) {
    currentLetter = 0;
  }
  
  if(rosco[currentLetter].state !== "orange"){
      currentLetter ++;
      checkLetterIsPlayable();
  } else{
      playNextLetter();    
    }
}


