require('dotenv').config();

var express = require("express");

var cors = require('cors')

// var GoogleSpreadsheet = require('google-spreadsheet');
// var creds = require('./data/client_secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
// var spreadsheetId = '1tpzXkd0eMJZtAMo8lZ2gvcqCMx_ku4kx_FUOZvh8x20'
// var doc = new GoogleSpreadsheet(spreadsheetId);

var prezData = require('./presidents.json')

// console.log('0. prezData is: ', prezData)

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

// function compareNames(a,b, order) {
//   if
// }

function sortArray(array, order) {
  console.log('in sortArray, order is: ', order)
  if (order === "orderAscending") {
    return array.sort(compareNamesAscending)
    // return array.sort(compareNames(order) ) //check how to refactor this with just one function
  } else {
    return array.sort(compareNamesDescending)
  }
}

app.get("/presidents/:order", (req, res) => {

  // console.log("req.params.order is: ", req.params.order) //this is with :order
  // console.log("req.query.order is: ", req.query.order) //this is with ?order
  var order = req.params.order
  console.log("1. order is: ", order) //this is with :order

  // // Authenticate with the Google Spreadsheets API.
  // doc.useServiceAccountAuth(creds, function (err) {
  //   // Get all of the rows from the spreadsheet.
  //     doc.getRows(1, function (err, rows) {
  //       if(!err) {
  //         var sortedArray = sortArray(rows, order)
  //         res.json(sortedArray) //send rows of data as response to api endpoint
  //       } else {
  //         console.log("err is: ", err)
  //       }
  //     });
  // });


  // Authenticate with the Google Spreadsheets API.
  // doc.useServiceAccountAuth(creds, function (err) {
    // Get all of the rows from the spreadsheet.
      // doc.getRows(1, function (err, rows) {
        // if(!err) {
          // var sortedArray = sortArray(rows, order)
          var sortedArray = sortArray(prezData, order)
          console.log('1. sortedArray is: ', sortedArray)
          res.json(sortedArray) //send rows of data as response to api endpoint
        // } else {
          // console.log("err is: ", err)
        // }
      // });
  // });

})


// var sortedArrayTest = sortArray(prezData, "orderAscending")
// console.log('1. sortedArrayTest is: ', sortedArrayTest)
