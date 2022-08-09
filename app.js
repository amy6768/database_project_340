// Citation for the CRUD operations and starter code:
//  Date: 7/28/22
//  Adapted from:
// #Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// App.js

//setup
var db = require('./database/db-connector')
var express = require('express');   // We are using the express library for the web server


var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
PORT= 8123;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// Homepage render.
app.get('/', function(req, res)
    {
        res.render('Homepage');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.

// Students section - display the table or search the table and display.
app.get('/Students', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.studentLastName === undefined)
    {
        query1 = "SELECT * FROM Students;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Students WHERE studentLastName LIKE "${req.query.studentLastName}%"`
    }
    
    // Query 2 is the same in both cases
    //let query2 = "SELECT * FROM Teachers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let students = rows;
        
        return res.render('Students', {data: students});
        
    })
});                                                       // received back from the query                                       // will process this file, before sending the finished HTML to the client.

// Students section - Adding a student.
app.post('/add-student-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        let birthday = data.birthdate
        if (birthday === "" || birthday === "mm-dd-yy")
        {birthday = 'NULL'}
    
        query1 = `INSERT INTO Students (studentFirstName, studentLastName, birthdate) VALUES ('${data.studentFirstName}', '${data.studentLastName}', '${birthday}')`;
    
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Students
                query2 = "SELECT * FROM Students;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

// Students section - Delete a student.
app.delete('/delete-student-ajax', function(req,res,next){
    let data = req.body;
    let idStudent = parseInt(data.id);
    let deleteStudent= `DELETE FROM Students WHERE idStudent = ?`;
    
    // Run the 1st query
    db.pool.query(deleteStudent, [idStudent], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
        
                
  })});

// Students section - Update a student.
app.put('/put-student-ajax', function(req,res,next){
    let data = req.body;
    let idStudent = data.idStudent;
    let studentFirstName = data.studentFirstName;
    let studentLastName = data.studentLastName;
    let birthdate = data.birthdate;
  
    let queryUpdateStudent = `UPDATE Students SET studentFirstName = ?, studentLastName = ?, birthdate = ? WHERE Students.idStudent = ?`;
    
          // Run the 1st query
          db.pool.query(queryUpdateStudent, [studentFirstName, studentLastName, birthdate, idStudent], function(error, rows, fields){
            console.log(queryUpdateStudent)
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
            {
                // If there was no error, perform a SELECT * on Students
                query2 = "SELECT * FROM Students;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
  })});

// Everything for Tests
// Test section - display the table or search the table and display.
app.get('/Tests', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.testName === undefined)
    {
        query1 = "SELECT * FROM Tests;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Tests WHERE testName LIKE "${req.query.testName}%"`
    }
    
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let tests = rows;
        
        return res.render('Tests', {data: tests});
        
    })
}); 

// test section - Adding a test.
app.post('/add-test-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        query1 = `INSERT INTO Tests (testName, testDescription) VALUES ('${data.testName}', '${data.testDescription}')`;
    
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Tests
                query2 = "SELECT * FROM Tests;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

// Tests section - Delete a test.
app.delete('/delete-test-ajax/', function(req,res,next){
    let data = req.body;
    let idTest = parseInt(data.id);
    let deleteTest= `DELETE FROM Tests WHERE idTest = ?`;
  
  
    // Run the 1st query
    db.pool.query(deleteTest, [idTest], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
                
  })});

// Test section - Update a test.
app.put('/put-test-ajax', function(req,res,next){
    let data = req.body;
    let idTest = data.idTest;
    let testName = data.testName;
    let testDescription = data.testDescription;
    console.log(idTest, testName, testDescription)
  
    let queryUpdateTest = `UPDATE Tests SET testName = ?, testDescription = ? WHERE Tests.idTest = ?`;
    
          // Run the 1st query
          db.pool.query(queryUpdateTest, [testName, testDescription, idTest], function(error, rows, fields){
            console.log(queryTests)
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
            {
                // If there was no error, perform a SELECT * on Tests
                query2 = "SELECT * FROM Tests;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
  })});

// Everything for Parents:
app.get('/Parents', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.parentLastName === undefined)
    {
        query1 = "SELECT * FROM Parents;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Parents WHERE parentLastName LIKE "${req.query.parentLastName}%"`
        console.log(query1)
    }
    

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let tests = rows;
        
        return res.render('Parents', {data: tests});
        
    })
});  

