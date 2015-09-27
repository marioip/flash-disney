var app = {

	stage: {

		sceneName: "purple",

		scenePurple: {},
		sceneOrange: {},
		sceneGreen: {},
		sceneActive: {},

		charactersPurple: [],
		charactersOrange: [],
		charactersGreen: [],
		charactersActive: [],

		addCharacter: function(character){

			var _this = this;

			_this.charactersActive.push(character);

			fabric.Image.fromURL('images/characters/'+character+'.png', function(img) {
				  img.scale(0.5).set({
				    left: 0,
				    top: 0,
				    angle: 0,
				    selectable: true
				  });
				  _this.sceneActive.add(img).setActiveObject(img);
			});

		},

		changeScene: function(scene){

			var _this = this;

			// saving old scene
			switch(_this.sceneName) {
			    case "purple":
			    	_this.scenePurple = _this.sceneActive;
			    	_this.charactersPurple = _this.charactersActive;
			        console.log("Old--purple")
			        break;
			    case "orange":
			    	_this.sceneOrange = _this.sceneActive;
			    	_this.charactersOrange = _this.charactersActive;
			        console.log("Old--orange")
			        break;
			    case "green":
			    	_this.sceneGreen = _this.sceneActive;
			    	_this.charactersGreen = _this.charactersActive;
			        console.log("Old--green")
			        break;
			}

			// preparing new scene
			switch(scene) {
			    case "purple":
			    	_this.sceneActive = _this.scenePurple;
			    	_this.charactersActive = _this.charactersPurple;
			        console.log("New--purple")
			        break;
			    case "orange":
			    	_this.sceneActive = _this.sceneOrange;
			    	_this.charactersActive = _this.charactersOrange;
			        console.log("New--orange")
			        break;
			    case "green":
			    	_this.sceneActive = _this.sceneGreen;
			    	_this.charactersActive = _this.charactersGreen;
			        console.log("New--green")
			        break;
			}

			console.log("--characters:"+_this.charactersActive);

			_this.sceneName = scene;

			// reset del stage
			_this.sceneActive = new fabric.Canvas('ui-canvas');

			fabric.Image.fromURL('images/bgs/'+_this.sceneName+'.jpg', function(img) {
				img.set({
					selectable: false
				});
				_this.sceneActive.add(img);
			});

			// load characters
			for(character in this.charactersActive){
				fabric.Image.fromURL('images/characters/'+_this.charactersActive[character]+'.png', function(img) {
				  img.scale(0.5).set({
				    left: 0,
				    top: 0,
				    angle: 0,
				    selectable: true
				  });
				  _this.sceneActive.add(img).setActiveObject(img);
				});
			}

		},

		reset: function(){

			var _this = this;

			_this.sceneActive = new fabric.Canvas('ui-canvas');

			_this.charactersPurple = [];
			_this.charactersOrange = [];
			_this.charactersGreen = [];

			fabric.Image.fromURL('images/bgs/'+_this.sceneName+'.jpg', function(img) {
				img.set({
					selectable: false
				});
				_this.sceneActive.add(img);
			});
		},

		init: function(){

			var _this = this;
			_this.reset();

			$( ".menu-characters>li" ).draggable({ 
				revert: true
			});

			$( ".menu-scenes>li" ).draggable({ 
				revert: true
			});

			$("#ui-canvas").droppable({
	    		drop: function(event, ui) {

	    			if(ui.draggable.data('character')!=undefined){
	    				_this.addCharacter(ui.draggable.data('character'));
	    			}else{
	    				_this.changeScene(ui.draggable.data('scene'));
	    			}

	  			}
			});
		}

	},

	init: function(){

		this.stage.init();

	}

};