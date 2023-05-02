// ==UserScript==
// @name         Scrollbar Fixer
// @author       github.com/richkmls
// @namespace    https://example.com
// @version      1.0
// @description  A script that fixes scrollbars on any website and prevents them from being hidden, overridden or manipulated
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Retrieve the document and body elements from the DOM
    var [doc, body] = [document.documentElement, document.body];

    // Ensure that both elements display scrollbars only when necessary
    [doc, body].forEach(function(el) {
        el.style.overflow = 'auto';
        return undefined; // Explicitly return undefined to avoid assignment
    });

    // Override any CSS rules that modify scrollbars
    Object.defineProperty(document, 'styleSheets', {
        get: () => [],
        configurable: false
    });

    // Return the current vertical scroll position of the document element
    Object.defineProperty(window, 'scrollY', {
        get: () => doc.scrollTop,
        configurable: false
    });

    // Block any scripts that attempt to scroll the window or the elements
    ['scrollTo', 'scrollTop'].forEach(function(prop) {
        [window, doc, body].forEach(function(obj) {
            Object.defineProperty(obj, prop, {
                set: () => {},
                configurable: false
            });
            return undefined; // Explicitly return undefined to avoid assignment
        });
        return undefined; // Explicitly return undefined to avoid assignment
    });
})();
