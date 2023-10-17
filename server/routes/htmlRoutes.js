const path = require('path');
// creating the routes for the webpack

//exporting the routes to be able to interact
// with the file structure for a built webpack
module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
