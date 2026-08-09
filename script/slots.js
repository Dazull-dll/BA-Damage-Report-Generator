import { state } from './state.js';
import { dom } from './dom.js';
import { updateAllBars } from './bars.js';
export function resetTriggerContent(triggerElement) {
    triggerElement.replaceChildren();
    const contentDiv = document.createElement("div");
    contentDiv.className = "selected-content";
    contentDiv.style.display = "flex";
    contentDiv.style.alignItems = "center";
    const span = document.createElement("span");
    span.textContent = "Select Student";
    contentDiv.appendChild(span);
    triggerElement.appendChild(contentDiv);
}
export function createSlot(type, isFirst) {
    const element = document.createElement("div");
    element.className = "element";
    const new_get_name = document.createElement("input");
    new_get_name.type = "text";
    new_get_name.placeholder = "Name";
    const customSelectWrapper = document.createElement("div");
    customSelectWrapper.className = "custom-select-wrapper";
    const trigger = document.createElement("div");
    trigger.className = "custom-select-trigger";
    resetTriggerContent(trigger);
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "custom-select-options";
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "custom-select-search";
    searchInput.placeholder = "Search student...";
    const optionsList = document.createElement("div");
    optionsList.className = "options-list";
    optionsContainer.appendChild(searchInput);
    optionsContainer.appendChild(optionsList);
    customSelectWrapper.appendChild(trigger);
    customSelectWrapper.appendChild(optionsContainer);
    state.studentData.forEach(std => {
        const opt = document.createElement("div");
        opt.className = "custom-option";
        opt.dataset.value = std.source;
        opt.dataset.name = std.name;
        const optImg = document.createElement("img");
        optImg.src = std.source;
        optImg.className = "custom-option-img";
        optImg.alt = std.name;
        const optText = document.createElement("span");
        optText.textContent = std.name;
        opt.appendChild(optImg);
        opt.appendChild(optText);
        opt.addEventListener("click", () => {
            trigger.replaceChildren();
            const contentDiv = document.createElement("div");
            contentDiv.style.display = "flex";
            contentDiv.style.alignItems = "center";
            const triggerImg = document.createElement("img");
            triggerImg.src = std.source;
            triggerImg.className = "trigger-img";
            triggerImg.alt = std.name;
            const triggerText = document.createElement("span");
            triggerText.textContent = std.name;
            contentDiv.appendChild(triggerImg);
            contentDiv.appendChild(triggerText);
            trigger.appendChild(contentDiv);
            new_get_name.value = std.name;
            customSelectWrapper.dataset.selectedValue = std.source;
            customSelectWrapper.classList.remove("open");
        });
        optionsList.appendChild(opt);
    });
    trigger.addEventListener("click", () => {
        trigger.classList.remove("alert")
        document.querySelectorAll(".custom-select-wrapper.open").forEach(el => {
            if (el !== customSelectWrapper) el.classList.remove("open");
        });
        customSelectWrapper.classList.toggle("open");
        if (customSelectWrapper.classList.contains("open")) {
            searchInput.value = "";
            Array.from(optionsList.children).forEach(c => c.style.display = "flex");
            searchInput.focus();
        }
    });
    searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        Array.from(optionsList.children).forEach(opt => {
            if (opt.dataset.name.toLowerCase().includes(term)) {
                opt.style.display = "flex";
            } else {
                opt.style.display = "none";
            }
        });
    });
    const new_get_damage = document.createElement("input");
    new_get_damage.type = "text";
    new_get_damage.className = "damage";
    new_get_damage.placeholder = "Damage";
    new_get_damage.pattern = "[0-9]*";
    new_get_damage.maxLength = 8;
    new_get_damage.oninput = function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    };
    const button_div = document.createElement("div");
    button_div.className = "button";
    const new_set_value = document.createElement("button");
    new_set_value.type = "submit";
    new_set_value.textContent = "Set";
    const new_delete_value = document.createElement("button");
    new_delete_value.type = "button";
    new_delete_value.textContent = "Delete";
    button_div.appendChild(new_set_value);
    button_div.appendChild(new_delete_value);
    element.appendChild(customSelectWrapper);
    element.appendChild(new_get_name);
    element.appendChild(new_get_damage);
    element.appendChild(button_div);
    const barGraph = document.createElement("div");
    barGraph.className = "bar_graph";
    const new_bar = document.createElement("div");
    new_bar.className = "bar";
    if (type === 'special') {
        new_bar.style.backgroundColor = '#007eff';
    }
    const box = document.createElement("div");
    box.className = "box";
    const number = document.createElement("div");
    number.className = "number";
    number.textContent = "0";
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    box.appendChild(number);
    box.appendChild(bubble);
    barGraph.appendChild(new_bar);
    barGraph.appendChild(box);
    const data = document.createElement("div");
    data.className = "data";
    const imagen = document.createElement("div");
    imagen.className = "imagen";
    const img = document.createElement("img");
    img.className = "icons";
    img.src = "icons/void.png";
    img.alt = "";
    imagen.appendChild(img);
    const name = document.createElement("div");
    name.className = "name";
    name.textContent = "";
    data.appendChild(imagen);
    data.appendChild(name);
    barGraph.style.display = "none";
    data.style.display = "none";
    if (type === 'striker') {
        dom.input_striker_table.appendChild(element);
        dom.striker_graph.appendChild(barGraph);
        dom.striker_info.appendChild(data);
    } else {
        dom.input_special_table.appendChild(element);
        dom.special_graph.appendChild(barGraph);
        dom.special_info.appendChild(data);
    }
    const bar_obj = {
        damageDisplay: number,
        barElement: new_bar,
        boxElement: box
    };
    state.all_bars.push(bar_obj);
    new_set_value.addEventListener("click", function (event) {
        event.preventDefault();
        let rawName = "";
        if (!customSelectWrapper.dataset.selectedValue) {
            trigger.classList.add("alert");
        }
        else {
            if (customSelectWrapper.dataset.selectedValue) {
                rawName = new_get_name.value || "";
                img.src = customSelectWrapper.dataset.selectedValue;
            }
            const words = rawName.split(/\s+/);
            let exceedsLength = false;
            let lastAddedBr = false;
            name.replaceChildren();
            for (let i = 0; i < words.length; i++) {
                let word = words[i];
                const cleanWord = word.replace(/[\s()]/g, '');
                if (cleanWord.length > 9) {
                    exceedsLength = true;
                    if (i > 0 && !lastAddedBr) {
                        name.appendChild(document.createElement("br"));
                    }
                    name.appendChild(document.createTextNode(word));
                    name.appendChild(document.createElement("br"));
                    lastAddedBr = true;
                }
                else if (cleanWord.length > 6) {
                    name.appendChild(document.createTextNode(word));
                    name.appendChild(document.createElement("br"));
                    lastAddedBr = true;
                }
                else {
                    name.appendChild(document.createTextNode(word + " "));
                    lastAddedBr = false;
                }
            }
            if (name.lastChild && name.lastChild.nodeName === "BR") {
                name.removeChild(name.lastChild);
            }
            if (name.lastChild && name.lastChild.nodeType === Node.TEXT_NODE) {
                name.lastChild.textContent = name.lastChild.textContent.trim();
            }
            barGraph.style.display = "flex";
            data.style.display = "block";
            name.style.fontSize = "20px";
            name.style.lineHeight = "20.8px";
            name.style.transform = "translate(-6.8px, 14.7px)";
            let isThreeLines = name.scrollHeight > 55;
            if (exceedsLength || isThreeLines) {
                name.style.fontSize = "15px";
                name.style.lineHeight = "14px";
                name.style.transform = "translate(-6.8px, 18px)";
            }
            number.textContent = new_get_damage.value || "0";
            element.classList.add("is-set");
            updateAllBars();
        }
    });
    new_delete_value.addEventListener("click", function (event) {
        event.preventDefault();
        trigger.classList.remove("alert")
        new_get_name.value = "";
        new_get_damage.value = "";
        barGraph.style.display = "none";
        data.style.display = "none";
        number.textContent = "0";
        img.src = "icons/void.png";
        name.replaceChildren();
        resetTriggerContent(trigger);
        delete customSelectWrapper.dataset.selectedValue;
        element.classList.remove("is-set");
        updateAllBars();
    });
}