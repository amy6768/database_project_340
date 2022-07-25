// Get the objects we need to modify
let updateStudentForm = document.getElementById('update-student-form-ajax');

// Modify the objects we need
updateStudentForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputidStudent = document.getElementById("mySelect");
    let inputstudentFirstName = document.getElementById("update-studentFirstName");
    let inputstudentLastName = document.getElementById("update-studentLastName");
    let inputbirthdate = document.getElementById("update-birthdate");

    // Get the values from the form fields
    let idStudentValue = inputidStudent.value;
    let studentFirstNameValue = inputstudentFirstName.value;
    let studentLastNameValue = inputstudentLastName.value;
    let birthdateValue = inputbirthdate.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(idStudentValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        updateidStudent: idStudentValue,
        updatestudentFirstName: studentFirstNameValue,
        updatestudentLastName: studentLastNameValue,
        updatebirthdate: birthdateValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-student-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idStudentValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, idStudent){
    console.log(data)
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("student-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idStudent) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            console.log(updateRowIndex)

            // Get td of homeworld value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            let td3 = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td1.innerHTML = parsedData[1].studentFirstName; 
            td2.innerHTML = parsedData[2].studentLastName;
            td3.innerHTML = parsedData[2].birthdate;

       }
    }
}