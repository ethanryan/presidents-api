var express = require("express");

const fs = require('fs');

//var all_prez = require("./data/president_spreadsheet");
// var pizza_data = require("./data/pizza");

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./data/client_secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var spreadsheetId = '1tpzXkd0eMJZtAMo8lZ2gvcqCMx_ku4kx_FUOZvh8x20'
var doc = new GoogleSpreadsheet(spreadsheetId);

var app = express();

// const port = 3000;
var port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log("Server running on port:", port);
});


// app.get("/url", (req, res) => {
//  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
// });

// app.get("/pizza", (req, res) => {
//   // res.json("pzzaaaaaa")
//   res.json([pizza_data])
// })


app.get("/presidents", (req, res) => {
  // Authenticate with the Google Spreadsheets API.
  doc.useServiceAccountAuth(creds, function (err) {
    // Get all of the rows from the spreadsheet.
      doc.getRows(1, function (err, rows) {
        if(!err) {
          res.json([rows]) //send rows of data as response to api endpoint
        } else {
          console.log("err is: ", err)
        }
      });
  });
})
