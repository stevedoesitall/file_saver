const fs = require("fs");

//Create app using express.js
const port = process.env.PORT || 3000;
const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);
const dir = path.join(__dirname, "../");
const folder = "/Users/stephengiordano/Desktop/Test/";

app.use(express.static(dir));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.listen(port, () => console.log("File saver started on port " + port));

app.post("/email", function(req, res) {
    const id = req.body.id;
    if (id == "save") {
        const data = req.body.data;
        const file = JSON.parse(data).file_name;
        fs.writeFileSync(folder + file + ".json", data, (err) => {
            if (err) throw err;
            res.send("The file has been saved!");
        });
    }
    else if (id == "load") {
        const file = req.body.data;
        fs.readFile(folder + file, (err, data) => {
            if (err) throw err;
            res.send(data);
          });
    }
});

