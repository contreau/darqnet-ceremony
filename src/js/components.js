"use strict";

// DOM
const welcome = document.querySelector(".welcome");

// COMPONENTS

// || CHOOSE CEREMONY ||
class chooseCeremony extends HTMLElement {
  constructor() {
    super();
    const chooseCeremony__temp = document.createElement("template");
    chooseCeremony__temp.innerHTML = `
    <style>
    @keyframes fadeIn {
        100% {
          opacity: 1;
        }
      }

    .chooseCeremony__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        opacity: 0;
        animation: fadeIn 0.5s ease-in forwards;
      }
      
      .button__container {
        display: flex;
        gap: 1.6em;
      }
      
      .cerBtn {
        font-size: 1rem;
        padding: 1em;
        border-radius: 30px;
        border: solid 2px #fff;
        background-color: transparent;
        color: #fff;
        transition: 0.2s all;
      }
      
      .cerBtn:hover,
      .cerBtn:focus {
        background-color: #1a1a1a;
        cursor: pointer;
      }
      
      .cerBtn + .cerBtn {
        margin-right: 1em;
      }
    </style>
    <div class="chooseCeremony__container">
        <h2>What ceremony will this be?</h2>
        <div class="button__container">
          <button class="cerBtn open">Opening</button>
          <button class="cerBtn close">Closing</button>
        </div>
    </div>
    `;
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(chooseCeremony__temp.content.cloneNode(true));

    this.open = shadow.querySelector(".open");
    this.close = shadow.querySelector(".close");
    this.selection = new Promise((resolve, reject) => {
      try {
        this.open.addEventListener("click", () => {
          resolve("open");
        });
      } catch (err) {
        reject(err);
      }
      try {
        this.close.addEventListener("click", () => {
          resolve("close");
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

// || PARTICIPANTS ||
class getParticipants extends HTMLElement {
  constructor() {
    super();
    const getParticipants__temp = document.createElement("template");
    getParticipants__temp.innerHTML = `
    <style>
      @keyframes fadeIn {
        100% {
          opacity: 1;
        }
      }

      input,
      button {
        background: #0c0c0c;
        font: inherit;
        transition: 0.4s all;
        border: transparent;
      }

      .input {
        color: #fff;
        border-radius: 30px;
        padding: 0.5em;
        font-size: 2rem;
        width: 85%;
        outline: none;
        text-align: right;
      }

      .input::placeholder {
        color: #f0f0f0;
        animation: fadeIn 1s ease-in forwards;
      }

      .submit {
        opacity: 0;
        animation: fadeIn 0.5s 1.3s ease-in forwards;
        font-size: 1.5rem;
        outline-color: transparent;
        color: #808080;
        border-radius: 50%;
        width: min-content;
      }

      .submit:hover {
        cursor: pointer;
        color: #fff;
      }

      .input__container {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
      }
    </style>

    <div class="input__container">
        <input type="text" class="input" />
        <button class="submit">&#10140;</button>
    </div>
    `;
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(getParticipants__temp.content.cloneNode(true));

    const input = shadow.querySelector(".input");
    this.setPlaceholder = function (text) {
      let count = 1;
      const loadText = setInterval(() => {
        if (count <= text.length) {
          let text_segment = text.slice(0, count);
          input.setAttribute("placeholder", text_segment);
          count++;
        } else {
          input.focus();
          clearInterval(loadText);
        }
      }, 40);
    };
  }
}

function declareComponents() {
  customElements.define("choose-ceremony", chooseCeremony);
  customElements.define("get-participants", getParticipants);
}

export default {
  welcome,
  chooseCeremony,
  getParticipants,
  declareComponents,
};
