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
        } else if (today.getDate() === 30) {
            var logo = document.getElementById('logo');
            logo.src = '/holidays/orange-shirt.png';
            logo.title = 'Truth and Reconciliation';
        }
        break;
    case 9: // October
        var thanksgiving = new Date(today.getFullYear(), 9, 1);
        thanksgiving.setDate(thanksgiving.getDate() + ((8 - thanksgiving.getDay()) % 7 + 7)); // Calculate 2nd Monday
        if (today.getDate() === thanksgiving.getDate()) {
            var logo = document.getElementById('logo');
            logo.src = '/holidays/thanksgiving.png';
            logo.title = 'Happy Thanksgiving!';
        } else if (today.getDate() === 31) {
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
