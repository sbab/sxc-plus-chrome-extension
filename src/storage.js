function getStorage () {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(null, function(result) {
            resolve(result);
        })
    });
}

function setStorage (storage) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.set(storage, function (result) {
            resolve();
        });
    });
}

function getHideUsedCards () {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get("hideUsedCards", function(result) {
            resolve(result.hideUsedCards);
        })
    });
}

function setHideUsedCards (value) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.set({"hideUsedCards":value}, function(result) {
            resolve();
        })
    });
}

function getCardState(transaction_id) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get("cardStates", function(result) {
            resolve(result.cardStates[transaction_id]);
        });        
    });
}

function setCardState(transaction_id, state) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get("cardStates", function(result) {
            result.cardStates[transaction_id] = state;
            chrome.storage.sync.set(result);
            resolve();
        });
    });
}

function getAllCardStates() {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get("cardStates", function(result) {
            resolve(result.cardStates);
        });        
    });
}

function getShowActivationDateTooltip () {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get("showActivationDateTooltip", function(result) {
            resolve(result.hideUsedCards);
        })
    });
}

function setShowActivationDateTooltip (value) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.set({"showActivationDateTooltip":value}, function(result) {
            resolve();
        })
    });
}
