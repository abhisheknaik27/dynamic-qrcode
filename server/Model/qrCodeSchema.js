const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    destinationUrl: { 
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    analytics: {
        totalScans : { type: Number, default: 0 },
        lastScanAt: { type: Date },
    }
});

const qrCodeModel = mongoose.model('QRCode', qrCodeSchema);

module.exports = qrCodeModel;