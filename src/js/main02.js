var app = {

	stage: {

		sceneName: "purple",

		canvas: new fabric.Canvas('ui-canvas'),

		sceneActive: {},
		scenePurple: {},
		sceneOrange: {},
		sceneGreen: {},

		charactersActive: [],
		charactersPurple: [],
		charactersOrange: [],
		charactersGreen: [],

		textActive: "",
		textPurple: "",
		textOrange: "",
		textGreen: "",

		addCharacter: function(character, left, top, width, height){

			var _this = this;
			var _left = left;
			var _top = top;

			// objeto character
			var _character = {
				name: character,
				left: Math.abs(_left),
				top: Math.abs(_top)-100,
				width: width,
				height: height,
				angle: 0
			};

			this.charactersActive.push(_character);

			fabric.Image.fromURL('images/characters/'+_character.name+'.png', function(img) {

				  img.set({
				    left: _character.left-_character.width,
				    top: _character.top-_character.height,
				    width: _character.width*2,
				    height: _character.height*2,
				    angle: _character.angle,
				    selectable: true
				  });
				  _this.canvas.add(img).setActiveObject(img);
			});

		},

		changeScene: function(scene){

			var _this = this;

			console.log(this.charactersActive);

			// saving old scene
			switch(this.sceneName) {
			    case "purple":
			    	this.scenePurple = this.sceneActive;
			    	this.charactersPurple = this.charactersActive;
			    	this.textPurple = this.textActive;
			        console.log("Old--purple");
			        break;
			    case "orange":
			    	this.sceneOrange = this.sceneActive;
			    	this.charactersOrange = this.charactersActive;
			    	this.textOrange = this.textActive;
			        console.log("Old--orange");
			        break;
			    case "green":
			    	this.sceneGreen = this.sceneActive;
			    	this.charactersGreen = this.charactersActive;
			    	this.textGreen = this.textActive;
			        console.log("Old--green");
			        break;
			}

			// preparing new scene
			switch(scene) {
			    case "purple":
			    	this.sceneActive = this.scenePurple;
			    	this.charactersActive = this.charactersPurple;
			    	this.textActive = this.textPurple;
			        console.log("New--purple");
			        break;
			    case "orange":
			    	this.sceneActive = this.sceneOrange;
			    	this.charactersActive = this.charactersOrange;
			    	this.textActive = this.textOrange;
			        console.log("New--orange");
			        break;
			    case "green":
			    	this.sceneActive = this.sceneGreen;
			    	this.charactersActive = this.charactersGreen;
			    	this.textActive = this.textGreen;
			        console.log("New--green");
			        break;
			}

			this.sceneName = scene;

			fabric.Image.fromURL('images/bgs/'+this.sceneName+'.jpg', function(img) {
				img.set({
					selectable: false
				});
				_this.canvas.add(img);
			});

			// load characters
			for(character in this.charactersActive){

				console.log(_this.charactersActive[character].width);
				console.log(_this.charactersActive[character].height);

				var imgSet = {
					left:_this.charactersActive[character].left,
					top: _this.charactersActive[character].top-100,
					width: _this.charactersActive[character].width*2,
					height: _this.charactersActive[character].height*2,
					angle: _this.charactersActive[character].angle, selectable: true,
				};

				fabric.Image.fromURL('images/characters/'+_this.charactersActive[character].name+'.png', function(img) {
					_this.canvas.add(img);
					// detect if it is out
					img.on('mouseup', function(options) {
						console.log(options.e);
						var x = options.e.pageX;
						var y = options.e.pageY;
						if(x<260 || x>920 || y<850 || y>1150) console.log("fuera");
					});
				    _this.canvas.renderAll();
				}, imgSet);

				if( character==this.charactersActive.length-1 ){
					this.addText(this.textActive);
				}
			}
		},

		addText: function(text){

			var _this = this;

			// rectangle text
			var rect = new fabric.Rect({
				left: 0,
				top: _this.canvas.height-50,
				fill: 'black',
				width: _this.canvas.width,
				height: _this.canvas.height,
				selectable: false
			});

			this.canvas.add(rect);

			var message = new fabric.Text(text, {
				left: 10,
				top: _this.canvas.height-40,
				width: _this.canvas.width-40,
				fill: 'white',
  				fontFamily: 'Helvetica',
  				fontSize: 12,
  				selectable: false
			});

			this.canvas.add(message);
		},

		init: function(){

			var _this = this;

			$( ".menu-characters>li" ).draggable({ 
				revert: true
			});

			$( ".menu-scenes>li" ).draggable({ 
				revert: true
			});

			$("#ui-canvas").droppable({
	    		drop: function(event, ui) {

	    			console.log(ui.draggable);

	    			if(ui.draggable.data('character')!=undefined){
	    				_this.addCharacter(ui.draggable.data('character'), ui.position.left, ui.position.top, ui.draggable.context.clientWidth, ui.draggable.context.clientHeight);
	    			}else{
	    				_this.changeScene(ui.draggable.data('scene'));
	    			}

	  			}
			});

			// init bg purple
			fabric.Image.fromURL('images/bgs/'+this.sceneName+'.jpg', function(img) {
				img.set({
					selectable: false
				});
				_this.canvas.add(img);
			});

			// textarea
			$("a.add-text").click(function() {
				_this.textActive = $('#message').val();
				_this.addText(_this.textActive);
			});

		}

	},

	init: function(){

		this.stage.init();

	}

};