chrome.runtime.onInstalled.addListener(function() {    
    chrome.storage.sync.set({hideUsedCards:false, cardStates: {}}, function() {
        console.log('I initialized the loginDates and cardStates arrays');
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({pageUrl: {hostEquals: "sixthcontinent.com"}})],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
        console.log("ciao");
    });
});
