rightWristx = 0;
rightWristy = 0;
const firebaseConfig = {
  apiKey: "AIzaSyDyU_0LzLTVevDnbo7eboUH3cTVJojchDo",
  authDomain: "modifywebsite-8bb97.firebaseapp.com",
  databaseURL: "https://modifywebsite-8bb97-default-rtdb.firebaseio.com",
  projectId: "modifywebsite-8bb97",
  storageBucket: "modifywebsite-8bb97.appspot.com",
  messagingSenderId: "857646078887",
  appId: "1:857646078887:web:6ee958e6788cae3951b482"
};
firebase.initializeApp(firebaseConfig);

if(localStorage.getItem('ModifyID') == undefined){
  window.location = 'index.html';
}
function setup(){

  video = createCapture(VIDEO);
  video.hide();
  var poseNet = ml5.poseNet(video,LoadPoseNet);
  poseNet.on('pose',GotPoses);
}
function LoadPoseNet(){
  console.log('Loaded Pose Net.')
}
// songs array
const songs = [
  {
    path: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/1.mp3',
    displayName: 'Yıldız Tozu',
   // artist: 'Ozbi',
    cover: "https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg",
  },
];

function getData() { console.log('Working'); firebase.database().ref('Modify/'+localStorage.getItem('ModifyID')+'/').child('Music/').on('value', function(snapshot) {snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
  var firebase_message_id = childKey;
  var message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
var songname = message_data['MusicName'];
var songurl = message_data['Url'];

songs.push({
  path: songurl,
  displayName: songname,
 // artist: 'Ozbi',
  cover: 'img.jpg',

},);
//End code
} });  }); 
}
getData();

console.log(songs);

// deafult song index 

let songIndex = 2;

// song default state

let isPlaying = false;

// song pause function

function playSong(){
  isPlaying = true;
  document.getElementById('playpause-btn').classList.replace("fa-play","fa-pause");
  document.getElementById('audio').play();
}

// song play function

function pauseSong(){
  isPlaying = false;
  document.getElementById('playpause-btn').classList.replace("fa-pause","fa-play");
  document.getElementById('audio').pause();
}

// loading songs

function loadSong(song){
    document.getElementById('img').src = song.cover;
    document.getElementById('title').textContent = song.displayName;
    document.getElementById('audio').src = song.path;
};

// previous song 

function prevSong(){
  songIndex--;
  if(songIndex < 0){
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// next song

function nextSong(){
  songIndex++;
  if(songIndex > songs.length-1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
var scoreL;

function GotPoses(results){
  console.log(results);
  if(results.length > 0.5){

      if(results[0].pose.keypoints[9].score > 0.2){
        console.log('True')
        if(isPlaying != false){
          pauseSong();
        }else{
          playSong();
        }
      
          }


  }
}

// progress bar function

function updateProgress(e){
    if (isPlaying) {
      const { duration, currentTime } = e.target;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.value = progressPercent;
      progressLine.style.width = `${progressPercent}%`;
      if(progressPercent==100){
        return nextSong();
      }
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
      }
      // Calculate display for currentTime
      let currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      currTime.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
function updateProgress(e){
  if (isPlaying) {
    const { duration, currentTime } = e.target;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;
    progressLine.style.width = `${progressPercent}%`;
    if(progressPercent==100){
      return nextSong();
    }
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function progressSlide(e){
  const { value } = e.target;
  const progressTime = Math.ceil((document.getElementById('audio').duration / 100) * value);
  document.getElementById('audio').currentTime = progressTime;
  console.log(progressTime);
    if(!isPlaying) {
      document.getElementById('progress-line').style.width = `${value}%`;    
   }
}

function volumeBar(){
  document.getElementById('layer').classList.toggle('hide');
  setTimeout(()=>{
    if(  document.getElementById('layer').classList.contains("hide")){
        document.getElementById('layer').classList.remove("hide");
    }
  }, 5000);
}

function setVolume(){
  document.getElementById('audio').volume = document.getElementById('volumerange').value;
  const barWidth = ( document.getElementById('volumerange').value/1)*100;
  document.getElementById('bar').style.width = `${barWidth}%`;

}

function repeat(){
  document.getElementById('repeat').classList.toggle('color');
  const repeatBtnState =   document.getElementById('repeat').classList.contains("color");
  if(repeatBtnState){
    document.getElementById('audio').loop = true;
    loadSong();
  }else{
    document.getElementById('audio').loop = false;
    loadSong();
  }
  
}

// function like(){
//   likeBtn.classList.toggle('color');
//   if(likeBtn.classList.contains("color")){
//   likeIcon.classList.replace("far","fas");
// }else{
//   likeIcon.classList.replace("fas","far");
// }}

function like() {
  if (document.getElementById('like').classList.toggle('color')) {
    document.getElementById('likeicon').classList.replace('far', 'fas');
  } else {
    document.getElementById('likeicon').classList.replace('fas', 'far');
  }
}

function musicList(){
  songList.classList.toggle("showlist");
  listCloseBtn.addEventListener("click",()=>{
    songList.classList.remove("showlist");
  })
}

function playpause(){
    isPlaying ? pauseSong() : playSong()
}
function prebutton(){
    prevSong()
}
function nextbutton(){
    nextSong()
}
var ImgName, ImgUrl1;
var files = [];
var reader = new FileReader();
function uploadMusic(){
  var input = document.createElement('input');
  input.type ='file'
  input.accept = 'audio';
  input.click();
  input.onchange = e => {
      
    alert('We Got YOur File');
    files = e.target.files;
    var uploadTask = firebase.storage().ref('Modify/'+localStorage.getItem('ModifyID')).child('Music/'+localStorage.getItem('ModifyID')+'/').put(files[0]);
    uploadTask.on('state_changed',function(snapshot){
    
    },function(error){
      alert('Error in saving the music :(');
    },
    function(){
      uploadTask.snapshot.ref.getDownloadURL().then(function(url){
      ImgUrl1 = url;
      console.log(url);
      });
      setTimeout(function(){
        var namess = prompt('Enter The Song Name.')
        console.log(localStorage.getItem('ModifyID'));
        firebase.database().ref('Modify/'+localStorage.getItem('ModifyID')+'/').child('Music').update({
  
        });
        firebase.database().ref('Modify/'+localStorage.getItem('ModifyID')+'/').child('Music').push({
        MusicName : namess,
        Url:ImgUrl1,
        });
        setTimeout(function(){
          alert('Music Added Succesfull');
          window.location = 'MusicPlayer.html';
        },2000)

      },5000);

    }
  );


}; 

}



    //;

   


//likeBtn.addEventListener("click", like);
//songListBtn.addEventListener("click",musicList);