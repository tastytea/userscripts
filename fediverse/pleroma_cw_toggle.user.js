// ==UserScript==
// @name        Pleroma CW toggle
// @description Adds a button to toggle the visibility of all statuses with content warnings on status-pages, profile-pages and timelines.
// @version     2019.06.25.2
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
function get_root_elements(parent)
{
    // If conversation-heading is not there, try profile-tabs.
    let root = parent.getElementsByClassName("conversation-heading");
    if (root.length === 0)
    {
        root = parent.getElementsByClassName("tabs");
    }
    return root;
}

function add_button(parent)
{
    const span = document.createElement("span");
    const button = document.createElement("a");

    button.setAttribute("class", "global-cw-toggle");
    button.setAttribute(
        "style", "margin-left: 1em; margin-right: 0.5em; cursor: pointer;");
    button.appendChild(document.createTextNode("Toggle all CWs"));
    span.append(button);

    const otherspans = parent.getElementsByTagName("span");
    if (otherspans.length > 1)  // Place it left of “Collapse”.
    {
        parent.insertBefore(span, otherspans[1]);
    }
    else
    {
        parent.append(span);
    }
    return button;
}

// Check if we need to add a button.
function check()
{
    const re_static = new RegExp('notice/[^/]+#?$');
    const is_static = re_static.test(window.location.href);

    if (is_static)    // If we are on static page, stop checking after 10 tries.
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
    if (main === undefined)
    {
        return;
    }
    const root = get_root_elements(main);

    let parent;
    if (RegExp("/(users/[/]+|interactions)#?$").test(window.location.href))
    {
        parent = main;
    }
    else
    {
        parent = root[0].parentElement;
    }
    // if root element and a status was found, disable interval and add button.
    if (root.length !== 0
        && parent.getElementsByClassName("status-content").length > 0)
    {
        if (is_static)
        {
            clearInterval(interval);
        }

        for (let element of root)
        {
            // Only add button if one or more statuses have a CW.
            if (parent.getElementsByClassName("cw-status-hider").length > 0
                || parent.getElementsByClassName("status-unhider").length > 0)
            {
                if (element.getElementsByClassName("global-cw-toggle")
                    .length > 0) // Skip if button is already there.
                {
                    continue;
                }

                // jshint -W083
                add_button(element).addEventListener('click', function()
                                                     { toggle(parent); });
                // jshint +W083
            }
        }
    }
}

interval = setInterval(check, 1000); // Try to add button every second.
