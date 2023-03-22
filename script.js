'use strict';
// Chọn các phần tử
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Điều kiện
let scores, currentScore, activePlayer;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  // diceEl.classList.add('hidden');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const disable = function () {
  btnRoll.setAttribute('disabled', 'disabled');
  btnRoll.style.cursor = 'no-drop';
  btnHold.setAttribute('disabled', 'disabled');
  btnHold.style.cursor = 'no-drop';
  diceEl.classList.add('hidden');
};
const unDisable = function () {
  btnRoll.removeAttribute('disabled');
  btnRoll.style.cursor = 'pointer';
  btnHold.removeAttribute('disabled');
  btnHold.style.cursor = 'pointer';
  diceEl.classList.remove('hidden');
};

// Đổ xúc xắc
btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6 + 1);
  console.log(dice);

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    disable();
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  unDisable();
  // switchPlayer();
  init();
});
