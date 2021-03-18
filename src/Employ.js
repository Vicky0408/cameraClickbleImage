const mongoose = require('mongoose')
const EmployeSchema = new mongoose.Schema({
    name: String,
    email: String,
})
mongoose.model("employee",EmployeSchema)