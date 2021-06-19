// ==UserScript==
// @name           DLF download button
// @description    Adds a download button for each audio file on DLF sites.
// @description:de Fügt einen download-button für jede audio-datei auf DLF-seiten hinzu.
// @version        2021.06.19.1
// @author         tastytea
// @copyright      2019, 2021, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/audio/dlf_download_button.user.js
// @grant          none
// @match          https://*.deutschlandradio.de/*
// @match          https://*.deutschlandfunkkultur.de/*
// @match          https://*.deutschlandfunknova.de/*
// @run-at         document-end
// @inject-into    content
// ==/UserScript==

function main()
{
    // deutschlandradio.de, deutschlandfunkkultur.de
    let root = document.getElementsByClassName("player-embed")[0];
    if (root !== undefined)
    {
        add_button(root.getAttribute("data-audio-src"));
        return;
    }

    // deutschlandfunknova.de
    root = document.getElementsByClassName("button--play")[0];
    if (root !== undefined)
    {
        add_button(root.getAttribute("data-mp3"));
        return;
    }

    console.warn("Could not find player / download-button element.");
}

function add_button(url)
{
    const button = document.createElement("a");
    button.setAttribute("id", "tastytea_downloadbutton");
    button.setAttribute("href", url);
    button.appendChild(document.createTextNode("Download"));

    // Change appearance based on site.
    if (window.location.href.search("deutschlandradio.de") > 0)
    {
        button.style.fontSize = "150%";
        button.style.fontWeight = "bold";
        button.style.color = "black";
    }
    else if (window.location.href.search("deutschlandfunkkultur.de") > 0)
    {
        button.style.fontWeight = "bold";
    }
    button.style.textDecoration = "underline";

    // deutschlandradio.de
    let root = document.getElementsByClassName("div-top-sub-container")[0];
    if (root !== undefined)
    {
        root.appendChild(button);
        return;
    }

    // deutschlandfunkkultur.de
    root = document.getElementsByClassName("drk-articleplay")[0];
    if (root !== undefined)
    {
        root.parentElement.insertBefore(button, root);
        return;
    }

    // deutschlandfunknova.de
    root = document.getElementsByClassName("podcast--buttons")[0];
    if (root !== undefined)
    {
        root.parentElement.insertBefore(button, root);
        return;
    }

    console.warn("Could not find root element.");
}

main();
