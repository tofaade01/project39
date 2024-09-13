const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, 
});

const orderSchema = new mongoose.Schema({
  email: String,
  name: String,
  status: String,
});

const upSchema = new mongoose.Schema({
  title: String,
  caption: String,
  channel: [String], 
  date: Date,
  totalBroadcast: Number,
})

module.exports = {
  userSchema,
  orderSchema,
  upSchema,
};
