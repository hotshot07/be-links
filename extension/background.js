// write a script that hits local api using fetch and returns the redirect response

chrome.webRequest.onBeforeRequest.addListener(function(golink) {

    // regex to get shortlink after go command
    var shortlink = golink.url.match(/go\/(.*)/)[1];

    // make shortlink lowercase and remove spaces 
    shortlink = shortlink.toLowerCase().replace(/\s/g, '');

    fetch('http://localhost:5000/get/' + shortlink, {
        method: 'GET',
    })
    .then(response => {
        console.log(response)
        chrome.tabs.update(golink.tabId, {url: data.url})
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}, {urls: ["<all_urls>"]}, ["blocking"]);    









