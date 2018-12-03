+++
title = "Contact"
date = "2018-11-24T12:17:15-08:00"
menu = "main"
+++
## Contact

<form name="contact" action="/contact-success" method="POST" netlify-honeypot="pooh" netlify>
    <label class="hidden">Don't fill this out if you're human<input name="pooh"/></label>
    <label>Name<input name="name" autocomplete="name" type="text"/></label>
    <p></p>
    <label>Email<input name="email" autocomplete="email" type="email"/></label>
    <p></p>
    <label>Message<textarea name="message"></textarea></label>
    <p></p>
    <div netlify-recaptcha></div>
    <p></p>
    <button type="submit">Send</button>
</form>
