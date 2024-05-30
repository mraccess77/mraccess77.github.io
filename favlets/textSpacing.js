// *********************************** //
function traverseFrames(doc,_framesObj) {
	
	// check for title class in current document and then check it's frames
	
	adjustSpacing(doc,_framesObj);
	
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

function adjustSpacing(doc, _framesObj) {
 var style = doc.createElement('style');
 style.type = 'text/css';
 //style.appendChild(document.createTextNode());
 doc.head.appendChild(style);
 style.sheet.insertRule('*{line-height:1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important;}', style.sheet.cssRules.length);
style.sheet.insertRule('p{margin-bottom: 2em !important;}', style.sheet.cssRules.length);
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
}

run(document);