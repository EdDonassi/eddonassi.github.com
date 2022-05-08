
const secondsHolder = document.querySelector('.seconds');
const goodAnswersHolder = document.querySelector('.good-answers');
const badAnswersHolder = document.querySelector('.bad-answers');
const numberToGuessHolder = document.querySelector('.number-to-guess');
const options = Array.from(document.querySelectorAll('.option'));
const answerZeroHolder = document.querySelector('.answer0');
const answerOneHolder = document.querySelector('.answer1');
const answerTwoHolder = document.querySelector('.answer2');
const answerThreeHolder = document.querySelector('.answer3');
const answerFourHolder = document.querySelector('.answer4');
const playBtnContainer = document.querySelector('.play-btn-container');
const playBtn = document.querySelectorAll('.play-btn');
const endedGameBanner = document.querySelector('.ended-game-banner');
const congratulationsText = document.querySelector('.congratulations-text');
const resultsText = document.querySelector('.results-text');


const numbers = [ {number: "0", numberWritten: 'Zéro'},
                 {number: "1", numberWritten: 'Un'}, 
                 {number: "2", numberWritten: 'Deux'}, 
                 {number: "3", numberWritten: 'Trois'}, 
                 {number: "4", numberWritten: 'Quatre'}, 
                 {number: "5", numberWritten: 'Cinq'}, 
                 {number: "6", numberWritten: 'Six'}, 
                 {number: "7", numberWritten: 'Sept'}, 
                 {number: "8", numberWritten: 'Huit'}, 
                 {number: "9", numberWritten: 'Neuf'}, 
                 {number: "10", numberWritten: 'Dix'}, 
                 {number: "11", numberWritten: 'Onze'}, 
                 {number: "12", numberWritten: 'Douze'}, 
                 {number: "13", numberWritten: 'Treize'}, 
                 {number: "14", numberWritten: 'Quatorze'}, 
                 {number: "15", numberWritten: 'Quinze'}, 
                 {number: "16", numberWritten: 'Seize'}, 
                 {number: "17", numberWritten: 'Dix-sept'}, 
                 {number: "18", numberWritten: 'Dix-huit'}, 
                 {number: "19", numberWritten: 'Dix-neuf'},
                 {number: "20", numberWritten: 'Vingt'}, 
                 {number: "21", numberWritten: 'Vingt-et-un'}, 
                 {number: "22", numberWritten: 'Vingt-deux'},
                 {number: "23", numberWritten: 'Vingt-trois'},
                 {number: "24", numberWritten: 'Vingt-quatre'},
                 {number: "25", numberWritten: 'Vingt-cinq'},
                 {number: "26", numberWritten: 'Vingt-six'},
                 {number: "27", numberWritten: 'Vingt-sept'},
                 {number: "28", numberWritten: 'Vingt-huit'},
                 {number: "29", numberWritten: 'Vingt-neuf'},
                 {number: "30", numberWritten: 'Trente'}
                ];
let secondsToPlay = 60;
let secondsLeft = secondsToPlay;
let numberOrLetter ;
let numberToGuess = 0;
let possibleAnswers =[];
let response = '';
let goodAnswers = 0;
let badAnswers = 0;

//
playBtn.forEach(btn => {btn.addEventListener('click', () =>{
  resetGame();
  playBtnContainer.style.display= 'none';
  endedGameBanner.style.display = 'none';
  setTimer()  
  newNumberToGuess();
})});
options.forEach(option => option.addEventListener('click', () => verifyResponse(option.innerText)));


//
function setTimer() {
  let timer  = setInterval(nextSecond, 1000);
  
  function nextSecond(){
    secondsLeft --;
    if(secondsLeft < 0){
      endGame();
      clearInterval(timer);
    } else { secondsHolder.innerText = secondsLeft; }    
  }
}

function newNumberToGuess() {
  numberOrLetter = isNumberOrLetter()
  numberToGuess = Math.floor(Math.random() * numbers.length)
  if(numberOrLetter == 'number') {    
      numberToGuessHolder.innerText = numbers[numberToGuess].number;
  } else {
      numberToGuessHolder.innerText = numbers[numberToGuess].numberWritten;   
  }
  possibleAnswers.push(numberToGuess);
  setOptions();  
}

function setOptions() {
  
  do { let number = Math.floor(Math.random() * numbers.length);
       if(!possibleAnswers.includes(number)) {
          possibleAnswers.push(number);
       }
  }  while (possibleAnswers.length < 5);
  
  let answerPlace = Math.floor(Math.random() * 5);
  possibleAnswers.splice(0, 1, possibleAnswers[answerPlace]);
  possibleAnswers.splice(answerPlace, 1, numberToGuess);
  for(let i = 0; i < possibleAnswers.length; i++) {
    options[i].innerText = possibleAnswers[i];
  }
  
  //sets the answers to be written if the number to guess is a figure
  if(numberOrLetter == 'number'){
     answerZeroHolder.innerText = numbers[possibleAnswers[0]].numberWritten;
     answerOneHolder.innerText = numbers[possibleAnswers[1]].numberWritten;
     answerTwoHolder.innerText = numbers[possibleAnswers[2]].numberWritten;
     answerThreeHolder.innerText = numbers[possibleAnswers[3]].numberWritten;
     answerFourHolder.innerText = numbers[possibleAnswers[4]].numberWritten;

  }
  possibleAnswers = [];
}

function verifyResponse(option) {
  if(option == numbers[numberToGuess].number || option == numbers[numberToGuess].numberWritten){
    goodAnswers ++;
  } else { badAnswers ++ }
  setScores();
  newNumberToGuess();
}

function setScores() {
  goodAnswersHolder.innerText = goodAnswers;
  badAnswersHolder.innerText = badAnswers;
}

function resetGame() {
    goodAnswers = 0;
    badAnswers = 0;
    secondsLeft = secondsToPlay;
    secondsHolder.innerText = secondsLeft;  
    goodAnswersHolder.innerText = '0';
    badAnswersHolder.innerText = '0';
}

function endGame() {
  resultsText.innerText = `Vous avez eu ${goodAnswers} bonnes réponses et ${badAnswers} erreurs.`;
  endedGameBanner.style.display = "flex";  
}

function isNumberOrLetter() {
   if(Math.floor(Math.random() * 2) == 1){
       return 'number';
   } return 'letter'
}
