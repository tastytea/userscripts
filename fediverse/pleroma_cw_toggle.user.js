// ==UserScript==
// @name        Pleroma CW toggle
// @description Adds a button to toggle the visibility of all statuses with content warnings on status-pages and profile-pages.
// @version     2019.06.07.1
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

// Toggle the visibility of statuses with CW.
function toggle()
{
    let hyperlinks = document.getElementsByClassName("cw-status-hider");
    if (hyperlinks.length === 0) // If no status is hidden, hide all.
    {
        hyperlinks = document.getElementsByClassName("status-unhider");
    }

    for (let hyperlink of hyperlinks)
    {
        hyperlink.click();
    }
}

function add_button()
{
    // If conversation-heading is not there, try profile-tabs.
    let root = document.getElementsByClassName("conversation-heading")[0];
    if (root === undefined)
    {
        root = document.getElementsByClassName("tabs")[0];
    }

    // if root element was found, disable interval and add button.
    if (root !== undefined)
    {
        clearInterval(interval);

        const button = document.createElement("a");
        button.setAttribute("style", "margin-left: 1em;");
        button.appendChild(document.createTextNode("Toggle all CWs"));
        button.setAttribute("href", "#");
        button.onclick = toggle;
        root.append(button);
    }
}

interval = setInterval(add_button, 1000); // Try to add button every second.
