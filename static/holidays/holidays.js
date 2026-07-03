const today = new Date();

switch (today.getMonth()) {
    case 0: // January
        if (today.getDate() === 1) {
            var logo = document.getElementById('logo');
            logo.src = '/holidays/fireworks.gif';
            logo.title = 'Happy New Year!';
        }
        break;
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
    case 9: // October
        if (today.getDate() === 31) {
            var logo = document.getElementById('logo');
            logo.src = '/holidays/pumpkin.gif';
            logo.title = 'Happy Halloween!';
        }
        break;
    case 10: // November
        if (today.getDate() === 11) {
            var logo = document.getElementById('logo');
            logo.src = '/holidays/poppy.png';
            logo.title = 'Lest We Forget';
        }
        break;
    case 11: // December
        if (today.getDate() === 25) {
            var logo = document.getElementById('logo');
            logo.src = '/holidays/christmas-tree.gif';
            logo.title = 'Merry Christmas!';
        }
        break;
}
