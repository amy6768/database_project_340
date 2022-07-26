// App.js

//setup
var db = require('./database/db-connector')
var express = require('express');   // We are using the express library for the web server


var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
PORT= 9124;                 // Set a port number at the top so it's easy to change in the future

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
  
    let idStudent = parseInt(data.idStudent);
    let studentFirstName = parseInt(data.studentFirstName);
    let studentLastName = parseInt(data.studentLastName);
    let birthdate = parseInt(data.birthdate);
  
    let queryUpdateStudent = `UPDATE Students SET studentFirstName = ?, studentLastName = ?, birthdate = ? WHERE Students.idStudent = ?`;
    
          // Run the 1st query
          db.pool.query(queryUpdateStudent, [idStudent, studentFirstName, studentLastName, birthdate], function(error, rows, fields){
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



  
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});