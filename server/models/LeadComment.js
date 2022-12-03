const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    value: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "date" },
  }
);

module.exports = model("LeadComment", schema);
