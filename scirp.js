const songImage = document.getElementById('img');
const playButon = document.getElementById('play');
const finalTime = document.getElementById('final-Time');
const musicName = document.getElementById('music-name');
const timeBar = document.getElementById('time-bar');
const progress = document.createElement('div');
timeBar.appendChild(progress);

let i = 0;
let curretnSong = 0;

const musics = [{
    name: "Audioslave - Like a stone",
    img: "https://i.scdn.co/image/ab67616d0000b273a7292b6863258e889b78d787",
    url: "Audioslave - Like a stone (HD).m4a",
},
{
    name: "Travis Scott - CAN'T SAY",
    img: "https://th.bing.com/th/id/OIP.7MNBgMLSlO54IhnRup_20AHaHa?w=564&h=564&rs=1&pid=ImgDetMain",
    url: "Travis Scott - CAN'T SAY.m4a",
},
{
    name: "Matuê - Maria",
    img: "https://images.genius.com/5286e0db639a7ff8a6d2366b121b8784.633x633x1.png",
    url: "Matuê - Maria.m4a",
},
]




function updateMusic() {
    musicName.innerHTML = musics[curretnSong].name;
    songImage.src = musics[curretnSong].img;
    audio.src = `songs/${musics[curretnSong].url}`;
    audio.load();
    if (playButon.classList.contains("fa-pause")) {
        audio.play()
        audio.onloadedmetadata = function () {
            let duration = audio.duration;
            let minutes = Math.floor(duration / 60);
            let seconds = Math.floor(duration % 60);
            finalTime.innerHTML = (`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
        };
    }
}

function nextMusic() {
    if (curretnSong < musics.length - 1) {
        curretnSong++;
    } else {
        curretnSong = 0;
    }
    console.log(curretnSong);
    i = 0;
    updateMusic()
}

function previusMusic() {
    if (curretnSong > 0) {
        curretnSong--;
    } else {
        curretnSong = 2;
    }
    console.log(curretnSong);
    i = 0;
    updateMusic()
}

function playSong() {
    if (playButon.classList.contains("fa-play")) {
        playButon.classList.remove("fa-play");
        playButon.classList.add("fa-pause");

        audio.play();

        interval = requestAnimationFrame(function rotate() {
            i++;
            songImage.style.transform = `translate(0%, 19%) rotate(${i / 20}deg)`;
            interval = requestAnimationFrame(rotate);
        });
    } else {
        playButon.classList.remove("fa-pause");
        playButon.classList.add("fa-play");
        cancelAnimationFrame(interval);
        audio.pause();
    }
}


musicName.innerHTML = musics[curretnSong].name;
songImage.src = musics[curretnSong].img;
let audio = new Audio(`songs/${musics[curretnSong].url}`);
audio.onloadedmetadata = function () {
    let duration = audio.duration;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    finalTime.innerHTML = (`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
};