// Parent section - Adding a parent.
app.post('/add-parent-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        query1 = `INSERT INTO Parents (parentFirstName, parentLastName, phoneNumber) VALUES ('${data.firstName}', '${data.lastName}', '${data.phoneNumber}')`;
    
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Parents
                query2 = "SELECT * FROM Parents;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

// Tests section - Delete a parent.
app.delete('/delete-parent-ajax/', function(req,res,next){
    let data = req.body;
    let idParent = parseInt(data.id);
    let deleteParent= `DELETE FROM Parents WHERE idParent = ?`;
  
  
    // Run the 1st query
    db.pool.query(deleteParent, [idParent], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
                
  })});

// Parents section - Update a Parent.
app.put('/put-parent-ajax', function(req,res,next){
    let data = req.body;
    let idParent = data.idParent;
    let firstName = data.firstName
    let lastName = data.lastName;
    let phoneNumber = data.phoneNumber;
    console.log(idParent, firstName, lastName, phoneNumber)
  
    let queryUpdateParent = `UPDATE Parents SET parentFirstName = ?, parentLastName = ?, phoneNumber = ? WHERE Parents.idParent = ?`;
    
          // Run the 1st query
          db.pool.query(queryUpdateParent, [firstName, lastName, phoneNumber, idParent], function(error, rows, fields){
            console.log(queryUpdateParent)
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
            {
                // If there was no error, perform a SELECT * on Parents
                query2 = "SELECT * FROM Parents;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
  })});


// Everything for TestScores
// TestScores section - display the table or search the table and display.
app.get('/TestScores', async function(req, res)
{
    // Declare Query 1
    
    let query1 = "SELECT TestScores.idTestScore, TestScores.testDate, TestScores.testScore, Students.studentFirstName, Tests.testName, TestScores.notes FROM ((TestScores INNER JOIN Students on TestScores.idStudent = Students.idStudent) INNER JOIN Tests on TestScores.idTest = Tests.idTest);";
    
    let query2 = 'SELECT * FROM Tests';

    let query3 = 'SELECT * from Students';

    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let TestScores = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let idTest = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let idStudent = rows;
                
                return res.render('TestScores', {data: TestScores, idTest: idTest, idStudent: idStudent});
            })

            
        })
        
        
    })
}); 

// TestScores section - Adding a TestScores.
app.post("/add-test-score-ajax", function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        query1 = `INSERT INTO TestScores (testDate, testScore, notes, idTest, idStudent) VALUES ('${data.testDate}', '${data.testScore}', '${data.testNotes}', '${data.idTest}', '${data.idStudent}')`;
        
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on TestScores
                query2 = "SELECT * FROM TestScores;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

// TestScores section - Delete a TestScores.
app.delete('/delete-test-score-ajax/', function(req,res,next){
    let data = req.body;
    let idTestScore = parseInt(data.id);
    let deleteTest= `DELETE FROM TestScores WHERE idTestScore = ?`;
  
  
    // Run the 1st query
    db.pool.query(deleteTest, [idTestScore], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
                
  })});

// Everything for StudentsTeachers
// StudentsTeachers section - display the table or search the table and display.
app.get('/StudentsTeachers', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT StudentsTeachers.idStudentsTeacher,Teachers.teacherFirstName, Students.studentFirstName \
    FROM ((StudentsTeachers INNER JOIN Students on StudentsTeachers.idStudent = Students.idStudent) \
    INNER JOIN Teachers on StudentsTeachers.idTeacher = Teachers.idTeacher);";
    
    let query2 = "SELECT * FROM Teachers;";

    let query3 = "SELECT * FROM Students;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let StudentsTeachers = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let idTeacher = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let idStudent = rows;
                
                return res.render('StudentsTeachers', {data: StudentsTeachers, idTeacher: idTeacher, idStudent: idStudent});
            })

            
        })
        
        
    })

 
});

// StudentsTeachers section - Adding a StudentsTeachers.
app.post('/add-students-teacher-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        query1 = `INSERT INTO StudentsTeachers (idTeacher, idStudent) VALUES ('${data.idTeacher}', '${data.idStudent}')`;
    
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on StudentsTeachers
                query2 = "SELECT * FROM StudentsTeachers;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

// StudentsTeachers section - Delete a StudentsTeachers.
app.delete('/delete-students-teacher-ajax/', function(req,res,next){
    let data = req.body;
    let idStudentsTeacher = parseInt(data.id);
    let deleteStudentsTeacher= `DELETE FROM StudentsTeachers WHERE idStudentsTeacher = ?`;
  
  
    // Run the 1st query
    db.pool.query(deleteStudentsTeacher, [idStudentsTeacher], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
                
  })});

