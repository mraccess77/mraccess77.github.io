function traverseFrames(doc) {

	// check for sr-only class in current document and then check it's frames

doc.querySelectorAll('.callout-trigger').forEach(function (n) { n.setAttribute('tabindex','0'); n.setAttribute('role','button');});

	// go through for each frame's document if there are any frames
	var frametypes= ['frame','iframe'];
	for (var i=0;i<frametypes.length;i++) {
		var myframes=doc.getElementsByTagName(frametypes[i]);
		for (var z=0;z<myframes.length;z++) {
			try {
		    traverseFrames(myframes[z].contentWindow.document);
		  } catch(e) {
			  //errors are stored in _SRObj too
			}
		}
	}
	return "";
}

traverseFrames(document);
