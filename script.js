const musicContainer = document.querySelector('.player');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const albumArt = document.getElementById('album-art');

// Songs array with correct file paths
const songs = [
  { name: 'c:\Users\Shaury\Downloads\bensound-sunny.mp3', title: 'Buddy', artist: 'Bensound', img: 'album-art1.jpg' },
  { name: 'c:\Users\Shaury\Downloads\bensound-buddy.mp3', artist: 'Bensound', img: 'album-art2.jpg' },
  { name: 'c:\Users\Shaury\Downloads\bensound-tomorrow.mp3', title: 'Tomorrow', artist: 'Bensound', img: 'album-art3.jpg' }
];

// Retrieve last played song index from localStorage
let songIndex = localStorage.getItem('lastSongIndex') ? parseInt(localStorage.getItem('lastSongIndex')) : 0;

// Load song details
function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = `bensound-buddy.mp3`; // Correct dynamic source
  albumArt.src = song.img;
  
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.innerHTML = '⏸️'; // Update icon to pause
  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.innerHTML = '▶️'; // Update icon to play
  audio.pause();
}

// Toggle play/pause
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});

// Play previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  updateSong();
}

// Play next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  updateSong();
}

// Update song and save index
function updateSong() {
  loadSong(songs[songIndex]);
  playSong();
  localStorage.setItem('lastSongIndex', songIndex); // Save last played song
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (!isNaN(duration)) {
    progress.style.width = `${(currentTime / duration) * 100}%`;
  }
}

// Seek song position
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Load last played song
loadSong(songs[songIndex]);
