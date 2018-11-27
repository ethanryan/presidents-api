require('dotenv').config();

var express = require("express");

var cors = require('cors')

var prezData = require('./presidents.json')

var app = express();

app.use(cors()) //enabling all cors requests

var port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log("Server running on port:", port);
});

// function compareNamesAscending(a,b) {
//   if (a.president < b.president)
//     return -1;
//   if (a.president > b.president)
//     return 1;
//   return 0;
// }
//
// function compareNamesDescending(a,b) {
//   if (a.president < b.president)
//     return 1;
//   if (a.president > b.president)
//     return -1;
//   return 0;
// }

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function sortArray(array, order) {
  console.log('in sortArray, order is: ', order)
  if (order === "orderAscending") {
    // return array.sort(compareNamesAscending)
    return sortByKey(array, "president")
    // return array.sort(compareNames(order) ) //check how to refactor this with just one function
  } else {
    // return array.sort(compareNamesDescending)
    return sortByKey(array, "president").reverse()
  }
}

app.get("/presidents/:order", (req, res) => {

  // console.log("req.params.order is: ", req.params.order) //this is with :order
  // console.log("req.query.order is: ", req.query.order) //this is with ?order
  var order = req.params.order
  console.log("1. order is: ", order) //this is with :order

  var sortedArray = sortArray(prezData, order)
  console.log('1. sortedArray is: ', sortedArray)
  res.json(sortedArray) //send rows of data as response to api endpoint

})

// var sortedArrayTest = sortArray(prezData, "orderAscending")
// console.log('1. sortedArrayTest is: ', sortedArrayTest)
