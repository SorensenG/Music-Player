const songImage = document.getElementById('img');
const playButon = document.getElementById('play');
const inciailTime = document.getElementById('initial-Time');
const finalTime = document.getElementById('final-Time');
const musicName = document.getElementById('music-name');
const timeBar = document.getElementById('time-bar');
const progressBar = document.getElementById('progress');

let i = 0;
let curretnSong = 0;

const musics = [{
    name: "Travis Scott - CAN'T SAY",
    img: "https://th.bing.com/th/id/OIP.7MNBgMLSlO54IhnRup_20AHaHa?w=564&h=564&rs=1&pid=ImgDetMain",
    url: "Travis Scott - CAN'T SAY.m4a",
},
{
    name: "Matuê - Maria",
    img: "https://images.genius.com/5286e0db639a7ff8a6d2366b121b8784.633x633x1.png",
    url: "Matuê - Maria.m4a",
},
{
    name: "Audioslave - Like a stone",
    img: "https://i.scdn.co/image/ab67616d0000b273a7292b6863258e889b78d787",
    url: "Audioslave - Like a stone (HD).m4a",
}
];

progressBar.style.width = '0%';

function changeTime() {
    timeBar.addEventListener("click", function (event) {
        const posX = event.clientX;
        const offsetX = timeBar.getBoundingClientRect().left;
        const clickPosition = posX - offsetX;
        const barWidth = timeBar.offsetWidth;
        const percentage = (clickPosition / barWidth) * 100;

        progressBar.style.width = percentage + '%';

        const duration = audio.duration;
        const currentTime = (percentage / 100) * duration;

        audio.currentTime = currentTime;

        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        inciailTime.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        console.log(`Posição do clique: ${posX}, Tempo atual: ${currentTime}`);
    });
}

// Função para atualizar a música e os tempos
function updateMusic() {
    musicName.innerHTML = musics[curretnSong].name;
    songImage.src = musics[curretnSong].img;
    audio.src = `songs/${musics[curretnSong].url}`;
    progressBar.style.width = '0%';
    inciailTime.innerHTML = '0:00';
    audio.load();
    if (playButon.classList.contains("fa-pause")) {
        audio.play();
    }
    audio.onloadedmetadata = function () {
        let duration = audio.duration;
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);
        finalTime.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
}

// Atualiza a barra de progresso e o tempo atual enquanto a música toca
function updateProgress() {
    audio.addEventListener('timeupdate', function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;

        const currentTime = audio.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        inciailTime.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    });
}

// Função para trocar para a próxima música
function nextMusic() {
    if (curretnSong < musics.length - 1) {
        curretnSong++;
    } else {
        curretnSong = 0;
    }
    console.log(curretnSong);
    i = 0;
    updateMusic();
}

// Função para voltar para a música anterior
function previusMusic() {
    if (curretnSong > 0) {
        curretnSong--;
    } else {
        curretnSong = 2;
    }
    console.log(curretnSong);
    i = 0;
    updateMusic();
}


// Função para tocar/pausar a música
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
    finalTime.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

//Sempre atualiza tanto a barra quanto a minutagem
updateProgress();
