+++
title = "Contact"
date = "2018-11-24T12:17:15-08:00"
menu = "main"
+++
<h1 class="title">Contact</h1>

<p>Got questions or comments? Send them to me!</p>

<form name="contact" action="/contact-success" method="POST" netlify-honeypot="pooh" netlify>
    <div class="field hidden">
        <label class="label" for="pooh">Don't fill this out if you're human</label>
        <div class="control">
            <input class="input" id="pooh" name="pooh"/>
        </div>
    </div>
    <div class="field">
        <label class="label" for="name">Name</label>
        <div class="control">
            <input class="input" id="name" name="name" autocomplete="name" type="text"/>
        </div>
    </div>
    <div class="field">
        <label class="label" for="email">Email</label>
        <div class="control">
            <input class="input" id="email" name="email" autocomplete="email" type="email"/>
        </div>
    </div>
    <div class="field">
        <label class="label" for="message">Message</label>
        <div class="control">
            <textarea class="textarea" id="message" name="message"></textarea>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <button class="button is-link is-pulled-right" type="submit">Send</button>
        </div>
    </div>
</form>
