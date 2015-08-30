javascript:(function(){
var el = document.querySelectorAll('[title]');
var str;
var headers=[];
var sentinel;

if (el.length>0) {
 	for (var i=0; i<el.length; i++) {
			s = document.createElement('Span');
			t = document.createTextNode(" Title="+el.item(i).title +" ");
			s.appendChild(t);
			s.style.backgroundColor = 'gold';
			s.border = "thin solid black";
			s.style.color = 'black';
			s.style.fontSize = "x-small";
			s.zIndex = "99999";
			el.item(i).parentNode.insertBefore(s,el.item(i));
	}
}
else {
	  alert('no elements with titles');
}

})();
