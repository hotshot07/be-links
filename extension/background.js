// write a script that hits local api using fetch and returns the redirect response using manifest 3 api

// const filter = {
//   url: [
//     {
//       urlMatches: "https://www.google.com/",
//     },
//   ],
// };

// chrome.webNavigation.onCompleted.addListener(() => {
//   console.info("The user has loaded my favorite website!");
// }, filter);

// // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
// //     console.log("changeInfo", changeInfo.url);
// // });

// async function getCurrentTab() {
//   let queryOptions = { active: true, currentWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }

// chrome.runtime.onInstalled.addListener(async () => {
//   console.log(await getCurrentTab());
// });


// chrome.tabs.onActivated.addListener( function(activeInfo){
//     chrome.tabs.get(activeInfo.tabId, function(tab){
//         y = tab.url;
//         console.log("you are here: "+y);
//     });
// });


// chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
//     if (tab.active && change.url) {
//         console.log("you are here: "+change.url);           
//     }
// });

// chrome.tabs.onActivated.addListener(function(activeInfo){
//     chrome.tabs.get(activeInfo.tabId, function(tab){
//         console.log("you are here: "+tab.url);
//     },url);
// });

// write a script that hits local api using fetch and returns the redirect response using manifest 3 api

// const filter = {
//   url: [
//     {
//       urlMatches: "https://www.google.com/",
//     },
//   ],
// };

// chrome.webNavigation.onCompleted.addListener(() => {
//   console.info("The user has loaded my favorite website!");
// }, filter);

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     console.log("changeInfo", changeInfo.url);
// });

// async function getCurrentTab() {
//   let queryOptions = { active: true, currentWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }
//s
// chrome.runtime.onInstalled.addListener(async () => {
//   console.log(await getCurrentTab());
// });


// chrome.tabs.onActivated.addListener(function(activeInfo){
//     chrome.tabs.get(activeInfo.tabId, function(tab){
//         console.log(tab.url)
//     });
// });


// chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
//     if (tab.active && change.url) {
//         console.log("you are here: "+change.url);           
//     }
// });


chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {

        var shortlink = change.url.match(/go\/(.*)/)[1];

        console.log(shortlink);

         fetch('http://127.0.0.1:5000/get/' + shortlink, {
        method: 'GET',
            })
            .then(response => {
        console.log(response.url);
                
                chrome.tabs.update(tabId, {url: response.url})
            });
            
        console.log("you are here: "+change.url);           
    }
});


// chrome.tabs.onActivated.addListener(function(activeInfo){
//     console.log(activeInfo);
// });
