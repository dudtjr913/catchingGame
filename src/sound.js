"use strict";

const gameWinAudio = new Audio("../sound/game_win.mp3");
const bgAudio = new Audio("../sound/bg.mp3");
const alertAudio = new Audio("../sound/alert.wav");
const bugAudio = new Audio("../sound/bug_pull.mp3");
const carrotAudio = new Audio("../sound/carrot_pull.mp3");

export function carrotSound() {
  playSound(carrotAudio);
}

export function bugSound() {
  playSound(bugAudio);
}

export function alertSound() {
  playSound(alertAudio);
}

export function bgSound() {
  playSound(bgAudio);
}

export function gameWinSound() {
  playSound(gameWinAudio);
}

export function bgStopSound() {
  stopSound(bgAudio);
}

export function winStopSound() {
  stopSound(gameWinAudio);
}

function playSound(sound) {
  sound.currentTime = 0;
  let soundPromise = sound.play();
  if (soundPromise !== undefined) {
    soundPromise.then((_) => sound.pause());
  }
}
function stopSound(sound) {
  sound.pause();
}
