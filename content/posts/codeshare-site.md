+++
title = "Codeshare Site"
date = "2020-08-07T20:11:42-07:00"
image = ""
draft = true
+++
Features

- Group editing of a single document
- Sharing of cursor position and screen name
- Screen name is persisted in localstorage
- Code is deleted 24 hours after last edit
- Rich text (although limited to keyboard shortcuts so this is a hidden feature)

I've used it at work for an interview already and it was quite successful. It takes a while to spin up but once up it's performant enough. This might be because it doesn't have to support thousands of users...

Still a code sharing site should be fairly straight forward to scale up. It isn't Twitter. The fan out for updates is limited to the small group of people editing a single document.
