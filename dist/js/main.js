var stage = {

	canvas: document.getElementById('ui-canvas'),

	scene: {

		init: function(ctx){
			var bgImage = new Image();

			bgImage.onload = function(){
				ctx.drawImage(bgImage, 0, 0)
			}

			bgImage.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

			$( ".menu-scenes>li" ).draggable({ 
				revert: true
			});

			$("#ui-canvas").droppable({
	    		drop: function() {
					console.log("dentro canvas");
	  			}
			});
		},

		loadBg: function(){
			
		}

	},

	init: function(){
		var context = this.canvas.getContext('2d');

		this.scene.init(context);
	}

};