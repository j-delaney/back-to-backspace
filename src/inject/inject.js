// List of tags that, when active, mean the page shouldn't go back.
const tagBlacklist = {
    'input': true,
    'textarea': true,
    'select': true,
    'option': true,
    'datalist': true,
    'keygen': true
};

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
    document.onkeydown = function (event) {
        // Check if key pressed was backspace.
        if (event.keyCode === 8) {
            // Get the HTML tag name of the active element.
            let activeTag = document.activeElement.tagName.toLowerCase();

            // Check to see if the user has focus on a form element.
            if (!tagBlacklist.hasOwnProperty(activeTag)) {
                history.go(-1);
            }
        }
    };
}
