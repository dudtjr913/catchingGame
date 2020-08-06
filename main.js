// 1. 시간 흘러가게 하기
// 2. 플레이버튼 활성화
// 3. 정지버튼 활성화
// 4. reset버튼 활성화
// 5. 랜덤으로 벌레와 당근 나오게하기
// 6. 벌레를 잡으면 개수를 증가시키기
// 7. 시간이 다되면 게임 끝내기
// 8. 벌레를 다 잡으면 게임 끝내기
// 9. 당근을 잡으면 게임 끝내기

const body = document.querySelector("body");
const time = document.querySelector(".jsTime");
const playBtn = document.querySelector(".jsBtn");
const btnClass = playBtn.classList;

let minusTime = 10;

const handleStatus = function () {
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
        playBtn.classList.add("btn_hidden");
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
