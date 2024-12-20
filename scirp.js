const songImage = document.getElementById('img');
const playButon = document.getElementById('play');
let i =0


function playSong(){
    if(playButon.classList.contains("fa-play")){
        playButon.classList.remove("fa-play");
        playButon.classList.add("fa-pause");
        interval = requestAnimationFrame(function rotate() {
            i++;
            songImage.style.transform = `translate(0%, 10%) rotate(${i / 20}deg)`;
            interval = requestAnimationFrame(rotate); 
        });
    } else {
        playButon.classList.remove("fa-pause");
        playButon.classList.add("fa-play");
        cancelAnimationFrame(interval);
        
    }
}


