javascript:(function(){

var el = document.querySelectorAll('td, th');  

var str;
var headers=[];
var sentinel;

if (el.length>0) {
 	for (var i=0; i<el.length; i++) {
			if (el.item(i).hasAttribute('headers')) {
				str = el.item(i).getAttribute('headers');
				headers = str.split(' ');
				for (var ii=0; ii < headers.length; ii++) {	
					if (document.getElementById(headers[ii])) {
						sentinel = 1;
						s = document.createElement('Span');
						t = document.createTextNode(document.getElementById(headers[ii]).textContent+" ");
						s.appendChild(t);
						s.style.backgroundColor = 'antiqueWhite';	
						s.style.color = 'black';
						el.item(i).appendChild(s);
					}
				}

			 } 
		 str='';
		 header='';
		 t='';
	}
	if (!sentinel) {
	  alert('no valid headers found');
	}
}
else {
  alert('No table cells found');
}	

})();
