"use strict";

import * as sound from "./sound.js";

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameFrame = document.querySelector(".game_frame");
    this.gameField = this.gameFrame.getBoundingClientRect();
    this.gameFrame.addEventListener("click", this.removeTarget);
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  init() {
    this.gameFrame.innerHTML = "";
    this.createObject("carrot", this.carrotCount, "../img/carrot.png");
    this.createObject("bug", this.bugCount, "../img/bug.png");
  }

  removeTarget = (event) => {
    const target = event.target;
    if (target.matches(".bug")) {
      this.onClick && this.onClick("bug");
      target.remove();
      sound.bugSound();
    } else if (target.matches(".carrot")) {
      this.onClick && this.onClick("carrot");
      target.remove();
      sound.carrotSound();
    }
  };

  createObject(className, count, img) {
    const x = this.gameField.width;
    const y = this.gameField.height;
    for (let i = 0; i < count; i++) {
      const object = document.createElement("img");
      object.src = img;
      object.classList.add(className);
      object.style.position = "absolute";
      const x2 = randomNumber(x);
      const y2 = randomNumber(y);
      object.style.left = `${x2}px`;
      object.style.top = `${y2}px`;
      this.gameFrame.appendChild(object);
    }
  }
}
function randomNumber(XOrY) {
  return Math.ceil(Math.random() * (XOrY - 80));
}
