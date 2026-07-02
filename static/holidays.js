const today = new Date();

// Canada Day is on July 1st
if (today.getMonth() === 6 && today.getDate() === 1) {
    var logo = document.getElementById('logo');
    logo.src = '/Animated-Flag-Canada.gif';
    logo.title = 'Happy Canada Day!';
}

// Swiss National Day is on August 1st
if (today.getMonth() === 7 && today.getDate() === 1) {
    var logo = document.getElementById('logo');
    logo.src = '/Animated-Flag-Switzerland.gif';
    logo.title = 'En schöne 1. August!';
}

// Hari Merdeka is on August 31st
if (today.getMonth() === 7 && today.getDate() === 31) {
    var logo = document.getElementById('logo');
    logo.src = '/Animated-Flag-Malaysia.gif';
    logo.title = 'Selamat Hari Merdeka!';
}

// Malaysia Day is on September 16th
if (today.getMonth() === 8 && today.getDate() === 16) {
    var logo = document.getElementById('logo');
    logo.src = '/Animated-Flag-Malaysia.gif';
    logo.title = 'Selamat Hari Malaysia!';
}
