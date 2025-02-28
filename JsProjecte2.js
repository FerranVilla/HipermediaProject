let audio, videoclip, lyrics;
let temaActual;
window.onload = function () {
    dadesLocalStorge = JSON.parse(localStorage.getItem('tempsActualsTemes'));
    if (dadesLocalStorge == null){
        dadesLocalStorge = [0,0,0,0,0,0];
    }
    createStruct();
    let butonchange = document.getElementById('button');
    let play = document.getElementById('play');
    let pause = document.getElementById('pause');
    let toggleBtn = document.getElementById("toggleVideos");
    butonchange.addEventListener('click', function(){
        if (butonchange.innerHTML == "Lyrics"){
            butonchange.innerHTML = "Videoclip";
        } else if (butonchange.innerHTML == "Videoclip"){
            butonchange.innerHTML = "Lyrics";
        }
    });
    play.addEventListener('click', function(){
        if (audio.paused && audio.currentTime >= canciones[temaActual].segon_inici*100){
            audio.play();
            videoclip.play();
            lyrics.play();
            pause.innerHTML = "Pause";
            videoclip.muted = true;
            lyrics.muted = true;
        }else if (audio.paused && audio.currentTime<= canciones[temaActual].segon_inici*100){
            audio.currentTime = canciones[temaActual].segon_inici * 100;
            videoclip.currentTime = audio.currentTime;
            lyrics.currentTime = 0;
            videoclip.muted = true;
            lyrics.muted = true;
            pause.innerHTML = "Pause";
            audio.play();
            videoclip.play();
            lyrics.play();
            console.log(audio.currentTime);
            
        }
    });
    pause.addEventListener('click', function(){
        if (!audio.paused ){
            audio.pause();
            videoclip.pause();
            lyrics.pause();
        }
    });
    audio.addEventListener('seeked', function() {
        dadesLocalStorge[temaActual] = audio.currentTime;
        localStorage.setItem('tempsActualsTemes', JSON.stringify(dadesLocalStorge));
        videoclip.currentTime = audio.currentTime;
        lyrics.currentTime = audio.currentTime-canciones[temaActual].segon_inici*100;
    });
    audio.addEventListener('timeupdate', function() {
        dadesLocalStorge[temaActual] = audio.currentTime;
        localStorage.setItem('tempsActualsTemes', JSON.stringify(dadesLocalStorge));
    });
    videoclip.classList.add("video-gran");
    lyrics.classList.add("video-petit");
    
    toggleBtn.addEventListener("click", function () {
        videoclip.classList.toggle("video-gran");
        videoclip.classList.toggle("video-petit");

        lyrics.classList.toggle("video-gran");
        lyrics.classList.toggle("video-petit");
    });

};

function createStruct(){
    const urlParams = new URLSearchParams(window.location.search);

    temaActual = urlParams.get('quinTema');
    console.log(temaActual);

    audio = document.getElementById('audio');
    videoclip = document.getElementById('videoclip');
    lyrics = document.getElementById('lyrics');
    audio.src = canciones[temaActual].audio;
    videoclip.src = canciones[temaActual].videoclip;
    lyrics.src = canciones[temaActual].lyrics;

    if (dadesLocalStorge[temaActual]>0){
        audio.currentTime = dadesLocalStorge[temaActual];
        videoclip.currentTime = dadesLocalStorge[temaActual];
    } else {
    audio.currentTime = canciones[temaActual].segon_inici;
    videoclip.currentTime = canciones[temaActual].segon_inici;
    }

}
 