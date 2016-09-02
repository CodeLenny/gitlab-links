# 20 minutes
cacheTime = gmGet "cache-duration"
cacheTime ?= 20 * 60 * 1000
token = gmGet "gitlab-token"
showProgressBar = gmGet "show-progress"
showProgressBar ?= yes

fetches = {}

regexes =
  checkbox: /^\s*- \[[xX\s]\]/gm
  filled: /^\s*- \[[xX]\]/gm

linkIssue = ->
  {original, project, issue} = $(@).data()
  p = fetches["#{project}-#{issue}"]
  if not p
    try
      stored = JSON.parse gmGet "iss-#{project}-#{issue}"
      throw new Error("no stored data") if not stored
      {_version, _timestamp} = stored
      throw new Error("cached in a different version") if _version isnt GM_info.script.version
      throw new Error("out of date") if new Date() > new Date(_timestamp + cacheTime)
      p = Promise.resolve stored
    catch e
      console.log e
      p = Promise
        .resolve $.ajax
          url: "https://gitlab.com/api/v3/projects/#{project}/issues/#{issue}"
          type: "GET"
          beforeSend: (xhr) -> xhr.setRequestHeader "PRIVATE-TOKEN", token
          dataType: "json"
        .then (data) ->
          data._timestamp = Date.now()
          data._version = GM_info.script.version
          gmSet "iss-#{project}-#{issue}", JSON.stringify data
          data
  fetches["#{project}-#{issue}"] = p
  p
    .then ({state, title, description}) =>
      if state is "closed"
        $(@).css "text-decoration", "line-through"
      else if showProgressBar and regexes.checkbox.test description
        all = description.match(regexes.checkbox).length
        checked = 0
        try
          checked = description.match(regexes.filled).length
        percent = Math.round 10 * checked / all
        percent = 10 if percent is 0 and checked > 0
        percent = 90 if percent is 100 and checked < all
        $(@)
          .attr "data-checklist", percent
          .attr "title", "Issue: #{title} (#{checked}/#{all})"
    .catch console.log

refresh = ->
  $("[data-reference-type='issue']").each linkIssue

isSettingsURL = (url) ->
  url.indexOf("codelenny.gitlab.io") > -1 or
  url.indexOf("gitlab-links.codelenny.com") > -1

showSettings = ->
  # Configure Alerts
  $("#notfound").hide()
  latest = $("#latestVersion").text()
  if latest isnt semver
    $("#version").show()
    $("#userVersion").text semver
  else
    $("#isfound").show()
  # Populate fields
  if token and token isnt ""
    $("#apiKey").val("[hidden]").parents(".form-group").addClass "is-filled"
    $("#apiKey").siblings(".bmd-help").append "  API key hidden for security."
  if cacheTime and typeof cacheTime is typeof 10
    $("#cacheDuration").val(cacheTime / (60 * 1000)).parents(".form-group").addClass "is-filled"
  if showProgressBar
    $("#showProgress").attr "checked", "checked"
  $("#cacheSize").text gmList().length - 3

if isSettingsURL window.location.href
  showSettings()
else
  if not token or token is ""
    token = window.prompt "Enter a GitLab API token\nCreate one at https://gitlab.com/profile/personal_access_tokens", ""
    gmSet "gitlab-token", token
  $ -> refresh()
