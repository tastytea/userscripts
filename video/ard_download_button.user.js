// ==UserScript==
// @name           ARD download button
// @description    Adds a download-button for every video on ardmediathek.de.
// @description:de Fügt einen download-button für jedes video auf ardmediathek.de hinzu.
// @version        2019.06.22.6
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

let interval;
let counter = 0;

function main()
{
    // Stop if button is already there or after 10 tries.
    if (document.getElementById("tastytea_downloadbutton") !== null
        || counter >= 10)
    {
        clearInterval(interval);
        return;
    }
    ++counter;

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
    const html = document.getElementsByTagName('html')[0].innerHTML;
    const re_mp4 = new RegExp(  // ARD
        '"(https://pdvideosdaserste-a\.akamaihd\.net/[^"]+/320-[^"]+\.mp4)"');
    const re_516 = new RegExp(  // ARD, 960x544 (WTF?)
        '"(https://pdvideosdaserste-a\.akamaihd.net/[^"]+format[0-9]+\.mp4)"', 'g');
    const re_m3u = new RegExp(  // MDR
        '"(https://[^,"]+\.akamaihd\.net/[^,"]+master\.m3u8)"');

    let result = re_mp4.exec(html);
    if (result !== null)
    {
        return result[1].replace("/320-", "/1280-");
    }

    result = html.match(re_516);
    if (result !== null)
    {
        console.log(result);
        return result[result.length - 1].replace(/"/g, "");
    }

    result = re_m3u.exec(html);
    if (result !== null)
    {
        return result[1].replace("/master.m3u8", "/index_3584000_av.m3u8");
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

interval = setInterval(main, 2000);
