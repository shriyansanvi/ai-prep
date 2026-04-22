const mongoose = require('mongoose');
const ResourceSchema = new mongoose.Schema({
  title: String,
  url: String,
  category: String, // e.g., "Documentation", "Video", "Article"
  domain: String
});
module.exports = mongoose.model('Resource', ResourceSchema);