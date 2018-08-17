const fs = require("fs");

//Create app using express.js
const port = process.env.PORT || 3000;
const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const http = require("http");
const app = express();
const dir = path.join(__dirname, "../");
const file_folder = "JSON Files"
const folder = path.join(dir, "../") + file_folder + "/";

app.use(express.static(dir));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.listen(port, () => console.log("File saver started on port " + port));

app.post("/server", function(req, res) {
    const id = req.body.id;
    if (id == "save") {
        const data = req.body.data;
        const file = JSON.parse(data).file_name;
        if (req.body.overwrite) {
            fs.writeFile(folder + file + ".json", data, (err) => {
                if (err) {
                    res.send(string({"message":err}));
                }
                else {
                    res.send(string({"message":"Success!"}));
                }
            });
        }
        else {
            fs.readFile(folder + file + ".json", (read_err) => {
                if (read_err) {
                    console.log(read_err);
                    fs.writeFile(folder + file + ".json", data, (err) => {
                        if (err) {
                            res.send(string({"message":err}));
                        }
                        else {
                            res.send(string({"message":"Success!"}));
                        }
                    });
                }
                else {
                    res.send(string({"message":"EXISTS"}));
                }
            });
        }
    }
    else if (id == "load") {
        const file = req.body.data;
        fs.readFile(folder + file, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        });
    }
    else if (id == "delete") {
        const file = req.body.data;
        fs.unlink(folder + file, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(string({"message":"Success!"}));
            }
        });
    }
});

