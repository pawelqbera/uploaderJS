(function(){
	'use strict';

	/**
	* Sets up a new UploaderJS
	*/

	var Uploader = function() {
		this.view = new View();
		this.controller = new Controller(this.view);
	};

	var uploader = new Uploader();



})();




// var uploader = {

// 	uploadBtn : document.querySelector('#upload-btn'),
// 	dropArea: document.querySelector('.droper');


// 	//Event Listeners

// 	uploadBtn.addEventListener('click', function () {

// 		openFileDialog();

// 	});

// 	// drag and drop

// 	dropArea.addEventListener('drop', function (ev) {

// 		ev.preventDefault();		
// 		var data = ev.dataTransfer.getData("text");		
// 		ev.target.appendChild(document.getElementById(data));

// 	});   

// 	dropArea.addEventListener('dragover', function (ev) {
		
// 		allowDrop(ev);
	
// 	});

// 	function allowDrop(ev) {
		
// 		ev.preventDefault();
	
// 	}

// 	//Utils

// 	function createElement (tag) {

// 		el = document.createElement(tag);

// 		return el;
// 	}

// 	//Functions

// 	function drop(ev) {

// 	}

// 	function openFileDialog() {

// 		var fileUploader = document.querySelector('.file-uploader');

// 		var pseudoContainer = createElement('div');

// 		pseudoContainer.setAttribute("id", "pseudo-container");

// 		fileUploader.appendChild(pseudoContainer);

// 		pseudoContainer.innerHTML += '<input type="file" style="display:none" id="pseudoFileInput" multiple />';

// 		document.querySelector('#pseudoFileInput').click();

// 		listenForFileChange();

// 	} 

// 	function listenForFileChange() {

// 		var fileBtn = document.querySelector('#pseudoFileInput');

// 		fileBtn.addEventListener('change', function () {

// 			uploadImage(fileBtn);

// 		});

// 	} 

// 	function uploadImage(file) {

// 		removeFileInput();

// 		for (i = 0; i < 3; i++) {
			
// 			renderImage(file.files[i]);

// 		}

// 	} 

// 	function removeFileInput() {

// 		var pseudoContainer = document.querySelector('#pseudo-container');

// 		var fileUploader = document.querySelector('.file-uploader');

// 		fileUploader.removeChild(pseudoContainer);

// 	}  */

// 	function renderImage(file) {

// 		var reader = new FileReader();

// 		reader.onprogress = imageProgress;
		
// 		reader.onload = imageLoaded;

// 		reader.onerror = errorHandler;
	 
// 		reader.readAsDataURL(file);

// 		function imageProgress(e) {

// 			if (e.lengthComputable) {
				
// 				var loaded = (e.loaded / e.total);
				
// 				if (loaded < 1) {

// 					document.querySelector('.progress-bar').style.width = (loaded * 200) + "%";

// 				}
// 			} 		

// 		}

// 		function imageLoaded(e) {
		
// 			document.querySelector('.progress-bar').style.width = 0;

// 			var thumbnailsContainer = document.querySelector('.thumbs-container');

// 			url = e.target.result;

// 			thumbnailsContainer.innerHTML += ("<img class='thumb' src='" + url + "' />");

// 			listenForThumbClick();

// 			return url;
		
// 		}

// 		function errorHandler(e) {

// 			if(e.target.error.name == "NotReadableError") {
			
// 			// The file could not be read
			
// 			}
// 		}

// 		function listenForThumbClick() {

// 			var thumb = document.querySelector('.thumb');

// 			thumb.addEventListener('click', function () {

// 				thumbClick();

// 			});

// 		}	

// 		function thumbClick() {

// 			var win = window.open("", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=580, height=200, top="+(screen.height-400)+", left="+(screen.width-840));
			
// 			win.document.body.innerHTML = ("<img src='" + url + "' />");

// 		}	

// 	}

// };

// var upload = Object.create(Uploader);