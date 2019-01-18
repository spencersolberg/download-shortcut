function saveData(url) {
  let a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";

  a.href = url;
  a.download;
  a.click();
  window.URL.revokeObjectURL(url);
}   // this function is used later to download the shortcut file

function downloadShortcut() {
  let iCloudApi = new XMLHttpRequest(); // opens a new request to the api
  iCloudApi.open("GET", apiUrl);
  iCloudApi.responseType = "text";
  iCloudApi.send();

  iCloudApi.onload = function() {
    let apiResult = JSON.parse(iCloudApi.response); // parses the api's JSON response so we can use it
    let downloadURL = apiResult.fields.shortcut.value.downloadURL; // gets the raw download url for the .shortcut file
    let shortcutName = apiResult.fields.name.value; // gets the name for the shortcut file
    let finalURL = downloadURL.replace("${f}", shortcutName + ".shortcut"); // fixes the download link so it includes the name
    saveData(finalURL); // downloads the data using the function from earlier
  };
}

let apiUrl = location.href.replace(/\/shortcuts/g, "/shortcuts/api/records"); // changes the normal url to the api url
let getShortcut = document.getElementById("shortcut-link");
getShortcut.href = "#";
getShortcut.addEventListener("click", function() {
  downloadShortcut();
}); // changes the "Get Shortcut" button to the downloadShortcut() function
