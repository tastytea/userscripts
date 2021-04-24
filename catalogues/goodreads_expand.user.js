// ==UserScript==
// @name           Goodreads expand
// @description    Show the whole description / author information / book details on goodreads.com.
// @description:de Zeige die ganze beschreibung / author·inneninformation / buchdetails auf goodreads.com an.
// @version        2021.04.24.1
// @author         tastytea
// @copyright      2020, 2021, tastytea (https://tastytea.de/)
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
     // Book description.
     const description = document.getElementById("description");
     // Author info on author page.
     let author = document.getElementsByClassName("aboutAuthorInfo")[0];
     if (author === undefined)
     {
         // Author info on book page.
         author = document.getElementsByClassName("bookAuthorProfile")[0];
     }

     for (const element of [description, author])
     {
         if (element == null)   // null or undefined.
         {
             continue;
         }

         const spans = element.getElementsByTagName("span");
         if (spans.length >= 2)
         {
             spans[1].setAttribute("style", "display: block;");
             spans[0].setAttribute("style", "display: none;");

             const links = element.getElementsByTagName("a");
             links[links.length - 1].text = "(less)";
         }
     }

     // Data below books.
     const bookdata = document.getElementById("bookDataBox");
     if (bookdata !== null)
     {
         bookdata.setAttribute("style", "display: block;");
         document.getElementById("bookDataBoxShow").setAttribute("style", "display: none;");
     }
 })();
