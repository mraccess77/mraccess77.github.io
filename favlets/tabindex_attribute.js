(function(){
	
	traverseFrames(document);
	
	function traverseFrames(doc) {
	
	  initHelper(doc);
		// go through for each frame's document if there are any frames
		var frametypes= ['frame','iframe'];
		for (var i=0; i<frametypes.length; i++) {
			var myframes=doc.getElementsByTagName(frametypes[i]);
			for (var z=0;z<myframes.length;z++) {
				try {
				  traverseFrames(myframes[z].contentWindow.document);
			    }
   				catch(e) {
					alert(e);
				}
			}
		}
	}

	function initHelper(doc) {
		var el = doc.querySelectorAll('[tabindex]');
		
		if (el.length>0) {
			for (var i=0; i <el.length; i++) {
				s = doc.createElement('Span');
				t = doc.createTextNode(" tabindex="+el.item(i).tabIndex +" ");
				s.appendChild(t);
				s.style.backgroundColor = 'gold';
				s.style.color = 'black';
				s.style.border = "thin solid black";
				el.item(i).parentNode.insertBefore(s,el.item(i));
				el.item(i).style.border="thin dotted blue";
			}
		}
		else {
			s = doc.createElement('Span');
			t = doc.createTextNode("no elements with tabindex");
			s.appendChild(t);
			s.style.backgroundColor = 'gold';
			s.style.color = 'black';
			s.style.border = "thin solid black";
			alert(doc.body.outerHTML);
			el.item(i).style.border="thin dotted blue";
			doc.body.insertBefore(s,doc.body.firstChild);
			
			
		}
	}

})();