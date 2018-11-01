(function () {
  var gi_order = 1;

	traverseFrames(document);

  	function traverseFrames(doc) {
	// check for sr-only class in current document and then check it's frames
      var nl = doc.querySelectorAll("[tabindex], button, a[href], area, input:not([type=hidden]) , select, textarea, iframe");	

	  initHelper(doc,nl);
		// go through for each frame's document if there are any frames
		var frametypes= ['frame','iframe'];
		for (var i=0; i<frametypes.length; i++) {
			var myframes=doc.getElementsByTagName(frametypes[i]);
			for (var z=0;z<myframes.length;z++) {
				try {
				  traverseFrames(myframes[z].contentWindow.document);
			    }
   				catch(e) {
				}
			}
		}
	}
	
	function initHelper(doc, nl) {
		var ar = [];
		var positive = [];
		var ar_position = 0;
		var positive_position = 0;

		
		for (var i=0; i < nl.length; i++) {
			if (!nl[i].hasAttribute('disabled') ) {
				
				if (nl[i].hasAttribute('tabindex') ) {
					if ( nl[i].getAttribute('tabindex') == 0 ) {
						
						ar[ar_position] = nl[i];
						ar_position++;
					}
					else if ( parseInt(nl[i].getAttribute('tabindex')) > 0 ) {
						positive[positive_position] = nl[i];
						positive_position++;
					}
				}
				else {  // no tabindex
				
					ar[ar_position] = nl[i];
					ar_position++;
				}
			}
		}
    
	
		positive.sort(function(a, b) {
			return parseInt(a.getAttribute('tabindex'),10) - parseInt(b.getAttribute("tabindex"),10);
		});

		for (var i=0; i < positive.length; i++) {
			s = doc.createElement('span');
			t = doc.createTextNode(gi_order);
			gi_order++;
			s.appendChild(t);
			s.style.backgroundColor = 'darkblue';
			s.style.color = 'white';
			s.style.fontSize = "small";
			s.style.paddingLeft = ".1em";
			s.style.paddingRight = ".1em";
			positive[i].style.border = "thin dotted darkblue ";
			positive[i].parentNode.insertBefore(s,positive[i]);
		}
		for (var i=0; i < ar.length; i++) {
			s = doc.createElement('span');
			t = doc.createTextNode(gi_order);
			gi_order++;
			s.appendChild(t);
			s.style.backgroundColor = 'darkblue';
			s.style.color = 'white';
			s.style.display = "inline-block";
			s.style.fontSize = "small";
			s.style.paddingLeft = ".1em";
			s.style.paddingRight = ".1em";
			ar[i].style.border = "thin dotted darkblue";
			ar[i].parentNode.insertBefore(s,ar[i]);
		}
	}
	  
})();