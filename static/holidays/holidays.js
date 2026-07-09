function setLogo(src, title) {
    var logo = document.getElementById('logo');
    logo.src = src;
    logo.title = title;
}
function isChineseNewYear(date) {
    const newYear = Lunar.fromYmd(date.getFullYear(), 1, 1).getSolar();
    return (date.getMonth() + 1) == newYear.getMonth() && date.getDate() == newYear.getDay();
}
var today = new Date();
//today = new Date(2026, 0, 1); // New Year's Test
//today = new Date(2026, 1, 17); // Chinese New Year's Test
//today = new Date(2026, 6, 1); // Canada Day Test
//today = new Date(2026, 7, 1); // 1. August Test
//today = new Date(2026, 7, 31); // Malaysia Independence Test
//today = new Date(2026, 8, 16); // Malaysia Day Test
//today = new Date(2026, 8, 30); // Truth and Reconciliation Test
//today = new Date(2026, 9, 12); // Thanksgiving Test
//today = new Date(2026, 9, 31); // Halloween Test
//today = new Date(2026, 10, 11); // Remembrance Day Test
//today = new Date(2026, 11, 25); // Christmas Test
switch (today.getMonth()) {
    case 0: // January
        if (today.getDate() === 1) {
            setLogo('/holidays/fireworks.avif', 'Happy New Year!');
        } else if (isChineseNewYear(today)) {
            setLogo('/holidays/fireworks.avif', '恭喜發財');
        }
        break;
    case 1: // February
        if (isChineseNewYear(today)) {
            setLogo('/holidays/fireworks.avif', '恭喜發財');
        }
        break;
    case 6: // July
        if (today.getDate() === 1) {
            setLogo('/holidays/Animated-Flag-Canada.gif', 'Happy Canada Day!');
        }
        break;
    case 7: // August
        if (today.getDate() === 1) {
            setLogo('/holidays/Animated-Flag-Switzerland.gif', 'En schöne 1. August!');
        } else if (today.getDate() === 31) {
            setLogo('/holidays/Animated-Flag-Malaysia.gif', 'Selamat Hari Merdeka!');
        }
        break;
    case 8: // September
        if (today.getDate() === 16) {
            setLogo('/holidays/Animated-Flag-Malaysia.gif', 'Selamat Hari Malaysia!');
        } else if (today.getDate() === 30) {
            setLogo('/holidays/orange-shirt.png', 'Truth and Reconciliation');
        }
        break;
    case 9: // October
        var thanksgiving = new Date(today.getFullYear(), 9, 1);
        thanksgiving.setDate(thanksgiving.getDate() + ((8 - thanksgiving.getDay()) % 7 + 7)); // Calculate 2nd Monday
        if (today.getDate() === thanksgiving.getDate()) {
            setLogo('/holidays/thanksgiving.png', 'Happy Thanksgiving!');
        } else if (today.getDate() === 31) {
            setLogo('/holidays/pumpkin.gif', 'Happy Halloween!');
        }
        break;
    case 10: // November
        if (today.getDate() === 11) {
            setLogo('/holidays/poppy.png', 'Lest We Forget');
        }
        break;
    case 11: // December
        if (today.getDate() === 25) {
            setLogo('/holidays/christmas-tree.webp', 'Merry Christmas!');
        }
        break;
}
