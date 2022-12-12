const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    date: Number,
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    value: {
      type: String,
    },
    date: {
      type: Number,
    },
  },
  { timestamps: { createdAt: "date" } }
);

module.exports = model("OrderComment", schema);
