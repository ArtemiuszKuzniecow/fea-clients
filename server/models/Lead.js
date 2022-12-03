const { Schema, model } = require("mongoose");

const schema = new Schema({
  city: {
    type: String,
  },
  company: {
    type: String,
  },
  contacts: {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  containersTypes: {
    type: String,
  },
  contractType: {
    type: String,
  },
  directions: {
    type: String,
  },
  isRequested: {
    type: Boolean,
  },
  manager: {
    type: String,
  },
  sphere: {
    type: String,
  },
  status: {
    date: Number,
    value: {
      type: String,
    },
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Lead", schema);
