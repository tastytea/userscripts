// ==UserScript==
// @name           CCC-media video-player down-mover
// @description    Moves video-players on media.ccc.de below the download-hyperlinks.
// @description:de Verschiebt video-player auf media.ccc.de unter die download-hyperlinks.
// @version        2019.06.18.1
// @author         tastytea
// @copyright      2019, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/video/ccc_media_player_down.user.js
// @grant          none
// @match          https://media.ccc.de/v/*
// @run-at         document-end
// @inject-into    content
// ==/UserScript==

function main()
{
    const player = document.getElementsByClassName("player video")[0];
    if (player === undefined)
    {
        console.error("Player not found.");
        return;
    }

    // Move player between “Download” and “Related”.
    for (let heading of document.getElementsByTagName("h3"))
    {
        if (heading.textContent === "Related")
        {
            heading.parentElement.insertBefore(player, heading);
            break;
        }
    }
}

main();
