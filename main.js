// ==UserScript==
// @name         Lands of Galzyr - Tools
// @namespace    https://stories.daimyria.fi
// @version      0.1
// @description  Provide tools for Lands of Galzyr PWA.
// @author       https://github.com/Cyniade
// @match        https://stories.daimyria.fi
// @icon         https://stories.daimyria.fi/img/icon-512.png
// ==/UserScript==
function main(data){
    // append jquery script to head
    const head = document.head || document.getElementsByTagName('head')[0],
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = data;
    head.appendChild(s);
    // if page is fully loaded execute your program
    $(document).ready(function() {
        'use strict'

        $(document).click(function(){
            preventVerbsTranslation();
        })
    });
}

// Get html text of the url
// main runs as soon as the site responds with status 200
function httpGET(url, callback, responseType='text') {
    var request = new XMLHttpRequest();
    request.responseType = responseType;
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.response);
        }
    };
    request.open('GET', url, true);
    request.send(null);
};
// Type in full url and the callback function
httpGET('https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', main);

/**
 * Add class to prevent translation from web browser.
 */
function preventVerbsTranslation() {
    $('.verb').each(function() {
        if(!$(this).hasClass('notranslate')) {
            $(this).addClass('notranslate').append("&nbsp;");
        }
    })
}