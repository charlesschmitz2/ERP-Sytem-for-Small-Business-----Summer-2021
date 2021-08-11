const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

const maximizeBtn = document.getElementById('maximizeBtn')

var isLeftMenuActive = false
const mySidebar = document.getElementById('mySidebar')

var homePageActive = true
var accountingPageActive = false
var CRMPageActive = false
var inventoryPageActive = false
var orderFormPageActive = false;


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
    /*
    var req = new XMLHttpRequest();
    var homeBtn = document.getElementById("homePage");
    req.open("GET", "homePage.txt", false);
    req.addEventListener("load", function(){
    document.getElementById('homePage').innerHTML = req.responseText;
    });
    req.send(null);
    */

    homePageActive = true;
    accountingPageActive = false;
    inventoryPageActive = false;
    CRMPageActive = false;
    orderFormPageActive = false;


    ipc.send('homePageActive');

})

//-------------------------------------ACCOUNTING PAGE-------------------------------------

//This event listener is for the inital loading of the page
accountingBtn.addEventListener('click', ()=>{
    //ipc.send('loadAccountingPage')
    //document.getElementById("homePage").style.visibility = "hidden";
    //document.getElementById("accountingPage").style.visibility = "visible";
    //document.getElementById("CRMPage").style.visibility = "hidden";
    //document.getElementById("inventoryPage").style.visibility = "hidden";

    //displaying the page content using AJAX
        /*
        var req = new XMLHttpRequest();
        var accountingBtn = document.getElementById("accountingPage");
        req.open("GET", "accountingPage.txt", false);
        req.setRequestHeader("Cache-Control", "no-cache");
        req.setRequestHeader("Pragma", "no-cache");
        req.addEventListener("load", function(){
        document.getElementById('homePage').innerHTML = req.responseText;
        });
        req.send();
        */

    //Flags to know which page is being displayed, may remove but could be useful for some cases
    homePageActive = false;
    accountingPageActive = true;
    inventoryPageActive = false;
    CRMPageActive = false;
    orderFormPageActive = false;


    //Run Functions to display and load data
    ipc.send('accountingPageActive');
    

 }) //end accounting Button Click Event Listener


//button that if the accounting page is active so the elements are rendered then it will run the query to load the tables
    var runQuery = document.getElementById('runQuery');
    if(runQuery != null){
        //this is the event listener that coorelates to the 'Run Query' button on the accounting page
        runQuery.addEventListener('click', () => {
            runAccountingPage();
            console.log("running");
        })
    }
 
 //takes a query strong and opens connection to postgres where the table functions are then run and displayed to the user
    function runAccountingPage(){
        /* --------------- Query ---------------*/
            //Since we have a connection to the database and its table we can query the database to get some value
            const query = `
                SELECT *
                FROM fact_sales;
                
            `;

        /* --------------- Open and Connect to pool --> load and display correct page contents --> run query and fill in data into correct tables  ---------------*/

        //Database Functionality and Connections, each page click has a query that is executed within this database connection
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

        doAllTableLoading(query);
        pool.end();

            function doAllTableLoading(query){

                /* --------------- Create data array to hold query results ---------------*/
                    const data = new Array();
    
    
                /* --------------- Connect to the pool and run the query within a data array ---------------*/    
    
                                pool.connect()
                                    .then((client) => {
                                        client.query(query)
                                            .then(res => {
                                                for (let row of res.rows) {
                                                    //console.log(row);
                                                    data.push(row);
                                                }
                                                //console.log(data);
                                                checkData(data);
                                            })
                                            .catch(err => {
                                                console.error(err);
                                            });
                                    })
                                    .catch(err => {
                                        console.error(err);
                                    });
    
                    //pool.end(); we are leaving it open so that each time someone chooses to reload or rerun the same query for this pool displayed it will continue to work
    
    
                /* --------------- Check if the data has been properly pushed, if it has then we can begin to load the table for this page ---------------*/
    
                                function checkData(dataArray) {
                                    if (dataArray.length > 0){   
                                        //console.log("Data is loaded!");
                                        //console.log(dataArray.length)
                                        loadAccountingTable(dataArray);
                                        return true;
                                    }
                                    else {
                                        console.warn("Could Not Load Data :( Go Back and Check your Query");
                                        return false;
                                    }
                                }//CheckData
    
                /* --------------- Load the Corresponding Table Rows with the objects that have been queried ---------------*/
    
                        //Loads the table full of the correct object elements taken from the postgres table that have been queried to an array of objects called data, each object represents one entry of the table
                            function loadAccountingTable(data) {
                                //clears out exisitng table data
                                //console.log(accoutingTableBody);
                                while(accoutingTableBody.firstChild){
                                    accoutingTableBody.removeChild(accoutingTableBody.firstChild);
                                }
                                
                                //Populate the table
    
                                data.forEach((row) => {
                                    const keys = Object.keys(row);
                                    //console.log(keys);
    
                                    const tr = document.createElement("tr")
                                    keys.forEach((key)=> {
                                        //console.log(`${key}: ${row[key]}`);
                                        //console.log(row[key]);
                                        const td = document.createElement("td");
                                        td.textContent = row[key];
                                        tr.appendChild(td);
                                    });
    
                                    accoutingTableBody.appendChild(tr);
                                });
    
                            }//loadAccountingTable
                
    
                /* --------------- Display the Data ---------------*/
    
                const accoutingTableBody = document.querySelector("#accountingTable > tbody");
    
            }//doAllTableLoading 


    }//runAccountingPage


        

