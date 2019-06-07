// ==UserScript==
// @name        Expand rbb24.de comments
// @description Expand comments under articles on rbb24.de.
// @version     2019.06.07.1
// @author      tastytea
// @copyright   2019, tastytea (https://tastytea.de/)
// @license     GPL-3.0-only
// @namespace   tastytea.de
// @homepageURL https://schlomp.space/tastytea/userscripts
// @supportURL  https://schlomp.space/tastytea/userscripts/issues
// @downloadURL https://schlomp.space/tastytea/userscripts/raw/branch/main/comment-sections/rbb24_expand_comments.user.js
// @grant       none
// @match       https://*.rbb24.de/*/beitrag/*
// @run-at      document-end
// @inject-into content
// ==/UserScript==

function expand_comments()
{
    for (let comment of document.getElementsByClassName("manualteasershorttext"))
    {
        comment.click();
    }
}

expand_comments();
