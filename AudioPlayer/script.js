
const player = document.querySelector('.player'),
	  playBtn = document.querySelector('.play'),
	  prevBtn = document.querySelector('.prev'),
	  nextBtn = document.querySelector('.next'),
	  audio = document.querySelector('.audio'),
	  progressBar = document.querySelector('.progress_bar'),
	  progress = document.querySelector('.progress'),
	  coverImg = document.querySelector('.coverImg'),
	  imgSrc = document.querySelector('.imgp'),
	  title = document.querySelector('.song'),
	  smallbody = document.querySelector('.smallbody'),
	  timeCurrent = document.querySelector('.timeCurrent'),
	  timeDuration = document.querySelector('.timeDuration')


const songs = ['LEMONADE', 'DontStartNow'];
const autors = [' - Beyonce', ' - Dua Lipa'];

let songIndex = 0;

function loadSongs(song) {
	let whatAutor = autors[songIndex];
	let whatSong = song;
	smallbody.style.backgroundImage = 'url("cover' + (songIndex + 1) + '.png")';
	title.innerHTML = whatSong + whatAutor;
	audio.src = `${song}.mp3`;
	coverImg.src = `cover${songIndex + 1}.png`;
	if(songIndex == 0){
		timeDuration.innerHTML = '3:53';
	} else {
		timeDuration.innerHTML = '3:23';
	}
}

loadSongs(songs[songIndex])

function playSong(){
	player.classList.add('play');
	audio.play();
	imgSrc.src = 'pause.png'
}

function pauseSong(){
	player.classList.remove('play');
	audio.pause();
	imgSrc.src = "play.png"
}

playBtn.addEventListener('click', () => {
	const playing = player.classList.contains('play');
	if (playing) {
		pauseSong();
	} else {
		playSong();
	}
})

function nextSong(){
	songIndex++

	if (songIndex > songs.length-1 ){
		songIndex = 0;
	}
	loadSongs(songs[songIndex]);
	playSong();
}

nextBtn.addEventListener('click', nextSong);

function prevSong(){
	songIndex--
	if ( songIndex < 0 ){
		songIndex = songs.length - 1;
	}
	loadSongs(songs[songIndex]);
	playSong();
}

prevBtn.addEventListener('click', prevSong);
function updateTimePlay(e){
	const {duration, currentTime} = e.srcElement;
	const progressPercent = (currentTime / duration ) * 100;
	progress.style.width = `${progressPercent}%`;

	const minutes = Math.floor(currentTime / 60);
	const seconds = Math.floor(currentTime % 60);
	// const durationMinuts = Math.floor(duration / 60);
	// const durationSeconds = Math.floor(duration % 60);
	// const durationTime = `${durationMinuts}:${durationSeconds}`;
	const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	// timeDuration.innerHTML = durationTime;
	timeCurrent.innerHTML = formattedTime;

}
audio.addEventListener('timeupdate', updateTimePlay);

function setProgress(e){
	const width = this.clientWidth;
	const click = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (click / width) * duration;
}
progressBar.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);