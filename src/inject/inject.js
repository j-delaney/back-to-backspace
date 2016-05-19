// List of tags that, when active, mean the page shouldn't go back.
const tagBlacklist = {
    'input': true,
    'textarea': true,
    'select': true,
    'option': true,
    'datalist': true,
    'keygen': true
};

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