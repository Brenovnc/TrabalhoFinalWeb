//importar libs externas
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send('Hello Word!')
});

app.listen(3000, ()=> {
    console.log("Listening on port 30000")
});
