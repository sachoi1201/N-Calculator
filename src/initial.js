"use strict";

const countArray = [1, 2, 3, 4, 5];
const personArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const nameArray = new Array(11);
export default class Initial {
  constructor() {
    this.count = 1;
    this.personNumber = 1;
    this.$initial = document.querySelector(".initial");
    this.$count = document.querySelector(".count");
    this.$person = document.querySelector(".person");
  }
  init() {}
  _hide() {
    this.initial.classList.add("hide");
  }
}
