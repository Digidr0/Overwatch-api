let player = ""; //LILBUB Digidro AwestrickeN YungHassle
let tag = ""; //21364 2108 2574 2737
let region = "ru";
let platform = "pc";

let delaytimer;

const proxy = "https://api.allorigins.win/raw?url=";
let link = () => {
  return `https://best-overwatch-api.herokuapp.com/player/${platform}/${region}/${player}-${tag}`;
};

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
const bg = document.querySelector(".bg");
const search = document.querySelector(".searching");
const username = document.querySelector(".username");
const tagText = document.querySelector(".tag");

const portrait = document.querySelector(".portrait");
const frame = document.querySelector(".frame");
const stars = document.querySelector(".stars");

const level = document.querySelector(".level");
const totalTime = document.querySelector(".total-time");

const qWon = document.querySelector(".quickplay.won");
const qPlayed = document.querySelector(".quickplay.played");
const qKd = document.querySelector(".quickplay.kd");
const cPlayed = document.querySelector(".competitive.played");
const cWon = document.querySelector(".competitive.won");
const cLost = document.querySelector(".competitive.lost");
const cDraw = document.querySelector(".competitive.draw");
const cKd = document.querySelector(".competitive.kd");

function createDom() {
  let API = fetch(proxy + link())
    .then((res) => res.json())
    .then(function (data) {
      if (isEmpty(data)) {
        search.classList.remove("none");
        search.classList.add("animate");
      } else {
        search.classList.add("none");
        search.classList.remove("animate");
        console.log(data);
      }

      qWon.textContent = data.games.quickplay.won;
      qPlayed.textContent = data.games.quickplay.played;
      qKd.textContent = (
        data.games.quickplay.played / data.games.quickplay.won
      ).toFixed(2);
      cPlayed.textContent = data.games.competitive.played;
      cWon.textContent = data.games.competitive.won;
      cLost.textContent = data.games.competitive.lost;
      cDraw.textContent = data.games.competitive.draw;
      cKd.textContent = (
        data.games.competitive.won / data.games.competitive.lost
      ).toFixed(2);

      username.textContent = data.username;
      tagText.textContent = "#" + tag;
      level.textContent = `Level: ${data.level}`;
      totalTime.textContent = `Total play time:
      ${
        parseInt(data.playtime.quickplay.split(":")[0]) +
        parseInt(data.playtime.competitive.split(":")[0])
      } hours`;

      bg.src = data.portrait;
      portrait.src = data.portrait;
      frame.src = data.levelFrame;
      frame.classList.remove("none");
      stars.src = data.star;
      stars.classList.remove("none");
    });
}

username.onkeyup = function () {
  player = username.value;

  clearTimeout(delaytimer);
  delaytimer = setTimeout(function () {
    console.log(player);
    createDom();
  }, 1000);
};

tagText.onkeyup = function () {
  tag = tagText.value;

  clearTimeout(delaytimer);
  delaytimer = setTimeout(function () {
    console.log(tag);
    createDom();
  }, 1000);
};
