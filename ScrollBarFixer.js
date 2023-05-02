// ==UserScript==
// @name         Scrollbar Fixer
// @author       github.com/richkmls
// @version      1.0
// @description  A script that fixes scrollbars on any website and prevents them from being hidden, overridden or manipulated
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Wait for 1 second before executing the rest of the script
    setTimeout(() => {
        // Check if there are any scrollbars that are disabled by CSS or JS
        let hasDisabledScrollbars = false;
        for (let el of [document.documentElement, document.body]) {
            let style = window.getComputedStyle(el);
            if (style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden') {
                hasDisabledScrollbars = true;
                break; // No need to check further elements
            }
        }
        // If there are no disabled scrollbars, exit the script
        if (!hasDisabledScrollbars) {
            return;
        }
        // Retrieve the document and body elements from the DOM
        let [doc, body] = [document.documentElement, document.body];
        // Ensure that both elements display scrollbars only when necessary
        for (let el of [doc, body]) {
            el.style.overflow = 'auto';
        }
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
        for (let prop of ['scrollTo', 'scrollTop']) {
            for (let obj of [window, doc, body]) {
                Object.defineProperty(obj, prop, {
                    set: () => {},
                    configurable: false
                });
            }
        }
    }, 1000); // 1 second in milliseconds
})();
