const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const Projects = new Schema({
  title: {
    type: String,
    required: true
  },
  ready: {
    type: Boolean,
    default: false,
    required: true
  },
  link: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  stack:{
    type: String,
    required: true
  }
})
Projects.pre(
  "save",
  async (data) => {
    console.log(data)
  }
)
module.exports = model("Project", Projects)