require('dotenv').config();

var express = require("express");

var cors = require('cors')

// var pizza_data = require("./data/pizza");

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./data/client_secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var spreadsheetId = '1tpzXkd0eMJZtAMo8lZ2gvcqCMx_ku4kx_FUOZvh8x20'
var doc = new GoogleSpreadsheet(spreadsheetId);

var app = express();

app.use(cors()) //enabling all cors requests

var port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log("Server running on port:", port);
});

function compareNamesAscending(a,b) {
  if (a.president < b.president)
    return -1;
  if (a.president > b.president)
    return 1;
  return 0;
}

function compareNamesDescending(a,b) {
  if (a.president < b.president)
    return 1;
  if (a.president > b.president)
    return -1;
  return 0;
}

function sortArrayAscendingOrder(array) {
 return array.sort(compareNamesAscending)
}

function sortArrayDescendingOrder(array) {
 return array.sort(compareNamesDescending)
}


//NOTE: this works, but only need one api endpoint, below
// app.get("/presidents", (req, res) => {
//
//   // console.log("req.query.order is: ", req.query.order)
//
//   // Authenticate with the Google Spreadsheets API.
//   doc.useServiceAccountAuth(creds, function (err) {
//     // Get all of the rows from the spreadsheet.
//       doc.getRows(1, function (err, rows) {
//         if(!err) {
//           var sortedArray = sortArrayAscendingOrder(rows)
//           res.json(sortedArray) //send rows of data as response to api endpoint
//         } else {
//           console.log("err is: ", err)
//         }
//       });
//   });
// })


app.get("/presidents/:order", (req, res) => {

  var order = req.params.order

  console.log("req.params.order is: ", req.params.order) //this is with :order
  // console.log("req.query.order is: ", req.query.order) //this is with ?order

  // Authenticate with the Google Spreadsheets API.
  doc.useServiceAccountAuth(creds, function (err) {
    // Get all of the rows from the spreadsheet.
      doc.getRows(1, function (err, rows) {
        if(!err) {
          var sortedArray = sortArrayAscendingOrder(rows) //ascending is the default order
          if (order === "orderAscending") {
            // console.log("order === orderAscending!")
            sortedArray = sortArrayAscendingOrder(rows)
          } else {
            // console.log("order === orderDescending!")
            sortedArray = sortArrayDescendingOrder(rows)
          }
          res.json(sortedArray) //send rows of data as response to api endpoint
        } else {
          console.log("err is: ", err)
        }
      });
  });
})
