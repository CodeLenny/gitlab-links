Promise = require "bluebird"
fs = Promise.promisifyAll require "fs-extra"
sass = Promise.promisifyAll require "node-sass"
blade = Promise.promisifyAll require "blade"
{spawn, exec} = require "child-process-promise"
chalk = require "chalk"
coffee = require "coffee-script"
stylus = Promise.promisifyAll require "stylus"

semver = require("./package.json").version

version = ->
  [a,b,c] = semver.split(".")
  "#{a}.#{("00"+b).slice -3}#{("00"+c).slice -3}"

header = """
// ==UserScript==
// @name         GitLab Link Styler
// @namespace    http://ryanleonard.us/
// @version      #{version()}
// @description  Styles closed issues and merge requests on GitLab
// @author       Ryan Leonard
// @match        http*://gitlab.com/*
// @match        http*://codelenny.github.io/*
// @match        http*://gitlab-links.codelenny.com/*
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.4.5/bluebird.min.js
// @connect      gitlab.com
// @updateURL    https://raw.githubusercontent.com/CodeLenny/gitlab-links/master/styler.meta.js
// @downloadURL  https://raw.githubusercontent.com/CodeLenny/gitlab-links/master/styler.user.js
// ==/UserScript==
"""

userScript = (js, css) ->
  """
    #{header}
    style = "#{css.replace(/\n/g, " ").replace(/"/g, '\\"')}";
    semver = "#{semver}";
    GM_addStyle(style);
    function gmGet(val) {
      return GM_getValue(val);
    }
    function gmSet(val, contents) {
      GM_setValue(val, contents);
    }
    function gmList() {
      return GM_listValues();
    }
    #{js}
  """

stylesheet = ->
  fs
    .readFileAsync "#{__dirname}/style.styl", "utf8"
    .then stylus.renderAsync

tamperMonkey = (options) ->
  fs
    .readFileAsync "#{__dirname}/styler.coffee", "utf8"
    .then (src) ->
      Promise.join Promise.resolve(coffee.compile(src)), stylesheet()
    .then ([js, css]) -> userScript js, css
    .then (user) ->
      Promise.join fs.writeFileAsync("styler.user.js", user), fs.writeFileAsync("styler.meta.js", header)
    .then ->
      if options.versionCommit
        exec "git add styler.meta.js styler.user.js; git commit -m 'Updated version.'"

docsSass = ->
  sass
    .renderAsync
      file: "#{__dirname}/_gh-pages/docs.scss"
      includePaths: ['_gh-pages', 'node_modules']
    .then ({css}) ->
      fs.writeFileAsync "#{__dirname}/_gh-pages/docs.css", css

docsBlade = ->
  blade
    .renderFileAsync "#{__dirname}/_gh-pages/index.blade", {semver}
    .then (html) ->
      fs.writeFileAsync "#{__dirname}/_gh-pages/index.html", html

docs = ->
  Promise
    .join docsSass(), docsBlade()
    .then ->
      exec "cd #{__dirname}/_gh-pages; git add .; git commit -m 'Updated documentation.'; git push; cd #{__dirname}; git add _gh-pages; git commit -m 'Updated gh-pages.'"
    .then ({stdout, stderr}) ->
      console.log chalk.gray stdout
      console.log chalk.yellow stderr

option "-c", "--versionCommit", "Add and commit built files, intended to be run on 'version'."

task "build:tampermonkey", "Build assets for TamperMonkey", (options) ->
  tamperMonkey options
    .then -> console.log chalk.blue "Built TamperMonkey."
    .catch console.log

task "docs:sass", "Build SASS stylesheets for the docs", (options) ->
  docsSass()
    .then -> console.log chalk.blue "Built SASS."
    .catch console.log

task "docs:blade", "Build Blade pages for the docs", (options) ->
  docsBlade()
    .then -> console.log chalk.blue "Built Blade."
    .catch console.log

task "docs", "Build assets for the docs", (options) ->
  docs()
    .then ->
      console.log chalk.blue "Built docs."
    .catch console.log

task "all", "Build output and docs", (options) ->
  tamperMonkey options
    .then docs
    .then ->
      console.log chalk.blue "Built project."
    .catch console.log
