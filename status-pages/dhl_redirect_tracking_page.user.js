// ==UserScript==
// @name        Redirect DHL tracking page
// @description Redirects to a more static version of the tracking page that doesn't reset after a short time.
// @version     2019.06.04.2
// @author      tastytea
// @copyright   2019, tastytea (https://tastytea.de/)
// @license     GPL-3.0-only
// @namespace   tastytea.de
// @homepageURL https://schlomp.space/tastytea/userscripts
// @supportURL  https://schlomp.space/tastytea/userscripts/issues
// @downloadURL https://schlomp.space/tastytea/userscripts/raw/branch/main/status-pages/dhl_redirect_tracking_page.user.js
// @grant       none
// @match       https://*.dhl.de/*idc=*
// @run-at      document-start
// @inject-into content
// ==/UserScript==

var re = new RegExp('dhl\.de/([^/]+)/.+idc=([0-9]+)');
var result = re.exec(window.location.href);
var lang = result[1];
var idc = result[2];

window.location.assign("https://nolp.dhl.de/nextt-online-public/" + lang + "/search?piececode=" + idc);
