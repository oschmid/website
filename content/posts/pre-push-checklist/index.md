+++
title = "Pre-Push Checklist"
date = "2021-03-16T20:57:12-07:00"
image = ""
+++

Last week I made two commits that broke really obvious things. I was rushing and thought to myself "This is a simple change. Let's just check it in." I should have realized that these are every developer's famous last words...

After these two incidents happened so close to each other, I knew I  needed a way to remind myself to be more careful. To sanity check my changes for things the Continuous Integration build might miss.

### Checklist for Pushing Code

1. Rebase, build, and run tests (it's quicker to run these locally rather than wait for CI build to fail)
1. Sanity test changes
    1. Check that the app still starts
    1. Do a basic manual end-to-end sanity test to show your changes work
    1. Check the functionality [around your change](https://www.gamasutra.com/view/news/127467/Opinion_A_Precommit_Checklist.php) still works.
1. Review the list of files in each commit (`git log --stat`)
    1. Are all necessary files included?
    1. Are any files included that shouldn't be?
1. Read through the diff(s)
    1. Are there any unfinished sections?
    1. Are there any sections that you meant to refactor?
    1. Is each change in a commit related? (e.g. [separate](https://git-scm.com/book/en/v2/Git-Tools-Interactive-Staging) incidental code cleanups from feature/bug changes for clarity.)
    1. Do you want to reword the change description? (Remember it should have an [imperative header, and a body describing what and why](https://chris.beams.io/posts/git-commit/))
1. Update relevant documentation

---

Inspired by [Victoria Drake](https://dev.to/victoria/an-automatic-interactive-pre-commit-checklist-in-the-style-of-infomercials-14i7) I turned this list into a git hook. She likes to do her checklist before each commit but for my workflow I prefer running it before a push. To do this in git, put the script below into the `.git/hooks` directory and name it `pre-push`.

{{< highlightFile "pre-push" "sh" "linenos=table" >}}

That's it! Let me know if you have a similar checklist process. Especially if it has something you think it has something I should add to mine!

