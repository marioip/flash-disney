var stage = {

	canvas: document.getElementById('ui-canvas'),

	scene: {

		addCharacter: function(){

		},

		loadBg: function(ctx, index){

			var scenesBg = [
				{posX:-5, posY:-437},
				{posX:-5, posY:-1071},
				{posX:-5, posY:-1388},
				{posX:-5, posY:-754}
			];

			var bgImage = new Image();

			bgImage.onload = function(){
				ctx.drawImage(bgImage, scenesBg[index].posX, scenesBg[index].posY);
			}

			bgImage.src = 'images/sprite.png';

			$( ".menu-scenes>li" ).draggable({ 
				revert: true,
				helper: "clone" 
			});

			$("#ui-canvas").droppable({
	    		drop: function(event, ui) {
	    			var index = ui.draggable.index();
	    			console.log(index);
	    			ctx.drawImage(bgImage, scenesBg[index].posX, scenesBg[index].posY);
	  			}
			});
		},

		init: function(ctx){
			this.loadBg(ctx, 0);
		}

	},

	init: function(){
		var context = this.canvas.getContext('2d');

		this.scene.init(context);
	}

};