
CanvasRenderingContext2D.prototype.circle = function
( x, y, a, radius, rotate, startAngle, endAngle, clockwise, x2, y2 ) {
    this.save();
    this.beginPath();
    this.translate(x, y);	
    this.rotate(rotate);
    this.translate(-x, -y);	
	this.scale(a / radius, 1);	
    this.arc(x2, y2, radius, startAngle, endAngle , clockwise);		
    this.restore();		
	this.lineWidth = 2;
	this.strokeStyle = '#ffffff';		 
    this.stroke();
};
CanvasRenderingContext2D.prototype.electron = function
( x, y, a, b, rotate, x2, y2 ) {
    this.save();
    this.beginPath();
    this.translate(x, y);
    this.rotate(rotate);	
    this.translate(-x, -y);	
    this.scale(a / b, 1);				
    this.arc(x2, y2, b, 0, Math.PI * 2, true);	
    this.restore();				 
    this.closePath();
    this.fillStyle = '#000000';
    this.save(); 
    this.fill();
};