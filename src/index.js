const express = require("express")
const mongoose = require('mongoose');
require('dotenv').config()

if (!process.env.MONGODB_URI) {
    console.error("Please define MongoDB URI correctly in env file")
    process.exit(-1);
}
let dbName = process.env.DB_NAME ? process.env.DB_NAME : "ViewCounter";

const app = express();
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`).then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.log(`MongoDB connection failed | Error=> ${err.errmsg}`);
        process.exit(-1)
    });


const recordSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    visitorCount: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
})

const RecordModel = mongoose.model('VisitorCount', recordSchema);
app.get('/', async function (req, res) {
    const username = req.query.username;

    if (!username) {
        return res.status(400).send('Username is required');
    }

    let record = await RecordModel.findOne({ username: username })
    if (record == undefined || !record) {
        record = new RecordModel({
            username: username,
            visitorCount: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        record.save();
    } else {
        record.visitorCount += 1;
        record.updatedAt = new Date();
        record.save();
    }
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(getBadge(record.visitorCount));
})

app.listen(3001, function () {
    console.log('Server Started on Port 3001')
});

function getBadge(visitorCount) {
    return `<svg xmlns = "http://www.w3.org/2000/svg" width = "120.7" height = "20" >
    <linearGradient id="b" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1" />
        <stop offset="1" stop-opacity=".1" />
    </linearGradient>
    <mask id="a">
        <rect width="120.7" height="20" rx="3" fill="#fff" />
    </mask>
    <g mask="url(#a)">
        <rect width="90.2" height="20" fill="#555" />
        <rect x="79.2" width="41.5" height="20" fill="#007ec6" />
        <rect width="120.7" height="20" fill="url(#b)" />
    </g>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
        <text x="40.6" y="14">Page Views</text>
        <text x="99" y="14">${visitorCount}</text>
    </g>
</svg > `
}