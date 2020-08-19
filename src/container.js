"use strict";

export default class PopUpContainer {
  constructor() {
    this.replayContainer = document.querySelector(".replay_container");
    this.replayBtn = document.querySelector(".replay_btn");
    this.replayText = document.querySelector(".user_text");
    this.replayBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.replayText.innerText = text;
    this.replayContainer.classList.remove("hide");
  }

  hide() {
    this.replayContainer.classList.add("hide");
  }
}
