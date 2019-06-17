// ==UserScript==
// @name           NDR download button
// @description    Adds a download-button for every video and audio on ndr.de.
// @description:de Fügt einen download-button für jedes videos und audio auf ndr.de hinzu.
// @version        2019.06.17.1
// @author         tastytea
// @copyright      2019, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/video/ndr_download_button.user.js
// @grant          none
// @match          https://*.ndr.de/*
// @run-at         document-end
// @inject-into    content
// ==/UserScript==

function get_video_url()
{
    const element = document.querySelector('[itemprop=contentUrl]');
    let url = element.getAttribute("content");
    if (url.search("/TV-") > -1) // Only replace in URL if it is a video.
    {
        url = url.replace("hq.mp4", "hd.mp4");
    }

    return url;
}

function add_button(parent, url)
{
    let buttontext = "Download";
    if (url.search("hd.mp4") > -1)
    {
        buttontext += " HD";
    }

    const button = document.createElement("a");
    button.setAttribute("class", "button download");
    button.setAttribute("href", url);
    // Needed for shine effect
    button.setAttribute("style", "position: relative;");

    const spanshine = document.createElement("span");
    spanshine.setAttribute("class", "buttonshine");
    button.appendChild(spanshine);

    const spandl = document.createElement("span");
    spandl.setAttribute("class", "icon icon_download");
    button.appendChild(spandl);

    button.appendChild(document.createTextNode(buttontext));

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
