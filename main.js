// ==UserScript==
// @name         Lands of Galzyr - Tools
// @namespace    https://stories.daimyria.fi
// @version      0.2
// @description  Provide tools for Lands of Galzyr PWA.
// @author       https://github.com/Cyniade
// @match        https://stories.daimyria.fi
// @icon         https://stories.daimyria.fi/img/icon-512.png
// ==/UserScript==

(function() {
    'use strict';
    document.addEventListener("click", () => preventVerbsTranslation());
    var observer = new MutationObserver(function (event) {
        if(!document.documentElement.lang.match('en-GB|auto')) {
            originVerbVisibility(false);
        } else {
            originVerbVisibility(true);
        }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
      childList: false,
      characterData: false
    });
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
            originVerb.classList.add('origin-verb');
            originVerb.textContent = ' {' + originVerb.textContent + '} ';
            originVerb.hidden = true;
            verbElems[i].before(originVerb);
        }
    }
}

/**
 * Hide or show origin verbs on page.
 * 
 * @param {bool} hidden
 */
function originVerbVisibility(hidden) {
    let originVerbs = document.getElementsByClassName('origin-verb');
    for (var i = 0; i < originVerbs.length; i++) {
        originVerbs[i].hidden = hidden;
    }
}
