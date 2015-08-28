javascript:(function(){
var el = document.querySelectorAll('[lang]');
var str;
var headers=[];
var sentinel;
if (el.length>0) {
 	for (var i=0; i<el.length; i++) {
			s = document.createElement('Span');
			t = document.createTextNode(" lang="+el.item(i).lang +" ");
			s.appendChild(t);
			s.style.backgroundColor = 'antiqueWhite';
			s.style.color = 'black';
			el.item(i).insertBefore(s,el.item(i).firstChild);
	}
}
else {
	  alert('no language set');
}

})();
