// ==UserScript==
// @name           ARD download button
// @description    Adds a download-button for every video on ardmediathek.de.
// @description:de Fügt einen download-button für jedes video auf ardmediathek.de hinzu.
// @version        2019.06.22.12
// @author         tastytea
// @copyright      2019, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/video/ard_download_button.user.js
// @grant          none
// @match          https://*.ardmediathek.de/*
// @run-at         document-end
// @inject-into    content
// ==/UserScript==

function main()
{
    // Stop if button is already there.
    if (document.getElementById("tastytea_downloadbutton") !== null)
    {
        return;
    }

    const url = get_url();
    if (url === null)
    {
        console.warn("Could not get video URL.");
        return;
    }

    add_button(url);
}

function get_url()              // Extract URL from HTML.
{
    const html = document.documentElement.innerHTML;
    const re_mp4 = new RegExp('"(https:)?(//[^",]+\.mp4)"', 'g');

    const result = [...html.matchAll(re_mp4)];
    if (result !== null)
    {                           // Return the last match.
        return "https:" + result[result.length - 1][2];
    }

    return null;
}

function add_button(url)
{
    // Last time I looked, there was only 1 element with that class.
    const identification = document.getElementsByClassName("identification")[0];
    if (identification === undefined)
    {
        console.warn("Could not find root element.");
        return;
    }
    const root = identification.parentElement.parentElement;

    const button = document.createElement("a");
    button.setAttribute("id", "tastytea_downloadbutton");
    button.setAttribute("href", url);
    button.style.fontSize = "120%";
    button.style.fontWeight = "bold";
    button.style.textDecoration = "underline";
    button.style.backgroundColor = "#00000040";
    button.style.padding = "0.5em";
    button.appendChild(document.createTextNode("Download"));

    const div = document.createElement("div");
    div.setAttribute("class", "col");

    div.appendChild(button);
    root.appendChild(div);
}

setInterval(main, 2000); // The script is not restarted when clicking on a link.
