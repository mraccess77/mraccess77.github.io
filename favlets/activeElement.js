function activeElement(element) {
  if (element.tagName == "IFRAME") {
		activeElement(element.contentWindow.document.activeElement);
  }
  else {
		alert(element.outerHTML);
  }
}

(function() {
activeElement(document.activeElement);
})();

