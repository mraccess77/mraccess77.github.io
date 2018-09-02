// ***********************************************
function traverseFrames(doc) {

  showHeading(doc)
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

// ***********************************************
function showHeading(doc) {

  var col = doc.querySelectorAll("h1,h2,h3,h4,h5,h6,[role='heading']");

  for (var i=0; i < col.length; i++) {

     var textStr = col[i].tagName+" ";
		 
     if ( col[i].hasAttribute("role") ) {

      textStr = textStr + "role=" + col[i].getAttribute('role')+" ";
     }
     if ( col[i].hasAttribute("aria-level") ) {

      textStr = textStr + "aria-level=" + col[i].getAttribute('aria-level');
     }		
		 
		 var text = document.createTextNode(textStr);
     var node = document.createElement("span");
     node.style.color = "black";
     node.style.backgroundColor = "gold";
     node.style.fontSize = "small";
     node.style.border = "thin solid black";
     node.style.position = "absolute";
     node.appendChild(text);
     col[i].parentNode.insertBefore(node, col[i]);
		 col[i].style.border = "thin solid magenta";
  }
}

function dynamicallyLoadScript(url) {
    var script = document.createElement("script"); 
    script.src = url; 
    document.head.appendChild(script);
}

dynamicallyLoadScript("./recursion.js");
traverseFrames(document);
