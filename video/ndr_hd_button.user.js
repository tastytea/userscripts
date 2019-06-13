// ==UserScript==
// @name           NDR HD button
// @description    Adds a download-button for the HD-version of the video on ndr.de.
// @description:de Fügt einen download-button für die HD-version des videos auf ndr.de hinzu.
// @version        2019.06.14.2
// @author         tastytea
// @copyright      2019, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/video/ndr_hd_button.user.js
// @grant          none
// @match          https://*.ndr.de/*
// @run-at         document-end
// @inject-into    content
// ==/UserScript==

function get_video_url()
{
    const element = document.querySelector('[itemprop=contentUrl]');
    return element.getAttribute("content").replace("hq.mp4", "hd.mp4");
}

function add_button(parent, url)
{
    const button = document.createElement("a");
    button.setAttribute("class", "button download");
    button.setAttribute("href", url);

    const spanshine = document.createElement("span");
    spanshine.setAttribute("class", "buttonshine");
    button.appendChild(spanshine);

    const spandl = document.createElement("span");
    spandl.setAttribute("class", "icon icon_download");
    button.appendChild(spandl);

    button.appendChild(document.createTextNode("Download HD"));

    parent.appendChild(button);
}

function main()
{
    const functions = document.getElementsByClassName("functions");
    if (functions.length > 0)
    {
        const url = get_video_url();
        if (url !== "")
        {
            add_button(functions[0], url);
        }
    }
}

main();
