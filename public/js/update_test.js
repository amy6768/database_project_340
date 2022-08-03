// Citation for the CRUD operations:
//  Date: 7/28/22
//  Adapted from:
//  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateTestForm = document.getElementById('update-test-form-ajax');

// Modify the objects we need
updateTestForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputidTest = document.getElementById("mySelect");
    let inputTestName = document.getElementById("update-testName");
    let inputDescription = document.getElementById("update-testDescription");

    // Get the values from the form fields
    let idTestValue = inputidTest.value;
    let testNameValue = inputTestName.value;
    let descriptionValue = inputDescription.value;
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (!idTestValue || isNaN(idTestValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        idTest: idTestValue,
        testName: testNameValue,
        testDescription: descriptionValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-test-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idTestValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    
    xhttp.send(JSON.stringify(data));
    

})


function updateRow(data, idTest){

    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("test-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idTest) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
         

            // Get td of homeworld value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign homeworld to our value we updated to
            td1.innerHTML = parsedData[1].testName; 
            td2.innerHTML = parsedData[2].testDescription;

       }
    }
}

