// ***********************************************
function traverseFrames(doc) {

  showAlt(doc)
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
function showAlt(doc) {

  var col = doc.getElementsByTagName('img');

  for (var i=0; i < col.length; i++) {


     if ( col[i].hasAttribute("aria-label") ) {

      var text = document.createTextNode("aria-label=" + col[i].getAttribute('aria-label'));
     }
     else if ( col[i].hasAttribute("alt") ) { 
       var text = document.createTextNode("alt=" + col[i].alt);
     }
     else if ( col[i].hasAttribute("title") ) { 
       var text = document.createTextNode("title=" + col[i].title);
     }
     else {
       var text = document.createTextNode("No alt");
     }
   
     var node = document.createElement("span");
     node.style.color = "black";
     node.style.backgroundColor = "gold";
     node.style.fontSize = "small";
     node.style.border = "thin solid black";
     node.style.position = "absolute";
     node.appendChild(text);
     col[i].parentNode.insertBefore(node, col[i]);
  }
}

traverseFrames(document);
