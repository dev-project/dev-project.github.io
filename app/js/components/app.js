import * as tools from './tools.js';
let inRad = tools.inRad;
let fps = 60,
	final = inRad(360);

export function enterCanvas ( quantity, radii, durations, charges ) {

	let canvas = document.getElementById('particles'),
		ctx = canvas.getContext('2d'),
		baseX = canvas.width / 2, 
		baseY = canvas.height / 2, 
		gapsDegrees = 360 / quantity,
		startAngle = 0,
		i = 0,
		sumCharges,
		stopRun,
		degree;
	let currentDegrees = [],
		finals = [],
		clockwise = [];

	for ( i = 0; i < quantity; i++ ) {
		durations[i] = final * (durations[i] * 0.002);
		currentDegrees.push(0);
		if ( charges[i] == 1 ) {
			finals[i] = final;
			clockwise[i] = false;
		} else {
			finals[i] = final * (-1);
			clockwise[i] = true;
		}
	}

	run();

	function run() {
		if (!stopRun) {
			sumCharges = 0;
			window.timer = setTimeout(function() {
				window.requestAnimationFrame( run );
				for ( let i = 0; i < quantity; i++ ) {
					currentDegrees[i] += durations[i];
					currentDegrees[i] = parseFloat(currentDegrees[i].toFixed(4));
					if ( charges[i] == -1 ) {
						sumCharges++;
					}
				}
				ctx.clearRect( 0, 0, canvas.width, canvas.height );
				addCircles( startAngle, currentDegrees );
				addElectrons( currentDegrees );
				if ( sumCharges == quantity ) {
					stopRun = true;
				}
			}, 1000 / fps );
		}else{
			return;
		}	
	}

	function addCircles( startAngle, currentDegrees ){
		degree = 0,
		i = 0;
		while( i < quantity ){
			degree += gapsDegrees; 
			ctx.circle( baseX, baseY, radii[i], radii[i], inRad(degree),
				startAngle, currentDegrees[i], clockwise[i], baseX - radii[i], baseY );
			i++;
		}
	}
	function addElectrons( currentDegrees ) {
		degree = 0,
		i = 0;
		let vx, vy;
		while( i < quantity ) {
			degree += gapsDegrees; 
			vx = Math.cos(currentDegrees[i]) * radii[i];
			vy = Math.sin(currentDegrees[i]) * radii[i];
			stop( i, degree, vx, vy );
			i++;	
		}
	}
	function stop( i, degree, vx, vy ) {
	//console.log('test');
		if ( finals[i] > 0 ) {
			if( currentDegrees[i] < finals[i] || (currentDegrees[i] * (-1)) > finals[i] ) {
				ctx.electron( baseX, baseY, 5, 5, inRad(degree), (baseX - radii[i]) + vx, baseY + vy );	
			} else {	
				ctx.electron( baseX, baseY, 5, 5, inRad(degree), baseX, baseY );
				charges[i] = -1;
			}	
		} else {
			if ( currentDegrees[i] > finals[i] ) {
				ctx.electron( baseX, baseY, 5, 5, inRad(degree), (baseX - radii[i]) + vx, baseY + vy );	
			} else {	
				ctx.electron( baseX, baseY, 5, 5, inRad(degree), baseX, baseY );
				charges[i] = -1;
			}	
		}
	}

}