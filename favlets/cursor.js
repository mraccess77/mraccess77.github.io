var myStyle = document.createElement('style');
document.head.appendChild(myStyle);
myStyle.sheet.insertRule(".cursor { border: 1px dotted black; width:24px; height: 24px; position: absolute; pointer-events: none; cursor: none;}", 0);
var d = document.createElement("div");
d.className = "cursor";
setup();

function setup() {
	document.body.appendChild(d);
	window.addEventListener("mousemove",cursor);
}
function cursor(e) {
    d.style.left = e.pageX-12 + "px";
	d.style.top = e.pageY-12 + "px";
}