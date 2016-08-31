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
