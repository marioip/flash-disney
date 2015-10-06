var app = {

	stage: {

		sceneName: "purple",

		canvas: new fabric.Canvas('ui-canvas'),

		charactersActive: [],
		charactersPurple: [],
		charactersOrange: [],
		charactersGreen: [],

		textActive: "",
		textPurple: "",
		textOrange: "",
		textGreen: "",

		scenes :[
			{"name": "purple", "preview": ""},
			{"name": "orange", "preview": ""},
			{"name": "green", "preview": ""}
		],

		addCharacter: function(character, left, top, width, height){

			// initial scale 0.5
			var _width = width*2;
			var _height = height*2;

			// objeto character
			var _character = {
				pos: this.charactersActive.length,
				name: character,
				left: 660-_width*3,
				top: 300-_height*1.3,
				width: _width,
				height: _height,
				angle: 0
			};

			this.charactersActive.push(_character);

			this.printCharacter(_character);

			if(this.textActive!="") this.addText(this.textActive);

		},

		deleteCharacter: function(pos){
			delete this.charactersActive[pos];
		},

		addText: function(text){

			var _this = this;
			this.textActive = text;

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
			this.canvas.renderAll();
		},

		printCharacter: function(imgSet){

			var _this = this;
			var _imgSet = imgSet;

			fabric.Image.fromURL('images/characters/'+imgSet.name+'.png', function(img) {
					_this.canvas.add(img);
					// detect if it is out
					img.on('mouseup', function(options) {
						console.log(options.e);
						var x = options.e.pageX;
						var y = options.e.pageY;
						if(x<260 || x>920 || y<850 || y>1150) _this.deleteCharacter(_imgSet.pos);
					});
				    _this.canvas.renderAll();
			}, imgSet);

		},

		printBg: function(bg){

			var _this = this;

			fabric.Image.fromURL('images/bgs/'+this.sceneName+'.jpg', function(img) {
				img.set({
					selectable: false
				});
				_this.canvas.add(img);
				_this.canvas.renderAll();
			});

		},

		printScene: function(){

			this.printBg(this.sceneActive);

			for(character in this.charactersActive){

				this.printCharacter(this.charactersActive[character]);

			}

			this.addText(this.textActive);

		},

		printCanvas: function(){

			var html = "";

			for(scene in this.scenes){

				if(this.sceneName == this.scenes[scene].name) this.scenes[scene].preview = this.canvas.toDataURL();
				html = html + "<img src='"+this.scenes[scene].preview+"'>";

			}

			var w = window.open();
			$(w.document.body).html(html);

		},

		changeScene: function(scene){

			console.log("SCENE:"+scene);

			var _this = this;

			// saving old scene
			switch(this.sceneName) {
			    case "purple":
			    	this.scenePurple = this.sceneActive;
			    	this.charactersPurple = this.charactersActive;
			    	this.textPurple = this.textActive;
			    	this.scenes[0].preview = this.canvas.toDataURL();
			    	$(".menu-stage__1").removeClass("menu-stage__1--active");
			        console.log("Old--purple");
			        break;
			    case "orange":
			    	this.sceneOrange = this.sceneActive;
			    	this.charactersOrange = this.charactersActive;
			    	this.textOrange = this.textActive;
			    	this.scenes[1].preview = this.canvas.toDataURL();
			    	$(".menu-stage__2").removeClass("menu-stage__2--active");
			        console.log("Old--orange");
			        break;
			    case "green":
			    	this.sceneGreen = this.sceneActive;
			    	this.charactersGreen = this.charactersActive;
			    	this.textGreen = this.textActive;
			    	this.scenes[2].preview = this.canvas.toDataURL();
			    	$(".menu-stage__3").removeClass("menu-stage__3--active");
			        console.log("Old--green");
			        break;
			}

			// preparing new scene
			switch(scene) {
			    case "purple":
			    	this.charactersActive = this.charactersPurple;
			    	this.textActive = this.textPurple;
			    	this.sceneName = "purple";
			    	$(".menu-stage__1").addClass( "menu-stage__1--active" );
			        console.log("New--purple");
			        break;
			    case "orange":
			    	this.charactersActive = this.charactersOrange;
			    	this.textActive = this.textOrange;
			    	this.sceneName = "orange";
			    	$(".menu-stage__2").addClass( "menu-stage__2--active" );
			        console.log("New--orange");
			        break;
			    case "green":

			    	this.charactersActive = this.charactersGreen;
			    	this.textActive = this.textGreen;
			    	this.sceneName = "green";
			    	$(".menu-stage__3").addClass( "menu-stage__3--active" );
			        console.log("New--green");
			        break;
			}

			// print scene
			this.printScene();

		},



		init: function(){

			var _this = this;

			$( "#characters" ).scrollLeft( 10 );

			$( ".menu-characters>li" ).draggable({ 
				revert: true
			});

			$( ".menu-scenes>li" ).draggable({ 
				revert: true
			});

			$( "#ui-canvas" ).droppable({
	    		drop: function(event, ui) {

	    			if(ui.draggable.data('character')!=undefined){
	    				_this.addCharacter(ui.draggable.data('character'), ui.position.left, ui.position.top, ui.draggable.context.clientWidth, ui.draggable.context.clientHeight);
	    			}else{
	    				_this.changeScene(ui.draggable.data('scene'));
	    			}

	  			}
			});

			this.printScene();

		}

	},

	init: function(){

		this.stage.init();

	}

};