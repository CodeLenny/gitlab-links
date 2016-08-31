# 20 minutes
cacheTime = 20 * 60 * 1000
token = gmGet "gitlab-token"
if not token or token is ""
  token = window.prompt "Enter a GitLab API token\nCreate one at https://gitlab.com/profile/personal_access_tokens", ""
  gmSet "gitlab-token", token

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
      {_timestamp} = stored
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
          data._timestamp = new Date()
          gmSet "iss-#{project}-#{issue}", JSON.stringify data
          data
  fetches["#{project}-#{issue}"] = p
  p
    .then ({state, title, description}) =>
      if state is "closed"
        $(@).css "text-decoration", "line-through"
      else if regexes.checkbox.test description
        all = description.match(regexes.checkbox).length
        checked = 0
        try
          checked = description.match(regexes.filled).length
        $(@)
          .attr "data-checklist", Math.round 10 * checked / all
          .attr "title", "Issue: #{title} (#{checked}/#{all})"
    .catch console.log

refresh = ->
  $("[data-reference-type='issue']").each linkIssue

$ -> refresh()
