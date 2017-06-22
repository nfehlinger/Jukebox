function Jukebox(){
	var that = this
	  , currentSong;
	this.tracks = [];
	this.currentTrack = 0;
	this.newSongIndex = 0;
	this.audio;
	this.artist;
	this.title;
	this.play;
	this.pause;
	this.forward;
	this.stop;
	this.listItem;

};

SC.initialize({
  	client_id: 'fd4e76fc67798bfa742089ed619084a6',
  	redirect_uri: 'http://example.com/callback'
});

Jukebox.prototype.addSong = function(song){
	 if(song instanceof Song){
    	this.tracks.push(song);
    	document.getElementById("list").innerHTML += "<li class='playlist' id='" + this.newSongIndex + "'>" + song.title + " - " + song.artist + "</li>";
    	this.newSongIndex ++;
    }else{
    	return false;
    };
};

Jukebox.prototype.playSong = function(){
	currentSong = this.tracks[this.currentTrack];
	this.audio.src = currentSong.file;
	this.title.innerText = currentSong.title;
	this.artist.innerText =  currentSong.artist;
	this.audio.play();
};

function Song(file, title, artist){
	this.file = file;
	this.title = title;
	this.artist = artist;
}

Jukebox.prototype.build = function(el, options){
	var that=this
	el.innerHTML = `
	<h1>${options.name}</h1>
	<div class="wrapper">
	<audio src="audio/JukeboxHero.mp3" id="audio"></audio>
	<div id="tit"><p class = "title"></p></div>
	<div class = "artist"></div>
	<i class="icon-rewind-outline" id="back"></i>
	<i class="icon-play-outline" id="play"></i>
	<i class="icon-pause-outline" id="pause"></i>
	<i class="icon-fast-fw-outline" id="forward"></i>
	<i class="icon-stop-outline" id="stop"></i>
	<i class="icon-shuffle" id="shuffle"></i>
	<div id="slider"></div>
	<div>
		<p id="tab">Playlist</p>
		<div id="listwrap">
			<ol id="list"></ol>
			<p id = "hide">Hide</p>
		</div>
	</div>
	<div>
	<form id="search">
		<input name="search" placeholder="Ex: OK Go"></input>
		<input type="submit" value="Search"></input>
	</form>
	</div>
	`;

	this.audio = el.querySelector("audio");
	this.title = el.querySelector(".title");
	this.artist = el.querySelector(".artist");
	var back = el.querySelector("#back"),
		play = el.querySelector("#play"),
		pause = el.querySelector("#pause"),
		forward = el.querySelector("#forward"),
		stop = el.querySelector("#stop"),
		shuffle = el.querySelector("#shuffle"),
		slider = el.querySelector("#slider");

	noUiSlider.create(slider, {
		start: .8,
		connect: true,
		range: {
			'min': 0,
			'max': 1
		}
	});

	back.addEventListener("click", function(){
		if(that.currentTrack>=1){
		that.currentTrack = (that.currentTrack - 1);
		that.playSong();
		}if(that.currentTrack == 0){
			that.currentTrack = (that.tracks.length)
		};
	});
	play.addEventListener("click", function(){
		that.audio.play();
	});
	pause.addEventListener("click", function(){
		that.audio.pause();
	});
	forward.addEventListener("click", function(){
		that.currentTrack = (that.currentTrack + 1) % that.tracks.length;
		that.playSong();
		console.log(that.currentTrack);
	});
	stop.addEventListener("click", function(){
		that.audio.pause();
		that.audio.currentTime = 0;
	});
	shuffle.addEventListener("click", function(){
		that.currentTrack = parseInt(Math.random()*that.tracks.length);
		that.playSong();
	});
	slider.noUiSlider.on('slide', function(){
		audio.volume = parseFloat(slider.noUiSlider.get());
	});
	audio.addEventListener("ended", function(){
		that.currentTrack = (that.currentTrack + 1) % that.tracks.length;
		that.playSong();
	});
	window.onkeydown = function(event){
		if(event.which == 39){
			that.currentTrack = (that.currentTrack + 1) % that.tracks.length;
			that.playSong();
		}
		else if(event.which == 37){
			if(that.currentTrack>=1){
			that.currentTrack = (that.currentTrack - 1);
			that.playSong();
			}if(that.currentTrack == 0){
				that.currentTrack = (that.tracks.length)
			}
		}
    };
    $("#tab").click(function(){
    	$("#listwrap").slideDown(1000);
	});
    $("#hide").click(function(){
    	$("#listwrap").slideUp(1000);
	});

 //    $("#search").submit(function(event){
	// 	$("#results").html('');
	// 	event.preventDefault();
	// 	var term = $("#search input[name=search]").val();

	// 	SC.get('/tracks',{
	// 		q: term
	// 	}).then(function(response){
	// 		console.log(response);
	// 		response.results.forEach(function(result, index){

	// 			var resultTemplate =`		
	// 				<article class="result">
	// 					<div class="albumArt" style="background-image: url("${result.artwork_url}")"></div>
	// 					<div class="track">${result.title}</div>
	// 				</article>
	// 				`;		
	// 			// console.log(index+1,result)
	// 			console.log(index+1, result.title);
	// 			$("#results").append(resultTemplate);	
	// 		});
	// 	});
	// });
};

