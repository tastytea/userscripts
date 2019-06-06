// ==UserScript==
// @name        Mastodon CW toggle
// @description Adds a button to toggle the visibility of all statuses with content warnings on status-pages and profile-pages.
// @version     2019.06.06.3
// @author      tastytea
// @copyright   2019, tastytea (https://tastytea.de/)
// @license     GPL-3.0-only
// @namespace   tastytea.de
// @homepageURL https://schlomp.space/tastytea/userscripts
// @supportURL  https://schlomp.space/tastytea/userscripts/issues
// @downloadURL https://schlomp.space/tastytea/userscripts/raw/branch/main/fediverse/mastodon_cw_toggle.user.js
// @grant       none
// @match       https://*/users/*/statuses/*
// @match       https://*/@*
// @run-at      document-end
// @inject-into content
// ==/UserScript==

// Toggle the visibility of each status with CW.
function toggle()
{
    for (let status of document.getElementsByClassName("e-content"))
    {
        if (status.parentElement.firstChild.firstChild.className !==
            "p-summary")        // Skip if status has no CW.
        {
            continue;
        }
        let style = status.getAttribute("style");
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
    let root = document.getElementsByClassName("column-1")[0];
    if (root === undefined)
    {
        root = document.getElementsByClassName("footer")[0];
        if (root === undefined)
        {
            console.error("Error: no suitable parent-element found.");
            return;
        }
    }
    else if (root.offsetParent === null) // If element is hidden,
    {                       // we are probably on a device with a small display.
        root = document.getElementsByClassName("column-2")[0];
    }

    // Create a div, necessary to get the correct styling for the button.
    const div = document.createElement("div");
    div.setAttribute("id", "global-cw-toggle");
    div.setAttribute("class", "status__content");
    div.setAttribute("style", "margin-bottom: 0.5em;");

    // Create the button.
    const button = document.createElement("a");
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
