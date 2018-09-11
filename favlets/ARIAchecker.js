// ARIA Checker favlet

// *********************************** //
function traverseFrames(doc,_ARIAObj) {

	// check ARIA for current document and then check it's frames

	_ARIAObj = checkARIA(doc,_ARIAObj);

	// go through for each frame's document if there are any frames
	var frametypes= ['frame','iframe'];
	for (var i=0;i<frametypes.length;i++) {
		var myframes=doc.getElementsByTagName(frametypes[i]);
		for (var z=0;z<myframes.length;z++) {
			try {
		    traverseFrames(myframes[z].contentWindow.document,_ARIAObj);
		  } catch(e) {
			  //errors are stored in _ARIAObj too
				_ARIAObj.extFrameSrcList = _ARIAObj.extFrameSrcList + '\n' + myframes[z].src;
				_ARIAObj.frameErrorCount=_ARIAObj.frameErrorCount + 1;
			}
		}
	}
	return _ARIAObj;
}

// *********************************** //
function checkARIA(doc,_ARIAObj){

  // get all document elements
  var elements = doc.getElementsByTagName("*");

  // make a static copy of all elements
  var e = [];
  for (var i=0; i<elements.length;i++) {
		 e[i] = elements[i];
  }

  // go through each element
  for (var i = 0; i < e.length; i++) {

		//remove anything added last time favelet ran
		var myRegExp = /ariaSSB.*/;
		if ((e[i].hasAttribute('id')) && myRegExp.test(e[i].getAttribute('id'))) {
			e[i].parentNode.removeChild(e[i]);
			continue;
		}

		// string display with message such as role or property and value or no matching IDs found
		var myText = "";

		//Check for aria- and role attributes
		if (e[i].attributes) {
			for (var x = 0; x < e[i].attributes.length; x++) {
				var strAttr = e[i].attributes[x].nodeName.toLowerCase();
				var myRegExpAttr = /aria.*/;
				if (((e[i].attributes[x].specified)) && 
					((myRegExpAttr.test(strAttr) && e[i].getAttribute(strAttr)!==null) || (strAttr=="role" && e[i].getAttribute(strAttr)!==null))) {

					myText = myText + strAttr + '="' + e[i].getAttribute(strAttr) + '"'+" "; 

					if (strAttr=="role") {
					  var landmarkArray = ["navigation","banner","main", "contentinfo", "complementary", "search", "form", "application"];
					  if (landmarkArray.indexOf(e[i].getAttribute(strAttr)) > -1 ) {
					    _ARIAObj.landmarkCount++;
					  }
					}
					
					// pull ids from these ARIA properties
					if (strAttr == 'aria-control' || strAttr == 'aria-aria-describedby' || strAttr == 'aria-labelledby' || strAttr == 'aria-flowto' || strAttr == 'aria-owns'  || strAttr == 'aria-activedescendant') {

						//get array of ids from the attribute as all but activedescendant can have more than 1 id
						var id_array = e[i].getAttribute(strAttr).split(" ");

						for (var idrefs=0;idrefs < id_array.length; idrefs++) {
							var strAttrid=id_array[idrefs];
 	
							if (doc.getElementById(strAttrid) !== undefined &&  
								doc.getElementById(strAttrid) !== null) {

								//element pointed to by the id
								var idTarget=doc.getElementById(strAttrid);
								idTarget.style.border="1.5px dotted red"; // #00437A
								idTarget.style.backgroundColor="#ffffff";

								textNode = doc.createTextNode('id="'+ strAttrid +'"');

								//create indicator
								var span1 = doc.createElement('span');
								span1.setAttribute("id", ("ariaSSBid" + i));

								//style indicator
								span1.style.color='black';
								span1.style.fontSize="small";
								span1.style.fontWeight="bold";
								span1.style.backgroundColor="gold";
								span1.style.border=".5px solid #000000";
								span1.style.padding="1px";
								span1.style.marginRight="3px";
								span1.appendChild(textNode);
								idTarget.insertBefore(span1,idTarget.childNodes[0]);
							} 
							else {
								myText += ' No Id Match!';
							}  // end if
	  				}  // end for
	  			} // end if
	  		} // end if
	  	} // end for
	  } // end if
          
		// if an element has a role of aria- property display role/property & string value
		if (myText !== "") {

			_ARIAObj.foundCount++;

			e[i].style.border="1.5px solid red";
			e[i].style.padding="2px";

			//create indicator
			var span2 = document.createElement('span');
			span2.setAttribute("id", ("ariaSSB" + i));
			textNode2 = document.createTextNode(myText);
			span2.appendChild(textNode2);

			//style indicator
      span2.style.color="black";
			span2.style.fontSize="small";
			span2.style.fontWeight="bold";
		  span2.style.backgroundColor="gold";
			span2.style.border="1px solid black";
			span2.style.padding="1px";
			span2.style.marginRight="2px";
			e[i].parentNode.insertBefore(span2,e[i]);
		}

  } // end for

	//Return object back to traverseFrames
	return _ARIAObj;
} // end function


// *********************************** //
function run(doc){

  // initialize variables
  // our ARIA object
  var _ARIAObj=[];

  // number of ARIA properties found
  _ARIAObj.foundCount = 0;
  _ARIAObj.landmarkCount = 0;

  // Message and count of frames outside domain for messaging purposes
  _ARIAObj.extFrameSrcList='';
  _ARIAObj.frameErrorCount=0;
  // End initilization

  // Recurse through document and frames
  _ARIAObj = traverseFrames(doc,_ARIAObj);

	 var text = document.createTextNode("ARIA Favlet: " + _ARIAObj.foundCount + " ARIA element(s) found. " + _ARIAObj.landmarkCount + " landmarks" );

	 var node = document.createElement("div");
	 node.style.color = "black";
	 node.style.backgroundColor = "gold";
	 node.style.fontSize = "small";
	 node.style.border = "thin solid black";
	 node.style.position = "static";
	 node.appendChild(text);
	 document.body.insertBefore(node, document.body.firstChild);  

  // Display alert dialog with message with count of found properties
  //alert(_ARIAObj.foundCount + " ARIA element(s) found. " + _ARIAObj.landmarkCount + " landmarks");
}

run(document);