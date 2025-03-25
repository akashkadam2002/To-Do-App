const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todo = require("./models/model")

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/To_Do_App")
    .then(
        console.log("Database connected")
    )
    .catch((err) => {
        console.log(err)
    });

app.get("/get", (req, res) => {
    todo.find()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

app.post("/add", (req, res) => {
    const task = req.body.task;
    todo.create({
        task: task,
    })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
})

app.put("/update/:id", (req, res) => {
    const {id}  = req.params;
    todo.findByIdAndUpdate({_id: id}, { done: true })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
})

app.delete("/delete/:id", (req, res) => {
    const {id}  = req.params;
    todo.findByIdAndDelete({_id: id})
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
})



app.listen(3000, (req, res) => {
    console.log("Server started at port 3000");
})