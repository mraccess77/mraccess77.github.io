    
     var overlay;
	 var lostFocus;
	 var errorsObj;
	 
	 function traverseFrames(doc) {

	// check for sr-only class in current document and then check it's frames

	initHelper();

	// go through for each frame's document if there are any frames
	var frametypes= ['frame','iframe'];
	for (var i=0;i<frametypes.length;i++) {
		var myframes=doc.getElementsByTagName(frametypes[i]);
		for (var z=0;z<myframes.length;z++) {
			try {
		    traverseFrames(myframes[z].contentWindow.document);
		  } catch(e) {
			}
		}
	}
	
	}

      function rect(elem) {
	    console.log("jon");
		
	    elemTarg = elem.target || elem;
		if (elem) {
	     	var cX = elemTarg.getBoundingClientRect().left;
			var cY = elemTarg.getBoundingClientRect().top;
			var rectH = elemTarg.getBoundingClientRect().height;
			var rectW = elemTarg.getBoundingClientRect().width;
			 overlay.style.top = cY;
			 overlay.style.left = cX;
			 overlay.style.height = rectH;
			 overlay.style.width = rectW;
		 }
	 }
	 function rectRemove() {
	 	 overlay.style.top = -10;
		 overlay.style.left = -10;
		 overlay.style.height = 1;
		 overlay.style.width = 1;
		 lostFocus = true;
	 }
	  function init() {
	    traverseFrames(document)
	  }
	  
	  function initHelper() {
	     overlay = document.createElement("div");
		 overlay.style.position = "fixed";
		 overlay.style.border = "thin solid red";
	     document.body.appendChild(overlay);
		 document.addEventListener("blur",rectRemove, true);
		 document.addEventListener("focus",function() {lostFocus = false; rect(event);}, true);
		 document.addEventListener('scroll',function() {if (!lostFocus) {rect(document.activeElement);}},true);
	  }
     init();