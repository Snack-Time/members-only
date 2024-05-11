const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ["New", "Member", "Admin"],
        default: "New",
    }
})

module.exports = mongoose.model("User", UserSchema);