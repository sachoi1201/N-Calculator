"use strict";
import Info from "./info.js";
import { nameArray, personNumber } from "./initial.js";
import Result from "./result.js";

export default class Button {
  constructor() {
    this.step = 1;
    this.$next = document.querySelector(".next");
    this.$initial = document.querySelector(".initial");
    this.$info = document.querySelector(".info");
    this.$result = document.querySelector(".result");
  }
  event() {
    this.$next.addEventListener("click", () => {
      if (this.step === 1) {
        if (personNumber === 1) {
          alert("사람 수를 설정해주세요!");
          return;
        }
        this.$initial.classList.add("hide");
        this.$info.classList.remove("hide");
        const info = new Info();
        info.render();

        this.step = 2;
      } else if (this.step === 2) {
        const $Modals = document.querySelectorAll(".modal");
        for (let i = 0; i < $Modals.length; i++) {
          if (!$Modals[i].classList.contains("finish")) {
            alert(`${i + 1}차의 정보를 입력해주세요!`);
            return;
          }
        }

        this.$info.classList.add("hide");
        this.$result.classList.remove("hide");

        this.step = 3;
        this.$next.innerText = "home";

        const result = new Result();
        result.render();
      } else if (this.step === 3) {
        location.reload();
      }
    });
  }
  render() {
    this.event();
  }
}
