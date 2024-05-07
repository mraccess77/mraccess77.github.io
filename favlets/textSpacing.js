(function() {
 var style = document.createElement('style');
 style.type = 'text/css';
 document.head.appendChild(style);
 style.sheet.insertRule('*{line-height:1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important;}', style.sheet.cssRules.length);
 style.sheet.insertRule('p{margin-bottom: 2em !important;}', style.sheet.cssRules.length);

 var iframe = document.querySelector("iframe").contentDocument;
 style = iframe.createElement('style');
 style.type = 'text/css';
 iframe.head.appendChild(style);
 style.sheet.insertRule('*{line-height:1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important;}', style.sheet.cssRules.length);
 style.sheet.insertRule('p{margin-bottom: 2em !important;}', style.sheet.cssRules.length);
 
})();
