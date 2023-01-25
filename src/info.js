"use strict";
import { nameArray, count, personNumber } from "./initial.js";

export const countArray = new Array(6);
export const costArray = new Array(6);

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
      modal.innerHTML = `<h3>${i}차</h3>`;
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
  filtering() {
    // cost 값 유무
    const $cost = document.querySelector(".cost");
    if (!$cost.value) {
      alert("금액을 작성하세요!");
      return 0;
    }
    const $persons = document.querySelectorAll(".person");

    for (let i = 1; i < $persons.length; i++) {
      if (!$persons[i].value) {
        alert(`${nameArray[i]}의 참여도를 입력해주세요!`);
        return 0;
      }
    }

    // 참여 정도 유무

    return 1;
  }
  makeModal(key) {
    const modalKey = key;
    const $modalInfo = document.createElement("div");
    let cost = 0;
    let costPerson = nameArray[1];

    $modalInfo.classList.add("modal__info");
    $modalInfo.setAttribute("key", modalKey);

    // cost
    const $cost = document.createElement("input");
    $cost.classList.add("cost");
    $cost.placeholder = "금액";
    $cost.type = "number";
    $cost.min = 1000;
    $cost.step = 10000;
    $cost.addEventListener("input", () => {
      cost = Number($cost.value);
    });

    // costPerson
    const $costPersonTitle = document.createElement("h4");
    $costPersonTitle.innerText = "금액을 지불한 사람";
    const $costPerson = document.createElement("select");
    for (const name of nameArray) {
      if (name) {
        const option = document.createElement("option");
        option.innerText = name;
        $costPerson.appendChild(option);
      }
    }
    $costPerson.addEventListener("input", () => {
      costPerson = $costPerson.value;
    });

    // person
    const $personsTitle = document.createElement("h4");
    $personsTitle.innerText = "참여도(0,1,2,3)";
    const $persons = document.createElement("div");
    $persons.classList.add("persons");
    for (const name of nameArray) {
      if (name) {
        const $person = document.createElement("input");
        $person.type = "number";
        $person.min = 0;
        $person.max = 3;
        $person.step = 1;
        $person.setAttribute("key", name);
        $person.classList.add("person");
        $person.placeholder = name;
        $persons.appendChild($person);
      }
    }

    // fullCheck
    const $fullCheck = document.createElement("button");
    $fullCheck.innerText = "full 참석";
    $fullCheck.classList.add("check");
    $fullCheck.addEventListener("click", () => {
      const $persons = document.querySelectorAll(".person");
      if ($fullCheck.classList.contains("checked")) {
        $fullCheck.classList.remove("checked");
        for (let i = 1; i < $persons.length; i++) {
          $persons[i].value = 0;
        }
      } else {
        $fullCheck.classList.add("checked");
        for (let i = 1; i < $persons.length; i++) {
          $persons[i].value = 3;
        }
      }
    });

    // save button
    const $save = document.createElement("button");
    $save.innerText = "save";
    $save.addEventListener("click", () => {
      if (!this.filtering()) {
        return;
      }

      const obj = new Object();
      obj.cost = new Array(2);
      obj.cost[0] = cost;
      obj.cost[1] = costPerson;

      const obj2 = new Object();
      const persons = document.querySelectorAll(".person");
      for (const name of nameArray) {
        if (name) {
          for (const person of persons) {
            if (person.getAttribute("key") === name) {
              obj2[name] = person.value;
              break;
            }
          }
        }
      }
      obj.participants = obj2;
      countArray[modalKey] = obj;

      const $finishModal = document.querySelectorAll(".modal");

      for (let i = 0; i < $finishModal.length; i++) {
        if ($finishModal[i].getAttribute("key") === modalKey) {
          $finishModal[i].classList.add("finish");
        }
      }
      $modalInfo.remove();
    });

    // delete button
    const $delete = document.createElement("button");
    $delete.innerText = "delete";
    $delete.addEventListener("click", () => {
      $modalInfo.remove();
    });

    $modalInfo.appendChild($cost);
    $modalInfo.appendChild($costPersonTitle);
    $modalInfo.appendChild($costPerson);
    $modalInfo.appendChild($personsTitle);
    $modalInfo.appendChild($persons);
    $modalInfo.appendChild($save);
    $modalInfo.appendChild($delete);
    $modalInfo.appendChild($fullCheck);

    this.$info.appendChild($modalInfo);
  }
  render() {
    this.init();
    this.event();
  }
}
