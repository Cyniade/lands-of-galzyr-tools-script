// ==UserScript==
// @name         Lands of Galzyr - Tools
// @namespace    https://stories.daimyria.fi
// @version      0.1
// @description  Provide tools for Lands of Galzyr PWA.
// @author       https://github.com/Cyniade
// @match        https://stories.daimyria.fi
// @icon         https://stories.daimyria.fi/img/icon-512.png
// ==/UserScript==

(function() {
    'use strict';
    document.addEventListener("click", () => preventVerbsTranslation());
})();


/**
 * Keep original text from verb next to the translated one.
 *
 */
function preventVerbsTranslation() {
    let verbElems = document.getElementsByClassName("verb");
    for (var i = 0; i < verbElems.length; i++) {
        if(!verbElems[i].classList.contains('processed')) {
            verbElems[i].classList.add('processed');
            let originVerb = verbElems[i].cloneNode(true);
            originVerb.classList.add('notranslate');
            originVerb.textContent = ' {' + originVerb.textContent + '} ';
            verbElems[i].before(originVerb);
        }
    }
}