// ==UserScript==
// @name         Lands of Galzyr - Tools
// @namespace    https://stories.daimyria.fireghtry
// @version      0.2
// @description  Provide tools for Lands of Galzyr PWA.
// @author       https://github.com/Cyniade
// @match        https://stories.daimyria.fi
// @icon         https://stories.daimyria.fi/img/icon-512.png
// ==/UserScript==

(function() {
    'use strict';

    preventVerbsTranslation();
    removeBigFirstLetters();
})();

/**
 * Keep original text from verb next to the translated one.
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
            verbElems[i].insertAdjacentElement('beforebegin', originVerb);
        }
    }

    originVerbVisibility();
    setTimeout(preventVerbsTranslation, 100);
}

/**
 * Hide or show origin verbs on page.
 *
 * @param {bool} hidden
 */
function originVerbVisibility() {
    let originVerbs = document.getElementsByClassName('origin-verb');
    let hidden = true;
    if(!Array.isArray(document.documentElement.lang.match('en-GB|auto|en'))) {
        hidden = false;
    }

    for (var i = 0; i < originVerbs.length; i++) {
        originVerbs[i].hidden = hidden;
    }
}


function removeBigFirstLetters() {
    let bigLetters = document.getElementsByClassName('drop-cap');
    for (var i = 0; i < bigLetters.length; i++) {
        let dropCap = bigLetters[i].parentElement;
        let initHolder = bigLetters[i].parentElement.parentElement;
        if (dropCap) {
            let bigText = initHolder.textContent;
            initHolder.textContent = bigText;
            dropCap.remove();
        }
    }

    setTimeout(removeBigFirstLetters, 100);
}