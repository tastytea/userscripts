// ==UserScript==
// @name           Expand rbb24.de comments
// @description    Expands comments under articles on rbb24.de.
// @description:de Klappt kommentare unter artikeln auf rbb24.de aus.
// @version        2019.06.07.2
// @author         tastytea
// @copyright      2019, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/comment-sections/rbb24_expand_comments.user.js
// @grant          none
// @match          https://*.rbb24.de/*/beitrag/*
// @run-at         document-end
// @inject-into    content
// ==/UserScript==

function expand_comments()
{
    for (let comment of document.getElementsByClassName("manualteasershorttext"))
    {
        comment.click();
    }
}

expand_comments();
