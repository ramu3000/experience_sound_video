import './style.css';


const wrapper = document.getElementsByClassName("wrapper")[0];
const videoContainer = document.getElementsByClassName("video_container")[0];

const video = document.getElementsByTagName("video")[0];
const button = document.getElementsByTagName("button")[0];

const header = document.getElementsByTagName('header')[0];
const headerText = document.getElementsByTagName('h1')[0];

let flagged = false;


//for touch
button.addEventListener('click', toggleVideoPlay);
wrapper.addEventListener('touchstart',toggleVideoPlay);
wrapper.addEventListener('click', toggleVideoPlay);
//video events
video.addEventListener('loadstart', loadingStart);
video.addEventListener('canplaythrough', isPlayable);

/*
video.addEventListener('canplay', handleEvent);
video.addEventListener('progress', progress);

function progress(){
  console.log('progress')
  //should update percentage
}

function handleEvent(event) {
  const buffered = event.target.buffered;
  if (buffered.length == 1) {
    // only one range
    console.log(buffered.start(0),'-', buffered.end(0), '|', event.target.duration)

    if (buffered.start(0) === 0 && buffered.end(0) === video.duration) {
      // The one range starts at the beginning and ends at
      // the end of the video, so the whole thing is loaded
      console.log('// the end of the video, so the whole thing is loaded')
    }
  }
 
}
*/

//event listeners for animation stop and play
video.addEventListener('play', handleOnPlay);
video.addEventListener('playing', handleOnPlay);
video.addEventListener('pause', handleOnPause);
video.addEventListener('waiting', handleOnPause);

window.screen.orientation.addEventListener('change', function(e) {
	console.log('Current orientation is ' + screen.orientation.type,e.currentTarget.type);
  if(e.currentTarget.type.startsWith('portrait')){
    console.log('pausing');
    onPause()
    reset()
  }
});

function isPlayable(){
  console.log('isPlayable')
  document.getElementById("loader").style.display = 'none';
}
function loadingStart(){
  console.log('loadingStart')
  
}
function handleOnPlay(){
  console.log('handleOnPlay')
 // headerText.style.animationPlayState = "running";
}
function handleOnPause(){
  console.log('paused')
  headerText.style.animationPlayState = "paused";
}
function toggleVideoPlay(event){
  button.style.display = 'none';
  if(flagged) return;
  flagged = true
  video.paused ? onPlay() : onPause();
  setTimeout(() => {
    flagged = false}, 1000)
}
function onPause(){
  video.pause()
}
function reset(){
  video.currentTime = 0;
}
function onPlay(){
  // fullScreenCheck()
  console.log('clicked play');
  header.style.display = 'flex';
  const promise = video.play()
  if (promise !== undefined) {
    promise.then(_ => {
      // Autoplay started!
      headerText.style.animationPlayState = "running";
    }).catch(error => {
      // Autoplay was prevented.
      headerText.style.animationPlayState = "paused";
      // Show a "Play" button so that user can start playback.
      button.style.display = 'block';
      console.error(error)

    });
  }
}
function fullScreenCheck() {
  if (document.fullscreenElement) return;
  return document.documentElement.requestFullscreen();
}
//Start scripts
video.src = 'https://www.dropbox.com/s/y57di8j87c9n64m/Rudi%20Rok%20wide%20coveri5long.mp4?raw=1'