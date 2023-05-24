// Retrieving data from local storage
const getItem = (key) => {
    let output = null;

    chrome.storage.local.get([key], function (result) {
        output = result.key;
    });

    return output;
};

// Updating data in local storage
const setItem = (key, value) => {
    let output = false;

    let object = {};

    object[key] = value;

    chrome.storage.local.set(object, function () {
        output = true;
    });

    return output;
};


// Variables
const refreshTimeKey = 'RF_TIME';
const mouseInactivityKey = 'MS_INACTIVE';
let isMouseActive = (getItem(mouseInactivityKey) == 'true') ? true : false;
let refTime = (getItem(refreshTimeKey)) ? parseInt(getItem(refreshTimeKey)) : 60;
let refreshInterval;
let useRefTime = refTime * 1000;


function resetMouseActivity() {
    isMouseActive = true;
    clearTimeout(refreshInterval);
    refreshInterval = setTimeout(() => {
        isMouseActive = false;
        refreshPage();
    }, useRefTime); // Refresh interval in milliseconds
}

function refreshPage() {
    if (!isMouseActive) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    }
}

chrome.tabs.onActivated.addListener(function () {
    resetMouseActivity();
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.active) {
        resetMouseActivity();
    }
});

function queryIdleState() {
      chrome.idle.queryState(15, function (state) {
        if (state === "idle" || state === "locked") {
          resetMouseActivity();
        }
      });
}

queryIdleState();

setInterval(queryIdleState, 15000); // Query idle state every 15 seconds

