// ==UserScript==
// @name        Mastodon CW toggle
// @description Toggles the visibility of all statuses with content warnings.
// @namespace   tastytea.de
// @version     2019-05-27_2
// @grant       none
// @run-at      document-end
// @downloadURL https://schlomp.space/tastytea/userscripts/raw/branch/main/fediverse/mastodon_cw_toggle.user.js
// ==/UserScript==

// Copyright © 2019 tastytea <tastytea@tastytea.de>.
// License GPLv3: GNU GPL version 3 <https://www.gnu.org/licenses/gpl-3.0.html>.
// This program comes with ABSOLUTELY NO WARRANTY. This is free software,
// and you are welcome to redistribute it under certain conditions.

// Toggle the visibility of each status with CW.
function toggle()
{
    for (let status of document.getElementsByClassName("e-content"))
    {
        var style = status.getAttribute("style");
        if (style.search("none") > -1)
        {
            style = style.replace("none", "block");
        }
        else
        {
            style = style.replace("block", "none");
        }
        status.setAttribute("style", style);
    }
}

// Add a “Toggle all CWs”-button.
function add_button()
{
    // If there is no element named “column-1”, use the footer.
    var root = document.getElementsByClassName("column-1")[0];
    if (root == null)
    {
        root = document.getElementsByClassName("footer")[0];
        if (root == null)
        {
            return;
        }
    }

    // Create a div, necessary to get the correct styling for the button.
    var div = document.createElement("div");
    div.setAttribute("id", "global-cw-toggle");
    div.setAttribute("class", "status__content");
    div.setAttribute("style", "margin-bottom: 0.5em;");

    // Create the button.
    var button = document.createElement("a");
    button.setAttribute("class", "status__content__spoiler-link");
    button.appendChild(document.createTextNode("Toggle all CWs"));

    div.appendChild(button);
    root.insertBefore(div, root.firstChild);

    button.onclick = toggle;
}

// If there is a “Show more”-button, add our button, if we didn't do so before.
if (document.getElementsByClassName("status__content__spoiler-link").length > 0
    && document.getElementById("global-cw-toggle") === null)
{
    add_button();
}
