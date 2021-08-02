// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }

    //Load the home page on the intial launch of the application from the homePage.txt file
    /*
    var req = new XMLHttpRequest();
    var loadContentInitial = document.getElementById("homePage");
    req.open("GET", "homePage.txt", false);
    req.addEventListener("load", function(){
    document.getElementById('homePage').innerHTML = req.responseText;
    });
    req.send(null);
    */
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })




  