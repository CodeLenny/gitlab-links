# GitLab Link Styler
Styles closed issues and merge requests on GitLab.  Reads links to issues, and looks each one up in GitLab via the
GitLab API.  Closed issues are crossed out.  Open issues with checklists in their description are underlined with a
progress bar.

![Link Styler Example](http://i.imgur.com/iSUZum2.png)

In this example, the issues 21528 and 21613 were closed (at the time of the screenshot), while 21706 was open, and had
a checklist in it's [description](https://gitlab.com/gitlab-org/gitlab-ce/issues/21706), so a progress bar was added
as an underline.

## Installation

With [TamperMonkey](https://tampermonkey.net/) installed in your browser,
visit the [Raw Script](https://raw.githubusercontent.com/CodeLenny/gitlab-links/master/styler.user.js),
which TamperMonkey will prompt you to install.

The script is set to automatically update itself, but the TamperMonkey extension has a very slow update interval by
default.  I recommend adjusting the update frequency in the TamperMonkey settings.

## Settings

Visit [http://gitlab-links.codelenny.com/](gitlab-links.codelenny.com) to configure the plugin.

## Change Log

#### v0.3 (8/11/2016)

- Added assets forgotten in v0.2

#### v0.2 (8/11/2016)

- Added `_version` flag to the stored data, to ensure bugfixes to caching are applied.
- Fixed timestamp caching issue
- Tweaked rounding:
  - if the percent of completed tasks would round to 0%, but one or more tasks are completed, round up to 10% so the issue doesn't appear unstarted
  - if the percent of completed tasks would round to 100%, but one or more tasks are not yet completed, round down to 90% so the issue doesn't appear fully resolved
