var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var spreadsheetId = '1tpzXkd0eMJZtAMo8lZ2gvcqCMx_ku4kx_FUOZvh8x20'

var doc = new GoogleSpreadsheet(spreadsheetId);

var sexy = "too sexy"

var thisIsACallback = function thisIsACallback(err, argument) {
  // console.log("thisIsACallback ---->>>>> i aint no callllllabackkk gurrrrrl:::", argument)
  if (err) {
    console.log("error motherfuckerrrrrrr");
    return "this is a fucking error mofo...."
  } else {
    //console.log("argument is: ", argument)
    sexy = argument
    return sexy
  }
}

//console.log("in spreadsheet, thisIsACallback is: ", thisIsACallback)

// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function(err) {

  // Get all of the rows from the spreadsheet.
    doc.getRows(1, function(err, rows) {

      if(!err) {
        console.log("calling callllllabackkk....................")
        thisIsACallback(null, rows)
        // return rows
      } else {
        console.log("err is: ", err)
      }

    });
});

module.exports = thisIsACallback
