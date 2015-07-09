(function(window){
	'use strict';

	/**
	* Sets up the controller for our view
	*/
	var Controller = function(view) {
		this.view = view;
		var uploadBtn = document.getElementById("upload-btn");
		var dropArea = document.getElementById("droper");

	 	uploadBtn.addEventListener("click", this.openFileDialog.bind(this), false);
		dropArea.addEventListener("dragover", this.fileDragHover.bind(this), false);
		dropArea.addEventListener("dragleave", this.fileDragHover.bind(this), false);			
		dropArea.addEventListener("drop", this.fileSelectHandler.bind(this), false);
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
	 	this.view._createElement("div", "pseudo-container", "file-uploader");
	 	this.view._createElement("input", "pseudo-file-input", "pseudo-container");
		this.view._addAttribute("pseudo-file-input", "type", "file");
		this.view._addAttribute("pseudo-file-input", "multiple", "multiple");

		var pseudoFile = document.getElementById("pseudo-file-input"); 
 		pseudoFile.click();
 		pseudoFile.addEventListener("change", this.fileSelectHandler.bind(this), false);

 		this.view._removeElement("pseudo-container");
	};

	/**
	* Handles file drag hover event on dragover or dragleave 
	*/
	Controller.prototype.fileDragHover = function(e) {
		e.stopPropagation();
		e.preventDefault();
	};

	/**
	* File selection 
	*/
	Controller.prototype.fileSelectHandler = function(e) {
		e.stopPropagation();
		e.preventDefault();

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		this.uploadImage(files);
	};

	/**
	* Start uploading all selected files 
	*/
	Controller.prototype.uploadImage = function(files) {
 		
 		for (var i = 0; i < files.length; i++) {			
 			var loadedFile = files[i];

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
 		this.reader.onload = this.createThumb.bind(this);
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
			return true;
		}
	};	

	/**
	* Creating imgage tags with sources coressponding to all uploaded images 
	* and appending them to a container as thumbnails 
	*/
	Controller.prototype.createThumb = function(e) {
		var thumbnailsContainer = document.getElementById("thumbs-container");
		var url = e.target.result;
 		this.thumb = document.createElement("img");
 		this.thumb.setAttribute("class", "thumb");
 		this.thumb.setAttribute("src", url);
 		thumbnailsContainer.appendChild(this.thumb);

		this.thumb.addEventListener('click', this.thumbnailClick, false);
 	};

	/**
	* Handles the click event on a thumbnail by openning the image in original
	* sizes in separate browser's window
	*/
	Controller.prototype.thumbnailClick = function() {
		var url = this.getAttribute("src");
 		var win = window.open("", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=580, height=720");		
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