//-------------------------------------CRM PAGE-------------------------------------
CRMBtn.addEventListener('click', ()=>{
    //ipc.send('loadCRMPage')
    //document.getElementById("homePage").style.visibility = "hidden";
    //document.getElementById("accountingPage").style.visibility = "hidden";
    //document.getElementById("CRMPage").style.visibility = "visible";
    //document.getElementById("inventoryPage").style.visibility = "hidden";
    /*
    var req = new XMLHttpRequest();
    var CRMBtn = document.getElementById("CRMPage");
    req.open("GET", "CRMPage.txt", false);
    req.addEventListener("load", function(){
    document.getElementById('homePage').innerHTML = req.responseText;
    });
    req.send(null);
    */

    homePageActive = false;
    accountingPageActive = false;
    inventoryPageActive = false;
    CRMPageActive = true;
    orderFormPageActive = false;

    ipc.send('CRMPageActive');
})

//-------------------------------------INVENTORY PAGE-------------------------------------
inventoryBtn.addEventListener('click', ()=>{
    //ipc.send('loadInventoryPage')
    //document.getElementById("homePage").style.visibility = "hidden";
    //document.getElementById("accountingPage").style.visibility = "hidden";
    //document.getElementById("CRMPage").style.visibility = "hidden";
    //document.getElementById("inventoryPage").style.visibility = "visible";
    /*
    var req = new XMLHttpRequest();
    var inventoryBtn = document.getElementById("inventoryPage");
    req.open("GET", "InventoryPage.txt", false);
    req.addEventListener("load", function(){
    document.getElementById('homePage').innerHTML = req.responseText;
    });
    req.send(null);
    */

    homePageActive = false;
    accountingPageActive = false;
    inventoryPageActive = true;
    CRMPageActive = false;
    orderFormPageActive = false;

    ipc.send('inventoryPageActive');
})

//button that if the accounting page is active so the elements are rendered then it will run the query to load the tables
var runQuery = document.getElementById('runQueryInventory');
if(runQuery != null){
    //this is the event listener that coorelates to the 'Run Query' button on the accounting page
    runQuery.addEventListener('click', () => {
        runInventoryPage();
        console.log("running");
    })
}

