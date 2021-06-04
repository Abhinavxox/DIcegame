"use strict";

const Scorep0 = document.querySelector(".p0");
const Scorep1 = document.querySelector(".p1");
const Totalp0 = document.querySelector(".p0-score");
const Totalp1 = document.querySelector(".p1-score");
const displayActive0 = document.querySelector(".player0");
const displayActive1 = document.querySelector(".player1");
const displayDice = document.querySelector(".dice");
const displayModal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-text");
const modalText2 = document.querySelector(".modal-text2");
const btnCLoseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const activeRoundColor = document.querySelectorAll(".show-modal");
const finalLine = document.querySelector(".line");
const finalBtn = document.querySelector(".play-again");
const description = document.querySelector(".show-modal-description");
const roll = new Audio("roll.wav");

let activePlayer = 0;
let total = [0, 0];
let secretNumber;
let activeRound = 1;
let noOfWins = [0, 0];
let winnerIsNotDecided = true;
changeRoundColor();




document.querySelector(".rollDice").addEventListener("click", function () {
  if (winnerIsNotDecided) {
    secretNumber = Math.trunc(Math.random() * 5) + 1;
    
    var timesRun = 0;
    var interval = setInterval(function(){
    timesRun += 1;
    if(timesRun === 20){
        displayDice.src = `dice-${secretNumber}.png`;
        clearInterval(interval)
        return

    }
    let randomNumber = Math.trunc(Math.random() * 5) + 1
    console.log(randomNumber, "rn")
    displayDice.src = `dice-${randomNumber}.png`;
    }, 50); 
    
    roll.play();
    
    //if 1 comes then switch player
    if (secretNumber === 1) {
      switchScore();
      if (activePlayer) {
        Scorep0.textContent = secretNumber;
      } else {
        Scorep1.textContent = secretNumber;
      }
      total[activePlayer] = 0;
      activePlayer
        ? (Totalp0.textContent = total[activePlayer])
        : (Totalp1.textContent = total[activePlayer]);
    }
    //if other num comes
    else {
      //player1 turn
      if (!activePlayer) {
        Scorep0.textContent = secretNumber;
        total[activePlayer] += secretNumber;
        Totalp0.textContent = total[activePlayer];
        winner();
      }
      //player2 turn
      else if (activePlayer) {
        Scorep1.textContent = secretNumber;
        total[activePlayer] += secretNumber;
        Totalp1.textContent = total[activePlayer];
        winner();
      }
    }
  }
});

//switch player
function switchScore() {
  activePlayer = Number(!activePlayer);
  displayActive0.classList.toggle("active");
  displayActive1.classList.toggle("active");
}

//when player holds
document.querySelector(".hold").addEventListener("click", function () {
  if (winnerIsNotDecided) {
    switchScore();
  }
});

//determining the winner
function winner() {
  if (total[0] >= 30 || total[1] >= 30) {
    modalText.textContent = `Round ${activeRound} has ended.`;
    modalText2.textContent = `Player ${
      activePlayer + 1
    } wins round ${activeRound}🎉`;
    openModal();
    winnerIsNotDecided = false;
    //ending the round and storing it
    activeRound++;
    noOfWins[activePlayer] += 1;
    if (activeRound === 4 || noOfWins[0] === 2 || noOfWins[1] === 2) {
      finalWinner();
    } else {
      resetBoard();
    }
  }
}

//closing the modal and blurring overlay
function closeModal() {
  displayModal.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnCLoseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//opening the modal
function openModal() {
  displayModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

//resetting the board
function resetBoard() {
  total = [0, 0];
  winnerIsNotDecided = true;
  Scorep0.textContent = 0;
  Scorep1.textContent = 0;
  Totalp0.textContent = 0;
  Totalp1.textContent = 0;
  switchScore();
  changeRoundColor();
}

//to change round color
function changeRoundColor() {
  activeRoundColor[activeRound - 1].classList.toggle("activeRound");
  if (activeRound > 1)
    activeRoundColor[activeRound - 2].classList.toggle("activeRound");
}

//finalWInner
function finalWinner() {
  let theWinner;
  noOfWins[0] > noOfWins[1] ? (theWinner = 1) : (theWinner = 2);
  modalText.textContent = `Player ${theWinner} wins the game🎉`;
  finalLine.classList.remove("hidden");
  finalBtn.classList.remove("hidden");
  openModal();
  btnCLoseModal.removeEventListener("click", closeModal);
  overlay.removeEventListener("click", closeModal);
  btnCLoseModal.addEventListener("click", playAgain);
  overlay.addEventListener("click", playAgain);
}

//new game
document.querySelector(".reset").addEventListener("click", playAgain);

//play again button
function playAgain() {
  activeRound = 1;
  for (let i = 0; i < activeRoundColor.length; i++) {
    if (activeRoundColor[i].classList.contains("activeRound")) {
      activeRoundColor[i].classList.remove("activeRound");
    }
  }
  noOfWins[0] = 0;
  noOfWins[1] = 0;
  resetBoard();
  closeModal();
  if (finalLine.contains("hidden")) {
    finalLine.classList.remove("hidden");
    finalBtn.classList.remove("hidden");
  }
  btnCLoseModal.removeEventListener("click", playAgain);
  overlay.removeEventListener("click", playAgain);
  btnCLoseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
}
closeModal;
finalBtn.addEventListener("click", playAgain);

//opening description
description.addEventListener("click", function () {
  const text = `Hii.
  So what is this game?
  Good question.
  You have to cross 30 to win the game.
  If you get one you loose all the points.
  So you can also hold your turn and pass it to other player.
  Best of three wins.
  That's it.`;
  modalText.textContent = text;
  openModal();
});
