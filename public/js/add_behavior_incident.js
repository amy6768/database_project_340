// Citation for the CRUD operations: 
//  Date: 7/28/22
//  Adapted from:
//  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addBehaviorIncidentForm = document.getElementById("add-behavior-incident-ajax");

// Modify the objects we need
addBehaviorIncidentForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputObservedBehavior = document.getElementById("input-observedBehavior");
    let inputActionTaken= document.getElementById("input-actionTaken");
    let inputParentContact= document.getElementById("input-parentContact");
    let inputDate= document.getElementById("input-Date");
    let inputIdStudent= document.getElementById("add-idStudent");


    // Get the values from the form fields
    let observedBehaviorValue = inputObservedBehavior.value;
    let actionTakenValue = inputActionTaken.value;
    let parentContactValue = inputParentContact.value
    let DateValue = inputDate.value;
    let idStudentValue = inputIdStudent.value;




    // Put our data we want to send in a javascript object
    let data = {
        observedBehavior: observedBehaviorValue,
        actionTaken: actionTakenValue,
        parentContact: parentContactValue,
        Date: DateValue,
        idStudent: idStudentValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-behavior-incident-ajax", true);
    xhttp.addEventListener("error", e=>console.log(e))
    xhttp.onerror = function() { // only triggers if the request couldn't be made at all
        alert(`Network Error`);
      };
    xhttp.setRequestHeader("Content-type", "application/json");
    test = JSON.stringify(data)
    console.log(test)
    xhttp.send(test);
    
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputObservedBehavior.value = '',
            inputActionTaken.value = '',
            inputParentContact.value = '',
            inputDate.value = '',
            inputIdStudent.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response


})


// Creates a single row from an Object representing a single record from 
// Students
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("behaviorIncident-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let observedBehaviorCell = document.createElement("TD");
    let actionTakenCell = document.createElement("TD");
    let parentContactCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let idStudenCell = document.createElement("TD");


    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.idBehaviorIncident;
    observedBehaviorCell.innerText = newRow.observedBehavior;
    actionTakenCell.innerText = newRow.actionTaken;
    parentContactCell.innerText = newRow.parentContact;
    dateCell.innerText = newRow.date;
    idStudenCell.innerText = newRow.idStudent;

    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTest(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(observedBehaviorCell);
    row.appendChild(actionTakenCell);
    row.appendChild(parentContactCell);
    row.appendChild(dateCell);
    row.appendChild(idStudenCell);



    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);

}