//takes a query strong and opens connection to postgres where the table functions are then run and displayed to the user
function runInventoryPage(){
    /* --------------- Query ---------------*/
        //Since we have a connection to the database and its table we can query the database to get some value
        let query1 = `
            SELECT *
            FROM product_dimension;
            
        `;
        let query = `
            SELECT *
            FROM product_dimension, fact_sales 
            WHERE product_dimension.productID = fact_sales.productID;
            
        `;

    /* --------------- Open and Connect to pool --> load and display correct page contents --> run query and fill in data into correct tables  ---------------*/

    //Database Functionality and Connections, each page click has a query that is executed within this database connection
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

    doAllTableLoading(query);
    pool.end();

        function doAllTableLoading(query){

            /* --------------- Create data array to hold query results ---------------*/
                const data = new Array();


            /* --------------- Connect to the pool and run the query within a data array ---------------*/    

                            pool.connect()
                                .then((client) => {
                                    client.query(query)
                                        .then(res => {
                                            for (let row of res.rows) {
                                                //console.log(row);
                                                data.push(row);
                                            }
                                            //console.log(data);
                                            checkData(data);
                                        })
                                        .catch(err => {
                                            console.error(err);
                                        });
                                })
                                .catch(err => {
                                    console.error(err);
                                });

                //pool.end(); we are leaving it open so that each time someone chooses to reload or rerun the same query for this pool displayed it will continue to work


            /* --------------- Check if the data has been properly pushed, if it has then we can begin to load the table for this page ---------------*/

                            function checkData(dataArray) {
                                if (dataArray.length > 0){   
                                    //console.log("Data is loaded!");
                                    //console.log(dataArray.length)
                                    loadInventoryTable(dataArray);
                                    return true;
                                }
                                else {
                                    console.warn("Could Not Load Data :( Go Back and Check your Query");
                                    return false;
                                }
                            }//CheckData

            /* --------------- Load the Corresponding Table Rows with the objects that have been queried ---------------*/

                    //Loads the table full of the correct object elements taken from the postgres table that have been queried to an array of objects called data, each object represents one entry of the table
                        function loadInventoryTable(data) {
                            //clears out exisitng table data
                            //console.log(inventoryTableBody);
                            while(inventoryTableBody.firstChild){
                                inventoryTableBody.removeChild(inventoryTableBody.firstChild);
                            }

                            const headers = Object.keys(data[0])
                            const thead = document.createElement('thead')
                            const tr = document.createElement('tr')
                            let createCell = text => {
                                let th = document.createElement('th')
                                text = document.createTextNode(text)
                                th.appendChild(text)
                                return th
                              }
                              
                              headers.forEach(header => {
                                let cell = createCell(header)
                                //console.log(cell);
                                tr.appendChild(cell)
                              })
                            
                              thead.appendChild(tr)
                            
                              inventoryTableBody.appendChild(thead)
                            
                            //Populate the table

                            data.forEach((row) => {
                                const keys = Object.keys(row);
                                //console.log(keys);

                                const tr = document.createElement("tr")
                                keys.forEach((key)=> {
                                    //console.log(`${key}: ${row[key]}`);
                                    //console.log(row[key]);
                                    const td = document.createElement("td");
                                    td.textContent = row[key];
                                    tr.appendChild(td);
                                });

                                inventoryTableBody.appendChild(tr);
                            });

                        }//loadinventoryTableBody
            

            /* --------------- Display the Data ---------------*/

            const inventoryTableBody = document.querySelector("#inventoryTable > tbody");

        }//doAllTableLoading 


}//runInventoryPage



//-------------------------------------ORDER ENTRY PAGE-------------------------------------
orderFormBtn.addEventListener('click', ()=>{

    homePageActive = false;
    accountingPageActive = false;
    inventoryPageActive = false;
    CRMPageActive = false;
    orderFormPageActive = true;

    ipc.send('orderFormPageActive');



/* This is a more traditional method when doing this through a web based application, this connects with the server.js file that just acts as our api.
   Here we are using electron as a more desktop centered application so the recommended way to handle the forms is through a communication with the ipc

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('myForm').addEventListener('submit', handleForm);
        console.log("DOM Loaded");
    });

    function handleForm(ev) {
        ev.preventDefault(); //stop the page reloading
        //console.dir(ev.target);
        let myForm = ev.target;
        let fd = new FormData(myForm);

        //add more things that were not in the form
        fd.append('api-key', 'myApiKey');

        //look at all the contents 
        for (let key of fd.keys()) {
            console.log(key, fd.get(key));
        }

        //send the request with the formdata
        let url = "http://localhost:3000/";
        let req = new Request(url, {
            body: fd,
            method: 'POST',
        });
        //console.log(req);
        fetch(req)
            .then((res) => res.json())
            .then((data) => {
                console.log('Response from Server');
                console.log(data);
            })
            .catch(console.warn);
    }

*/


})

var submitBtn = document.getElementById("submitButton");
console.log(submitBtn);
if(submitBtn != null) {
    submitBtn.addEventListener("click", () => {
        const form = document.getElementById('myForm');
        const log = document.getElementById('log');
        document.form.submit();
        form.addEventListener('submit', logSubmit);

        //event.preventDefault() // stop the form from submitting
        //console.log(event);
    
        //let firstname = document.getElementById("firstname").value;
        //ipcRenderer.send('form-submission', firstname)

        function logSubmit(event) {
            log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
            event.preventDefault();
          }

    });
}
function sendForm(event) {
    event.preventDefault() // stop the form from submitting
    console.log("running event");

    let firstname = document.getElementById("firstname").value;
    ipcRenderer.send('form-submission', firstname)
}


/*
function logSubmit(event) {
    log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    event.preventDefault();
  }
  
  const form = document.getElementById('myForm');
  const log = document.getElementById('log');
  form.addEventListener('submit', logSubmit);
  */

//alert( formData.get('field1') + '-' + formData.get('field2') + '-' + formData.get('field3') + '-' + formData.get('field4') + '-' + formData.get('field5') + '-' + formData.get('field6') + '-' + formData.get('field7') + '-' +formData.get('field8') + '-' + formData.get('field9'));






