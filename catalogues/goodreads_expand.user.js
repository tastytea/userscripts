// ==UserScript==
// @name           Goodreads expand
// @description    Show the whole description on goodreads.com.
// @description:de Zeige die ganze beschreibung auf goodreads.com an.
// @version        2020.08.17.1
// @author         tastytea
// @copyright      2020, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/catalogues/goodreads_expand.user.js
// @grant          none
// @match          https://www.goodreads.com/book/*
// @run-at         document-end
// @inject-into    content
// ==/UserScript==

(function()
 {
     const description = document.getElementById("description");
     if (description !== null)
     {
         const spans = description.getElementsByTagName("span");
         if (spans.length >= 2)
         {
             spans[1].setAttribute("style", "display: block;");
             spans[0].setAttribute("style", "display: none;");
             description.getElementsByTagName("a")[0].text = "(less)";
         }
     }
     else
     {
         console.warn("Could not find description.");
     }
 })();
