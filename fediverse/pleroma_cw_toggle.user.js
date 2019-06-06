// ==UserScript==
// @name        Pleroma CW toggle
// @description Adds a button to toggle the visibility of all statuses with content warnings on status-pages and profile-pages.
// @version     2019.06.07.3
// @author      tastytea
// @copyright   2019, tastytea (https://tastytea.de/)
// @license     GPL-3.0-only
// @namespace   tastytea.de
// @homepageURL https://schlomp.space/tastytea/userscripts
// @supportURL  https://schlomp.space/tastytea/userscripts/issues
// @downloadURL https://schlomp.space/tastytea/userscripts/raw/branch/main/fediverse/pleroma_cw_toggle.user.js
// @grant       none
// @match       https://*/notice/*
// @match       https://*/users/*
// @run-at      document-end
// @inject-into content
// ==/UserScript==

let interval;
let counter = 0;

// Toggle the visibility of statuses with CW.
function toggle()
{
    const main = document.getElementsByClassName("main")[0];
    let hyperlinks = main.getElementsByClassName("cw-status-hider");
    if (hyperlinks.length === 0) // If no status is hidden, hide all.
    {
        hyperlinks = main.getElementsByClassName("status-unhider");
    }

    for (let hyperlink of hyperlinks)
    {
        hyperlink.click();
    }
}

function add_button()
{
    ++counter;
    // If this is not Pleroma or we tried 10 times, disable interval.
    if (counter >= 10 || document.getElementById("app") === null)
    {
        clearInterval(interval);
        return;
    }
    const main = document.getElementsByClassName("main")[0];

    // If conversation-heading is not there, try profile-tabs.
    let root = main.getElementsByClassName("conversation-heading")[0];
    if (root === undefined)
    {
        root = main.getElementsByClassName("tabs")[0];
    }

    // if root element and a status was found, disable interval and add button.
    if (root !== undefined
        && main.getElementsByClassName("status-content").length > 0)
    {
        clearInterval(interval);

        // Only add button if one or more statuses have a CW.
        if (main.getElementsByClassName("cw-status-hider").length > 0
            || main.getElementsByClassName("status-unhider").length > 0)
        {
            const button = document.createElement("a");
            button.setAttribute("style", "margin-left: 1em;");
            button.appendChild(document.createTextNode("Toggle all CWs"));
            button.setAttribute("href", "#");
            button.onclick = toggle;
            root.append(button);
        }
    }
}

interval = setInterval(add_button, 1000); // Try to add button every second.
