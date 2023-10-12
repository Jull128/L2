let input = document.querySelector(".field__form__input");
let btn = document.querySelector(".field__form__btn");
let check = document.querySelector(".result__check__out");
let help = document.querySelector(".result__help__out");
let count = document.querySelector(".result__count__out");
let min = document.getElementById("from").value;
let max = document.getElementById("to").value;

let item = 0;
let userNum;
let randNum = Math.floor(Math.random() * (+max - +min)) + +min;

function initState() {
  item = 0;
  input.value = "";
  help.textContent = "";
  check.textContent = "";
  count.textContent = "";
}

function parity(n) {
  if (n % 2 === 0) {
    help.textContent = "Число является четным";
  } else help.textContent = "Число является нечетным";
}

function change() {
  let from = document.getElementById("from");
  let to = document.getElementById("to");
  min = from.value;
  max = to.value;
  randNum = Math.floor(Math.random() * (+max - +min)) + +min;
  initState();
}

btn.onclick = function (evt) {
  evt.preventDefault();
  userNum = input.value;

  console.log(userNum, randNum, min, max);
  if (userNum < min || max < +userNum) {
    check.textContent = "Ваше число не входит в диапазон";
    help.textContent = "";
  } else if (userNum > randNum) {
    check.textContent = "Пока что не угадали";
    help.textContent = "Многовато будет";
    item++;
    count.textContent = item;
  } else if (userNum < randNum) {
    check.textContent = "Пока что не угадали";
    help.textContent = "Маловато будет";
    item++;
    count.textContent = item;
  } else {
    check.textContent = "Поздравляю! Вы угадали число";
    help.textContent = "В самый раз";
    item++;
    count.textContent = item;
  }
  if (item % 3 === 0) {
    parity(randNum);
  }
};
