require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const qrCodeModel = require('./Model/qrCodeSchema');

const app = express();
app.use(express.json());
app.use(cors());
//mongdb connect

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
    .then(() => {
        console.log('connected to mongoDB');
    })
    .catch(() => {
        console.log('error connecting mongo');

    });

app.get('/api/qrCodes', async(req, res) => {
    try{
        //await mongoose.connect(process.env.MONGO_URL);
        //await mongoose.connect("mongodb+srv://admin:admin@qrcodeapp.v84he.mongodb.net/qrCodeApp");
        const qrCodes = await qrCodeModel.find({});
        res.status(200).json(qrCodes);
    }catch(err){
        console.error("Error fetching QR codes:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/api/qrCode', async (req, res) => {
    try{
        //await mongoose.connect(process.env.MONGO_URL);
        // await mongoose.connect("mongodb+srv://admin:admin@qrcodeapp.v84he.mongodb.net/qrCodeApp");

        const { destinationUrl } = req.body;
        const shortCode = Math.random().toString(36).substr(2,8);
        
        const qrCode = await qrCodeModel.create({ 
            shortCode, 
            destinationUrl 
        });

        res.status(200).json({
            shortCode,
            qrCodeUrl: `localhost:2000/api/qrCode/${shortCode}`
        });
    } catch(err){
        console.log("Error creating QR code:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
    
});

app.put('/api/qrCode/:shortCode', async (req, res) => {

    try{
        //await mongoose.connect("mongodb+srv://admin:admin@qrcodeapp.v84he.mongodb.net/qrCodeApp");

        const shortCode = req.params.shortCode;
        const { destinationUrl } = req.body;

        if (!destinationUrl) return res.status(400).json({ message: "Destination URL is required" });

        const qrCode = await qrCodeModel.findOneAndUpdate({
            shortCode,
        }, {  
            destinationUrl,
            updatedAt: new Date()
        }, {
            new: true
        });

        if(!qrCode) return res.status(404).json({ message: "QR Code not found" });
        res.json(qrCode);

    } catch(err){
        console.error("Error updating QR code:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

app.get('/api/qrCode/:shortCode', async(req, res) => {
    try{
        //await mongoose.connect("mongodb+srv://admin:admin@qrcodeapp.v84he.mongodb.net/qrCodeApp");

        const { shortCode } = req.params;
        

        const qrCode = await qrCodeModel.findOne({ shortCode });
        if(!qrCode) return res.status(404).send('QR Code Not Found');

        qrCode.analytics.totalScans += 1;
        qrCode.analytics.lastScanAt = new Date();

        await qrCode.save();
        res.redirect(qrCode.destinationUrl);
        
    } catch(err){
        console.error("Error getting QR code:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
    
});

app.listen(2000);