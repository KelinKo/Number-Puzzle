// -1 -4 +4 +1

// 1.隨機號碼
// 如果棋盤的總逆序數是偶數，且空格位於奇數行（從底部開始計數），則排列是可解的。  逆序數 = 前面>後面
// 如果棋盤的總逆序數是奇數，且空格位於偶數行（從底部開始計數），則排列是可解的。
// 2.順序要對才獲勝
// 3.如何讓東西移動
// 4.click旁邊為空的東西的時候才可以移動數字

//隨機產生的值
let numArray = [];

let anwserArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];
//當前排列的array
let resultArray = [];
//空格位置
let empty;
// X的位移量
let offsetX;
// Y的位移量
let offsetY;
//判斷排列是否一樣
let same = false;
let seconds = 0;
let minute = 0;
//計時器
let timer;
//紀錄的時間
let time;

let num;
//最佳時間的數字
let bestTime = 0;
//最佳時間的文字
let bestTimeText = "";
// 贏遊戲所花的時間
let cost = 0;
//逆序數量
let count = 0;
const title = document.querySelector(".title");
const number = document.getElementsByClassName("number");
const bestTime1 = document.querySelector(".bestTime");
start();
startTimer();

//再玩一次的按鈕
document.querySelector(".again").addEventListener("click", function () {
  document.querySelectorAll(".number").forEach((element) => {
    element.removeAttribute("id");
  });

  start();
  startTimer();

  offsetX = 0;
  offsetY = 0;
  if (same) {
    document.querySelector(".title").textContent = "Number Puzzle";
    document.querySelector(".title").style.color = "black";
    document.querySelector("body").style.backgroundColor = "white";
    document.querySelector(".bestTime").textContent = time;
  }

  document.querySelectorAll(".number").forEach((element) => {
    element.style.transform = "";
    element.removeAttribute("data-offset-x");
    element.removeAttribute("data-offset-y");
  });
});

// 開始計時
function startTimer() {
  clearInterval(timer);
  seconds = 0;
  minute = 0;
  cost = 0;
  timer = setInterval(() => {
    seconds++;
    cost++;

    if (seconds >= 60) {
      seconds = seconds % 60;
      minute++;
    }

    if (minute < 10 && seconds < 10) {
      time = ` 0${minute}:0${seconds} `;
    } else if (minute < 10) {
      time = ` 0${minute}:${seconds} `;
    } else if (seconds < 10) {
      time = ` ${minute}:0${seconds} `;
    } else {
      time = `${minute}:${seconds} `;
    }
    document.querySelector(".time").textContent = time;
  }, 1000);
}

//判斷是否與答案相同
function isSameArray(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      same = false;
      break;
    } else {
      same = true;
    }
  }
  win(same);
}
//是否贏得遊戲
function win(same) {
  if (same) {
    if (bestTime == 0) {
      bestTime = cost;
      bestTimeText = time;
    } else {
      if (bestTime > cost) {
        bestTime = cost;
        bestTimeText = time;
      }
    }
    title.textContent = "🥳 You Win !!";
    title.style.color = "white";
    document.querySelector("body").style.backgroundColor = "#C3D825";
    bestTime1.textContent = bestTimeText;
    document.querySelector(".label-bestTime").classList.remove("first");

    clearInterval(timer);
    removeListner();
  }
}
//開始遊戲隨機排列數字
function start() {
  numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];
  resultArray = [];
  for (let i = 1; i <= numArray.length; i++) {
    num = Math.trunc(Math.random() * 16);

    while (numArray[num] === undefined) {
      num = Math.trunc(Math.random() * 16);
    }
    resultArray.push(numArray[num]);
    delete numArray[num];
  }
  rule(resultArray);
  addNumberAndStyle();
}
//將排列好的數字添加上顏色與樣式
function addNumberAndStyle() {
  for (let i = 0; i < resultArray.length; i++) {
    document.querySelector(`.num${i + 1}`).textContent = resultArray[i];
    document
      .querySelector(`.num${i + 1}`)
      .setAttribute("id", `n${resultArray[i]}`);

    document.querySelector(`.num${i + 1}`).classList.remove("number-even");
    document.querySelector(`.num${i + 1}`).classList.remove("number-odd");
    document.querySelector(`.num${i + 1}`).style.outline = "2px solid black";
    if (resultArray[i] == " ") {
      document.querySelector(`.num${i + 1}`).style.outline = "none";
    } else if (resultArray[i] % 2 == 0) {
      document.querySelector(`.num${i + 1}`).classList.add("number-even");
    } else {
      document.querySelector(`.num${i + 1}`).classList.add("number-odd");
    }
  }

  addListner();
}

