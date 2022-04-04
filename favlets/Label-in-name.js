// ***********************************************
function traverseFrames(doc) {

  var src=doc.createElement('script'); 
  src.setAttribute('src','https://whatsock.github.io/w3c-alternative-text-computation/Sample%20JavaScript%20Recursion%20Algorithm/recursion.js'); 
  //src.onreadystatechange = loaded;
  // src.onload = loaded;
  doc.head.appendChild(src);

  setTimeout(function() { showLabels(doc); },500 )

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
function findLableForInput(doc,el) {
  var idValue = el.id;
  labels = doc.getElementsByTagName('label');
  for( var i = 0; i < labels.length; i++ ) {
     if (labels[i].htmlFor == idValue)
          return labels[i];
  }
}
// ***********************************************
function showLabels(doc) {

  //var col = doc.getElementsByTagName('img');
  var col = doc.querySelectorAll("button, input, textarea, select, [tabindex='0'],a[href],summary");
  var props;
  var text;
  
  for (var i=0; i < col.length; i++) {
    props = "";
    props = getAccName(col[i]);
    
    text = "";
    
    if ((col[i].tagName=="INPUT" || col[i].tagName=="SELECT" || col[i].tagName=="TEXTAREA") && findLableForInput(doc,col[i])) {
      text = findLableForInput(doc,col[i]).textContent;
    }
    else if (col[i].tagName=="INPUT" && col[i].hasAttribute("value")){
      text = col[i].getAttribute("value");
    }
    else {      
      text = col[i].textContent;      
    }

    if (text && !props.name.includes(text)) {
      
      var node = document.createElement("span");
      node.style.color = "black";
      node.style.backgroundColor = "gold";
      node.style.fontSize = "small";
      node.style.border = "thin solid black";
      node.style.position = "absolute";
      node.appendChild(doc.createTextNode(props.name));
      col[i].parentNode.insertBefore(node, col[i]);
    }
  }
}

traverseFrames(document);
