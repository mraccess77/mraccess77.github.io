(function() {
style = document.createElement("style");
style.type = 'text/css';
style.appendChild(document.createTextNode(""));
document.head.appendChild(style);
style.sheet.insertRule("html {  filter: grayscale(100%) !important; -webkit-filter: grayscale(1) !important;}",style.sheet.cssRules.length);
})();

