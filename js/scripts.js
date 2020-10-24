

let logo = document.getElementById("logo");
let tinyLogo = document.getElementById("tinyLogo");
let darkMode = document.getElementById("darkModeBtn");
let footer = document.getElementById("footer");
let search = document.getElementById("search");
let artists = [];
const urlAPI = `https://fsjs-public-api-backup.herokuapp.com/api`;
const randomDiv = document.querySelector(".randomDiv");
let current = document.getElementById("current");
let duration = document.getElementById("duration");
let current2 = document.getElementById("current2");
let duration2 = document.getElementById("duration2");

const thumbnail = document.querySelector('#thumbnail'); // album cover 
const song = document.querySelector('#song'); // audio object

const songArtist = document.querySelector('.song-artist'); // element where track artist appears
const songTitle = document.querySelector('.song-title'); // element where track title appears
const songOriginal = document.querySelector('.song-original'); // element where original track artist appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
let pPause = document.querySelector('#play-pause'); // element where play and pause image appears
let createdName = document.getElementById("createdName");
let createdGenre = document.getElementById("createdGenre");

let container1 = document.getElementById("show1");
let container2 = document.getElementById("show2");
let container3 = document.getElementById("show3");
let container4 = document.getElementById("show4");

let close1 = document.getElementById("close1");
let close2 = document.getElementById("close2");

let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
const time1 = document.getElementById("songTime1")
const time2 = document.getElementById("songTime2")

let musicContainer1 = document.getElementById("musicContainer1");
let musicContainer2 = document.getElementById("musicContainer2");



//        The fetch
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayArtists)
    .catch(err => console.log(err))

    function displayArtists(artistsData) {
        let artists = artistsData;
        let artistsHTML = '';
    
        let music = ["Rock", "Metal", "Rap", "Hip-Hop", "Pop", "Swing", "A capella", "Soul", "Classical", "Jazz", "EDM", "Techno"]
        let random = Math.floor((Math.random() * music.length));
        let final = music[random];
        
    
        //     Creates Random Genre of Music
        
        function genre(){
            let randomGenre = Array.from(document.querySelectorAll('.random-genre'));
            for (i = 0; i < randomGenre.length; i++) {
                let musicIndex = Math.floor((Math.random() * music.length));
                let genre = music[musicIndex];
                randomGenre[i].innerHTML = genre;
            }
        }
        
        artists.forEach((artist, index) => {
            let name = artist.name;
            let city = artist.location.city;
            let state = artist.location.state;
            let picture = artist.picture;
    
         
            //      Creates the HTML Container
    
            artistsHTML += `
                <div class="randomContainer" data-index="${index}">
                    <div class="randomArtistInfo">
                        <div class="randomArtistHold">
                            <a href="#" class="name" id="createdName">${name.first} ${name.last}</a>
                            <h6>${city}, ${state}</h6>
                            <a href="#" class="random-genre" id="createdGenre">--ehhh--</a>
                        </div>
                    </div>
                    <div class="containerRandomImg">
                        <img src="${picture.large}" class="roundImg">
                    </div>
                </div>
            `           
            
        });
        randomDiv.innerHTML = artistsHTML;
        genre();
    }

    //      Click to open 

    container1.addEventListener("click", ()=> {
        card1.className = "show";
    })
    container2.addEventListener("click", ()=> {
        card2.className = "show";
    })

