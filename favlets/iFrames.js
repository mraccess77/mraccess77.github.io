// *********************************** //
function traverseFrames(doc,_framesObj) {
	
	// check for title class in current document and then check it's frames
	
	displayIFrames(doc,_framesObj);
	
	// go through for each frame's document if there are any frames
	var frametypes= ['frame','iframe'];
	for (var i=0;i<frametypes.length;i++) {
		var myframes=doc.getElementsByTagName(frametypes[i]);
		for (var z=0;z<myframes.length;z++) {
			try {
		    traverseFrames(myframes[z].contentWindow.document,_framesObj);
		  } catch(e) {
			  //errors are stored in _framesObj too
				_framesObj.extFrameSrcList = _framesObj.extFrameSrcList + '\n' + myframes[z].src;
				_framesObj.frameErrorCount= _framesObj.frameErrorCount + 1;
			}
		}
	}
	return _framesObj;
}

function displayIFrames(doc,_framesObj){

	var el = doc.querySelectorAll('iframe');
	_framesObj.foundCount = _framesObj.foundCount + el.length;
	var str;
	var headers=[];
	var sentinel;

	if (el.length>0) {

		for (var i=0; i<el.length; i++) {
				s = doc.createElement('Span');
				t = doc.createTextNode("iFrame="+el.item(i).src);
				s.appendChild(t);
				s.style.backgroundColor = 'gold';
				s.border = "thin solid black";
				s.style.color = 'black';
				s.style.fontSize = "x-small";
				s.zIndex = "99999";
				el.item(i).parentNode.insertBefore(s,el.item(i));
				el.item(i).style.border = "medium dotted red";
		}
	}

	else {
	//	  alert('no elements with titles');
	}
	}

// *********************************** //
function run(doc){

  // initialize variables
  // our SR object
  var _framesObj=[];

  // number of element with class name of sr-only found
  _framesObj.foundCount = 0;

  // Message and count of frames outside domain for messaging purposes
  _framesObj.extFrameSrcList='';
  _framesObj.frameErrorCount=0;
  // End initilization

  // Recurse through document and frames
  _framesObj = traverseFrames(doc,_framesObj);

  // Display alert dialog with message with count of found properties
  alert(_framesObj.foundCount + " iFrame element(s) were found."+_framesObj.extFrameSrcList);
}

run(document);

