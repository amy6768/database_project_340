// Citation for the CRUD operations: 
//  Date: 7/28/22
//  Adapted from:
//  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addInterventionProgressForm = document.getElementById("add-intervention-progress-ajax");

// Modify the objects we need
addInterventionProgressForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputIdInterventionProgress = document.getElementById("add-idInterventionProgress");
    let inputIdStudent = document.getElementById("add-idStudent");
    let inputIdIntervention = document.getElementById("add-idIntervention");
    let inputDate = document.getElementById("input-date");
    let inputInterventionProgress = document.getElementById("input-interventionProgress");
    let inputNotes = document.getElementById("input-notes");

    // Get the values from the form fields
    let idInterventionProgressValue = inputIdInterventionProgress.value;
    let idStudentValue = inputIdStudent.value;
    let idInterventionValue = inputIdIntervention.value;
    let dateValue = inputDate.value;
    let interventionProgressValue = inputInterventionProgress.value;
    let notesValue = inputNotes.value;


    // Put our data we want to send in a javascript object
    let data = {
        idInterventionProgress: idInterventionProgressValue,
        idStudent: idStudentValue,
        idIntervention: idInterventionValue,
        date: dateValue,
        interventionProgress: interventionProgressValue,
        notes: notesValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-intervention-progress-ajax", true);
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
            idInterventionProgress.value = '';
            idStudent.value = '';
            idIntervention.value = '';
            date.value = '';
            interventionProgress.value = '';
            notes.value = '';
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
    let currentTable = document.getElementById("interventionProgress-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let idInterventionCell = document.createElement("TD");
    let idStudentCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let interventionProgressCell = document.createElement("TD");
    let notesCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.idInterventionProgress;
    idInterventionCell.innerText = newRow.idIntervention;
    idStudentCell.innerText = newRow.idStudent;
    dateCell.innerText = newRow.date;
    interventionProgressCell.innerText = newRow.interventionProgress;
    notesCell.innerText = newRow.notes;
    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTest(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(idInterventionCell);
    row.appendChild(idStudentCell);
    row.appendChild(dateCell);
    row.appendChild(interventionProgressCell);
    row.appendChild(notesCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectIntervention = document.getElementById("add-idIntervention");
    let selectStudent = document.getElementById("add-idStudent");
    let date = document.createElement("input-date");
    let interventionProgress = document.createElement("input-interventionProgress");
    let notes = document.createElement("input-notes");
    date.text = newRow.date
    interventionProgress.text = newRow.score;
    notes.text = newRow.note;
    selectIntervention.add(option);
    selectStudent.add(option);
    // End of new step 8 code.
}

