// basic setup for backend

/*
mongodb username :: Tulip-All_Data
mongodb password :: tZK6RRSlGyS0v5LU
*/


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
// this is mongodb code
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// mongodb user code
const uri = "mongodb+srv://Tulip-All_Data:tZK6RRSlGyS0v5LU@cluster0.9bbp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
// this code use for cors policy and use json data
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('the tulip server is running')
})
app.listen(port,()=>{
    console.log('the server is running now',port)
    
})



// mongodb data base code here

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
// create a databasename and create a collection

const tulipdatacollection = client.db('TulipAllData').collection('tulipsingle');
// this is post method for additem value in the front end
app.post('/tulipallvalue',async(req,res)=>{
    const data = req.body;
    console.log('the data come to via clientside',data);
    const result = await tulipdatacollection.insertOne(data);
    res.send(result)
})
// show the value in front end 6
app.get('/tulipallvalueGet',async(req,res)=>{
  const limit = 6;
    const data = await tulipdatacollection.find().limit(limit).toArray();
    res.send(data)
})
// show all the value in front end 
app.get('/tulipallvalueGetdata',async(req,res)=>{

    const data = await tulipdatacollection.find().toArray();
    res.send(data)
})
// show data for specific id
app.get('/tulivalueid/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id : new ObjectId (id)};
  const result = await tulipdatacollection.findOne(query);
  res.send(result)
})

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