//      Close buttons


    close1.addEventListener("click", ()=> {
        card1.className = "hide";
    })
    close2.addEventListener("click", ()=> {
        card2.className = "hide";
    })




    //     Audio player Functionality

    songIndex = 0;
    songs = ['audio/chopsuey.mp3', 'audio/heathens.mp3']; // object storing paths for audio objects
    thumbnails = ['img/hudson.jpg', 'img/davidson.jpg']; // object storing paths for album covers
    songArtists = ['Sam Hudson', 'Zak Davidson']; // object storing track artists
    songTitles = ["Chop Suey", "Heathens"]; // object storing track titles
    songOriginals = ["System Of A Down", "21 Pilots"]; // object storing original artists
    

    // Functions for New For You
    // function where pp (play-pause) element changes based on playing boolean value - if play button clicked, change pp.src to pause button and call song.play() and vice versa.
    let playing = true;
    function playPause() {
        if (playing) {
            const song = document.querySelector('#song'),
            thumbnail = document.querySelector('#thumbnail');
    
            pPause.src = "img/pause.png"
            thumbnail.style.transform = "scale(1.15)";
            
            song.play();
            playing = false;
        } else {
            pPause.src = "img/play.png"
            thumbnail.style.transform = "scale(1)"
            
            song.pause();
            playing = true;
        }
    }
    
    // automatically play the next song at the end of the audio object's duration
    song.addEventListener('ended', function(){
        nextSong();
    });
    
    // function where songIndex is incremented, song/thumbnail image/song artist/song title changes to next index value, and playPause() runs to play next track 
    function nextSong() {
        songIndex++;
        if (songIndex > 1) {
            songIndex = 0;
        };
        song.src = songs[songIndex];
        thumbnail.src = thumbnails[songIndex];
    
        songArtist.innerHTML = songArtists[songIndex];
        songTitle.innerHTML = songTitles[songIndex];
        songOriginal.innerHTML = songOriginals[songIndex];
    
        playing = true;
        playPause();
    }
    
    // function where songIndex is decremented, song/thumbnail image/song artist/song title changes to previous index value, and playPause() runs to play previous track 
    function previousSong() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = 1;
        };
        song.src = songs[songIndex];
        thumbnail.src = thumbnails[songIndex];
    
        songArtist.innerHTML = songArtists[songIndex];
        songTitle.innerHTML = songTitles[songIndex];
        songOriginal.innerHTML = songOriginals[songIndex];
    
        playing = true;
        playPause();
    }
    
    // update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
    function updateProgressValue() {
        progressBar.max = song.duration;
        progressBar.value = song.currentTime;
        document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
        if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
            document.querySelector('.durationTime').innerHTML = "0:00";
        } else {
            document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
        }
    };
    
    // convert song.currentTime and song.duration into MM:SS format
    function formatTime(seconds) {
        let min = Math.floor((seconds / 60));
        let sec = Math.floor(seconds - (min * 60));
        if (sec < 10){ 
            sec  = `0${sec}`;
        };
        return `${min}:${sec}`;
    };
    
    // run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
    setInterval(updateProgressValue, 500);
    
    // function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
    function changeProgressBar() {
        song.currentTime = progressBar.value;
    };




// Dark Mode


function myFunction() {
    let body = document.body;
    body.classList.toggle("white");
    container1.classList.toggle("offwhite");
    container2.classList.toggle("offwhite");
    container3.classList.toggle("offwhite");
    container4.classList.toggle("offwhite");
    time1.classList.toggle("white");
    time2.classList.toggle("white");
    search.classList.toggle("white");
    logo.classList.toggle("whiteLogo");
    tinyLogo.classList.toggle("whiteLogo");
    footer.classList.toggle("borderSwitch")
    musicContainer1.classList.toggle("whiteBG");
    musicContainer2.classList.toggle("whiteBG");
    songArtist.classList.toggle("orange");
    songOriginal.classList.toggle("whiteBG2");
    songTitle.classList.toggle("whiteBG2");
    current.classList.toggle("whiteBG2");
    duration.classList.toggle("whiteBG2");
    current2.classList.toggle("whiteBG2");
    time1.classList.toggle("whiteBG2");
    time2.classList.toggle("whiteBG2");


    if (darkMode.innerHTML === "Light Mode") {
    darkMode.innerHTML = "Dark Mode";
    } else {
        darkMode.innerHTML = "Light Mode"
    }

    var randomContainer = document.getElementsByClassName("randomContainer");
    var i;
    for (i = 0; i < randomContainer.length; i++) {
    randomContainer[i].classList.toggle("offwhite");
}
  }