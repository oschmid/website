const values = []; // contains either {weight:10} or {percent:10}
const explosiveEfforts = [ 20, 23, 27 ];
const dynamicEfforts = [ 25, 50, 55, 60 ];
const repetitiveEfforts = [ 68.5, 73.5, 75, 78.5, 83.5 ];
const maxEfforts = [ 85, 93.5 ];
var efforts = 5; // 0=all, 1=explosive, 2=dynamic, 3=repetitive, 4=max, 5=custom

window.onload = () => {
    const weightElement = document.getElementById("weight");
    const percentageElement = document.getElementById("percentage");
    const tableElement = document.getElementById("table");
    const addWeightElement = document.getElementById("add-weight");
    const addPercentageElement = document.getElementById("add-percentage");
    const allEffortsElement = document.getElementById("all-efforts");
    const explosiveEffortsElement = document.getElementById("explosive-efforts");
    const dynamicEffortsElement = document.getElementById("dynamic-efforts");
    const repetitiveEffortsElement = document.getElementById("repetitive-efforts");
    const maxEffortsElement = document.getElementById("max-efforts");
    const customEffortsElement = document.getElementById("custom-efforts");

    // Updates
    const addValue = (value) => {
        values.push(value);
        localStorage.setItem('values', JSON.stringify(values));
    };
    const setEfforts = (e) => {
        if (isNaN(e)) return;
        efforts = e;
        localStorage.setItem('efforts', JSON.stringify(efforts));

        allEffortsElement.classList.remove("is-dark");
        explosiveEffortsElement.classList.remove("is-dark");
        dynamicEffortsElement.classList.remove("is-dark");
        repetitiveEffortsElement.classList.remove("is-dark");
        maxEffortsElement.classList.remove("is-dark");
        customEffortsElement.classList.remove("is-dark");

        allEffortsElement.disabled = false;
        explosiveEffortsElement.disabled = false;
        dynamicEffortsElement.disabled = false;
        repetitiveEffortsElement.disabled = false;
        maxEffortsElement.disabled = false;
        customEffortsElement.disabled = false;

        switch (e) {
            case 0:
                allEffortsElement.classList.add("is-dark");
                allEffortsElement.disabled = true;
                break;
            case 1:
                explosiveEffortsElement.classList.add("is-dark");
                explosiveEffortsElement.disabled = true;
                break;
            case 2:
                dynamicEffortsElement.classList.add("is-dark");
                dynamicEffortsElement.disabled = true;
                break;
            case 3:
                repetitiveEffortsElement.classList.add("is-dark");
                repetitiveEffortsElement.disabled = true;
                break;
            case 4:
                maxEffortsElement.classList.add("is-dark");
                maxEffortsElement.disabled = true;
                break;
            case 5:
                customEffortsElement.classList.add("is-dark");
                customEffortsElement.disabled = true;
                break;
        }
    };

    // View
    const renderWeightElement = () => {
        const w = parseInt(weightElement.value);
        addWeightElement.disabled = isNaN(w) || w == 0;
    };
    const renderPercentageElement = () => {
        const w = parseInt(percentageElement.value);
        addPercentageElement.disabled = isNaN(w) || w == 0;
    };
    const render = () => {
        undo.disabled = values.length === 0;
        reset.disabled = values.length === 0;

        var content = "<thead><tr>";
        const weights = values.filter(v => 'weight' in v).map(v => v.weight);
        var percentages = values.filter(v => 'percent' in v).map(v => v.percent);
        if (weights.length > 0 && (efforts != 5 || percentages.length > 0)) {
            content += "<th></th>"
        }
        for (weight of weights) {
            content += "<th>" + weight + "</th>";
        }
        content += "</tr></thead><tbody>";
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
            for (weight of weights) {
                content += "<td>" + (weight * percent / 100) + "</td>";
            }
            content += "</tr>"
        }
        content += "</tbody>";
        tableElement.innerHTML = content;
    };

    // Events
    addWeightElement.onclick = () => {
        addValue({weight: parseInt(weightElement.value)});
        render();
        weightElement.value = "";
        weightElement.focus();
        renderWeightElement();
    };
    weightElement.onkeyup = (event) => {
        if (event.key === "Enter" && parseInt(weightElement.value) > 0) {
            event.preventDefault();
            addWeightElement.click();
        }
        renderWeightElement();
    };
    weightElement.onmouseup = (event) => {
        renderWeightElement();
    };
    addPercentageElement.onclick = () => {
        addValue({percent: parseInt(percentageElement.value)});
        render();
        percentageElement.value = "";
        percentageElement.focus();
        addPercentageElement.disabled = percentageElement.value === "";
    };
    percentageElement.onkeyup = (event) => {
        if (event.key === "Enter" && parseInt(percentageElement.value) > 0) {
            event.preventDefault();
            addPercentageElement.click();
        }
        renderPercentageElement();
    };
    percentageElement.onmouseup = (event) => {
        renderPercentageElement();
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
    allEffortsElement.onclick = () => {
        setEfforts(0);
        render();
    };
    explosiveEffortsElement.onclick = () => {
        setEfforts(1);
        render();
    };
    dynamicEffortsElement.onclick = () => {
        setEfforts(2);
        render();
    };
    repetitiveEffortsElement.onclick = () => {
        setEfforts(3);
        render();
    };
    maxEffortsElement.onclick = () => {
        setEfforts(4);
        render();
    };
    customEffortsElement.onclick = () => {
        setEfforts(5);
        render();
    };

    // Init
    values.push(...(JSON.parse(localStorage.getItem('values') || "[]")));
    setEfforts(parseInt(JSON.parse(localStorage.getItem('efforts'))));
    render();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js');
    }
}