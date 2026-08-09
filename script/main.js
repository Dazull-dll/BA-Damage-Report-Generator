import { state } from './state.js';
import { dom } from './dom.js';
import { initUI } from './ui.js';
dom.download.addEventListener("click", function (e) {
    e.preventDefault();
    htmlToImage.toPng(dom.main, {
        backgroundColor: '#f0f4f7',
        pixelRatio: 2,
        width: dom.main.offsetWidth,
        height: dom.main.offsetHeight,
        style: {
            transform: 'none',
            position: 'relative',
            left: '0',
            top: '0',
            margin: '0'
        }
    })
        .then(function (dataUrl) {
            const downloadLink = document.createElement("a");
            downloadLink.href = dataUrl;
            downloadLink.download = "damage_report.png";
            downloadLink.click();
        })
        .catch(function (error) {
            console.error("error:", error);
        });
});
document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-wrapper.open').forEach(el => el.classList.remove('open'));
    }
});
dom.btn_title.addEventListener("click", () => {
    if (dom.get_title.value === "") {
        dom.set_title.textContent = "Damage Report";
    } else {
        dom.set_title.textContent = dom.get_title.value;
    }
});
async function load_data() {
    try {
        const response = await fetch('./data/data_list.json');
        state.studentData = await response.json();
        initUI();
    } catch (error) {
        console.error("error:", error);
    }
}
dom.radio_numbers.forEach(radio => radio.addEventListener("change", initUI));
load_data();