var player;

document.addEventListener("DOMContentLoaded", function(){

	player = new Jukebox;
	player.build(document.getElementById("jukebox"),{name: "Jukebox Hero"});
	player.addSong(new Song("audio/JukeboxHero.mp3","Jukebox Hero","Foreigner"));
	player.addSong(new Song("audio/RuffRydersAnthem.mp3","Ruff Ryder's Anthem","DMX"));
	player.addSong(new Song("audio/DoYouBelieve.mp3","Do You Believe (In Life After Love)","Cher"));
	player.addSong(new Song("audio/StacysMom.mp3","Stacy's Mom","Fountains Of Wayne"));
	player.addSong(new Song("audio/HitEmHigh.mp3","Hit Em High","B-Real, Coolio, Method Man, LL Cool J, and Busta Rhymes"));
	player.addSong(new Song("audio/Graduation.mp3","Graduation (Friends Forever)", "Vitamin C"));
	player.addSong(new Song("audio/99Hast.mp3","99 Hast","Nena ft. Rammstein"));
	player.addSong(new Song("audio/JustAFriend.mp3","Just A Friend","Biz Markie"));
	player.addSong(new Song("audio/WhoLetTheDogsOut.mp3","Who Let The Dogs Out","Baha Men"));
	player.addSong(new Song("audio/ByeByeBye.mp3","Bye Bye Bye", "N*Sync"))
	player.playSong();
	// for(i=0; i<player.tracks.length ; i++){
	// 	var listItem = document.getElementsByTagName("li")[i];
	// 	listItem.addEventListener("click", function(){
	// 		this.currentTrack = this.getAttribute("id");
	// 		player.audio.src = currentSong.file;
	// 		player.title.innerText = currentSong.title;
	// 		player.artist.innerText =  currentSong.artist;
	// 		player.audio.play();
	// 	});
	// };
	for(i=0; i<player.tracks.length ; i++){
		var listItem = document.getElementsByTagName("li")[i];
		listItem.addEventListener("click", function(){
			currentSong = player.tracks[this.getAttribute("id")];
			player.currentTrack = parseInt(this.getAttribute("id"));
			player.audio.src = currentSong.file;
			player.title.innerText = currentSong.title;
			player.artist.innerText =  currentSong.artist;
			player.audio.play();
		});
	};
	$("#search").submit(function(event){
		$("#results").html('');
		event.preventDefault();
		var term = $("#search input[name=search]").val();

		SC.get('/tracks',{
			q: term
		}).then(function(response){
			console.log(response);
			response.forEach(function(tracks, index){

				var resultTemplate =`		
					<article class="tracks">
						<div class="albumArt" style="background-image: url(${tracks.artwork_url});"></div>
						<div class="track">${tracks.title}</div>
					</article>
					`;		
				// console.log(index+1,result)
				console.log(index+1, tracks.title);
				$("#results").append(resultTemplate);	
			});
		});
	});
});
