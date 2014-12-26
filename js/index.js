$(document).ready(function() {
	var card = $('.card');
	var btn = $('#btnGetNumber');
	var next = $('#btnNextNumber');
	var restart = $('#btnRestart');
	var history = $('#history');
	var btnHis = $('#btnHis');

	var list = $('.list');
	var random = list.find('p');
	var ul = list.find('ul');
	var number , run = 0;
	var exist = true;

	var min = 1;
	var max = 1250;
	var ary = new Array();

	var his = 1;

	var open = false;

	ion.sound({
		sounds: [
			{name: "pop_cork"}
		],
		path: "sounds/",
		preload: true,
		volume: 1.0
	});

	var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', 'audio/116_full_tenderness_0159.mp3');
	audioElement.setAttribute('autoplay', 'autoplay');
	audioElement.setAttribute('loop', 'true');
	audioElement.play();

	// build history
	build_history(his);

	// see the history
	btnHis.on('click' , function(){
		if(open == false){
			btnHis.transition({ x: '-340px'});
			history.transition({ x: '-340px'});
			open = true;
		}else{
			btnHis.transition({ x: '0px'});
			history.transition({ x: '0px'});
			open = false;
		}
	});

	// build restart
	restart.on('click' , function(){
		random.html("");
		ul.html("");
		his++;
		build_history(his);
	});

	btn.on('click' , function(){

		card.addClass('card-active').transition({ x: '-330px'});
		list.addClass('l-active').transition({ x: '180px'});

		btn.css({'display': 'none'});
		next.css({'display': 'block'});
		restart.css({'display': 'block'});

		next.on('click' , function(){

			if(run == max){
				next.unbind('click');
				next.find('i').css({'color':'#f88','borderColor':'#f88'});
				return false;
			}else{
				getRandomNumber();

				ion.sound.play("pop_cork");
				random.html(parseInt(number))
					.addClass('animated bounceIn')
					.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend' , function(){
						$(this).removeClass('animated bounceIn');
					});
				ul.append('<li data-num="'+number+'">'+parseInt(number)+'</li>');
				ul.find('li[data-num="'+number+'"]')
					.addClass('animated bounceIn')
					.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend' , function(){
						$(this).removeClass('animated bounceIn');
					});

				history.find('.his-'+his+'').append('<li data-num="'+number+'">'+parseInt(number)+'</li>');

				run++;
			}

		});
	});

	function build_history(his){
		history.append(
			'<div class="his-title" contenteditable="true">點擊並取個標題</div>'+
			'<ul class="his-'+his+'"></ul>');
	}

	function getRandomNumber(){
		while(true){

			exist = false;

			number = Math.floor(Math.random() * max + 1);

			for(var i = 0 ; i < ary.length ; i++){
				console.log(ary[i] + " : " + number);
				if(ary[i] == number){
					exist = true;
				}
			}

			if(exist == false){
				// setting number
				ary.push(number);

				return false;
			}
		}
	}

});