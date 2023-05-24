// Retrieving data from local storage
export const getItem = (key) => {
    let output = null;

    chrome.storage.local.get([key], function (result) {
        output = result.key;
    });

    return output;
};

// Updating data in local storage
export const setItem = (key, value) => {
    let output = false;

    let object = {};

    object[key] = value;

    chrome.storage.local.set(object, function () {
        output = true;
    });

    return output;
};
