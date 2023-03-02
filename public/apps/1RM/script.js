const onerms = [];
const percentages = [];

window.onload = () => {
    const onermElement = document.getElementById("onerm");
    const percentageElement = document.getElementById("percentage");
    const tableElement = document.getElementById("table");
    const addOneRmElement = document.getElementById("add-onerm");
    const addPercentageElement = document.getElementById("add-percentage");

    addOneRmElement.onclick = () => {
        onerms.push(onermElement.value);
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
        percentages.push(percentageElement.value);
        percentages.sort((a, b) => {return a-b;});
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
    document.getElementById("reset").onclick = () => {
        onerms.length = 0;
        percentages.length = 0;
        render();
    };
    const render = () => {
        var content = "<tr><th></th>";
        for (onerm of onerms) {
            content += "<th>" + onerm + "</th>";
        }
        content += "</tr>";
        for (percentage of percentages) {
            content += "<tr><th>" + percentage + "%</th>";
            for (onerm of onerms) {
                content += "<td>" + (onerm * percentage / 100) + "</td>";
            }
            content += "</tr>"
        }
        tableElement.innerHTML = content;
    };
}