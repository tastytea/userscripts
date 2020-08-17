// ==UserScript==
// @name           Goodreads expand
// @description    Show the whole description / author information on goodreads.com.
// @description:de Zeige die ganze beschreibung / author·inneninformation auf goodreads.com an.
// @version        2020.08.18.1
// @author         tastytea
// @copyright      2020, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/catalogues/goodreads_expand.user.js
// @grant          none
// @match          https://www.goodreads.com/book/*
// @match          https://www.goodreads.com/author/*
// @run-at         document-end
// @inject-into    content
// ==/UserScript==

(function()
 {
     let root = document.getElementById("description");
     if (root === null)
     {
         root = document.getElementsByClassName("aboutAuthorInfo")[0];
         if (root === null)
         {
             console.warn("Could not find description / author info.");
             return;
         }
     }

     const spans = root.getElementsByTagName("span");
     if (spans.length >= 2)
     {
         spans[1].setAttribute("style", "display: block;");
         spans[0].setAttribute("style", "display: none;");

         const links = root.getElementsByTagName("a");
         links[links.length - 1].text = "(less)";
     }
 })();
