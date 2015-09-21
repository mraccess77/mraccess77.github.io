// sr-only classname checker favlet

// *********************************** //
function traverseFrames(doc,_SRObj) {

	// check for sr-only class in current document and then check it's frames

	_SRObj = checkSR(doc,_SRObj);

	// go through for each frame's document if there are any frames
	var frametypes= ['frame','iframe'];
	for (var i=0;i<frametypes.length;i++) {
		var myframes=doc.getElementsByTagName(frametypes[i]);
		for (var z=0;z<myframes.length;z++) {
			try {
		    traverseFrames(myframes[z].contentWindow.document,_SRObj);
		  } catch(e) {
			  //errors are stored in _SRObj too
				_SRObj.extFrameSrcList = _SRObj.extFrameSrcList + '\n' + myframes[z].src;
				_SRObj.frameErrorCount=_SRObj.frameErrorCount + 1;
			}
		}
	}
	return _SRObj;
}

// *********************************** //
function checkSR(doc,_SRObj){

  // get all document elements
  var elements = doc.getElementsByClassName("sr-only");

  // make a static copy of all elements
  var e = [];
  for (var i=0; i<elements.length;i++) {
		 e[i] = elements[i];
  } // endfor
  
  // go through each element
  for (var i = 0; i < e.length; i++) {

			_SRObj.foundCount++;

			e[i].style.border="1.5px solid red";
			e[i].style.padding="2px";
      e[i].className = e[i].className.replace(/\bsr-only\b/,'');

			//create indicator
			var span2 = document.createElement('span');
			span2.setAttribute("id", ("srSSB" + i));
			textNode2 = document.createTextNode(e[i].textContent);
			span2.appendChild(textNode2);

			//style indicator
      span2.style.color="#00437A";
			span2.style.fontSize="small";
			span2.style.fontWeight="bold";
		  span2.style.backgroundColor="#fbc55b";
			span2.style.border="1px solid black";
			span2.style.padding="1px";
			span2.style.marginRight="2px";
			e[i].parentNode.insertBefore(span2,e[i]);
  } // end for

	//Return object back to traverseFrames
	return _SRObj;
} // end function


// *********************************** //
function run(doc){

  // initialize variables
  // our SR object
  var _SRObj=[];

  // number of element with class name of sr-only found
  _SRObj.foundCount = 0;

  // Message and count of frames outside domain for messaging purposes
  _SRObj.extFrameSrcList='';
  _SRObj.frameErrorCount=0;
  // End initilization

  // Recurse through document and frames
  _SRObj = traverseFrames(doc,_SRObj);

  // Display alert dialog with message with count of found properties
  alert(_SR.foundCount + " element(s) with sr-only class found. ");
}

run(document);
