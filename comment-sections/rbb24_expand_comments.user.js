// ==UserScript==
// @name           Expand rbb24.de comments
// @description    Loads all comments under articles on rbb24.de and expands them.
// @description:de Lädt alle kommentare unter artikeln auf rbb24.de und klappt sie aus.
// @version        2019.06.07.4
// @author         tastytea
// @copyright      2019, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/comment-sections/rbb24_expand_comments.user.js
// @grant          none
// @match          https://*.rbb24.de/*
// @run-at         document-end
// @inject-into    content
// ==/UserScript==

function expand_comments()
{
    const loadmore = document.getElementsByClassName("load_more_comments")[0];
    if (loadmore === undefined)  // Cancel if we are not on an article page.
    {
        return;
    }

    loadmore.click();
    setTimeout(function()       // Wait for comments to load.
               {
                   document.getElementsByClassName("show_all")[0].click();
               }, 1000);
}

expand_comments();
