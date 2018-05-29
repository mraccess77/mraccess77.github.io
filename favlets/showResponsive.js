window.onresize = function() {
    showResponsive();
  	};
showResponsive();

	
// ************************************************************************
function showResponsive() {
  var element = document.getElementById("__a11y_responsive1");
  if (element) {
    element.parentNode.removeChild(element);
  }
  var d = document.createElement('div');
	var s = document.createElement('span');
	var b1 = document.createElement("button");
	b1.setAttribute("aria-expanded","true");
	b1.setAttribute("style","background-color:darkblue !important; color: white !important; background-image: initial");
	
	b1.appendChild(document.createTextNode("\u25BC"));
	b1.addEventListener("click", function() {
		if (this.getAttribute("aria-expanded") == "true") {
       this.setAttribute("aria-expanded","false");
			 s.style.display = "none";
		}
    else {
       this.setAttribute("aria-expanded","true");			
			 s.style.display = "inline";
		}
		event.preventDefault();
	});
  d.id = "__a11y_responsive1";
  var t = document.createTextNode("(scale) pixel ratio " + window.devicePixelRatio + "\n inner width " + window.innerWidth + "px");
  s.appendChild(t);
	d.appendChild(b1);
	d.appendChild(s);
  s.style.backgroundColor = 'darkblue';
  s.style.color = 'white';
  s.style.fontSize = "small";
  s.style.position = "sticky";
  s.style.left = ".25em";
  s.style.top = ".25em";
  s.style.zIndex = "9999";
  s.style.opacity = "1";
  s.style.padding = ".25em";
  s.style.fontWeight = "normal";
  s.style.border = "thin inset white";
  document.body.insertBefore(d,document.body.firstChild);
}
