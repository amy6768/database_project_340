// Citation for the CRUD operations: 
//  Date: 7/28/22
//  Adapted from:
//  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addTestScoreForm = document.getElementById("add-students-parent-ajax");

// Modify the objects we need
addTestScoreForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputIdParent = document.getElementById("add-idParent");
    let inputIdStudent = document.getElementById("add-idStudent");

    // Get the values from the form fields
    let idParentValue = inputIdParent.value;
    let idStudentValue = inputIdStudent.value;



    // Put our data we want to send in a javascript object
    let data = {
        idParent: idParentValue,
        idStudent: idStudentValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-students-parent-ajax", true);
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
            idParent.value = '';
            idStudent.value = '';
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
    let currentTable = document.getElementById("studentsParent-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let idParentCell = document.createElement("TD");
    let idStudentCell = document.createElement("TD");


    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.idStudentsParent;
    idParentCell.innerText = newRow.idParent;
    idStudentCell.innerText = newRow.idStudent;

    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTest(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(idParent);
    row.appendChild(idStudent);


    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.firstname + ' ' +  newRow.lastName;
    option.value = newRow.id;
    selectMenu.add(option);
    // End of new step 8 code.
}

