"use strict";
import PopUpContainer from "./container.js";

const gameFrame = document.querySelector(".game_frame");
const gameField = gameFrame.getBoundingClientRect();
const playBtn = document.querySelector(".play_btn");
const playIcon = document.querySelector(".fa-play");
const playTime = document.querySelector(".play_time");
const playCatching = document.querySelector(".play_catching");
const bugAudio = new Audio("sound/bug_pull.mp3");
const carrotAudio = new Audio("sound/carrot_pull.mp3");
const gameWinAudio = new Audio("sound/game_win.mp3");
const bgAudio = new Audio("sound/bg.mp3");
const alertAudio = new Audio("sound/alert.wav");

let started = false;
let timer = undefined;
let count = 0;

const popUp = new PopUpContainer();
popUp.setClickListener(replayGame);

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
  bgAudio.currentTime = 0;
  bgAudio.play();
  gameFrame.innerHTML = "";
  count = 10;
  createObject("carrot", count, "img/carrot.png");
  createObject("bug", count, "img/bug.png");
  playCatching.innerText = count;
  hidePlayBtn();
  remainTime(10);
  started = !started;
}

function stopGame() {
  bgAudio.pause();
  playBtn.classList.add("hide");
  clearInterval(timer);
  popUp.showWithText("REPLAY?");
  started = !started;
  if (count === 0) {
    gameWinAudio.play();
  } else {
    alertAudio.play();
  }
}

function replayGame() {
  bgAudio.pause();
  startGame();
  playBtn.classList.remove("hide");
}

function hidePlayBtn() {
  playIcon.classList.remove("fa-play");
  playIcon.classList.add("fa-stop");
}

function createObject(className, count, img) {
  const x = gameField.width;
  const y = gameField.height;
  for (let i = 0; i < count; i++) {
    const object = document.createElement("img");
    object.src = img;
    object.classList.add(className);
    object.style.position = "absolute";
    const x2 = randomNumber(x);
    const y2 = randomNumber(y);
    object.style.left = `${x2}px`;
    object.style.top = `${y2}px`;
    gameFrame.appendChild(object);
  }
}

function randomNumber(XOrY) {
  return Math.ceil(Math.random() * (XOrY - 80));
}

function removeObject(event) {
  if (!started) {
    return;
  } else {
    const target = event.target;
    if (target.matches(".bug")) {
      target.remove();
      bugAudio.currentTime = 0;
      bugAudio.play();
      count--;
      playCatching.innerText--;
      if (count === 0) {
        stopGame();
        popUp.showWithText("YOU WIN👏");
      }
    } else if (target.matches(".carrot")) {
      target.remove();
      carrotAudio.play();
      stopGame();
      popUp.showWithText("YOU LOST😢");
    }
  }
}

playBtn.addEventListener("click", playGame);
gameFrame.addEventListener("click", removeObject);
