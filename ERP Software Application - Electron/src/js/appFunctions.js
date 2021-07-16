const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

const maximizeBtn = document.getElementById('maximizeBtn')

var isLeftMenuActive = false
const mySidebar = document.getElementById('mySidebar')

var homePageActive = true
var accountingPageActive = false
var CRMPageActive = false
var inventoryPageActive = false

//Close App
closeBtn.addEventListener('click', ()=>{
    ipc.send('closeApp')
})

//Minimize App
minimizeBtn.addEventListener('click', ()=>{
    ipc.send('minimizeApp')
})

//Maximize App
function changeMaxResBtn(isMaximizedApp){
    if(isMaximizedApp){
        maximizeBtn.title = 'Restore'
        maximizeBtn.classList.remove('maximizeBtn')
        maximizeBtn.classList.add('restoreBtn')
    }
    else {
        maximizeBtn.title = 'Maximize'
        maximizeBtn.classList.remove('restoreBtn')
        maximizeBtn.classList.add('maximizeBtn')
    }
    
}
maximizeBtn.addEventListener('click', ()=>{
    ipc.send('maximizeApp')
})

ipc.on('isMaximized', ()=> { changeMaxResBtn(true)})
ipc.on('isRestored', ()=> { changeMaxResBtn(false)})

//Toggle Menu
//Expand and Retract
showHideMenus.addEventListener('click', ()=> {
    if(isLeftMenuActive){
        mySidebar.style.width = '0px'
        isLeftMenuActive = false
    }
    else {
        mySidebar.style.width = '200px'
        isLeftMenuActive = true
    }
})


//Set inital hidden and visible values, then once that is done add button click functions for each page button 
  //document.getElementById("homePage").style.visibility = "visible";
  //document.getElementById("accountingPage").style.visibility = "hidden";
  //document.getElementById("CRMPage").style.visibility = "hidden";
  //document.getElementById("inventoryPage").style.visibility = "hidden";


homeBtn.addEventListener('click', ()=>{
    //ipc.send('loadHomePage')
    //document.getElementById("homePage").style.visibility = "visible";
    //document.getElementById("accountingPage").style.visibility = "hidden";
    //document.getElementById("CRMPage").style.visibility = "hidden";
    //document.getElementById("inventoryPage").style.visibility = "hidden";

    var req = new XMLHttpRequest();
    var homeBtn = document.getElementById("homePage");
    req.open("GET", "homePage.txt", false);
    req.addEventListener("load", function(){
    document.getElementById('homePage').innerHTML = req.responseText;
    });
    req.send(null);

})

accountingBtn.addEventListener('click', ()=>{
    //ipc.send('loadAccountingPage')
    //document.getElementById("homePage").style.visibility = "hidden";
    //document.getElementById("accountingPage").style.visibility = "visible";
    //document.getElementById("CRMPage").style.visibility = "hidden";
    //document.getElementById("inventoryPage").style.visibility = "hidden";
    var req = new XMLHttpRequest();
    var accountingBtn = document.getElementById("accountingPage");
    req.open("GET", "accountingPage.txt", false);
    req.addEventListener("load", function(){
    document.getElementById('homePage').innerHTML = req.responseText;
    });
    req.send(null);
})

CRMBtn.addEventListener('click', ()=>{
    //ipc.send('loadCRMPage')
    //document.getElementById("homePage").style.visibility = "hidden";
    //document.getElementById("accountingPage").style.visibility = "hidden";
    //document.getElementById("CRMPage").style.visibility = "visible";
    //document.getElementById("inventoryPage").style.visibility = "hidden";
    var req = new XMLHttpRequest();
    var CRMBtn = document.getElementById("CRMPage");
    req.open("GET", "CRMPage.txt", false);
    req.addEventListener("load", function(){
    document.getElementById('homePage').innerHTML = req.responseText;
    });
    req.send(null);
})

inventoryBtn.addEventListener('click', ()=>{
    //ipc.send('loadInventoryPage')
    //document.getElementById("homePage").style.visibility = "hidden";
    //document.getElementById("accountingPage").style.visibility = "hidden";
    //document.getElementById("CRMPage").style.visibility = "hidden";
    //document.getElementById("inventoryPage").style.visibility = "visible";
    var req = new XMLHttpRequest();
    var inventoryBtn = document.getElementById("inventoryPage");
    req.open("GET", "InventoryPage.txt", false);
    req.addEventListener("load", function(){
    document.getElementById('homePage').innerHTML = req.responseText;
    });
    req.send(null);
})


//Database Functionality and Connections
const {Pool, Client} = require('pg');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ERP_Small_Business_Project',
    password: 'Cas6768890',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.log('Error:', err);
});

const query = `
SELECT *
FROM mock_data
`;

pool.connect()
    .then((client) => {
        client.query(query)
            .then(res => {
                for (let row of res.rows) {
                    console.log(row);
                }
            })
            .catch(err => {
                console.error(err);
            });
    })
    .catch(err => {
        console.error(err);
    });
