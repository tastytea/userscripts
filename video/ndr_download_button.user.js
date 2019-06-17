// ==UserScript==
// @name           NDR download button
// @description    Adds a download-button for every video and audio on ndr.de.
// @description:de Fügt einen download-button für jedes videos und audio auf ndr.de hinzu.
// @version        2019.06.17.3
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
    if (url.search("/TV-") > -1) // Upgrade Videos to HD.
    {
        url = url.replace("hq.mp4", "hd.mp4");
    }
    else if (url.search("/AU-") > -1) // The advertised MP4 file does not exist.
    {
        url = url.replace("hq.mp4", "mp3");
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
    else
    {
        // If there is already an equivalent download-button, do nothing.
        if (document.getElementsByClassName("button download").length > 0)
        {
            return;
        }
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
