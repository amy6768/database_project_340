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
    
        //let birthdate = data.birthdate;
        //if (isNaN(birthdate))
        //{birthdate = 'NULL'}
        // Create the query and run it on the database
        query1 = `INSERT INTO Students (studentFirstName, studentLastName, birthdate) VALUES ('${data.studentFirstName}', '${data.studentLastName}', '${data.birthdate}')`;
    
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
app.delete('/delete-student-ajax/', function(req,res,next){
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
    console.log(req)
    let idStudent = data.idStudent;
    let studentFirstName = data.studentFirstName;
    let studentLastName = data.studentLastName;
    let birthdate = data.birthdate;
    console.log(idStudent, studentFirstName, studentLastName, birthdate)
  
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
    
    // Query 2 is the same in both cases
    //let query2 = "SELECT * FROM Teachers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let tests = rows;
        
        return res.render('Tests', {data: tests});
        
    })
});                                                       // received back from the query                                       // will process this file, before sending the finished HTML to the client.

// test section - Adding a test.
app.post('/add-test-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        //let birthdate = data.birthdate;
        //if (isNaN(birthdate))
        //{birthdate = 'NULL'}
        // Create the query and run it on the database
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
                // If there was no error, perform a SELECT * on Students
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
    console.log(req)
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
                // If there was no error, perform a SELECT * on Students
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
    if (req.query.testName === undefined)
    {
        query1 = "SELECT * FROM Parents;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Parents WHERE testName LIKE "${req.query.firstName}%"`
    }
    
    // Query 2 is the same in both cases
    //let query2 = "SELECT * FROM Teachers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let tests = rows;
        
        return res.render('Parents', {data: tests});
        
    })
});                                                       // received back from the query                                       // will process this file, before sending the finished HTML to the client.

// Parent section - Adding a parent.
app.post('/add-parent-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        //let birthdate = data.birthdate;
        //if (isNaN(birthdate))
        //{birthdate = 'NULL'}
        // Create the query and run it on the database
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
                // If there was no error, perform a SELECT * on Students
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

// Tests section - Delete a student.
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
    console.log(req)
    let idParent = data.idParent;
    let firstName = data.firstName
    let lastName = data.lastName;
    let phoneNumber = data.phoneNumber;
    console.log(idParent, firstName, lastName, phoneNumber)
  
    let queryUpdateParent = `UPDATE Parents SET parentFirstName = ?, parentLastName = ?, phoneNumber WHERE Parents.idParent = ?`;
    
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
                // If there was no error, perform a SELECT * on Students
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
app.get('/TestScores', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.studentLastName === undefined)
    {
        query1 = "SELECT TestScores.idTestScore, TestScores.testDate, TestScores.testScore, Students.studentFirstName, Tests.testName, TestScores.notes FROM ((TestScores INNER JOIN Students on TestScores.idStudent = Students.idStudent) INNER JOIN Tests on TestScores.idTest = Tests.idTest);";
    }

    // If there is a query string, we assume this is a search, and return desired results
    
    // Query 2 is the same in both cases
    //let query2 = "SELECT * FROM Teachers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let testScores = rows;
        
        return res.render('TestScores', {data: testScores});
        
    })
});                                                       // received back from the query                                       // will process this file, before sending the finished HTML to the client.

// TestScores section - Adding a TestScores.
app.post('/add-student-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        //let birthdate = data.birthdate;
        //if (isNaN(birthdate))
        //{birthdate = 'NULL'}
        // Create the query and run it on the database
        query1 = `INSERT INTO Students (studentFirstName, studentLastName, birthdate) VALUES ('${data.studentFirstName}', '${data.studentLastName}', '${data.birthdate}')`;
    
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

// TestScores section - Delete a TestScores.
app.delete('/delete-student-ajax/', function(req,res,next){
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

// Everything for StudentsTeachers
// StudentsTeachers section - display the table or search the table and display.
app.get('/StudentsTeachers', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.studentLastName === undefined)
    {
        query1 = "SELECT StudentsTeachers.idStudentsTeacher,Teachers.teacherFirstName, Students.studentFirstName FROM ((StudentsTeachers INNER JOIN Students on StudentsTeachers.idStudent = Students.idStudent) INNER JOIN Teachers on StudentsTeachers.idTeacher = Teachers.idTeacher);";
    }

    // If there is a query string, we assume this is a search, and return desired results
    
    // Query 2 is the same in both cases
    //let query2 = "SELECT * FROM Teachers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let StudentsTeachers = rows;
        
        return res.render('StudentsTeachers', {data: StudentsTeachers});
        
    })
});                                                       // received back from the query                                       // will process this file, before sending the finished HTML to the client.

// StudentsTeachers section - Adding a StudentsTeachers.
app.post('/add-students-teacher-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        //let birthdate = data.birthdate;
        //if (isNaN(birthdate))
        //{birthdate = 'NULL'}
        // Create the query and run it on the database
        query1 = `INSERT INTO Students (studentFirstName, studentLastName, birthdate) VALUES ('${data.studentFirstName}', '${data.studentLastName}', '${data.birthdate}')`;
    
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

// StudentsTeachers section - Delete a StudentsTeachers.
app.delete('/delete-students-teacher-ajax/', function(req,res,next){
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

// Everything for StudentsTests section
// StudentsTests section - display the table or search the table and display.
app.get('/StudentsTests', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.studentLastName === undefined)
    {
        query1 = "SELECT StudentsTests.idStudentTest, Students.studentFirstName, Tests.testName FROM ((StudentsTests INNER JOIN Students on StudentsTests.idStudent = Students.idStudent) INNER JOIN Tests on StudentsTests.idTest = Tests.idTest);";
    }

    // If there is a query string, we assume this is a search, and return desired results
    
    // Query 2 is the same in both cases
    //let query2 = "SELECT * FROM Teachers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the student
        let StudentsTests = rows;
        
        return res.render('StudentsTests', {data: StudentsTests});
        
    })
});                                                       // received back from the query                                       // will process this file, before sending the finished HTML to the client.

// StudentsTests section - Adding a StudentsTeachers.
app.post('/add-students-teacher-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        //let birthdate = data.birthdate;
        //if (isNaN(birthdate))
        //{birthdate = 'NULL'}
        // Create the query and run it on the database
        query1 = `INSERT INTO Students (studentFirstName, studentLastName, birthdate) VALUES ('${data.studentFirstName}', '${data.studentLastName}', '${data.birthdate}')`;
    
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

// StudentsTests section - Delete a StudentsTeachers.
app.delete('/delete-students-teacher-ajax/', function(req,res,next){
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


  // Routes for Teachers

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


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

