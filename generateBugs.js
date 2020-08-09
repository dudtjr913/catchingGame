const main = document.querySelector(".jsBugs");

const generateBugs = function () {
  const jsLeft = Math.floor(Math.random() * 950);
  const jsTop = Math.floor(Math.random() * 350);
  const bugImg = document.createElement("img");
  bugImg.classList.add("bugImg");
  bugImg.src = "img/bug.png";
  bugImg.alt = "bug";
  bugImg.style.left = `${jsLeft}px`;
  bugImg.style.top = `${jsTop}px`;
  main.appendChild(bugImg);
};

export const generateCarrot = function () {
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
