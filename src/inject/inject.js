// List of selectors that, when focused on, mean the page shouldn't go back.
const tagBlacklist = [
    'INPUT',
    'TEXTAREA',
    'SELECT',
    'OPTION',
    'DATALIST',
    'KEYGEN'
];

document.addEventListener("keydown", function (event) {
    // Check if key pressed was backspace.
    if (event.key === "Backspace" || event.keyCode == 8) {
        // Get the active element.
        // Check to see if the user has focus on a blacklisted element.
        if ( tagBlacklist.indexOf(document.activeElement.nodeName.toLowerCase()) === -1
          && document.activeElement.contentEditable !== "true"
          && document.activeElement.contentEditable !== "plaintext-only") {
            // If backspace is pressed on a site like Google Search, Google
            // will move the focus to the input field. Causing you to see
            // the last character of the input field to be removed before
            // going back (or forward) a page.
            // This disables that behavior.
            event.stopImmediatePropagation();

            // Go forward in history if the shift key is being held down.
            // Go backwards in history if the shift key is not being held down.
            history.go( event.shiftKey ? 1 : -1 );
        }
    }
}, true); // Sites like Google Search move you to the input field when
          // backspace is pressed. The `true` causes the script to be
          // executed before Google does its thing.
