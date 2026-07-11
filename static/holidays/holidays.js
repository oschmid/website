function daysBetween(date1, date2) {
  const diffInMs = date2 - date1;
  return Math.round(diffInMs / 86400000); // Number of milliseconds in one day: 24 * 60 * 60 * 1000
}
function getZodiacAnimal(year) {
    const animals = ['monkey', 'rooster', 'dog', 'pig', 'rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat'];
    return '/holidays/zodiac/' + animals[year % 12] + '.png';
}
function getChineseNewYear(year) {
    const date = new Date(Lunar.fromYmd(year, 1, 1).getSolar().toString()); // Jan 21 - Feb 20
    return { date, src: getZodiacAnimal(year), title: '恭喜發財', name: 'Chinese New Year' };
}
function getMidAutumnFestival(year) {
    const date = new Date(Lunar.fromYmd(year, 8, 15).getSolar().toString()); // Sep 7 - Oct 8
    return { date, src: '/holidays/mooncake.png', title: '中秋節快樂', name: 'the Mid-Autumn Festival' };
}
function getThanksgiving(year) {
    var date = new Date(today.getFullYear(), 9, 1);
    date.setDate(date.getDate() + ((8 - date.getDay()) % 7 + 7)); // 2nd Monday (Oct 8 - 14)
    return { date, src: '/holidays/thanksgiving.png', title: 'Happy Thanksgiving!', name: 'Thanksgiving'};
}
var today = new Date();
//today = new Date(2026, 0, 1); // New Year's Test
//today = new Date(2026, 1, 7); // 10 days before Chinese New Year Test (Horse)
//today = new Date(2026, 1, 17); // Chinese New Year's Test (Horse)
//today = new Date(2026, 6, 1); // Canada Day Test
//today = new Date(2026, 7, 1); // 1. August Test
//today = new Date(2026, 7, 31); // Malaysia Independence Test
//today = new Date(2026, 8, 16); // Malaysia Day Test
//today = new Date(2026, 8, 25); // Mid-Autumn Festival Test
//today = new Date(2026, 8, 30); // Truth and Reconciliation Test
//today = new Date(2026, 9, 12); // Thanksgiving Test
//today = new Date(2026, 9, 31); // Halloween Test
//today = new Date(2026, 10, 11); // Remembrance Day Test
//today = new Date(2026, 11, 25); // Christmas Test
//today = new Date(2026, 11, 26); // 6 days to New Year's Test
const year = today.getFullYear();
const holiday = [
    getChineseNewYear(year),
    getMidAutumnFestival(year),
    getThanksgiving(year),
    { date: new Date(year, 0, 1), src: '/holidays/fireworks.avif', title: 'Happy New Year!', name: 'the New Year' },
    { date: new Date(year, 6, 1), src: '/holidays/Animated-Flag-Canada.gif', title: 'Happy Canada Day!', name: 'Canada Day' },
    { date: new Date(year, 7, 1), src: '/holidays/Animated-Flag-Switzerland.gif', title: 'En schöne 1. August!', name: '1. August' },
    { date: new Date(year, 7, 31), src: '/holidays/Animated-Flag-Malaysia.gif', title: 'Selamat Hari Merdeka!', name: 'Malaysia Independence Day' },
    { date: new Date(year, 8, 16), src: '/holidays/Animated-Flag-Malaysia.gif', title: 'Selamat Hari Malaysia!', name: 'Malaysia Day' },
    { date: new Date(year, 8, 30), src: '/holidays/orange-shirt.png', title: 'Truth and Reconciliation', name: 'Truth and Reconciliation Day' },
    { date: new Date(year, 9, 31), src: '/holidays/pumpkin.gif', title: 'Happy Halloween!', name: 'Halloween' },
    { date: new Date(year, 10, 11), src: '/holidays/poppy.png', title: 'Lest We Forget', name: 'Remembrance Day' },
    { date: new Date(year, 11, 25), src: '/holidays/christmas-tree.webp', title: 'Merry Christmas!', name: 'Christmas' },
    { date: new Date(year + 1, 0, 1), src: '/holidays/fireworks.avif', title: 'Happy New Year!', name: 'the New Year' }
].reduce((closest, current) => {
    const daysToClosest = daysBetween(today, closest.date);
    const daysToCurrent = daysBetween(today, current.date);
    return daysToClosest < 0 || daysToCurrent >= 0 && (daysToCurrent < daysToClosest) ? current : closest;
});
const logo = document.getElementById('logo');
const daysToHoliday = daysBetween(today, holiday.date);
if (daysToHoliday == 0) {
    logo.src = holiday.src;
    logo.title = holiday.title;
} else {
    logo.title = daysToHoliday + ' days to ' + holiday.name;
}
