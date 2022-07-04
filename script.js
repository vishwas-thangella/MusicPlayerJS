let songs = [
    {
        name:'Ottilia Bilionare',
        path:'https://pagaliworld.com/files/download/id/3522',
        image:'https://a10.gaanacdn.com/images/albums/56/2609656/crop_480x480_2609656.jpg',
        artist:'ottilia'
    },
    {
        name:"Hey Mama BEBE REXHA",
        path:'https://pagaliworld.com/files/download/id/3501',
        image:"https://www.famemagazine.co.uk/wp-content/uploads/2015/06/BEBE-REXHA4.jpg",
        artist:'bebe rexha'
    },
    {
        name:"Despacito Luis Fonsi",
        path:'https://pagaliworld.com/files/download/id/2059',
        image:'https://trendybeatz.com/images/Luis-Fonsi-Ft-Daddy-Yankee-Despacito-Art.jpg',
        artist:'luis fonsi'
    },
    {
        name:"Love Me like You Do",
        path:"https://pagalworld.com.se/files/download/id/3680",
        image:'https://i.scdn.co/image/ab67616d0000b2735e02f2f639b9008f4d1935d3',
        artist:'ellie goudling'
    },
    {
        name:"Baby Driver",
        path:"https://remixzilla.com/files/download/id/2038&volume=75&showstop=1&showvolume=1",
        image:'https://a10.gaanacdn.com/gn_img/albums/9MAWe97WyJ/MAWeJeqqby/size_l.jpg',
        artist:'baby driver'
    }
]
let updateTimer;



let play = document.getElementById("play");
let index = 0
let songIndex = songs[index].path;
let Domimage = document.getElementById('image');
let image = songs[index].image;
Domimage.setAttribute("src",image)
let title = document.getElementById('trackname');
title.textContent = songs[index].name;
const audio = new Audio(songIndex);
let flag = false
let playPauseSrcImages = ["./assets/play.png","./assets/pause.png"]; 
let volume = document.getElementById("volume");
let previous = document.getElementById("prev");
let next = document.getElementById("next");
let duration;
let durationHolder = document.getElementById('duration');
let current = document.getElementById('current');
let seek_slider = document.getElementById('seek');
let PlayButtons = document.getElementsByClassName('playButton');


play.addEventListener('click',()=>{
    clearInterval(updateTimer);
    resetValues();
    if(flag==false){
        play.setAttribute('src',playPauseSrcImages[1]);
    document.getElementById('song_name').textContent = `Song Name : ${songs[index].name}`;
    document.getElementById('song_duration').textContent = `Song Duration : ${Math.floor(audio.duration/60)}`;
    document.getElementById('song_artist').textContent = `Song Artists : ${songs[index].artist}`;

        flag=true;
        updateTimer = setInterval(seekUpdate, 1000);
        audio.play()
    }else{
        play.setAttribute('src',playPauseSrcImages[0]);
        flag=false
        updateTimer = setInterval(seekUpdate, 1000);
        audio.pause()
        console.log(audio.currentTime);
    }
})
    previous.addEventListener('click',()=>{
    index--;
    flag = true
    console.log(index);
    songIndex = songs[index].path;
    console.log(songIndex);
    clearInterval(updateTimer);
    resetValues();
    audio.pause()
    title.textContent = songs[index].name;
    document.getElementById('song_name').textContent = `Song Name : ${songs[index].name}`;
    document.getElementById('song_duration').textContent = `Song Duration : ${Math.floor(audio.duration/60)}`;
    document.getElementById('song_artist').textContent = `Song Artists : ${songs[index].artist}`;
    updateTimer = setInterval(seekUpdate, 1000);
    audio.src = songIndex;
    image = songs[index].image;
    Domimage.setAttribute("src",image)
    audio.play()
    if(flag==true){
        play.setAttribute('src',playPauseSrcImages[1]);
    }else{
        play.setAttribute('src',playPauseSrcImages[0]);
    }
    
})
next.addEventListener('click',()=>{
    index++;
    flag=true;
    clearInterval(updateTimer);
    resetValues();
    console.log(index);
    songIndex = songs[index].path;
    console.log(songIndex);
    audio.pause()
    title.textContent = songs[index].name;
    document.getElementById('song_name').textContent = `Song Name : ${songs[index].name}`;
    document.getElementById('song_duration').textContent = `Song Duration : ${Math.floor(audio.duration/60)}`;
    document.getElementById('song_artist').textContent = `Song Artists : ${songs[index].artist}`;
    updateTimer = setInterval(seekUpdate, 1000);
    audio.src = songIndex;
    image = songs[index].image;
    Domimage.setAttribute("src",image)
    audio.play()
    if(flag==true){
        play.setAttribute('src',playPauseSrcImages[1]);
    }else{
        play.setAttribute('src',playPauseSrcImages[0]);
    }
})
volume.oninput = () =>{
    audio.volume = volume.value/100;
}


let seekto;
function seekTo() {

    seekto = audio.duration * (seek_slider.value / 100);
    audio.currentTime = seekto;
    }
    
    function seekUpdate() {
    let seekPosition = 0;
    console.log(audio.duration);
    if (!isNaN(audio.duration)) {
        seekPosition = audio.currentTime * (100 / audio.duration);
        seek_slider.value = seekPosition;
    
        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
    
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    
        current.textContent = currentMinutes + ":" + currentSeconds;
        durationHolder.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function resetValues() {
    audio.textContent = "00:00";
    durationHolder.textContent = "00:00";
    seek_slider.value = 0;
} 

for(let i=0;i<PlayButtons.length;i++){
    console.log(PlayButtons[i].id);
    PlayButtons[i].addEventListener('click',(event)=>{
        console.log(event.target.id);
        index = event.target.id
        clearInterval(updateTimer);
        resetValues();
        audio.pause()
        flag = true
        songIndex = songs[index].path;
        updateTimer = setInterval(seekUpdate, 1000);
        console.log(songIndex);
        title.textContent = songs[index].name;
        audio.src = songIndex;  
        document.getElementById('song_name').textContent = `Song Name : ${songs[index].name}`;
        document.getElementById('song_duration').textContent = `Song Duration : ${Math.floor(audio.duration/60)}`;
        document.getElementById('song_artist').textContent = `Song Artists : ${songs[index].artist}`;
        image = songs[index].image;
        Domimage.setAttribute("src",image)
        audio.play()
        if(flag==true){
            play.setAttribute('src',playPauseSrcImages[1]);
        }else{
            play.setAttribute('src',playPauseSrcImages[0]);
        }
    })
}

