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
style = "a[data-reference-type=\"issue\"][data-checklist=\"0\"] {   position: relative;   padding-bottom: 2px;   text-decoration: none; } a[data-reference-type=\"issue\"][data-checklist=\"0\"]::after {   content: \"\";   position: absolute;   left: 0;   bottom: 0px;   height: 2px;   width: 100%;   background: -webkit-linear-gradient(left, #008000 0%, #008000 0%, #f00 0%, #f00 100%);   background: -moz-linear-gradient(left, #008000 0%, #008000 0%, #f00 0%, #f00 100%);   background: -o-linear-gradient(left, #008000 0%, #008000 0%, #f00 0%, #f00 100%);   background: -ms-linear-gradient(left, #008000 0%, #008000 0%, #f00 0%, #f00 100%);   background: linear-gradient(left, #008000 0%, #008000 0%, #f00 0%, #f00 100%); } a[data-reference-type=\"issue\"][data-checklist=\"1\"] {   position: relative;   padding-bottom: 2px;   text-decoration: none; } a[data-reference-type=\"issue\"][data-checklist=\"1\"]::after {   content: \"\";   position: absolute;   left: 0;   bottom: 0px;   height: 2px;   width: 100%;   background: -webkit-linear-gradient(left, #008000 0%, #008000 10%, #f00 10%, #f00 100%);   background: -moz-linear-gradient(left, #008000 0%, #008000 10%, #f00 10%, #f00 100%);   background: -o-linear-gradient(left, #008000 0%, #008000 10%, #f00 10%, #f00 100%);   background: -ms-linear-gradient(left, #008000 0%, #008000 10%, #f00 10%, #f00 100%);   background: linear-gradient(left, #008000 0%, #008000 10%, #f00 10%, #f00 100%); } a[data-reference-type=\"issue\"][data-checklist=\"2\"] {   position: relative;   padding-bottom: 2px;   text-decoration: none; } a[data-reference-type=\"issue\"][data-checklist=\"2\"]::after {   content: \"\";   position: absolute;   left: 0;   bottom: 0px;   height: 2px;   width: 100%;   background: -webkit-linear-gradient(left, #008000 0%, #008000 20%, #f00 20%, #f00 100%);   background: -moz-linear-gradient(left, #008000 0%, #008000 20%, #f00 20%, #f00 100%);   background: -o-linear-gradient(left, #008000 0%, #008000 20%, #f00 20%, #f00 100%);   background: -ms-linear-gradient(left, #008000 0%, #008000 20%, #f00 20%, #f00 100%);   background: linear-gradient(left, #008000 0%, #008000 20%, #f00 20%, #f00 100%); } a[data-reference-type=\"issue\"][data-checklist=\"3\"] {   position: relative;   padding-bottom: 2px;   text-decoration: none; } a[data-reference-type=\"issue\"][data-checklist=\"3\"]::after {   content: \"\";   position: absolute;   left: 0;   bottom: 0px;   height: 2px;   width: 100%;   background: -webkit-linear-gradient(left, #008000 0%, #008000 30%, #f00 30%, #f00 100%);   background: -moz-linear-gradient(left, #008000 0%, #008000 30%, #f00 30%, #f00 100%);   background: -o-linear-gradient(left, #008000 0%, #008000 30%, #f00 30%, #f00 100%);   background: -ms-linear-gradient(left, #008000 0%, #008000 30%, #f00 30%, #f00 100%);   background: linear-gradient(left, #008000 0%, #008000 30%, #f00 30%, #f00 100%); } a[data-reference-type=\"issue\"][data-checklist=\"4\"] {   position: relative;   padding-bottom: 2px;   text-decoration: none; } a[data-reference-type=\"issue\"][data-checklist=\"4\"]::after {   content: \"\";   position: absolute;   left: 0;   bottom: 0px;   height: 2px;   width: 100%;   background: -webkit-linear-gradient(left, #008000 0%, #008000 40%, #f00 40%, #f00 100%);   background: -moz-linear-gradient(left, #008000 0%, #008000 40%, #f00 40%, #f00 100%);   background: -o-linear-gradient(left, #008000 0%, #008000 40%, #f00 40%, #f00 100%);   background: -ms-linear-gradient(left, #008000 0%, #008000 40%, #f00 40%, #f00 100%);   background: linear-gradient(left, #008000 0%, #008000 40%, #f00 40%, #f00 100%); } a[data-reference-type=\"issue\"][data-checklist=\"5\"] {   position: relative;   padding-bottom: 2px;   text-decoration: none; } a[data-reference-type=\"issue\"][data-checklist=\"5\"]::after {   content: \"\";   position: absolute;   left: 0;   bottom: 0px;   height: 2px;   width: 100%;   background: -webkit-linear-gradient(left, #008000 0%, #008000 50%, #f00 50%, #f00 100%);   background: -moz-linear-gradient(left, #008000 0%, #008000 50%, #f00 50%, #f00 100%);   background: -o-linear-gradient(left, #008000 0%, #008000 50%, #f00 50%, #f00 100%);   background: -ms-linear-gradient(left, #008000 0%, #008000 50%, #f00 50%, #f00 100%);   background: linear-gradient(left, #008000 0%, #008000 50%, #f00 50%, #f00 100%); } a[data-reference-type=\"issue\"][data-checklist=\"8\"] {   position: relative;   padding-bottom: 2px;   text-decoration: none; } a[data-reference-type=\"issue\"][data-checklist=\"8\"]::after {   content: \"\";   position: absolute;   left: 0;   bottom: 0px;   height: 2px;   width: 100%;   background: -webkit-linear-gradient(left, #008000 0%, #008000 80%, #f00 80%, #f00 100%);   background: -moz-linear-gradient(left, #008000 0%, #008000 80%, #f00 80%, #f00 100%);   background: -o-linear-gradient(left, #008000 0%, #008000 80%, #f00 80%, #f00 100%);   background: -ms-linear-gradient(left, #008000 0%, #008000 80%, #f00 80%, #f00 100%);   background: linear-gradient(left, #008000 0%, #008000 80%, #f00 80%, #f00 100%); } a[data-reference-type=\"issue\"][data-checklist=\"7\"] {   position: relative;   padding-bottom: 2px;   text-decoration: none; } a[data-reference-type=\"issue\"][data-checklist=\"7\"]::after {   content: \"\";   position: absolute;   left: 0;   bottom: 0px;   height: 2px;   width: 100%;   background: -webkit-linear-gradient(left, #008000 0%, #008000 70%, #f00 70%, #f00 100%);   background: -moz-linear-gradient(left, #008000 0%, #008000 70%, #f00 70%, #f00 100%);   background: -o-linear-gradient(left, #008000 0%, #008000 70%, #f00 70%, #f00 100%);   background: -ms-linear-gradient(left, #008000 0%, #008000 70%, #f00 70%, #f00 100%);   background: linear-gradient(left, #008000 0%, #008000 70%, #f00 70%, #f00 100%); } a[data-reference-type=\"issue\"][data-checklist=\"8\"] {   position: relative;   padding-bottom: 2px;   text-decoration: none; } a[data-reference-type=\"issue\"][data-checklist=\"8\"]::after {   content: \"\";   position: absolute;   left: 0;   bottom: 0px;   height: 2px;   width: 100%;   background: -webkit-linear-gradient(left, #008000 0%, #008000 80%, #f00 80%, #f00 100%);   background: -moz-linear-gradient(left, #008000 0%, #008000 80%, #f00 80%, #f00 100%);   background: -o-linear-gradient(left, #008000 0%, #008000 80%, #f00 80%, #f00 100%);   background: -ms-linear-gradient(left, #008000 0%, #008000 80%, #f00 80%, #f00 100%);   background: linear-gradient(left, #008000 0%, #008000 80%, #f00 80%, #f00 100%); } a[data-reference-type=\"issue\"][data-checklist=\"9\"] {   position: relative;   padding-bottom: 2px;   text-decoration: none; } a[data-reference-type=\"issue\"][data-checklist=\"9\"]::after {   content: \"\";   position: absolute;   left: 0;   bottom: 0px;   height: 2px;   width: 100%;   background: -webkit-linear-gradient(left, #008000 0%, #008000 90%, #f00 90%, #f00 100%);   background: -moz-linear-gradient(left, #008000 0%, #008000 90%, #f00 90%, #f00 100%);   background: -o-linear-gradient(left, #008000 0%, #008000 90%, #f00 90%, #f00 100%);   background: -ms-linear-gradient(left, #008000 0%, #008000 90%, #f00 90%, #f00 100%);   background: linear-gradient(left, #008000 0%, #008000 90%, #f00 90%, #f00 100%); } a[data-reference-type=\"issue\"][data-checklist=\"10\"] {   position: relative;   padding-bottom: 2px;   text-decoration: none; } a[data-reference-type=\"issue\"][data-checklist=\"10\"]::after {   content: \"\";   position: absolute;   left: 0;   bottom: 0px;   height: 2px;   width: 100%;   background: -webkit-linear-gradient(left, #008000 0%, #008000 100%, #f00 100%, #f00 100%);   background: -moz-linear-gradient(left, #008000 0%, #008000 100%, #f00 100%, #f00 100%);   background: -o-linear-gradient(left, #008000 0%, #008000 100%, #f00 100%, #f00 100%);   background: -ms-linear-gradient(left, #008000 0%, #008000 100%, #f00 100%, #f00 100%);   background: linear-gradient(left, #008000 0%, #008000 100%, #f00 100%, #f00 100%); } ";
GM_addStyle(style);
function gmGet(val) {
  return GM_getValue(val);
}
function gmSet(val, contents) {
  GM_setValue(val, contents);
}
//$($("head")[0]).append($("<style>").html(style));
// Generated by CoffeeScript 1.10.0
(function() {
  var cacheTime, fetches, linkIssue, refresh, regexes, token;

  cacheTime = 20 * 60 * 1000;

  token = gmGet("gitlab-token");

  if (!token || token === "") {
    token = window.prompt("Enter a GitLab API token\nCreate one at https://gitlab.com/profile/personal_access_tokens", "");
    gmSet("gitlab-token", token);
  }

  fetches = {};

  regexes = {
    checkbox: /^\s*- \[[xX\s]\]/gm,
    filled: /^\s*- \[[xX]\]/gm
  };

  linkIssue = function() {
    var _timestamp, e, error, issue, original, p, project, ref, stored;
    ref = $(this).data(), original = ref.original, project = ref.project, issue = ref.issue;
    p = fetches[project + "-" + issue];
    if (!p) {
      try {
        stored = JSON.parse(gmGet("iss-" + project + "-" + issue));
        if (!stored) {
          throw new Error("no stored data");
        }
        _timestamp = stored._timestamp;
        if (new Date() > new Date(_timestamp + cacheTime)) {
          throw new Error("out of date");
        }
        p = Promise.resolve(stored);
      } catch (error) {
        e = error;
        console.log(e);
        p = Promise.resolve($.ajax({
          url: "https://gitlab.com/api/v3/projects/" + project + "/issues/" + issue,
          type: "GET",
          beforeSend: function(xhr) {
            return xhr.setRequestHeader("PRIVATE-TOKEN", token);
          },
          dataType: "json"
        })).then(function(data) {
          data._timestamp = new Date();
          gmSet("iss-" + project + "-" + issue, JSON.stringify(data));
          return data;
        });
      }
    }
    fetches[project + "-" + issue] = p;
    return p.then((function(_this) {
      return function(arg) {
        var all, checked, description, state, title;
        state = arg.state, title = arg.title, description = arg.description;
        if (state === "closed") {
          return $(_this).css("text-decoration", "line-through");
        } else if (regexes.checkbox.test(description)) {
          all = description.match(regexes.checkbox).length;
          checked = 0;
          try {
            checked = description.match(regexes.filled).length;
          } catch (undefined) {}
          return $(_this).attr("data-checklist", Math.round(10 * checked / all)).attr("title", "Issue: " + title + " (" + checked + "/" + all + ")");
        }
      };
    })(this))["catch"](console.log);
  };

  refresh = function() {
    return $("[data-reference-type='issue']").each(linkIssue);
  };

  $(function() {
    return refresh();
  });

}).call(this);
