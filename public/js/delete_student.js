function deleteStudent(idStudent) {
    let link = '/delete-student-ajax/';
    let data = {
      id: idStudent
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(idStudent);
      }
    });
  }
  
  function deleteRow(idStudent){
      let table = document.getElementById("student-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == idStudent) {
              table.deleteRow(i);
              break;
         }
      }
  }