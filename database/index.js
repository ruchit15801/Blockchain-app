let mongoose = require("mongoose")
require("./model")
mongoose.connect("mongodb://localhost:27017/BlockApi", (err) => {
    if(err) return console.log("Cannot connect to DB")
    console.log("Database is Connected!")
    connectionCallback()
    
})
let connectionCallback = () => {}
module.exports.onConnect = (callback) => {
    connectionCallback = callback
}