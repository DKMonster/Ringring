$(document).ready(function() {
	var card = $('.card');
	var btn = $('#btnGetNumber');
	var cardTitle = $('#card-title');
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
	var his_max = 0;
	var his_num = 0;

	var open = false;

	ion.sound({
		sounds: [
			{name: "pop_cork"}
		],
		path: "sounds/",
		preload: true,
		volume: 1.0
	});

	history.niceScroll();

	// var audioElement = document.createElement('audio');
	// audioElement.setAttribute('src', 'audio/116_full_tenderness_0159.mp3');
	// audioElement.setAttribute('autoplay', 'autoplay');
	// audioElement.setAttribute('loop', 'true');
	// audioElement.play();

	// see the history
	btnHis.on('click' , function(){
		if(open == false){
			btnHis.transition({ x: '-320px'});
			history.transition({ x: '-320px'});
			open = true;
		}else{
			btnHis.transition({ x: '0px'});
			history.transition({ x: '0px'});
			open = false;
		}
	});

	// build restart
	restart.on('click' , function(){
		var rethat = $(this);

		if(open == false){
			btnHis.transition({ x: '-320px'});
			history.transition({ x: '-320px'});
			open = true;
		}

		rethat.addClass('bRS-active');

		cardTitle.html("請在右方選擇抽獎組別。");

		var item = history.find('.status');
		item.on('click' , function(){
			var that = $(this);
			var num = that.find('.his-content').data('name');
			// change btn restart color
			rethat.removeClass('bRS-active');
			// set title
			cardTitle.html(that.find('.his-title').html())
				.addClass('animated bounceInDown')
				.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend' , function(){
					$(this).removeClass('animated bounceInDown');
				});
			// reset
			random.html("");

			// put number
			ul.html(that.find('.his-content').html());
			his = num;

			// remove and close
			item.unbind('click');
			btnHis.transition({ x: '0px'});
			history.transition({ x: '0px'});
			open = false;

		});
	});

	btn.on('click' , function(){

		card.addClass('card-active').transition({ x: '-200px'});
		list.addClass('l-active').transition({ x: '180px'});

		btn.css({'display': 'none'});
		next.css({'display': 'block'});
		restart.css({'display': 'block'});
		cardTitle.css({'display': 'block'});

		next.on('click' , function(){
			var his_max = history.find('.his-'+his+'').data('num');
			var his_num = history.find('.his-'+his+' > li').length;
			// console.log(his_num + ' : ' + his_max);
			if(run == max){
				next.unbind('click');
				next.find('i').css({'color':'#f88','borderColor':'#f88'});
				return false;
			}else{
				if(his_num < his_max){
					getRandomNumber();
					if(number < 10){
						number = "000" + number;
					}else if(number < 100){
						number = "00" + number;
					}else if(number < 1000){
						number = "0" + number;
					}

					ion.sound.play("pop_cork");
					random.html(number)
						.addClass('animated bounceIn')
						.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend' , function(){
							$(this).removeClass('animated bounceIn');
						});
					ul.append('<li data-num="'+parseInt(number)+'">'+number+'</li>');
					ul.find('li[data-num="'+parseInt(number)+'"]')
						.addClass('animated bounceIn')
						.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend' , function(){
							$(this).removeClass('animated bounceIn');
						});

					history.find('.his-'+his+'').append('<li data-num="'+parseInt(number)+'">'+number+'</li>');

					run++;
				}
			}

		});
	});

	function getRandomNumber(){
		while(true){

			exist = false;

			number = Math.floor(Math.random() * max + 1);

			for(var i = 0 ; i < ary.length ; i++){
				// console.log(ary[i] + " : " + number);
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