let $ = require("jquery");

import * as app from './app.js';
import * as tools from './tools.js';

	let wCanvas = $('.particles-block').width(),
		hCanvas = $('.particles-block').height(),
		maxDuration = 15,
		maxRadius;
		if (hCanvas > wCanvas) {
			maxRadius = Math.floor((wCanvas / 4.2) / 10);
		}else{
			maxRadius = Math.floor((hCanvas / 4.2) / 10);
		}
	$('.particles').append(`<canvas id="particles" width="${wCanvas}" height="${hCanvas}" ></canvas>`);

	optionsBlock();

	$(".quantity_el").on('keyup', function(){
		$('#options-block').empty();
		optionsBlock();
	});	
	$('.total_duration').on('keyup', function() {
		$('.particles_edit .duration').val( $(this).val() );
	});	
	$('.total_charge').on('change', function() {	
		$('.particles_edit .charge').val( $(this).val() );
	});	
	$('.control').on('keyup', 'input', function() {
		optionsValidation($(this));
	})

	$('#enter, #enter-play').on('click', function() {
		building();
	});
	$(document).on('keyup', function() {
	    if( event.keyCode==13 ) building();   	
	});

	function optionsBlock() {
		let particlesContent = '<div class="particles_edit">'
		+ '<label>Заряд частицы</label><br>'
		+ '<select class="charge"><option value="1">Положительный</option><option value="0">Отрицательный</option></select><br>'
		+ '<label>Скорость, Мм/сек</label><br><input type="text" class="duration" value="' 
		+ $('.total_duration').val() 
		+ '"><br></div>',
			quantity = $('.quantity_el').val();
			
		if (quantity > 50) {
			$('.quantity_el').val(50);
			quantity = 50;
		}
		for (var i = 0; i < quantity; i++) {
			var optionsblock = `<div class="particles_link"><p>Частица${i + 1}<i class="fa fa-angle-down" aria-hidden="true"></i></p></div>${particlesContent}`;
			$('#options-block').append(optionsblock);
			$('.particles_edit .charge').val( $('.total_charge').val() );
		}
	}
	function optionsValidation($element) {
		if ( $element.val() < 0 ||  isNaN($element.val())) {
			$element.val(5);
		}
	}
	function building() {

		let quantity = $('.quantity_el').val(),
			$particlesEdit = $('.particles_edit');
		let radii = [],
			durations = [],
			charges = [];
		tools.reset();
		$('#enter-play').hide();
			
		if ( $('.total_duration ').val() > maxDuration ) {
			$particlesEdit.children('.duration').val(maxDuration);
			$('.total_duration ').val(maxDuration);
		}
		if ($('.quantity_el ').val() > 50) {
			$('.quantity_el').val(50);
			quantity = 50;
		}
		for ( var i = 0; i < quantity; i++ ) {	
			let duration = $particlesEdit.eq(i).children('.duration').val(),
				charge = $particlesEdit.eq(i).children('.charge').val(),
				radius;
				radius = ((duration / maxDuration) * maxRadius) * 10;
			if ( duration > maxDuration ) {
				$particlesEdit.eq(i).children('.duration').val(maxDuration);
				duration = maxDuration;
			}
			radii.push( radius );
			charges.push( charge );
			if (charge == 1) {
				durations.push( duration * 1 );	
			}else{
				durations.push( duration * (-1) );
			}
		}
		app.enterCanvas( quantity, radii, durations, charges );
	}