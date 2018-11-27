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

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function sortArray(array, order) {
  if (order === "orderAscending") {
    return sortByKey(array, "president")
  } else {
    return sortByKey(array, "president").reverse()
  }
}

app.get("/presidents/:order", (req, res) => {
  // console.log("req.params.order is: ", req.params.order) //this is with :order
  // console.log("req.query.order is: ", req.query.order) //this is with ?order
  var order = req.params.order
  var sortedArray = sortArray(prezData, order)
  res.json(sortedArray) //send sortedArray as response to api endpoint
})
