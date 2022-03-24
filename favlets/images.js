// *********************************** //
function traverseFrames(doc,_framesObj) {

	// check for alt, aria-label,title, or aria-labelledby attribute in current document and then check it's frames

	displayAlt(doc,_framesObj);

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
				_framesObj.frameErrorCount=_framesObj.frameErrorCount + 1;
			}
		}
	}
	return _framesObj;
}

function displayAlt(doc,_framesObj){

	var el = doc.querySelectorAll("img,*[role='img']");
	_framesObj.foundCount = _framesObj.foundCount + el.length;
	var str;
	var headers=[];
	var sentinel;

	if (el.length>0) {

		for (var i=0; i<el.length; i++) {
				s = doc.createElement('Span');
				if (el.item(i).getAttribute("alt"))
					t = "Alt="+el.item(i).getAttribute("alt") +" ";
				if (el.item(i).getAttribute("title"))
					t = t + "Title="+el.item(i).getAttribute("title") +" ";
				if (el.item(i).getAttribute("aria-label"))
					t = t + "Aria-label="+el.item(i).getAttribute("aria-label") +" ";
				if (el.item(i).getAttribute("aria-labelledby"))
					t = t + "Aria-labelledby="+doc.getElementById(el.item(i).getAttribute("aria-labelledby"));
				s.appendChild(doc.createTextNode(t));
				s.style.backgroundColor = 'cyan';
				s.style.border = "thin solid black";
				s.style.color = 'black';
				s.style.fontSize = "small";
				s.zIndex = "99999";
				el.item(i).style.border = "thin dotted cyan";
				el.item(i).parentNode.insertBefore(s,el.item(i));
		}
	}

	else {
		//  alert('no elements with alt, title, aria-label, aria-labelledby');
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
  // alert(_framesObj.foundCount + " element(s) with alt, title, aria-label, aria-labelledby attribute found. ");
}

run(document);

