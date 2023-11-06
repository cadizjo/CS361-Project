/*
    SETUP
*/

var express = require('express');               // use express library for web server
var app = express();                            // instantiate an express object to interact with the server in our code
PORT = 4261;                                    // receives incoming requests on specified PORT

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.static("public/"))              // all files in public directory are treated as static files
app.use(express.json())                         // to read/handle/parse JSON objects
app.use(express.urlencoded({extended: true}))
       
// file manipulation
var fs = require("fs")
var birthdayObjects = require("./birthday-objects.json") // store added birthdays

/*
    ROUTES
*/

/*
    PROCESS SELECT/READ QUERIES
*/
app.get('/', function(req, res) {
    res.status(200).render('index'); // home page   
}); 

app.get('/birthdays', function(req, res) {
    // read JSON objects file (synchronous)
    var file = fs.readFileSync("./birthday-objects.json")
    var json = JSON.parse(file)

    if (json.length == 0) {
        res.status(200).render('birthdays', {
            birthdayCards: null,
        })
    }
    else {
        // parse file and filter data as an array of objects for rendering
        var objects = []
        var renderthisObj
        for (var i = 0; i < json.length; i++) {
            renderthisObj = {
                name: json[i].name,
                age: json[i].age,
                date: json[i].date_string,
                img_url: json[i].img_url
            }
            objects.push(renderthisObj)
        }
        objects = sortByDate(objects)
        res.status(200).render('birthdays', {
            birthdayCards: objects,
        })
    }
}); 

app.post('/addBirthday', function(req, res) {
    var data = req.body

    // convert numerical date to full Month name and day
    var convertDate = new Date(data.date)
    convertDate.setDate(convertDate.getDate() + 1) // add 1 day since getDay() returns the prev date

    var month = convertDate.toLocaleString('default', { month: 'long' })
    var day = convertDate.getDate().toString()

    var dateString = month.concat(" ", day)
    
    // calculate and get age
    var ageDifMs = Date.now() - convertDate;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    age = Math.abs(ageDate.getUTCFullYear() - 1970)
    
    // default img if none provided by user
    if (data.imgUrl == null || data.imgUrl == "") 
        data.imgUrl = "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"

    // create obj from user data and write to JSON
    var birthdayData = {
        name: data.name,
        age: age,
        date: data.date,
        date_string: dateString,
        img_url: data.imgUrl,
        interests: data.interests
    }
    storeObj(birthdayData)
    res.sendStatus(200) // send response to client
})

app.get("*", function (req, res) {
    console.log("\n  -- 404!");
    res.status(404).send('Error 404 - Page not found');
});

/*
    LISTENER
*/
app.listen(PORT, function(err) {        
    if (err)
        throw err
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to send signal and terminate.')
});


// helper functions

// store a birthday obj to json file
function storeObj(obj) {

    // write obj to birthday objects file
    fs.readFile("./birthday-objects.json", function (err, data) {

        birthdayObjects = JSON.parse(data)
        birthdayObjects.push(obj)
        fs.writeFileSync("./birthday-objects.json", JSON.stringify(birthdayObjects, null, 2))
        // setTimeout(function () {
        //     fs.writeFile("./birthday-objects.json", JSON.stringify(birthdayObjects, null, 2), function (err) {})
        // }, 300) // 300 ms delay, otherwise this all happens too fast and writes to the file twice essentially
    })
} 

// sorts birthday object array by date (month and day) - insertion sort
function sortByDate(objArray) {

    var currDate = new Date()
    currDate.setFullYear(2001) // must set to disclude year in comparisons
    var futureDateObjects = [] // stores objects whose date belongs to next yr

    for (var i = 0; i < objArray.length; i++) {
        if (currDate > new Date(objArray[i].date)) { // curr date > date in array
            futureDateObjects.push(objArray[i]) // push date to separate array for later
            objArray.splice(i, 1) // remove elem at specific idx
            i-- // if elem at curr idx removed, stay on curr idx at next iter since all following elems are shifted back by 1
        }
        else { // o/w sort curr elem
            var j = i;
            while (j != 0 && (new Date(objArray[j-1].date) > new Date(objArray[j].date))) {
                var temp = objArray[j-1]
                objArray[j-1] = objArray[j]
                objArray[j] = temp
                j--
            }
        }
    }
    // after sorting original array, sort new array of future dates
    for (var i = 0; i < futureDateObjects.length; i++) {
        var j = i;
        while (j != 0 && (new Date(futureDateObjects[j-1].date) > new Date(futureDateObjects[j].date))) {
            var temp = futureDateObjects[j-1]
            futureDateObjects[j-1] = futureDateObjects[j]
            futureDateObjects[j] = temp
            j--
        }
    }
    // concatenate both arrays to get final sorted array relative to the current day
    if (objArray.length > 0 && futureDateObjects.length > 0)
        return objArray.concat(futureDateObjects)
    else if (objArray.length == 0)
        return futureDateObjects
    else if (futureDateObjects.length == 0)
        return objArray
}
  