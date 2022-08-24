const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.use(express.json());

// connect database with pooling connection
var db;
const uri = "mongodb://admin:admin@127.0.0.1:27017/?authMechanism=DEFAULT&authSource=Complaints";

// Create a new MongoClient
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        // connect db
        await client.connect();
        await client.db('Complaints').command({ ping: 1 });
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

connectToDatabase().catch(console.dir);


// get all dataset
app.get('/StudentFlex', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('Complaints');
        const collection = db.collection('StudentFlex');
        const results = await collection.find({}).toArray();
        res.send(results)

    } finally {
        await client.close();
    }
})


// get data by country
app.get('/StudentFlex/:id', async (req, res) => {
    const client = new MongoClient(uri);
    const id = req.params.id;
    // console.log(id);
    try {
        await client.connect();
        const db = client.db('Complaints');
        const collection = db.collection('StudentFlex');
        const results = await collection.findOne({ '_id': ObjectId(id) });
        res.send(results)

    } finally {
        await client.close();
    }
})


// create new data
app.post('/StudentFlex/create', async (req, res) => {
    const object = req.body;
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('Complaints');
        const collection = db.collection('StudentFlex');
        await collection.insertOne(
            {
                "Education Level": object['EducationLevel'],
                "Institution Type": object["InstitutionType"],
                "Gender": object['Gender'],
                "Age": object['Age'],
                "Device": object['device'],
                "IT Student": object['IT_Student'],
                "Location": object['location'],
                "Financial Condition": object['FinancialCondition'],
                "Internet Type": object['InternetType'],
                "Network Type": object['NetworkType'],
                "Flexibility Level": object['FlexibilityLevel'],
            }
        );
        res.status(200).send({
            "status": "ok",
            "message": "Object is created",
            "object": object
        });
    } finally {
        await client.close();
    }
})

// update data
const { ObjectId } = require('mongodb')
app.put('/StudentFlex/update', async (req, res) => {
    const object = req.body;
    const id = object._id;
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('Complaints');
        const collection = db.collection('StudentFlex');
        await collection.updateOne({ "_id": ObjectId(id) }, {
            $set: {
                "Education Level": object['EducationLevel'],
                "Institution Type": object["InstitutionType"],
                "Gender": object['Gender'],
                "Age": object['Age'],
                "Device": object['device'],
                "IT Student": object['IT_Student'],
                "Location": object['location'],
                "Financial Condition": object['FinancialCondition'],
                "Internet Type": object['InternetType'],
                "Network Type": object['NetworkType'],
                "Flexibility Level": object['FlexibilityLevel'],
            }
        })
        res.status(200).send({
            "status": "ok",
            "message": "Object with ID = " + id + " is updated",
            "object": object
        });
    } finally {
        await client.close();
    }
})


// delete data
app.delete('/StudentFlex/delete', async (req, res) => {
    const id = req.body._id;
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('Complaints');
        const collection = db.collection('StudentFlex');
        await collection.deleteOne({ "_id": ObjectId(id) });
        res.status(200).send({
            "status": "ok",
            "message": "Object with ID = " + id + " is deleted"
        });
    } finally {
        await client.close();
    }
})


//search engine
app.get('/StudentFlex/search/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText;
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('Complaints');
        const collection = db.collection('StudentFlex');
        const results = await collection.find({
            $text: {
                $search: searchText
            }
        }).sort({ "FIELD": -1 }).limit(10).toArray();;
        res.send(results)
    } finally {
        await client.close();
    }
})


// create connection
app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})


// load data
