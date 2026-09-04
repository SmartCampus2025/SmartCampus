const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({ title: String, date: Date });
module.exports = mongoose.models.Event || mongoose.model("Event", eventSchema);
