
const express = require('express')
const app = express();
const bodyParser =require('body-parser');
const mongoose = require('mongoose')
require("./Employ")

const Employee = mongoose.model("employee")

app.use(bodyParser.json())
const mongoUri ="mongodb+srv://vicky:M1x1TZifYbsycnQU@cluster0.8dzls.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

  mongoose.connect(mongoUri,{
      useNewUrlParser:true,
      useUnifiedTopology: true
  })

  mongoose.connection.on('connected',()=>{
    console.log("connected to mongo ")
  })
  mongoose.connection.on('error',(err)=>{
    console.log("not connected to mongo ", err)
  })

  app.post('/send-data',(req,res)=>{
      const employee = new Employee({
        name: req.body.name,
        email:req.body.email
      })
      employee.save()
      .then(data =>{
          console.log(data)
          res.send("success")
      }).catch(err=>{
          console.log(err)
      })
  })
app.get('/',(req,res)=>{
    res.send('welcome to nodejs')
})
app.listen(3000,()=>{
    console.log('Lissining on 300')
})