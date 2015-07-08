(function(){
	'use strict';

	/**
	* Sets up a new UploaderJS
	*
	* @parameter {string} [optional] parentId in View() can be specified, that points out the id of your Uploader container
	*/
	var Uploader = function() {
		this.view = new View();
		this.controller = new Controller(this.view);
	};

	var uploader = new Uploader();
})();