"use strict";
import PopUpContainer from "./container.js";
import Field from "./frame.js";
import * as sound from "./sound.js";
import Game from "./game.js";

const popUp = new PopUpContainer();
const gameField = new Field(10, 10);
const gamePlay = new Game();

popUp.setClickListener(replayGame);

function replayGame() {
  sound.bgStopSound();
  gamePlay.playGame();
  gamePlay.playBtn.classList.remove("hide");
}

gameField.setClickListener(onClick);

function onClick(item) {
  if (!gamePlay.started) {
    return;
  } else {
    if (item === "bug") {
      gamePlay.count--;
      gamePlay.playCatching.innerText--;
      if (gamePlay.count === 0) {
        gamePlay.stopGame();
        popUp.showWithText("YOU WIN👏");
      }
    } else if (item === "carrot") {
      gamePlay.stopGame();
      popUp.showWithText("YOU LOST😢");
    }
  }
}
gamePlay.setOnClickListener(startGame);

function startGame() {
  if (!gamePlay.started) {
    gameField.init();
    gamePlay.count = gameField.bugCount;
    gamePlay.playCatching.innerText = gamePlay.count;
  } else {
    popUp.showWithText("REPLAY?");
  }
}
