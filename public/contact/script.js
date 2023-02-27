// https://stackoverflow.com/a/46163215
if (document.referrer) {
    document.getElementById('referrer').value = document.referrer;

    var element = document.getElementById('cancel');
    element.setAttribute('href', document.referrer);
    element.onclick = function() {
        history.back();
        return false;
    }
}