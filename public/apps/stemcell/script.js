let departments = 'Manufacturing|Sales|Research & Development'.split('|');
let positions = 'Entry Level|Manager'.split('|');

function randomize() {
    document.getElementById('department').textContent = departments[Math.floor(Math.random()*departments.length)];
    document.getElementById('position').textContent = positions[Math.floor(Math.random()*positions.length)];
}

window.onload = () => {
    document.getElementById('randomize').onclick = randomize;
    randomize();
}
