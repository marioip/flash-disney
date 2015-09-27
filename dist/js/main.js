var stage = {

	canvas: document.getElementById('ui-canvas'),

	scene: {

		setCharacter: function(ctx, character){

			

		},

		setBg: function(ctx, bg){

			this.render(ctx, bg, characters);

		},

		render: function(ctx, bg, characters){
			var bgImage = new Image();
			var characterImage = new Image();

			// scene
			bgImage.src = 'images/bgs/'+bg+'.jpg';

			//characters
			characterImage.src = 'images/characters/btn/Buzz.png';

			bgImage.onload = function(){
				ctx.drawImage(bgImage, 0, 0);
			}

			characterImage.onload = function(){
				ctx.drawImage(characterImage, 0, 0);
			}

			ctx.addEventListener('mousedown', this.mouseDown, false);
		},

		mouseDown: function(e){
			console.log(e);
		},

		init: function(ctx){

			var _this = this;

			// first time
			var bg = "purple";
			var characters = [];
			this.render(ctx, bg, characters);

			$( ".menu-characters>li" ).draggable({ 
				revert: true
			});

			$( ".menu-scenes>li" ).draggable({ 
				revert: true
			});

			$("#ui-canvas").droppable({
	    		drop: function(event, ui) {

	    			var bg = ui.draggable.data('bg');
	    			var character = ui.draggable.data('character');

	    			if(ui.draggable.data('character')!=undefined){
	    				_this.setCharacter(ctx, ui.draggable.data('character'));
	    			}else{
	    				_this.setBg(ctx, ui.draggable.data('bg'));
	    			}

	  			}
			});

		}

	},

	init: function(){

		var context = this.canvas.getContext('2d');
		this.scene.init(context);

	}

};