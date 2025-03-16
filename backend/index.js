const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual MongoDB connection string.
// Here we connect to the "Vahan" database.
const MONGO_URI = process.env.MONGO_URI || 
  'mongodb+srv://kuchi:kuchi1428@cluster0.sjwduyx.mongodb.net/Vahan?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define a Mongoose schema for the "exceldata" collection.
// Using an empty schema with strict set to false allows any document structure.
const excelDataSchema = new mongoose.Schema({}, { strict: false, collection: 'exceldata' });
const ExcelData = mongoose.model('ExcelData', excelDataSchema);
app.use(cors())
// API endpoint to retrieve all documents from the "exceldata" collection.
app.get('/rto', async (req, res) => {
  try {
    console.log('get call');
    
    const data = await ExcelData.find({});
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
    res.status(500).json({ error: 'Error retrieving data from MongoDB' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
