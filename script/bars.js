import { state } from './state.js';
export function updateAllBars() {
    let max = 0;
    state.all_bars.forEach(item => {
        let isVisible = item.barElement.parentElement && item.barElement.parentElement.style.display !== "none";
        let val = isVisible ? (Number(item.damageDisplay.textContent) || 0) : 0;
        if (val > max) max = val;
    });
    if (max === 0) max = 1;
    state.all_bars.forEach(item => {
        let isVisible = item.barElement.parentElement && item.barElement.parentElement.style.display !== "none";
        let val = isVisible ? (Number(item.damageDisplay.textContent) || 0) : 0;
        let height = (val === 0) ? 10 : (275 * (val / max) + 10);
        item.barElement.style.height = height + "px";
        if (item.boxElement) {
            let translateY = (val === 0) ? -6 : ((-3 * (val / max)) - 6);
            item.boxElement.style.transform = `translate(0px, ${translateY}px)`;
        }
    });
}