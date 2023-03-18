const values = []; // contains either {weight:10} or {percent:10} TODO localStorage
const explosiveEfforts = [ 20, 23, 27 ];
const dynamicEfforts = [ 25, 50, 55, 60 ];
const repetitiveEfforts = [ 68.5, 73.5, 75, 78.5, 83.5 ];
const maxEfforts = [ 85, 93.5 ];
var efforts = 0; // 0=all, 1=explosive, 2=dynamic, 3=repetitive, 4=max, 5=custom TODO localStorage

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
        values.push({percent: parseInt(percentageElement.value)});
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
    document.getElementById("all-efforts").onclick = () => {
        efforts = 0;
        render();
    };
    document.getElementById("explosive-efforts").onclick = () => {
        efforts = 1;
        render();
    };
    document.getElementById("dynamic-efforts").onclick = () => {
        efforts = 2;
        render();
    };
    document.getElementById("repetitive-efforts").onclick = () => {
        efforts = 3;
        render();
    };
    document.getElementById("max-efforts").onclick = () => {
        efforts = 4;
        render();
    };
    document.getElementById("custom-efforts").onclick = () => {
        efforts = 5;
        render();
    };
    const render = () => {
        var content = "<tr><th></th>";
        const onerms = values.filter(v => 'weight' in v).map(v => v.weight);
        for (onerm of onerms) {
            content += "<th>" + onerm + "</th>";
        }
        content += "</tr>";
        var percentages = values.filter(v => 'percent' in v).map(v => v.percent);
        switch (efforts) {
            case 0:
                percentages = percentages.concat(explosiveEfforts, dynamicEfforts, repetitiveEfforts, maxEfforts);
                break;
            case 1:
                percentages = percentages.concat(explosiveEfforts);
                break;
            case 2:
                percentages = percentages.concat(dynamicEfforts);
                break;
            case 3:
                percentages = percentages.concat(repetitiveEfforts);
                break;
            case 4:
                percentages = percentages.concat(maxEfforts);
                break;
        }
        percentages.sort((a, b) => a - b);
        for (percent of percentages) {
            content += "<tr><th>" + percent + "%</th>";
            for (onerm of onerms) {
                content += "<td>" + (onerm * percent / 100) + "</td>";
            }
            content += "</tr>"
        }
        tableElement.innerHTML = content;
    };
    render();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js');
    }
}