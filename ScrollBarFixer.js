// ==UserScript==
// @name         Scrollbar Fixer
// @author       github.com/richkmls
// @version      1.1
// @description  A script that fixes scrollbars on any website and prevents them from being hidden, overridden or manipulated
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Initialize counter and timeout variables
    let counter = 0;
    let timeout = 1000;
    // Set the number of extra tries
    let extratries = 1;
    // Define the fixScrollbars function
    function fixScrollbars() {
        // Initialize the hasDisabledScrollbars variable
        let hasDisabledScrollbars = false;
        // Check if the overflow property is set to hidden for the documentElement or body
        for (let el of [document.documentElement, document.body]) {
            let style = window.getComputedStyle(el);
            if (style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden') {
                hasDisabledScrollbars = true;
                break;
            }
        }
        // If scrollbars are not disabled
        if (!hasDisabledScrollbars) {
            // If the counter is less than the number of extra tries
            if (counter < extratries) {
                // Increment the counter and try again.
                counter++;
                // Call the fixScrollbars function again
                setTimeout(fixScrollbars, timeout);
            } else {
                // If the counter is equal to or greater than the number of extra tries, return and do not repeat the script
                return;
            }
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
    }
    setTimeout(fixScrollbars, timeout);
})();
