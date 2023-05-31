const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const ServiceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  retries: {
    type: Number,
    unique: true,
  },
  host: {
    type: String,
    required: true,
  },
  port: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  connect_timeout: {
    type: Number,
    required: false,
  },
  write_timeout: {
    type: Number,
    required: false,
  },
  read_timeout: {
    type: Number,
    required: false,
  },
  //   tokens: [
  //     {
  //       token: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
  role: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports.Service = mongoose.model("Service", ServiceSchema);
