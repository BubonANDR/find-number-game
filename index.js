const colors = [
  "#FA8072",
  "#9ACD32",
  "#7FFFD4",
  "#F0E68C",
  "#DDA0DD",
  "#1E90FF",
];

const randomAnimationClass = () => {
  const obj = {
    1: "number__rotate",
    2: "size__animation",
    3: "hidden__animation",
    4: "",
    5: "",
  };

  let keys = Object.keys(obj);
  return obj[keys[parseInt(keys.length * Math.random(), 0)]];
};

class NumberBlock {
  constructor(data, animation, container = ".game-grid") {
    this.data = data;
    this.animation = animation;
    this.container = document.querySelector(container);

    this._createBlock();
  }

  _createBlock() {
    this.container.insertAdjacentHTML(
      "beforeend",
      ` <div class="game-grid__cell ${
        this.animation === "size__animation" ||
        this.animation === "hidden__animation"
          ? this.animation
          : ""
      }">
        <div class="game-grid__brick "></div>
        <p class="game-grig__number ${
          this.animation === "number__rotate" ? this.animation : ""
        }">${this.data}</p>
      </div> `
    );
  }
}

const renderFunction = () => {
  document
    .querySelector(".gameblock ")
    .setAttribute(
      "style",
      `background-color: ${colors[Math.floor(Math.random() * colors.length)]}`
    );

  const numbersArray = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 999)
  );
  let testnumber =
    numbersArray[Math.floor(Math.random() * numbersArray.length)];

  document.querySelector(".gameblock__task-number").textContent = testnumber;

  numbersArray.map((el) => new NumberBlock(el, randomAnimationClass()));

  const address = document.querySelectorAll(".game-grid__cell");

  address.forEach((el) => {
    el.addEventListener("click", () => {
      let numb = el.querySelector(".game-grig__number").textContent;
      if (numb == testnumber) {
        let score = parseInt(document.querySelector(".score").textContent);
        document.querySelector(".score").textContent = score + 1;
      }
      let level = parseInt(document.querySelector(".level").textContent);
      document.querySelector(".level").textContent = level + 1;

      document.querySelector(".game-grid").innerHTML = ``;
      renderFunction();
    });
    el.querySelector(".game-grid__brick").setAttribute(
      "style",
      `background-color: ${colors[Math.floor(Math.random() * colors.length)]}`
    );
  });
};

const startListener = () => {
  const startpage = document.querySelector(".ready");
  const startButton = document.querySelector(".button");
  startButton.addEventListener("click", () => {
    startpage.classList.add("hidden");

    document.querySelector(".game-grid").innerHTML = ``;
    renderFunction();
    let timeleft = 60;
    let downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.querySelector(".timer").innerHTML = "";
        startpage.innerHTML = `<p class="total">Вы набрали ${
          document.querySelector(".score").textContent
        } очков</p>
      <p class="total">Количество неверных ответов :  ${
        document.querySelector(".level").textContent -
        document.querySelector(".score").textContent
      }</p>
      <button type="button" class="button">Еще раз?</button>
          `;
        startpage.classList.remove("hidden");
        startListener();
      } else {
        document.querySelector(".timer").innerHTML = timeleft + " секунд";
      }
      timeleft -= 1;
    }, 1000);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  startListener();
});
