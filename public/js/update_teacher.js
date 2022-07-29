// Get the objects we need to modify
let updateTeacherForm = document.getElementById('update-teacher-form-ajax');

// Modify the objects we need
updateTeacherForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputidTeacher = document.getElementById("mySelect");
    let inputteacherFirstName = document.getElementById("update-teacherFirstName");
    let inputteacherLastName = document.getElementById("update-teacherLastName");

    // Get the values from the form fields
    let idTeacherValue = inputidTeacher.value;
    let teacherFirstNameValue = inputteacherFirstName.value;
    let teacherLastNameValue = inputteacherLastName.value;
    console.log(idTeacherValue, teacherFirstNameValue, teacherLastNameValue)
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (!idTeacherValue || isNaN(idTeacherValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        idTeacher: idTeacherValue,
        teacherFirstName: teacherFirstNameValue,
        teacherLastName: teacherLastNameValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-teacher-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idTeacherValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    console.log(data)
    xhttp.send(JSON.stringify(data));
    

})


function updateRow(data, idTeacher){
    console.log(data)
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("teacher-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idTeacher) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            console.log(updateRowIndex)

            // Get td of homeworld value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign homeworld to our value we updated to
            td1.innerHTML = parsedData[1].teacherFirstName; 
            td2.innerHTML = parsedData[2].teacherLastName;

       }
    }
}

//# Citation for the CRUD operations:
// # Date: 7/28/22
// # Adapted from:
// # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app