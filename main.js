// 1. 시간 흘러가게 하기
// 2. 플레이버튼 활성화
// 3. 정지버튼 활성화
// 4. reset버튼 활성화
// 5. 랜덤으로 벌레와 당근 나오게하기
// 6. 벌레를 잡으면 개수를 증가시키기
// 7. 시간이 다되면 게임 끝내기
// 8. 벌레를 다 잡으면 게임 끝내기
// 9. 당근을 잡으면 게임 끝내기
const main = document.querySelector(".jsBugs");
const body = document.querySelector("body");
const time = document.querySelector(".jsTime");
const playBtn = document.querySelector(".jsBtn");
const replayWrapper = document.querySelector(".jsReplayWrapper");
const replay = document.querySelector(".jsReplay");
const replayBtn = document.querySelector(".jsReplayBtn");
const carrots = document.querySelector(".carrotImg");
const btnClass = playBtn.classList;

let minusTime = 10;

const handleStatus = function () {
  minusTime = 10;
  removeGame();
  generateGame();
  replayWrapper.classList.add("hidden");
  btnClass.remove("hidden");
  time.innerText = `00:${minusTime}`;
  const decreseTime = setInterval(() => {
    if (minusTime > 0) {
      minusTime = minusTime - 1;
      time.innerText = `00:0${minusTime}`;
    } else if (minusTime === 0) {
      playBtn.classList.add("btn_hidden");
      clearInterval(decreseTime);
    }
    if (btnClass[2] === "fa-stop") {
      playBtn.addEventListener("click", function () {
        btnClass.add("hidden");
        replayWrapper.classList.remove("hidden");
        clearInterval(decreseTime);
      });
    }
  }, 1000);
};

const handlePlay = function () {
  if (btnClass[1] === "fa-play") {
    handleStatus();
  }
  btnClass.remove("fa-play");
  btnClass.add("fa-stop");
};

if (playBtn) {
  playBtn.addEventListener("click", handlePlay);
}

if (replayBtn) {
  replayBtn.addEventListener("click", handleStatus);
}

const generateGame = function () {
  for (let i = 1; i <= 7; i++) {
    generateBugs();
  }
  for (let i = 1; i <= 10; i++) {
    generateCarrot();
  }
};

const removeGame = function () {
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
};

const generateBugs = function () {
  const jsLeft = Math.floor(Math.random() * 950);
  const jsTop = Math.floor(Math.random() * 330);
  const bugImg = document.createElement("img");
  bugImg.classList.add("bugImg");
  bugImg.src = "img/bug.png";
  bugImg.alt = "bug";
  bugImg.style.left = `${jsLeft}px`;
  bugImg.style.top = `${jsTop}px`;
  main.appendChild(bugImg);
};

const generateCarrot = function () {
  const jsLeft = Math.floor(Math.random() * 950);
  const jsTop = Math.floor(Math.random() * 330);
  const carrotImg = document.createElement("img");
  carrotImg.classList.add("carrotImg");
  carrotImg.src = "img/carrot.png";
  carrotImg.alt = "carrpt";
  carrotImg.style.left = `${jsLeft}px`;
  carrotImg.style.top = `${jsTop}px`;
  main.appendChild(carrotImg);
};

const delCarrot = function (event) {
  console.log(event);
};
