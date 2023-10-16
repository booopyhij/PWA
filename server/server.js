// requiring express
const express = require('express');
// creating the app variable and the variable for what port to use.
const app = express();
const PORT = process.env.PORT || 3001;
// app setup
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);
// console logging that the server is running
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
