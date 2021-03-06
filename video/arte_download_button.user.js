// ==UserScript==
// @name           arte download button
// @description    Adds a download-button below videos on arte.tv.
// @description:de Fügt einen download-button unter videos auf arte.tv hinzu.
// @version        2019.06.22.1
// @author         tastytea
// @copyright      2019, tastytea (https://tastytea.de/)
// @license        GPL-3.0-only
// @namespace      tastytea.de
// @homepageURL    https://schlomp.space/tastytea/userscripts
// @supportURL     https://schlomp.space/tastytea/userscripts/issues
// @downloadURL    https://schlomp.space/tastytea/userscripts/raw/branch/main/video/arte_download_button.user.js
// @grant          none
// @match          https://*.arte.tv/*/videos/*
// @run-at         document-end
// @inject-into    content
// ==/UserScript==

function get_json_url()
{
    const iframes = document.getElementsByTagName("iframe");

    if (iframes.length > 0)
    {
        const uri = decodeURIComponent(iframes[0].getAttribute("src"));
        const re = new RegExp('json_url=(.+)\\?autostart=');
        return re.exec(uri)[1];
    }

    return null;
}

function get_video_url(json_url)
{
    const req = new Request(json_url);
    fetch(req).then(function(response)
                    {
                        return response.json();
                    })
        .then(function(response)
              {
                  add_button(response.videoJsonPlayer.VSR.HTTPS_SQ_1.url);
              });
}

function add_button(url)
{
    const metas_infos = document.getElementsByClassName("metas-infos");
    if (metas_infos.length === 0)
    {
        return;
    }
    const root = metas_infos[0].parentElement;

    const button = document.createElement("a");
    button.setAttribute("id", "tastytea_downloadbutton");
    button.setAttribute("href", url);
    button.setAttribute("style",
                        "color: #FD4600; font-weight: bold; font-size: 20px");
    button.appendChild(document.createTextNode("Download"));

    const div = document.createElement("div");
    div.appendChild(button);
    root.appendChild(div);
}

function main()
{
    if (document.getElementById("tastytea_downloadbutton") !== null)
    {
        return;
    }

    const url = get_json_url();
    if (url === null)
    {
        return;
    }

    get_video_url(url);
}

setInterval(main, 2000); // The script is not restarted when clicking on a link.
