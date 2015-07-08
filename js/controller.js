(function(window){
	'use strict';

	/**
	* Sets up the controller for our view
	*/
	var Controller = function(view) {
		this.view = view;
		var _that = this;
		var uploadBtn = document.getElementById("upload-btn");

	 	uploadBtn.addEventListener("click", function() {
	 		_that.openFileDialog();
	 	});
	};

	/**
	* Configuration
	*/
	Controller.Config = {
		supportedMimeTypes: ['image/png','image/jpg']
	}

	/**
	* Fire the click event on a pseudo-file input and open the multiple file dialog 
	*/
	Controller.prototype.openFileDialog = function() {
		var _that = this;

	 	this.view._createElement("div", "pseudo-container", "file-uploader");
	 	this.view._createElement("input", "pseudo-file-input", "pseudo-container");
		this.view._addAttribute("pseudo-file-input", "type", "file");
		this.view._addAttribute("pseudo-file-input", "multiple", "multiple");

 		document.getElementById("pseudo-file-input").click();
 		document.getElementById("pseudo-file-input").addEventListener("change", function () {
 			_that.uploadImage(this);
 		});

 		this.view._removeElement("pseudo-container");
	};

	/**
	* Start uploading all selected files 
	*/
	Controller.prototype.uploadImage = function(file) {
 		for (var i = 0; i < file.files.length; i++) {			
 			var loadedFile = file.files[i];

 			this.renderImage(loadedFile);					
 		}		
	};

	/**
	* Instantiates a FileReader() object coresponding to every single uploaded image 
	*/
	Controller.prototype.renderImage = function(file) {
 		this.file = file;

 		if(!this.validateTypes(this.file)) {
 			return false;
 		}

 		this.reader = new FileReader();
 		this.reader.onload = this.createThumb;
 		this.reader.onerror = this.errorHandler; 
 		this.reader.readAsDataURL(this.file);
	};

	/**
	* Validate if uploaded file has a supported MIME type  
	*/
	Controller.prototype.validateTypes = function(file) {
		this.file = file;

		if(Controller.Config.supportedMimeTypes.indexOf(this.file.type) < 0) {
			console.warn('This file extension appears to be not supported');
			return false;
		} else {
			console.log('This file extension is supported');
			return true;
		}
	};	

	/**
	* Creating imgage tags with sources coressponding to all uploaded images 
	* and appending them to a container as thumbnails 
	*/
	Controller.prototype.createThumb = function(e) {		
		var _that = this;		

		var thumbnailsContainer = document.getElementById("thumbs-container");
		var url = e.target.result;

 		this.thumb = document.createElement("img");
 		this.thumb.setAttribute("class", "thumb");
 		this.thumb.setAttribute("src", url);
 		thumbnailsContainer.appendChild(this.thumb);

		this.thumb.addEventListener('click', function() {
			_that.thumbnailClick(this);
		});
 	};

	/**
	* Handles the click event on a thumbnail by openning the image in original
	* sizes in separate browser's window
	*/
	FileReader.prototype.thumbnailClick = function(thumbnail) {	
		this.thumbnail = thumbnail;
		var url = thumbnail.getAttribute("src");
 		var win = window.open("", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=580, height=200");		
 		win.document.body.innerHTML = ("<img src='" + url + "' />");
 	};

	/**
	* Handles all upload errors resulted from broken and not-readable image files 
	*/
	Controller.prototype.errorHandler = function(e) {

		if(e.target.error.name == "NotReadableError") {		
			console.log("The file could not be read");		
		}
	};

	/**
	* Hook up our controller to window object
	*/	
	window.Controller = Controller;

})(window)