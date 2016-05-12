var colors = ["#B5DA45","#8DD6F0","#D551D3","#DAD361","#F38636"];
window.onload=function(){
		var canvas = document.querySelector('canvas');
		var cxt=canvas.getContext("2d");
		var r = 90;
		var Num=8;
		var i = 0;
		var balls=new Array();
		var window_width = document.body.clientWidth || document.documentElement.clientWidth;
        var window_height = document.body.clientHeight || document.documentElement.clientHeight;
        canvas.width = window_width;
        canvas.height = window_height;
		Createball();
        function Createball(){
            var aball={
            	x:0,
				y:window_height,
				r:r,
				vX:getRandomNumber(0.8, 2),
				vY:getRandomNumber(0.8, 2),
				color: colors[getRandomNumber(0, colors.length-1)],
            }
            balls.push(aball);
            if(++i < Num){
				setTimeout(Createball, 1000);
			}
        }
		
        
        draw();     
        function draw(){
        	cxt.clearRect(0,0,window_width,window_height);
   //          cxt.fillStyle="#C6DDC0";
			// cxt.fillRect(0,0,window_width,window_height);
			for (var i=0;i<balls.length;i++){
                    balls[i].x += balls[i].vX;
                    balls[i].y += balls[i].vY;
                                        
                    if(balls[i].x >= window_width-r){
                        balls[i].x = window_width-r;
                        balls[i].vX *= -1;
                    }
                    if(balls[i].x <= r){
                        balls[i].x = r;
                        balls[i].vX *= -1;
                    }           
                    if(balls[i].y >= canvas.height-r){
                        balls[i].y = canvas.height-r;
                        balls[i].vY *= -1;
                    }
                    if(balls[i].y <= r){
                        balls[i].y = r;
                        balls[i].vY *= -1;
                    }

                    for(var j=0; j<balls.length; j++)
                        if(j!==i){
                        	var bx = balls[i].x-balls[j].x;
                        	var by = balls[i].y-balls[j].y;
                        	var dist = Math.sqrt(bx*bx + by*by);
                            if( dist < (r*2)) {
                                var tempX=balls[i].vX;
                                var tempY=balls[i].vY;
                                balls[i].vX=balls[j].vX;
                                balls[j].vX=tempX;
                                balls[i].vY=balls[j].vY;
                                balls[j].vY=tempY;
                            }
                        }
                        cxt.beginPath();
                        cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,Math.PI*2,true);
                        cxt.closePath();

                        var g = cxt.createRadialGradient(balls[i].x,balls[i].y,0,balls[i].x,balls[i].y,r);
                        // g.addColorStop(0,"white"); 
                        g.addColorStop(0.9,'transparent');
                        g.addColorStop(1,balls[i].color);
                        cxt.fillStyle = g;

                        // cxt.globalAlpha = 0.5;
                        // cxt.fillStyle = 'rgba(255,255,255,0.6)';
                        
                        // cxt.shadowColor = balls[i].color;
                        // cxt.shadowOffsetX = 5;
                        // cxt.shadowOffsetY = 5;
                        // cxt.shadowBlur = 20;
                        cxt.fill(); 
                        // cxt.strokeStyle = balls[i].color;
                        // cxt.lineWidth = 2;
                        // cxt.stroke();
            }
            setTimeout(draw,5);
        }  
        //获取随机数
		function getRandomNumber(min, max) {
            return (Math.floor(Math.random() * (max - min + 1)) + min);
        }
}