//判斷是否有解
function rule(arr) {
  count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == " " || arr[j] == " ") {
        continue;
      } else if (arr[i] > arr[j]) {
        count++;
      }
    }
  }
  // 如果是偶數 空格需要在index 4 5 6 7 / 12 13 14 15
  //  如果是奇數 空格需要在index 0 1 2 3/8 9 10 11
  empty = resultArray.indexOf(" ");
  if (count % 2 == 0) {
    if ((empty >= 4 && empty <= 7) || (empty >= 12 && empty <= 15)) {
      // console.log('ok');
    } else {
      // console.log('No solution');
      start();
    }
  } else {
    if ((empty >= 0 && empty <= 3) || (empty >= 8 && empty <= 11)) {
      // console.log('ok');
    } else {
      // console.log('No solution');
      start();
    }
  }
}
//移除監聽器
function removeListner() {
  for (let i = 0; i < number.length; i++) {
    number[i].removeEventListener("click", moveDown);
    number[i].removeEventListener("click", moveUp);
    number[i].removeEventListener("click", moveRight);
    number[i].removeEventListener("click", moveLeft);
  }
}
//將空格旁邊的格子增加監聽器並且指派可移動方向
function addListner() {
  if (empty >= 4 && empty <= 15) {
    document
      .getElementById(`n${resultArray[empty - 4]}`)
      .addEventListener("click", moveDown);
  }
  if (empty >= 0 && empty <= 11) {
    document
      .getElementById(`n${resultArray[empty + 4]}`)
      .addEventListener("click", moveUp);
  }
  if (empty >= 1 && empty <= 15 && empty % 4 != 0) {
    document
      .getElementById(`n${resultArray[empty - 1]}`)
      .addEventListener("click", moveRight);
  }
  if (empty >= 0 && empty <= 14 && empty % 4 != 3) {
    document
      .getElementById(`n${resultArray[empty + 1]}`)
      .addEventListener("click", moveLeft);
  }
}

//往右移動
function moveRight() {
  offsetX =
    parseFloat(
      document
        .getElementById(`n${resultArray[empty - 1]}`)
        .getAttribute("data-offset-x")
    ) || 0;
  offsetY =
    parseFloat(
      document
        .getElementById(`n${resultArray[empty - 1]}`)
        .getAttribute("data-offset-y")
    ) || 0;
  offsetX += 13.1;
  document.getElementById(
    `n${resultArray[empty - 1]}`
  ).style.transform = `translate(${offsetX}rem,${offsetY}rem)`;
  document
    .getElementById(`n${resultArray[empty - 1]}`)
    .setAttribute("data-offset-x", offsetX);

  removeListner();
  resultArray[empty] = resultArray[empty - 1];
  resultArray[empty - 1] = " ";
  empty = resultArray.indexOf(" ");
  addListner();
  isSameArray(resultArray, anwserArray);
}
//往左移動
function moveLeft() {
  offsetX =
    parseFloat(
      document
        .getElementById(`n${resultArray[empty + 1]}`)
        .getAttribute("data-offset-x")
    ) || 0;
  offsetY =
    parseFloat(
      document
        .getElementById(`n${resultArray[empty + 1]}`)
        .getAttribute("data-offset-y")
    ) || 0;
  offsetX -= 13.1;
  document.getElementById(
    `n${resultArray[empty + 1]}`
  ).style.transform = `translate(${offsetX}rem,${offsetY}rem)`;
  document
    .getElementById(`n${resultArray[empty + 1]}`)
    .setAttribute("data-offset-x", offsetX);

  removeListner();
  resultArray[empty] = resultArray[empty + 1];
  resultArray[empty + 1] = " ";
  empty = resultArray.indexOf(" ");
  addListner();
  isSameArray(resultArray, anwserArray);
}
// 往下移動
function moveDown() {
  offsetX =
    parseFloat(
      document
        .getElementById(`n${resultArray[empty - 4]}`)
        .getAttribute("data-offset-x")
    ) || 0;
  offsetY =
    parseFloat(
      document
        .getElementById(`n${resultArray[empty - 4]}`)
        .getAttribute("data-offset-y")
    ) || 0;

  offsetY += 11.1;
  document.getElementById(
    `n${resultArray[empty - 4]}`
  ).style.transform = `translate(${offsetX}rem,${offsetY}rem)`;
  document
    .getElementById(`n${resultArray[empty - 4]}`)
    .setAttribute("data-offset-y", offsetY);

  removeListner();
  resultArray[empty] = resultArray[empty - 4];
  resultArray[empty - 4] = " ";
  empty = resultArray.indexOf(" ");
  addListner();
  isSameArray(resultArray, anwserArray);
}
// 往上移動
function moveUp() {
  offsetX =
    parseFloat(
      document
        .getElementById(`n${resultArray[empty + 4]}`)
        .getAttribute("data-offset-x")
    ) || 0;
  offsetY =
    parseFloat(
      document
        .getElementById(`n${resultArray[empty + 4]}`)
        .getAttribute("data-offset-y")
    ) || 0;

  offsetY -= 11.1;
  document.getElementById(
    `n${resultArray[empty + 4]}`
  ).style.transform = `translate(${offsetX}rem,${offsetY}rem)`;
  document
    .getElementById(`n${resultArray[empty + 4]}`)
    .setAttribute("data-offset-y", offsetY);

  removeListner();
  resultArray[empty] = resultArray[empty + 4];
  resultArray[empty + 4] = " ";
  empty = resultArray.indexOf(" ");
  addListner();
  isSameArray(resultArray, anwserArray);
}
