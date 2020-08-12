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
const catching = document.querySelector(".jsCatch");
const replayText = document.querySelector(".jsReplayText");
const bugDiv = main.querySelector(".bugDiv");
const carrotDiv = main.querySelector(".carrotDiv");

const btnClass = playBtn.classList;
let catchingCarrot = 0;
let minusTime = 10;

console.dir(main);

const handleStatus = function () {
  if (catchingCarrot === 0) {
    minusTime = 10;
    catching.innerText = 0;
    replayText.innerText = "YOU LOST😢";
    removeGame();
    generateGame();
    delBugs();
    delCarrot();
    replayWrapper.classList.add("hidden");
    btnClass.remove("hidden");
    time.innerText = `00:${minusTime}`;
  }
  const decreseTime = setInterval(() => {
    if (catching.innerText === "7") {
      clearInterval(decreseTime);
      replayText.innerText = "YOU WIN!!";
      replayWrapper.classList.remove("hidden");
    }
    if (catchingCarrot === 1) {
      clearInterval(decreseTime);
      replayWrapper.classList.remove("hidden");
      catchingCarrot = 0;
    }

    if (minusTime > 0) {
      minusTime = minusTime - 1;
      time.innerText = `00:0${minusTime}`;
    } else if (minusTime === 0) {
      playBtn.classList.add("btn_hidden");
      replayWrapper.classList.remove("hidden");
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
  for (let i = 8; i <= 17; i++) {
    generateCarrot(i);
  }
  for (let i = 1; i <= 7; i++) {
    generateBugs(i);
  }
};

const removeGame = function () {
  while (bugDiv.hasChildNodes()) {
    bugDiv.removeChild(bugDiv.firstChild);
  }
  while (carrotDiv.hasChildNodes()) {
    carrotDiv.removeChild(carrotDiv.firstChild);
  }
};

const generateBugs = function (id) {
  const jsLeft = Math.floor(Math.random() * (main.clientWidth - 70));
  const jsTop = Math.floor(Math.random() * (main.clientHeight - 80));
  const bugImg = document.createElement("img");
  bugImg.classList.add("bugImg");
  bugImg.src = "img/bug.png";
  bugImg.alt = "bug";
  bugImg.id = id;
  bugImg.style.left = `${jsLeft}px`;
  bugImg.style.top = `${jsTop}px`;
  bugDiv.appendChild(bugImg);
};

const generateCarrot = function (id) {
  const jsLeft = Math.floor(Math.random() * (main.clientWidth - 70));
  const jsTop = Math.floor(Math.random() * (main.clientHeight - 80));
  const carrotImg = document.createElement("img");
  carrotImg.classList.add("carrotImg");
  carrotImg.src = "img/carrot.png";
  carrotImg.alt = "carrpt";
  carrotImg.id = id;
  carrotImg.style.left = `${jsLeft}px`;
  carrotImg.style.top = `${jsTop}px`;
  carrotDiv.appendChild(carrotImg);
};

const delBugs = function () {
  const bugs = document.querySelectorAll(".bugImg");
  bugs.forEach(function (ele) {
    ele.addEventListener("click", (a) => {
      a.target.remove();
      catching.innerText++;
    });
  });
};

const delCarrot = function () {
  const carrots = document.querySelectorAll(".carrotImg");
  carrots.forEach(function (ele) {
    ele.addEventListener("click", (a) => {
      a.target.remove();
      catchingCarrot++;
    });
  });
};
