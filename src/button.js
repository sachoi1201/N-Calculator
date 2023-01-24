"use strict";
import Info from "./info.js";
import { nameArray } from "./initial.js";
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
        this.$initial.classList.add("hide");
        this.$info.classList.remove("hide");
        const a = new Info();
        a.render();

        this.step = 2;
      } else if (this.step === 2) {
        this.$info.classList.add("hide");
        this.$result.classList.remove("hide");

        this.step = 3;
        this.$next.innerText = "home";

        const b = new Result();
        b.render();
      } else if (this.step === 3) {
        location.reload();
      }
    });
  }
  render() {
    this.event();
  }
}
