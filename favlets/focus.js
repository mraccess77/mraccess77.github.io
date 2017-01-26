    
     //var overlay;
	 var focusObj;
	 
	 function traverseFrames(doc, focusObj) {

	// check for sr-only class in current document and then check it's frames

	initHelper(doc, focusObj);

	// go through for each frame's document if there are any frames
	var frametypes= ['frame','iframe'];
	for (var i=0;i<frametypes.length;i++) {
		var myframes=doc.getElementsByTagName(frametypes[i]);
		for (var z=0;z<myframes.length;z++) {
			try {
		    traverseFrames(myframes[z].contentWindow.document, focusObj);
		  } catch(e) {
			}
		}
	}
	
	}

      function rect(elem) {
	    console.log("rect");
		
	    elemTarg = elem.target || elem;
		if (elem) {
			console.log("element");
	     	var cX = elemTarg.getBoundingClientRect().left;
			var cY = elemTarg.getBoundingClientRect().top;
			var rectH = elemTarg.getBoundingClientRect().height;
			var rectW = elemTarg.getBoundingClientRect().width;
			var overlay = elemTarg.ownerDocument.getElementById("SSB");
			
			if (cX < 0) {cX = 0};
			if (cY < 0) {cY = 0};
			if (rectH==0) {rectH = 3};
			if (rectW==0) {rectW = 3};
			 overlay.style.top = parseInt(cY).toString() + "px";
			 overlay.style.left = parseInt(cX).toString() + "px";
			 overlay.style.height = parseInt(rectH).toString() + "px";
			 overlay.style.width = parseInt(rectW).toString() + "px";
			 if (cX ==0 || cY == 0) {
			   //overlay.appendChild(elemTarg.cloneNode(true));
			   overlay.textContent = elemTarg.tagName;
			 }
			console.log(overlay.style.left);
			console.log(overlay.style.top);
			console.log(overlay.style.height);
			console.log(overlay.style.width);
		 }
	 }
	 function rectRemove(elem) {
		 console.log("rect remove");
		 elemTarg = elem.target;
		 var overlay = elemTarg.ownerDocument.getElementById("SSB");
	 	 overlay.style.top = -10;
		 overlay.style.left = -10;
		 overlay.style.height = 1;
		 overlay.style.width = 1;
		 //overlay.innerHTML = ''; // wipe out any clones
		 
		 overlay.setAttribute("data-lostFocus","true");
	 }
	  function init() {
		console.log("init");
	    traverseFrames(document, focusObj);
	  }
	  
	  function initHelper(doc, focusObj) {
		  console.log("init helper");
	     var overlay = doc.createElement("div");
		 overlay.style.position = "fixed";
		 overlay.style.border = "medium solid red";
		 overlay.style.zIndex = "9999";
		 overlay.id = "SSB";
		 overlay.setAttribute("data-lostFocus","false");
	     doc.body.appendChild(overlay);
		 doc.addEventListener("blur",rectRemove, true);
		 doc.addEventListener("focus",function() {doc.getElementById("SSB").setAttribute("data-lostFocus","false"); rect(event);}, true);
		 doc.addEventListener('scroll',function() {if (doc.getElementById("SSB").getAttribute("data-lostFocus") == "false") {rect(doc.activeElement);}},true);
	  }
     init();