// Everything for StudentsTests section
// StudentsTests section - display the table or search the table and display.
app.get('/StudentsTests', function(req, res)
{
    // Declare Query 1
    
    let query1 = "SELECT StudentsTests.idStudentTest, Students.studentFirstName, Tests.testName FROM ((StudentsTests INNER JOIN Students on StudentsTests.idStudent = Students.idStudent) INNER JOIN Tests on StudentsTests.idTest = Tests.idTest);";
    
    let query2 = "SELECT * FROM Students";

    let query3 = "SELECT * FROM Tests";


    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let StudentTests = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let idStudent = rows;

            db.pool.query(query3, (error, rows, fields) => {
                
                let idTest = rows;
                
                return res.render('StudentsTests', {data: StudentTests, idStudent: idStudent, idTest: idTest});
            })

            
        })
        
        
    })
});                                                       // received back from the query                                       // will process this file, before sending the finished HTML to the client.

// StudentsTests section - Adding a StudentsTests.
app.post('/add-students-tests-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        query1 = `INSERT INTO StudentsTests (idStudent, idTest) VALUES ('${data.idStudent}', '${data.idTest}')`;
    
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on StudentsTests
                query2 = "SELECT * FROM StudentsTests;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

// StudentsTests section - Delete a StudentsTests.
app.delete('/delete-students-tests-ajax', function(req,res,next){
    let data = req.body;
    let idStudentsTests = parseInt(data.id);
    let deleteStudentsTest= `DELETE FROM StudentsTests WHERE idStudentTest = ?`;
  
  
    // Run the 1st query
    db.pool.query(deleteStudentsTest, [idStudentsTests], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
                
  })});


  // Everything for Teachers

  app.get('/Teachers', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.teacherLastName === undefined)
    {
        query1 = "SELECT * FROM Teachers;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Teachers WHERE teacherLastName LIKE "${req.query.teacherLastName}%"`
    }
    
    // Query 2 is the same in both cases
    //let query2 = "SELECT * FROM Teachers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let teachers = rows;
        
        return res.render('Teachers', {data: teachers});
        
    })
});                                                       // received back from the query

// Add a Teacher
app.post('/add-teacher-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
       
        // Create the query and run it on the database
        query1 = `INSERT INTO Teachers (teacherFirstName, teacherLastName) VALUES ('${data.teacherFirstName}', '${data.teacherLastName}')`;
    
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Teachers
                query2 = "SELECT * FROM Teachers;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

// Update a Teacher

app.put('/put-teacher-ajax', function(req,res,next){
    let data = req.body;
    console.log(req)
    let idTeacher = data.idTeacher;
    let teacherFirstName = data.teacherFirstName;
    let teacherLastName = data.teacherLastName;
    console.log(idTeacher, teacherFirstName, teacherLastName)
  
    let queryUpdateTeacher = `UPDATE Teachers SET teacherFirstName = ?, teacherLastName = ? WHERE Teachers.idTeacher = ?`;
    
          // Run the 1st query
          db.pool.query(queryUpdateTeacher, [teacherFirstName, teacherLastName, idTeacher], function(error, rows, fields){
            console.log(queryUpdateTeacher)
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
            {
                // If there was no error, perform a SELECT * on Students
                query2 = "SELECT * FROM Teachers;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
  })});

// Delete a Teacher
app.delete('/delete-teacher-ajax/', function(req,res,next){
    let data = req.body;
    let idTeacher = parseInt(data.id);
    let deleteTeacher= `DELETE FROM Teachers WHERE idTeacher = ?`;

    console.log(data);
    console.log(idTeacher);
    console.log(deleteTeacher);
  
    // Run the 1st query
    db.pool.query(deleteTeacher, [idTeacher], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
                
  })});

  // Everything for Interventions
  app.get('/Interventions', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.interventionName === undefined)
    {
        query1 = "SELECT * FROM Interventions;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Interventions WHERE interventionName LIKE "${req.query.interventionName}%"`
    }
    
    // Query 2 is the same in both cases
    //let query2 = "SELECT * FROM Teachers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let interventions = rows;
        
        return res.render('Interventions', {data: interventions});
        
    })
});                                                       // received back from the query

