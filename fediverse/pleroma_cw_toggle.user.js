// ==UserScript==
// @name        Pleroma CW toggle
// @description Adds a button to toggle the visibility of all statuses with content warnings on status-pages, profile-pages and timelines.
// @version     2019.06.12.2
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
// @match       https://*/main/friends
// @match       https://*/main/public
// @match       https://*/main/all
// @run-at      document-end
// @inject-into content
// ==/UserScript==

let interval;
let counter = 0;

// Toggle the visibility of statuses with CW.
function toggle(parent)
{
    let hyperlinks = parent.getElementsByClassName("cw-status-hider");
    if (hyperlinks.length === 0) // If no status is hidden, hide all.
    {
        hyperlinks = parent.getElementsByClassName("status-unhider");
    }

    for (let hyperlink of hyperlinks)
    {
        hyperlink.click();
    }
}

// Returns all conversation-headings or profile-tabs.
function get_root_elements()
{
    const main = document.getElementsByClassName("main")[0];

    // If conversation-heading is not there, try profile-tabs.
    let root = main.getElementsByClassName("conversation-heading");
    if (root.length === 0)
    {
        root = main.getElementsByClassName("tabs");
    }
    return root;
}

function add_button(parent)
{
    const span = document.createElement("span");
    const button = document.createElement("a");
    button.setAttribute("class", "global-cw-toggle");
    button.setAttribute("style", "margin-left: 1em; cursor: pointer;");
    button.appendChild(document.createTextNode("Toggle all CWs"));
    button.addEventListener('click', function()
                            { toggle(parent.parentElement); });

    span.append(button);
    parent.append(span);
}

// Check if we need to add a button.
function check()
{
    const re = new RegExp(
        '(/main/(friends|public|all)|/users/[^/]+/(mentions|dms))#?$');
    const is_timeline = re.test(window.location.href);

    if (!is_timeline)           // If we are on a timeline, don't stop checking.
    {
        ++counter;
        // If this is not Pleroma or we tried 10 times, disable interval.
        if (counter > 10 || document.getElementById("app") === null)
        {
            clearInterval(interval);
            return;
        }
    }

    const main = document.getElementsByClassName("main")[0];
    const root = get_root_elements();
    // if root element and a status was found, disable interval and add button.
    if (root.length !== 0
        && main.getElementsByClassName("status-content").length > 0)
    {
        if (!is_timeline)
        {
            clearInterval(interval);
        }

        for (let element of root)
        {
            // Only add button if one or more statuses have a CW.
            if (main.getElementsByClassName("cw-status-hider").length > 0
                || main.getElementsByClassName("status-unhider").length > 0)
            {
                if (element.getElementsByClassName("global-cw-toggle")
                    .length > 0) // Skip if button is already there.
                {
                    continue;
                }

                add_button(element);
            }
        }
    }
}

interval = setInterval(check, 1000); // Try to add button every second.
