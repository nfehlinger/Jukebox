var audio
  , play
  , pause
  , fastforward
  , stop
  , sources
  , currentSource
  , slider
  ;

document.addEventListener("DOMContentLoaded", function(){

	audio = document.querySelector("audio");
	play = document.getElementById("play");
	pause = document.getElementById("pause");
	fastforward = document.getElementById("fastforward");
	stop = document.getElementById("stop");
	sources = ["audio/JukeboxHero.mp3","audio/RuffRydersAnthemInstrumental.mp3","audio/DoYouBelieve.mp3","audio/StacysMom.mp3"];
	currentSource = 0;
	slider = document.getElementById('slider');

	function playNext(){
		currentSource = (currentSource+1) % sources.length ; 
		audio.src=sources[currentSource];
		audio.play();
	};

	noUiSlider.create(slider, {
		start: 80,
		connect: true,
		range: {
			'min': 0,
			'max': 1
		}
	});

	play.addEventListener("click", function(){
		audio.play();
	});
	pause.addEventListener("click", function(){
		audio.pause();
	});

	fastforward.addEventListener("click", playNext);

	audio.addEventListener("ended", playNext);

	stop.addEventListener("click", function(){
		audio.pause();
		audio.currentTime=0;
	});

	slider.noUiSlider.on('slide', function(){
		audio.volume = parseFloat(slider.noUiSlider.get());
	});
	
	
});