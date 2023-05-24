// Inputs
let refreshTimeInput = document.getElementById('refresh_time');
let mouseInactivityInput = document.getElementById('mouse_inactivity');
const refreshTimeKey = 'RF_TIME';
const mouseInactivityKey = 'MS_INACTIVE';


function setRefreshTime() {
    const value = parseInt(refreshTimeInput.value);

    const newValue = (!isNaN(value) && value !== 0) ? Math.abs(value) : 60;

    lsSetItem(refreshTimeKey, newValue);
}

function setMouseInactivity() {
    lsSetItem(mouseInactivityKey, mouseInactivityInput.checked);
}


// Local Storage Helpers
function lsGetItem(key) {
    return localStorage.getItem(key)
}

function lsSetItem(key, value) {
    return localStorage.setItem(key, value);
}


// Load Document Defaults
function onLoad() {
    refreshTimeInput.value = (lsGetItem(refreshTimeKey)) ? parseInt(lsGetItem(refreshTimeKey)) : 60;

    mouseInactivityInput.checked = (lsGetItem(mouseInactivityKey) == 'true') ? true : false;

    let fullYear = new Date().getFullYear();

    document.getElementById("footer__date").innerHTML = fullYear;

    refreshTimeInput.addEventListener('change', setRefreshTime);

    mouseInactivityInput.addEventListener('change', setMouseInactivity);
}


window.addEventListener('load', onLoad);