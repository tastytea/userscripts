// ==UserScript==
// @name           NPR text only
// @description    Redirects to the privacy respecting, text-only version of articles on npr.org and limits the text-width to 80 characters.
// @description:de Leitet auf die datenschutzfreundliche, nur-text version von artikeln auf npr.org weiter und beschränkt die text-breite auf 80 zeichen.
// @version        2019.07.06.2
// @author         tastytea
// @copyright      2019, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/news/npr_text_only.user.js
// @grant          GM_addStyle
// @match          https://*.npr.org/*
// @run-at         document-start
// @inject-into    content
// ==/UserScript==

function main()
{
    if (window.location.href.startsWith("https://text.npr.org"))
    {
        add_css();
    }
    else
    {
        redirect();
    }
}

function redirect()
{
    const re = new RegExp('/[0-9]{4}/[0-9]{2}/[0-9]{2}/([0-9]+)/');
    const result = re.exec(window.location.href);

    if (result !== null && result.length > 1)
    {
        window.location.assign("https://text.npr.org/s.php?sId=" + result[1]);
    }
    else
    {
        console.warn("Could not find sId.");
    }
}

function add_css()
{
    GM_addStyle("p { max-width: 80ch; }"); // jshint ignore:line
}

main();
