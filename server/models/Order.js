const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
    },
    containersTypes: {
      type: String,
    },
    contractType: {
      type: String,
    },
    customs: {
      type: String,
    },
    deliveryAddress: {
      type: String,
    },
    hazard: {
      type: String,
    },
    howOften: {
      type: String,
    },
    hsCode: {
      type: String,
    },
    incoterms: {
      type: String,
    },
    isActual: {
      type: Boolean,
    },
    isClosed: {
      type: Boolean,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    package: {
      type: String,
    },
    pickupAddress: {
      type: String,
    },
    pickupDate: {
      type: String,
    },
    price: {
      price: {
        type: String,
      },
    },
    special: {
      type: String,
    },
    status: {
      type: String,
    },
    temperature: {
      type: String,
    },
    transshipment: {
      type: String,
    },
    typeOfCargo: {
      type: String,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    volume: {
      type: String,
    },
    weight: {
      type: String,
    },
  },
  { timestamps: { createdAt: "date" } }
);

module.exports = model("Order", schema);
