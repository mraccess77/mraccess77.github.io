var myStyle = document.createElement('style');
document.head.appendChild(myStyle);
myStyle.sheet.insertRule(".cursor { border: 1px dotted black; width:24px; height: 24px; border-radius: 50%; position: absolute; pointer-events: none !important; cursor: none !important;}", 0);
myStyle.sheet.insertRule(".vline { margin-left: 11px; width:2px; height: 24px; position: absolute; background-color:black;}", 0);
myStyle.sheet.insertRule(".hline { margin-top: 11px; height:2px; width: 24px; position: absolute; background-color:black;}", 0);
var d = document.createElement("div");
var vline = document.createElement("div");
var hline = document.createElement("div");
vline.className = "vline";
hline.className = "hline";
d.className = "cursor";
setup();

function setup() {
	document.body.appendChild(d);
	d.appendChild(vline);
	d.appendChild(hline);
	window.addEventListener("mousemove",cursor);
}
function cursor(e) {
    d.style.left = e.pageX-12 + "px";
	d.style.top = e.pageY-12 + "px";
}