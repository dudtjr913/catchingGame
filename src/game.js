"use strict";

import * as sound from "./sound.js";

export default class Game {
  constructor() {
    this.started = false;
    this.timer = undefined;
    this.count = 0;
    this.playBtn = document.querySelector(".play_btn");
    this.playIcon = document.querySelector(".fa-play");
    this.playTime = document.querySelector(".play_time");
    this.playCatching = document.querySelector(".play_catching");
    this.playBtn.addEventListener("click", this.playGame);
  }
  setOnClickListener(onClick) {
    this.onClick = onClick;
  }

  playGame = () => {
    if (!this.started) {
      this.startGame();
    } else {
      this.stopGame();
    }
  };

  startGame() {
    sound.bgSound();
    this.hidePlayBtn();
    this.remainTime(10);
    this.onClick && this.onClick();
    this.started = !this.started;
  }

  stopGame() {
    sound.bgStopSound();
    this.playBtn.classList.add("hide");
    clearInterval(this.timer);
    this.onClick && this.onClick();
    this.started = !this.started;
    if (this.count === 0) {
      sound.gameWinSound();
    } else {
      sound.alertSound();
    }
  }

  hidePlayBtn() {
    this.playIcon.classList.remove("fa-play");
    this.playIcon.classList.add("fa-stop");
  }

  remainTime(time) {
    this.givenTime(time);
    this.timer = setInterval(() => {
      if (time > 0) {
        time--;
        this.givenTime(time);
      } else {
        clearInterval(this.timer);
        this.stopGame();
      }
    }, 1000);
  }

  givenTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.playTime.innerText = `${minutes} : ${seconds}`;
  }
}
