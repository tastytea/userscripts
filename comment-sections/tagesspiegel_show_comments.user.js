// ==UserScript==
// @name           Show tagesspiegel.de comments
// @description    Show all comments on tagesspiegel.de
// @description:de Alle kommentare auf tagesspiegel.de anzeigen.
// @version        2019.06.08.1
// @author         tastytea
// @copyright      2019, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/comment-sections/tagesspiegel_show_comments.user.js
// @grant          none
// @match          https://*.tagesspiegel.de/*
// @run-at         document-end
// @inject-into    content
// ==/UserScript==

let interval;
let counter = 0;

function show_comments()
{
    const showcomments = document.getElementsByClassName("ts-comments-toggle");

    ++counter;
    if (counter >= 10)          // Try 10 times.
    {
        clearInterval(interval);
    }
    if (showcomments.length === 0)
    {
        return;
    }

    clearInterval(interval);

    if (showcomments.length > 0)
    {
        showcomments[0].click();
    }
}

interval = setInterval(show_comments, 1000); // Wait until the button is loaded.
