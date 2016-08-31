# Create styler-tm.js for TamperMonkey
fs = require "fs"
header = """
// ==UserScript==
// @name         GitLab Link Styler
// @namespace    http://ryanleonard.us/
// @version      0.1
// @description  Styles closed issues and merge requests on GitLab
// @author       Ryan Leonard
// @match        http*://gitlab.com/*
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.4.5/bluebird.min.js
// @connect      gitlab.com
// ==/UserScript==
"""

script = """
#{header}
style = "#{fs.readFileSync("style.css", "utf8").replace(/\n/g, " ").replace(/"/g, '\\"')}";
GM_addStyle(style);
function gmGet(val) {
  return GM_getValue(val);
}
function gmSet(val, contents) {
  GM_setValue(val, contents);
}
//$($("head")[0]).append($("<style>").html(style));
#{fs.readFileSync("styler.js", "utf8")}
"""

fs.writeFileSync "styler.meta.js", header
fs.writeFileSync "styler.user.js", script
