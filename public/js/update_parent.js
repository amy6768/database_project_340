// Citation for the CRUD operations:
//  Date: 7/28/22
//  Adapted from:
//  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateParentForm = document.getElementById('update-parent-form-ajax');

// Modify the objects we need
updateParentForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputidParent = document.getElementById("mySelect");
    let inputFirstName = document.getElementById("update-firstName")
    let inputLastName = document.getElementById("update-lastName");
    let inputPhoneNumber = document.getElementById("update-phoneNumber");

    // Get the values from the form fields
    let idParentValue = inputidParent.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let phoneNumberValue = inputPhoneNumber.value;
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (!idParentValue || isNaN(idParentValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        idParent: idParentValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        phoneNumber: phoneNumberValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-parent-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idParentValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    console.log(data)
    xhttp.send(JSON.stringify(data));
    

})


function updateRow(data, idParent){
    console.log(data)
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("parent-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idParent) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            console.log(updateRowIndex)

            // Get td of homeworld value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            let td3 = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td1.innerHTML = parsedData[1].firstName; 
            td2.innerHTML = parsedData[2].lastName;
            td3.innerHTML = parsedData[3].phoneNumber;

       }
    }
}

