'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const bntNew = document.querySelector('btn--new');
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  switchScore(0, currentScore);
  switchScore(1, currentScore);
  //--Recordar que la clase "Hidden" debe ser creada manualmente en el Css--
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

function switchScore(activePlayer, currentScore) {
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
}
function switchPlayer() {
  currentScore = 0;
  switchScore(activePlayer, currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function setScore(activePlayer, score) {
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
}

init();

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Dice randomizer
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Check for ones
    if (dice !== 1) {
      //add to the current score
      currentScore += dice;
      switchScore(activePlayer, currentScore);
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

//Hold the score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add Current Score
    scores[activePlayer] += currentScore;
    setScore(activePlayer, scores[activePlayer]);
    //Check score its 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#name--${activePlayer}`).textContent = 'WINNER!';
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

//reset the game functionality
btnNew.addEventListener('click', function () {
  //reset values
  document.querySelector(`#name--${activePlayer}`).textContent = `player ${
    activePlayer + 1
  }`;
  init();
});
