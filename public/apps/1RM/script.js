const onerms = [];
const percentages = [];
const values = []; // contains either {weight:10} or {percent:10}

window.onload = () => {
    const onermElement = document.getElementById("onerm");
    const percentageElement = document.getElementById("percentage");
    const tableElement = document.getElementById("table");
    const addOneRmElement = document.getElementById("add-onerm");
    const addPercentageElement = document.getElementById("add-percentage");

    addOneRmElement.onclick = () => {
        values.push({weight: onermElement.value});
        onermElement.value = "";
        render();
        onermElement.focus();
    };
    onermElement.onkeyup = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addOneRmElement.click();
        }
    };
    addPercentageElement.onclick = () => {
        values.push({percent: percentageElement.value});
        percentageElement.value = "";
        render();
        percentageElement.focus();
    };
    percentageElement.onkeyup = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addPercentageElement.click();
        }
    };
    document.getElementById("undo").onclick = () => {
        if (values.length == 0) {
            return;
        }
        values.length = values.length - 1;
        render();
    };
    document.getElementById("reset").onclick = () => {
        values.length = 0;
        render();
    };
    const render = () => {
        var content = "<tr><th></th>";
        const onerms = values.filter(v => 'weight' in v).map(v => v.weight);
        for (onerm of onerms) {
            content += "<th>" + onerm + "</th>";
        }
        content += "</tr>";
        for (v of values) {
            if (!('percent' in v)) {
                continue;
            }
            content += "<tr><th>" + v.percent + "%</th>";
            for (onerm of onerms) {
                content += "<td>" + (onerm * v.percent / 100) + "</td>";
            }
            content += "</tr>"
        }
        tableElement.innerHTML = content;
    };

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js');
    }
}