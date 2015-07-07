(function(window){
	'use strict';

	/**
	* Sets up the controller for our view
	*/

	var Controller = function(view) {
		this.view = view;
		var _that = this;
		var uploadBtn = document.getElementById("upload-btn");

		//Event Listeners

	 	uploadBtn.addEventListener("click", function() {
	 		_that.openFileDialog();
	 	});


	};

	Controller.prototype.openFileDialog = function() {
		var _that = this;

	 	this.view._createElement("div", "pseudo-container", "file-uploader");
	 	this.view._createElement("input", "pseudo-file-input", "pseudo-container");
		this.view._addAttribute("pseudo-file-input", "type", "file");
		this.view._addAttribute("pseudo-file-input", "multiple", "multiple");

 		document.getElementById("pseudo-file-input").click();
 		
 		document.getElementById('pseudo-file-input').addEventListener('change', function () {
 			_that.uploadImage(this);
 		});

 		this.view._removeElement("pseudo-container");
	};

	Controller.prototype.uploadImage = function() {

 		for (i = 0; i < file.files.length; i++) {
			
 			renderImage(file.files[i]);

 		}		
	};

	/*
	*	Hook up our view to window object
	*/	
	window.Controller = Controller;

})(window)