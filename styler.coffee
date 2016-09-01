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
      else if regexes.checkbox.test description
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

###
Stores references to issues and merge requests seperated by the project they belong to.
###
class Projects
  constructor: ->
    @projects = {}

  ###
  Adds a new reference to an issue to the model.
  ###
  issue: (project, issue, count, link) ->
    @projects[id] ?= new Project id
    @projects[id].issue issue, count, link

  ###
  Adds a new reference to a merge request to the model.
  ###
  mr: (project, mr, count, link) ->
    @projects[id] ?= new Project id
    @projects[id].mr mr, count, link

  ###
  Hunts in the DOM for references to issues and merge requests
  ###
  refresh: ->
    $("[data-reference-type='issue']")
      .forEach (el, i) =>
        {original, project, issue} = $(el).data()
        count = parseInt $(el).attr("href").match(/\/(\d+)$/)[1]
        @issue project, issue, count, el

    $("[data-reference-type='merge_request']")
      .forEach (el, i) =>
        {original, project} = $(el).data()
        mergeRequest = $(el).data "merge-request"
        count = parseInt $(el).attr("href").match(/\/(\d+)$/)[1]
        @mr project, mergeRequest, count, el

    project.refresh() for project in @projects

###
Stores references to issues and merge requests for a single project.
###
class Project
  constructor: (@id) ->
    @issues = {}
    @merges = {}

  ###
  Store a new reference to an issue.
  ###
  issue: (id, count, link) ->
    @issues[id] ?= new Issue @, id, count
    @issues[id].link link

  ###
  Store a new reference to a merge request.
  ###
  mr: (id, count, link) ->
    @merges[id] ?= new MergeRequest @, id, count
    @merges[id].link link

  ###
  Pulls a page of issues that contains the given issue.
  ###
  pullIssue: (issueID) ->
    pageId = 

  ###
  Pulls a page of merge requests that contain the given merge request.
  ###
  pullMergeRequest: (mergeID) ->

  refresh: ->
    issue.refresh() for issue in @issues
    merge.refresh() for merge in @merges

class Reference

  @prefix = "unknown-"

  @category = "unknown"

  @cacheTime = 20 * 60 * 1000

  constructor: (@project, @id, @projectID) ->
    @links = []

  link: (link) ->
    @links.push link if link not in @links

  refresh: ->
    data = gmGet "#{@constructor.prefix}#{@id}"
    if @outdated data
      @project["pull"+@constructor.category] @projectID
    else
      #TODO use data

  outdated: (data) ->
    not data or not data._version or data._version isnt GM_info.script.version or
    not data._timestamp or new Date() > new Date(data._timestamp + @constructor.cacheTime)

###
Stores a reference to an issue.
###
class Issue extends Reference

  @prefix = "iss-"

  @category = "Issue"

  constructor: (proj, id, pid) -> super proj, id, pid

###
Stores a reference to a merge request.
###
class MergeRequest extends Reference

  @prefix = "mr-"

  @category = "MergeRequest"

  constructor: (proj, id, pid) -> super proj, id, pid

projects = new Projects()
$ -> projects.refresh()
