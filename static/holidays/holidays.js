const today = new Date();

switch (today.getMonth()) {
    case 6: // July
        if (today.getDate() === 1) {
            var logo = document.getElementById('logo');
            logo.src = '/holidays/Animated-Flag-Canada.gif';
            logo.title = 'Happy Canada Day!';
        }
        break;
    case 7: // August
        if (today.getDate() === 1) {
            var logo = document.getElementById('logo');
            logo.src = '/holidays/Animated-Flag-Switzerland.gif';
            logo.title = 'En schöne 1. August!';
        } else if (today.getDate() === 31) {
            var logo = document.getElementById('logo');
            logo.src = '/holidays/Animated-Flag-Malaysia.gif';
            logo.title = 'Selamat Hari Merdeka!';
        }
        break;
    case 8: // September
        if (today.getDate() === 16) {
            var logo = document.getElementById('logo');
            logo.src = '/holidays/Animated-Flag-Malaysia.gif';
            logo.title = 'Selamat Hari Malaysia!';
        }
        break;
}
