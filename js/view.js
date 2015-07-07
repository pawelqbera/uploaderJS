(function(window){
	'use strict';

	/**
	* Sets up the browser's DOM
	*/

	var View = function(parentId) {

		this.parentId = parentId;

		this._createElement("section", "uploader-js", this.parentId);
		
		this._createElement("header", "header", "uploader-js");
		this._createElement("section", "main", "uploader-js");

		this._createElement("h1", "title", "header");
		this._appendTextNode("title", "UploaderJS: Upload a file");

		this._createElement("div", "thumbs-container", "main");
		this._createElement("div", "progress-bar", "thumbs-container");

		this._createElement("div", "droper", "main");
		this._createElement("h2", "subtitle", "droper");
		this._appendTextNode("subtitle", "Drop your .png or .jpg files here");

		this._createElement("div", "file-uploader", "main");
		this._createElement("span", "or", "file-uploader");
		this._appendTextNode("or", "or");
		this._createElement("input", "upload-btn", "file-uploader");
		this._addAttribute("upload-btn", "type", "button");
		this._addAttribute("upload-btn", "name", "upload-btn");
		this._addAttribute("upload-btn", "value", "Select Files");
	};

	/*
	*	Creates and appends a DOM element with its own classname, id into a specified parent element 
	*/	
	View.prototype._createElement = function(elementTag, elementName, parentId) {
		this.elementTag = elementTag;
		this.elementName = elementName;
		this.parentId = parentId;

		var el = document.createElement(this.elementTag);

		el.setAttribute("id", this.elementName);
		el.setAttribute("class", this.elementName);	

		if (typeof this.parentId !== 'undefined') {
			document.getElementById(this.parentId).appendChild(el);
		} else {
			document.body.appendChild(el);
		}
	}

	/*
	*	Appends text into a specified element 
	*/
	View.prototype._appendTextNode = function(elementId, elementText) {
		this.elementId = elementId;
		this.elementText = elementText;

		var el = document.getElementById(this.elementId);

		el.innerHTML = this.elementText;
	}

	/*
	*	Appends text into a specified element 
	*/
	View.prototype._addAttribute = function(elementId, elementAttribute, attributeValue) {
		this.elementId = elementId;
		this.elementAttribute = elementAttribute;
		this.attributeValue = attributeValue;

		var el = document.getElementById(this.elementId);

		el.setAttribute(this.elementAttribute, this.attributeValue);
	}

	/*
	*	Remove element from DOM 
	*/
	View.prototype._removeElement = function(elementId) {
		this.elementId = elementId;
		var parent = document.getElementById(this.elementId);
		
		parent.parentNode.removeChild(parent);
	}

	/*
	*	Hook up our view to window object
	*/	
	window.View = View;

})(window);