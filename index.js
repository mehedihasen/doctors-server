
const express = require('express')
const cors =require('cors')
const env = require("dotenv").config()
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h8zf7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const port = 5000


const app = express()
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!')
  })


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const appointCollection = client.db("dentaldoctors").collection("appointment");
  
  app.post('/addAppointment', (req, res) => {
    const appointment = req.body;
    
    appointCollection.insertOne(appointment)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
});

});



  app.listen(process.env.PORT|| port , () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })  