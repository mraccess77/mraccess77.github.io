(function() {
 var style = document.createElement('style');
 style.type = 'text/css';
 //style.appendChild(document.createTextNode());
 document.head.appendChild(style);
 style.sheet.insertRule('*:focus { outline: red solid thick !important; } ',-1);
})();

