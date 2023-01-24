"use strict";

import { countArray, costArray } from "./info.js";
import { nameArray } from "./initial.js";

export const usedMoneyObject = new Object();
export const expectedMoneyObject = new Object();
export const plusMoneyObject = new Object();
export const minusMoneyObject = new Object();
export const giveObject = new Object();

export default class Result {
  constructor() {
    this.$result = document.querySelector(".result");
  }
  init() {
    for (const [key, value] of Object.entries(giveObject)) {
      const givePerson = key;
      const getPersonObject = value;
    }
  }
  event() {}
  calculate() {
    for (const name of nameArray) {
      if (name) {
        usedMoneyObject[name] = 0;
        expectedMoneyObject[name] = 0;
      }
    }
    for (const i of countArray) {
      if (i) {
        const usedCost = Number(i.cost[0]);
        const usedPerson = i.cost[1];
        usedMoneyObject[usedPerson] += usedCost;

        let sumParticipate = 0;
        for (const [key, value] of Object.entries(i.participants)) {
          sumParticipate += Number(value);
        }

        for (const [key, value] of Object.entries(i.participants)) {
          const ratio = Number(value) / sumParticipate;
          const cost = ratio * usedCost;
          expectedMoneyObject[key] += cost;
        }
      }
    }
    console.log(usedMoneyObject);
    console.log(expectedMoneyObject);

    for (const name of nameArray) {
      if (name) {
        if (usedMoneyObject[name] > expectedMoneyObject[name]) {
          plusMoneyObject[name] = parseInt(
            usedMoneyObject[name] - expectedMoneyObject[name]
          );
        } else if (usedMoneyObject[name] < expectedMoneyObject[name]) {
          minusMoneyObject[name] = parseInt(
            expectedMoneyObject[name] - usedMoneyObject[name]
          );
          giveObject[name] = new Object();
        }
      }
    }

    console.log(plusMoneyObject);
    console.log(minusMoneyObject);

    for (const [key, value] of Object.entries(minusMoneyObject)) {
      for (const [key1, value1] of Object.entries(plusMoneyObject)) {
        if (value === 0) {
          break;
        }
        if (value1 === 0) {
          continue;
        }
        if (value > value1) {
          minusMoneyObject[key] -= plusMoneyObject[key1];
          giveObject[key][key1] = plusMoneyObject[key1];
          plusMoneyObject[key1] = 0;
        } else if (value < value1) {
          plusMoneyObject[key1] -= minusMoneyObject[key];
          giveObject[key][key1] = minusMoneyObject[key];
          minusMoneyObject[key] = 0;
        } else if (value === value1) {
          giveObject[key][key1] = plusMoneyObject[key1];
          minusMoneyObject[key] = 0;
          plusMoneyObject[key1] = 0;
        }
      }
    }

    console.log(giveObject);
  }
  render() {
    this.calculate();
    this.init();
    this.event();
  }
}
