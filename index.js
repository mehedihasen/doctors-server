
const express = require('express')
const cors = require('cors')
// const ObjectId = require('mongodb').ObjectID
const env = require("dotenv").config()
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h8zf7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = 5000;


const app = express()
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!')
})



// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//   console.log(err);
//   const appointCollection = client.db("dentaldoctors").collection("addAppointment");
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("dentaldoctors").collection("addAppointment");

  app.post('/addAppointment', (req, res) => {
    const appoint = req.body;
    collection.insertOne(appoint)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
});

// insertedCount

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})