// Add an Intervention
app.post('/add-intervention-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
       
        // Create the query and run it on the database
        query1 = `INSERT INTO Interventions (interventionName, interventionDescription) VALUES ('${data.interventionName}', '${data.interventionDescription}')`;
    
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Students
                query2 = "SELECT * FROM Interventions;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

// Update an Intervention
app.put('/put-intervention-ajax', function(req,res,next){
    let data = req.body;
    console.log(req)
    let idIntervention = data.idIntervention;
    let interventionName = data.interventionName;
    let interventionDescription = data.interventionDescription;
    console.log(idIntervention, interventionName, interventionDescription)
  
    let queryUpdateIntervention = `UPDATE Interventions SET interventionName = ?, interventionDescription = ? WHERE Interventions.idIntervention = ?`;
    
          // Run the 1st query
          db.pool.query(queryUpdateIntervention, [interventionName, interventionDescription, idIntervention], function(error, rows, fields){
            console.log(queryUpdateIntervention)
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
            {
                // If there was no error, perform a SELECT * on Interventions
                query2 = "SELECT * FROM Interventions;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
  })});

// Delete an Intervention
app.delete('/delete-intervention-ajax/', function(req,res,next){
    let data = req.body;
    let idIntervention = parseInt(data.id);
    let deleteIntervention= `DELETE FROM Interventions WHERE idIntervention = ?`;

    console.log(data);
    console.log(idIntervention);
    console.log(deleteIntervention);
  
    // Run the 1st query
    db.pool.query(deleteIntervention, [idIntervention], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
                
  })});

// Everything for StudentsParents
// StudentsParent section - display the table or search the table and display.
app.get('/StudentsParents', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT StudentsParents.idStudentsParent, Parents.parentFirstName, Students.studentFirstName \
    FROM ((StudentsParents INNER JOIN Students on StudentsParents.idStudent = Students.idStudent) \
    INNER JOIN Parents on StudentsParents.idParent = Parents.idParent);";
    
    let query2 = "SELECT * FROM Parents;";

    let query3 = "SELECT * FROM Students;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let StudentsParents = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let idParent = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let idStudent = rows;
                
                return res.render('StudentsParents', {data: StudentsParents, idParent: idParent, idStudent: idStudent});
            })

            
        })
        
        
    })

    //db.pool.query(query2, function(error, rows, fields){
        
        // Save the student
        //let parents = rows;
        //console.log(Teachers)
        //return res.render('Teachers', {data: Teachers})});
});                                                       // received back from the query                                       // will process this file, before sending the finished HTML to the client.

// StudentsParents section - Adding a StudentsParents.
app.post('/add-students-parent-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        //let birthdate = data.birthdate;
        //if (isNaN(birthdate))
        //{birthdate = 'NULL'}
        // Create the query and run it on the database
        query1 = `INSERT INTO StudentsParents (idParent, idStudent) VALUES ('${data.idParent}', '${data.idStudent}')`;
    
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Students
                query2 = "SELECT * FROM StudentsParents;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

// StudentsParents section - Delete a StudentsParents.
app.delete('/delete-students-parent-ajax/', function(req,res,next){
    let data = req.body;
    let idStudentsParent = parseInt(data.id);
    let deleteStudentsParent= `DELETE FROM StudentsParents WHERE idStudentsParent = ?`;
  
  
    // Run the 1st query
    db.pool.query(deleteStudentsParent, [idStudentsParent], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
                
  })});


// Everything for StudentsInterventions
// StudentsInerventions section - display the table or search the table and display.
app.get('/StudentsInterventions', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT StudentsInterventions.idStudentsIntervention, Interventions.interventionName, Students.studentFirstName \
    FROM ((StudentsInterventions INNER JOIN Students on StudentsInterventions.idStudent = Students.idStudent) \
    INNER JOIN Interventions on StudentsInterventions.idIntervention = Interventions.idIntervention);";
    
    let query2 = "SELECT * FROM Interventions;";

    let query3 = "SELECT * FROM Students;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let StudentsInterventions = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let idIntervention = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let idStudent = rows;
                console.log(StudentsInterventions)
                console.log(idIntervention)
                console.log(idStudent)
                return res.render('StudentsInterventions', {data: StudentsInterventions, idIntervention: idIntervention, idStudent: idStudent});
            })
            
        })
        
    })

    
});                                                                                         

