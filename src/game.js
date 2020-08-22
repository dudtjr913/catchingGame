"use strict";

import * as sound from "./sound.js";
import { Field, itemType } from "./frame.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  stop: "stop",
});

export class GameBuilder {
  duration(time) {
    this.duration = time;
    return this;
  }

  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.duration,
      this.carrotCount, //
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.count = 0;
    this.started = false;
    this.timer = undefined;
    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);
    this.playBtn = document.querySelector(".play_btn");
    this.playIcon = document.querySelector(".fa-play");
    this.playTime = document.querySelector(".play_time");
    this.playCatching = document.querySelector(".play_catching");
    this.playBtn.addEventListener("click", this.playGame);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    } else {
      if (item === itemType.bug) {
        this.count--;
        this.playCatching.innerText--;
        if (this.count === 0) {
          this.stopGame();
          this.onClick && this.onClick(Reason.win);
        }
      } else if (item === itemType.carrot) {
        this.stopGame();
        this.onClick && this.onClick(Reason.lose);
      }
    }
  };

  setOnClickListener(onClick) {
    this.onClick = onClick;
  }

  playGame = () => {
    if (!this.started) {
      this.startGame();
      this.playBtn.classList.remove("hide");
    } else {
      this.stopGame();
      this.onClick && this.onClick(Reason.stop);
    }
  };

  startGame() {
    this.gameField.init();
    sound.winStopSound();
    sound.bgSound();
    this.count = this.bugCount;
    this.hidePlayBtn();
    this.remainTime(this.gameDuration);
    this.playCatching.innerText = this.bugCount;
    this.started = !this.started;
  }

  stopGame() {
    sound.bgStopSound();
    this.playBtn.classList.add("hide");
    clearInterval(this.timer);
    this.started = !this.started;
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
        this.onClick && this.onClick(Reason.lose);
      }
    }, 1000);
  }

  givenTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.playTime.innerText = `${minutes} : ${seconds}`;
  }
}
