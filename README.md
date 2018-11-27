# presidents-api

Node backend serving API endpoint for presidential data.

Endpoint supports sorting data by presidents' first names via functions in server.js file.

Data is stored in a Google Sheet, and accessed via the Google Sheets API.

This app is hosted on Heroku.

Note: the GoogleSpreadsheet client_secret.json file is hidden from this GitHub repo. When updating this Node app, make sure data/client_secret.json is not being ignored by Heroku.

UPDATE FOR version 2: instead of using Google Sheets API, now using a simple json file, presidents.json.

Created this json file by using an online csv to json converter.

Screenshot of [frontend](http://jsfiddle.net/ethanryan/Levs4rmb/):

![presidents frontend](https://github.com/ethanryan/presidents-api/blob/master/frontend/frontend-screenshot.png)

Frontend React app is available on jsfiddle here: http://jsfiddle.net/ethanryan/Levs4rmb/
