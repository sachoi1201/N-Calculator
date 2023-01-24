"use strict";
import { nameArray, count, personNumber } from "./initial.js";

export default class Info {
  constructor() {
    this.$info = document.querySelector(".info");
  }
  init() {
    // modal
    for (let i = 1; i <= count; i++) {
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.setAttribute("key", i);
      modal.innerHTML = `${i}차`;
      this.$info.appendChild(modal);
    }
  }
  event() {
    this.$info.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
        const modal = event.target;
        const key = modal.getAttribute("key");
        this.makeModal(key);
      }
    });
  }
  makeModal(key) {
    const modalKey = key;
    const modalInfo = document.createElement("div");
    modalInfo.classList.add("modal__info");
    modalInfo.setAttribute("key", modalKey);

    // cost
    const $cost = document.createElement("input");
    $cost.placeholder = "cost";

    // costPerson
    const $costPerson = document.createElement("select");
    for (const name of nameArray) {
      if (name) {
        const option = document.createElement("option");
        option.innerText = name;
        $costPerson.appendChild(option);
      }
    }

    // person
    const $persons = document.createElement("div");
    for (const name of nameArray) {
      if (name) {
        const $person = document.createElement("input");
        $person.placeholder = name;
        $persons.appendChild($person);
      }
    }
    modalInfo.appendChild($cost);
    modalInfo.appendChild($costPerson);
    modalInfo.appendChild($persons);

    this.$info.appendChild(modalInfo);
  }
  render() {
    this.init();
    this.event();
  }
}
