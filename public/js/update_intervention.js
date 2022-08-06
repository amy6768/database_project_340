// Citation for the CRUD operations:
//  Date: 7/28/22
//  Adapted from:
//  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateInterventionForm = document.getElementById('update-intervention-form-ajax');

// Modify the objects we need
updateInterventionForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputidIntervention = document.getElementById("mySelect");
    let inputinterventionName = document.getElementById("update-interventionName");
    let inputinverventionDescription = document.getElementById("update-interventionDescription");

    // Get the values from the form fields
    let idInterventionValue = inputidIntervention.value;
    let interventionNameValue = inputinterventionName.value;
    let interventionDescriptionValue = inputinterventionDescription.value;
    console.log(idInterventionValue, interventionNameValue, interventionDescriptionValue)
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (!idInterventionValue || isNaN(idInterventionValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        idIntervention: idInterventionValue,
        interventionName: interventionNameValue,
        interventionDescription: interventionDescriptionValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-intervention-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idInterventionValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    console.log(data)
    xhttp.send(JSON.stringify(data));
    

})


function updateRow(data, idIntervention){
    console.log(data)
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("intervention-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idIntervention) {

            // Get the location of the row where we found the matching intervention ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            console.log(updateRowIndex)

            // Get td of intervention value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign intervention to our value we updated to
            td1.innerHTML = parsedData[1].interventionName; 
            td2.innerHTML = parsedData[2].interventionDescription;

       }
    }
}

