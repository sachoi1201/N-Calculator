"use strict";

const countArray = [1, 2, 3, 4, 5];
const personArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const nameArray = new Array(11);
export let count = 1;
export let personNumber = 1;

export default class Initial {
  constructor() {
    this.count = 1;
    this.personNumber = 1;
    this.$initial = document.querySelector(".initial");
    this.$count = document.querySelector(".count");
    this.$person = document.querySelector(".person");
    this.$names = document.querySelector(".initial__names");
  }
  init() {
    // personSelector
    for (const person of personArray) {
      const option = document.createElement("option");
      option.innerText = person;
      this.$person.appendChild(option);
    }
    // countSelector
    for (const count of countArray) {
      const option = document.createElement("option");
      option.innerText = count;
      this.$count.appendChild(option);
    }
  }
  event() {
    // person
    this.$person.addEventListener("input", () => {
      this.personNumber = this.$person.value;
      personNumber = this.$person.value;
      this.nameMake();
    });
    // count
    this.$count.addEventListener("input", function () {
      this.count = this.value;
      count = this.value;
    });

    // name
    this.$names.addEventListener("input", (event) => {
      const $name = event.target;
      const key = $name.getAttribute("key");
      nameArray[key] = $name.value;
    });
  }

  nameMake = () => {
    this.$names.innerHTML = "";
    for (let i = 1; i <= this.personNumber; i++) {
      const $name = document.createElement("input");
      $name.setAttribute("key", i);
      this.$names.appendChild($name);
    }
  };

  _hide() {
    this.$initial.classList.add("hide");
  }
  render() {
    this.init();
    this.event();
  }
}
