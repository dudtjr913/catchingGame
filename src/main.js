"use strict";
import PopUpContainer from "./container.js";
import Field from "./frame.js";
import * as sound from "./sound.js";

const playBtn = document.querySelector(".play_btn");
const playIcon = document.querySelector(".fa-play");
const playTime = document.querySelector(".play_time");
const playCatching = document.querySelector(".play_catching");

let started = false;
let timer = undefined;
let count = 0;

const popUp = new PopUpContainer();
popUp.setClickListener(replayGame);

const gameField = new Field(10, 10);
gameField.setClickListener(onClick);

function onClick(item) {
  if (!started) {
    return;
  } else {
    if (item === "bug") {
      count--;
      playCatching.innerText--;
      if (count === 0) {
        stopGame();
        popUp.showWithText("YOU WIN👏");
      }
    } else if (item === "carrot") {
      stopGame();
      popUp.showWithText("YOU LOST😢");
    }
  }
}

function remainTime(time) {
  givenTime(time);
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      givenTime(time);
    } else {
      clearInterval(timer);
      stopGame();
    }
  }, 1000);
}

function givenTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  playTime.innerText = `${minutes} : ${seconds}`;
}

function playGame() {
  if (!started) {
    startGame();
  } else {
    stopGame();
  }
}

function startGame() {
  sound.bgSound();
  gameField.init();
  count = gameField.bugCount;
  playCatching.innerText = count;
  hidePlayBtn();
  remainTime(10);
  started = !started;
}

function stopGame() {
  sound.bgStopSound();
  playBtn.classList.add("hide");
  clearInterval(timer);
  popUp.showWithText("REPLAY?");
  started = !started;
  if (count === 0) {
    sound.gameWinSound();
  } else {
    sound.alertSound();
  }
}

function replayGame() {
  sound.bgStopSound();
  startGame();
  playBtn.classList.remove("hide");
}

function hidePlayBtn() {
  playIcon.classList.remove("fa-play");
  playIcon.classList.add("fa-stop");
}

playBtn.addEventListener("click", playGame);
