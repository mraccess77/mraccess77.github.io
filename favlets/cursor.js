var myStyle = document.createElement('style');
document.head.appendChild(myStyle);
myStyle.sheet.insertRule(".cursor { border: 1px dotted black; width:24px; height: 24px; position: fixed; cursor: none;}", 0);
document.addEventListener("DOMContentLoaded",setup);
var d = document.createElement("div");
d.className = "cursor";

function setup() {
	document.body.appendChild(d);
	window.addEventListener("mousemove",cursor);
}
function cursor(e) {
    d.style.left = e.pageX + "px";
	d.style.top = e.pageY + "px";
}