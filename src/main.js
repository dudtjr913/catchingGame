"use strict";
import PopUpContainer from "./container.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

const popUp = new PopUpContainer();
const gamePlay = new GameBuilder()
  .duration(3)
  .carrotCount(5)
  .bugCount(5)
  .build();

gamePlay.setOnClickListener((win) => {
  switch (win) {
    case Reason.win:
      popUp.showWithText("WIN!!");
      sound.gameWinSound();
      break;
    case Reason.lose:
      popUp.showWithText("LOSE");
      sound.alertSound();
      break;
    case Reason.stop:
      popUp.showWithText("REPLAY?");
      sound.alertSound();
      break;
  }
});

popUp.setClickListener(() => gamePlay.playGame());
