const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ipLogSchema = new Schema({

    country_code: {
        type: String,
    },
    country_name: {
        type: String,
    },
    city: {
        type: String,
    },
    postal: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    IPv4: {
        type: String,
    },
    state: {
        type: String,
    },
    count: {
        type: Number,
        default: 0,
    }

}, { collection: "ipLog", timestamps: true })

const IPlog = mongoose.model("logIP", ipLogSchema);

module.exports = IPlog;

