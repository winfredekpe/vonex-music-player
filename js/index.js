// grabbing elements from dom

playbtn = document.querySelector(".play");
nextbtn = document.querySelector(".next");
prevbtn = document.querySelector(".prev");
progress = document.querySelector(".line");
about = document.querySelector(".about");
thumbnail = document.querySelector(".thumbnail");
lthumbnail = document.querySelector("#lthumbnail");
ltop = document.querySelector("#ltop");
songslist = document.querySelector("#songslist");

//  adding event listeners
playbtn.addEventListener("click", play);
nextbtn.addEventListener("click", forward);
prevbtn.addEventListener("click", back);

//  variable and utils

let songs = [
  "music/Tini-case.mp3",
  "music/Tini-billonaire.mp3",
  "music/3.mp3",
  "music/4.mp3",
  "music/5.mp3",
  "music/6.mp3",
  "music/7.mp3",
  "music/8.mp3",
  "music/9.mp3",
  "music/10.mp3",
];
let thumb = [
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
  "img/9.jpg",
  "img/10.jpg",
];
var source = 0;
var audio = new Audio();
audio.src = songs[source];
oldid = "";
newid = "";

//  functions

// code for play and pause

function play(lbtn, id) {
  newid = id;
  if (audio.src && oldid === newid) {
    if (audio.paused) {
      audio.play();
      playbtn.firstElementChild.classList.remove("fa-play-circle");
      playbtn.firstElementChild.classList.add("fa-pause-circle");
      // changing  icon for the left play button
      lbtn.children[0].classList.remove("fa-play-circle");
      lbtn.children[0].classList.add("fa-pause-circle");
    } else {
      audio.pause();
      playbtn.firstElementChild.classList.remove("fa-pause-circle");
      playbtn.firstElementChild.classList.add("fa-play-circle");
      // changing  icon for the left play button
      lbtn.children[0].classList.remove("fa-pause-circle");
      lbtn.children[0].classList.add("fa-play-circle");
      console.log("yes");
    }
  } else {
    oldid = id;
    audio.src = songs[source];
    audio.play();
    playbtn.firstElementChild.classList.remove("fa-play-circle");
    playbtn.firstElementChild.classList.add("fa-pause-circle");
    // changing  icon for the left play button
    lbtn.children[0].classList.remove("fa-play-circle");
    lbtn.children[0].classList.add("fa-pause-circle");
    displayname();
    updatethumb();
    console.log("no");
    lbtn = document.querySelectorAll("#lbtn");
    lbtn.forEach((x) => {
      cid = x.dataset.source;
      if (cid === newid) {
      } else {
        x.children[0].classList.remove("fa-pause-circle");
        x.children[0].classList.add("fa-play-circle");
      }
    });
  }
}

// code for forwarding

function forward() {
  if (source > songs.length) {
    source = 0;
    audio.src = songs[source];
    audio.play();
  } else if (source === songs.length - 1) {
    source = 0;
    audio.src = songs[source];
    audio.play();
  } else {
    source++;
    audio.src = songs[source];
    audio.play();
  }
  displayname();
  updatethumb();
  playbtn.firstElementChild.classList.remove("fa-play-circle");
  playbtn.firstElementChild.classList.add("fa-pause-circle");
}

// displaying audio name

function displayname() {
  abouttext = songs[source].toString().slice(6);
  about.innerText = abouttext;
}

displayname();

// updating song thumbnail

function updatethumb() {
  thumbnail.style.background = `url(${thumb[source]})`;
  thumbnail.style.backgroundSize = "cover";
  thumbnail.style.backgroundPosition = "center";
  thumbnail.style.filter = `brightness(0.785)`;
  lthumbnail.src = thumb[source];
  lthumbnail.style.filter = `brightness(0.785)`;
}
updatethumb();

// code for reverseing

function back() {
  if (source < 0) {
    source = songs.length;
    audio.src = songs[source];
    audio.play();
  } else if (source === 0) {
    source = songs.length - 1;
    audio.src = songs[source];
    audio.play();
  } else {
    source--;
    audio.src = songs[source];
    audio.play();
  }
  displayname();
  updatethumb();
  playbtn.firstElementChild.classList.remove("fa-play-circle");
  playbtn.firstElementChild.classList.add("fa-pause-circle");
}

// updateing progress bar length

let barlength = 0;

function progressupdate() {
  time = audio.currentTime;
  len = audio.duration;
  tomove = (320 / len) * time;
  progress.style.width = `${barlength}px`;
  barlength = tomove;
}

// setting timinterval to update bar lenght periodically

barupdating = setInterval((x) => {
  progressupdate();
}, 100);

// left side playing codes [it is a ctually rightside a little typo]
// lopping to ceate the music elements

for (let i = 0; i < songs.length; i++) {
  source = i;
  songslist.innerHTML += "";
  // creating the element
  songinner = `   <div class="song">
  <div class="left">
    <h3>${songs[source].toString().slice(6)}</h3>
    <h5>Song ${i} in list of songs</h5>
  </div>
  <div class="right">
    <div class="btn" id="lbtn" data-source =' ${i}'>
      <i class="fas fa-play gl" style = 'pointer-events:none'></i>
    </div>
  </div>
</div>`;

  songslist.innerHTML += songinner;
  // adding event listener to newly created songs in song list
  lbtn = document.querySelectorAll("#lbtn");
  lbtn.forEach((x) => {
    x.addEventListener("click", function () {
      source = Number(x.dataset.source);
      id = x.dataset.source;
      // setting audio souce
      play(x, id);
    });
  });
}
