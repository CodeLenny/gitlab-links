Promise = require "bluebird"
fs = Promise.promisifyAll require "fs-extra"
sass = Promise.promisifyAll require "node-sass"
blade = Promise.promisifyAll require "blade"
{spawn, exec} = require "child-process-promise"
chalk = require "chalk"

docsSass = ->
  sass
    .renderAsync
      file: "#{__dirname}/_gh-pages/docs.scss"
      includePaths: ['_gh-pages', 'node_modules']
    .then ({css}) ->
      fs.writeFileAsync "#{__dirname}/_gh-pages/docs.css", css

docsBlade = ->
  blade
    .renderFileAsync "#{__dirname}/_gh-pages/index.blade", {}
    .then (html) ->
      fs.writeFileAsync "#{__dirname}/_gh-pages/index.html", html

task "docs:sass", "Build SASS stylesheets for the docs", (options) ->
  docsSass()
    .then -> console.log chalk.blue "Built SASS."
    .catch console.log

task "docs:blade", "Build Blade pages for the docs", (options) ->
  docsBlade()
    .then -> console.log chalk.blue "Built Blade."
    .catch console.log

task "docs", "Build assets for the docs", (options) ->
  Promise
    .join docsSass(), docsBlade()
    .then ->
      exec "cd #{__dirname}/_gh-pages; git add .; git commit -m 'Updated documentation.'; git push; cd #{__dirname}; git add _gh-pages; git commit -m 'Updated gh-pages.'"
    .then ({stdout, stderr}) ->
      console.log chalk.gray stdout
      console.log chalk.yellow stderr
    .then ->
      console.log chalk.blue "Built docs."
    .catch console.log
