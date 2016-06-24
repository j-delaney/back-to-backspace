// List of selectors that, when focused on, mean the page shouldn't go back.
const tagBlacklist = [
    'input',
    'textarea',
    'select',
    'option',
    'datalist',
    'keygen',
    '[contenteditable]'
];

const matches = /Chrome\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/.exec(navigator.userAgent);
const version = {
    major: Number(matches[1]),
    minor: Number(matches[2]),
    build: Number(matches[3]),
    patch: Number(matches[4])
};

// If the user is at or above the minimum version (52.0.2720.0) then active the extension.
// I know this section is messy. It needs to be rewritten.
if (version.major > 52 ||
    (version.major === 52 && version.minor > 0) ||
    (version.major === 52 && version.minor === 0 && version.build >= 2720)) {
    document.addEventListener("keydown", function (event) {
        // Check if key pressed was backspace.
        if (event.key === "Backspace") {
            // Get the active element.
            let activeEl = document.activeElement;
            let activateBack = true;

            // Check to see if the user has focus on a blacklisted element.
            tagBlacklist.forEach(function(selector) {
                if (activeEl.matches(selector))
                    activateBack = false;
            });

            if (activateBack) {
                // If backspace is pressed on a site like Google Search, Google
                // will move the focus to the input field. Causing you to see
                // the last character of the input field to be removed before
                // going back (or forward) a page.
                // This disables that behavior.
                event.stopImmediatePropagation();

                if (event.shiftKey) {
                    // Go forward in history if the shift key is being held down.
                    history.go(1);
                } else {
                    // Go backwards in history if the shift key is not being held down.
                    history.go(-1);
                }
            }
        }
    }, true); // Sites like Google Search move you to the input field when
              // backspace is pressed. The `true` couses the script to be
              // executed before Google does its thing.
}
