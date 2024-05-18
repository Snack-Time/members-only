const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MsgSchema = new Schema({
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    original_poster: { type: Schema.Types.ObjectId, ref: "User", required: true },
})

MsgSchema.virtual("timestamp_formatted").get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
})

MsgSchema.virtual("delete_url").get(function() {
    return `/delete-msg/${this._id}`
})

module.exports = mongoose.model("Message", MsgSchema);