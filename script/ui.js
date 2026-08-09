import { state } from './state.js';
import { dom } from './dom.js';
import { updateAllBars } from './bars.js';
import { createSlot } from './slots.js';
export function resizeContainers(total, strCount, spcCount) {
    let wbox = 104.004;
    dom.class_box.style.width = (total * wbox) + "px";
    dom.info.style.width = (total * wbox) + "px";
    dom.striker_graph.style.width = (strCount * wbox) + "px";
    dom.special_graph.style.width = (spcCount * wbox) + "px";
    dom.striker_info.style.width = (strCount * wbox) + "px";
    dom.special_info.style.width = (spcCount * wbox) + "px";
    let main_width = 692.5 + (total - 6) * wbox;
    dom.main.style.width = main_width + "px";
    dom.mainbox.style.width = main_width + "px";
    let base_x = 113 + (total - 6) * wbox;
    dom.base.style.transform = `translate(${base_x}px, -294.1px)`;
    dom.extra.forEach(ext => {
        if (total !== 6) {
            ext.style.display = "none";
        } else {
            ext.style.display = "";
            ext.style.width = "15.3px";
        }
    });
}
export function initUI() {
    dom.input_striker_table.replaceChildren();
    dom.input_special_table.replaceChildren();
    dom.striker_graph.replaceChildren();
    dom.special_graph.replaceChildren();
    dom.striker_info.replaceChildren();
    dom.special_info.replaceChildren();
    state.all_bars = [];
    const checked = document.querySelector('input[name="num_students"]:checked');
    let total = Number(checked.value);
    let strCount = (total === 6) ? 4 : 6;
    let spcCount = (total === 6) ? 2 : 4;
    for (let i = 0; i < strCount; i++) createSlot('striker', i === 0);
    for (let i = 0; i < spcCount; i++) createSlot('special', i === 0);
    resizeContainers(total, strCount, spcCount);
    updateAllBars();
}