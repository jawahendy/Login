const express = require('express');
const cors = require("cors");
const app = express()
var corsexam = {
    origin: "http://localhost:3000"
};
app.use(cors(corsexam));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

const port = 8003

app.get('/', (req, res) => res.json('Welcome assasment'))

// routes
require('./app/routes/auth.rts')(app);


app.listen(port, () => console.log(`listening on port ${port}!`))