// Adding a StudentInterventions
app.post('/add-students-intervention-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        query1 = `INSERT INTO StudentsInterventions (idIntervention, idStudent) VALUES ('${data.idIntervention}', '${data.idStudent}')`;
    
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Students
                query2 = "SELECT * FROM StudentsInterventions;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

// Delete a StudentsIntervention
app.delete('/delete-students-intervention-ajax/', function(req,res,next){
    let data = req.body;
    let idStudentsIntervention= parseInt(data.id);
    let deleteStudentsIntervention= `DELETE FROM StudentsInterventions WHERE idStudentsIntervention = ?`;
  
  
    // Run the 1st query
    db.pool.query(deleteStudentsIntervention, [idStudentsIntervention], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
                
  })});


// Everything for InterventionProgress
// InterventionProgress section - display the table or search the table and display.
app.get('/InterventionsProgress', async function(req, res)
{
    // Declare Query 1
    
    let query1 = "SELECT InterventionsProgress.idInterventionProgress, InterventionsProgress.startDate, InterventionsProgress.interventionNotes, Students.studentFirstName, Interventions.InterventionName FROM ((InterventionsProgress INNER JOIN Students on InterventionsProgress.idStudent = Students.idStudent) INNER JOIN Interventions on InterventionsProgress.idIntervention = Interventions.idIntervention);";
    
    let query2 = 'SELECT * FROM Interventions';

    let query3 = 'SELECT * from Students';

    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let InterventionsProgress = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let idIntervention = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let idStudent = rows;
                
                return res.render('InterventionsProgress', {data: InterventionsProgress, idIntervention: idIntervention, idStudent: idStudent});
            })
            
        })       
        
    })
});                                                       // received back from the query                                       // will process this file, before sending the finished HTML to the client.

// Adding an InterventionsProgress
app.post("/add-interventions-progress-ajax", function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        //let birthdate = data.birthdate;
        //if (isNaN(birthdate))
        //{birthdate = 'NULL'}
        // Create the query and run it on the database
        query1 = `INSERT INTO InterventionsProgress (startDate, interventionNotes, idIntervention, idStudent) VALUES ('${data.startDate}', '${data.interventionNotes}', '${data.idIntervention}', '${data.idStudent}')`;
        
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Students
                query2 = "SELECT * FROM InterventionsProgress;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

//InterventionsProgress Section - Delete an Interventions Progress
app.delete('/delete-interventions-progress-ajax/', function(req,res,next){
    let data = req.body;
    let idInterventionProgress = parseInt(data.id);
    let deleteInterventionsProgress = `DELETE FROM InterventionsProgress WHERE idInterventionProgress = ?`;
  
  
    // Run the 1st query
    db.pool.query(deleteInterventionsProgress, [idInterventionProgress], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
                
  })});

// Everything for BehaviorIncident
// BehaviorIncident section - display the table or search the table and display.
app.get('/BehaviorIncidents', async function(req, res)
{
    // Declare Query 1
    
    let query1 = "SELECT BehaviorIncidents.idBehaviorIncident, BehaviorIncidents.observedBehavior, BehaviorIncidents.actionTaken, BehaviorIncidents.parentContact, BehaviorIncidents.date, Students.studentFirstName FROM (BehaviorIncidents LEFT OUTER JOIN Students on BehaviorIncidents.idStudent = Students.idStudent)";

    let query2 = 'SELECT * from Students';

    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let BehaviorIncidents = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let idStudent = rows;

            return res.render('BehaviorIncidents', {data: BehaviorIncidents, idStudent: idStudent});
            

            
        })
        
        
    })
}); 

// TestScores section - Adding a TestScores.
app.post("/add-behavior-incident-ajax", function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        let studentID = data.idStudent
        if (studentID === "Select a Student"){
            studentID = "NULL"
        }
    
        query1 = `INSERT INTO BehaviorIncidents (observedBehavior, actionTaken, parentContact, date, idStudent) VALUES ('${data.observedBehavior}', '${data.actionTaken}', '${data.parentContact}', '${data.Date}', '${studentID}')`;
        
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on TestScores
                query2 = "SELECT * FROM BehaviorIncidents;";
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

// TestScores section - Delete a TestScores.
app.delete('/delete-behavior-incident-ajax/', function(req,res,next){
    let data = req.body;
    let idBehaviorIncident = parseInt(data.id);
    let deleteBehaviorIncident= `DELETE FROM BehaviorIncidents WHERE idBehaviorIncident = ?`;
  
  
    // Run the 1st query
    db.pool.query(deleteBehaviorIncident, [idBehaviorIncident], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
                
  })});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

