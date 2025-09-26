import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now },
    payment: { type: Boolean, default: false },

    // Expiry only for unpaid orders
    expireAt: { type: Date },
  },
  { timestamps: true }
);

// TTL index
orderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// Before saving, set expireAt only if unpaid
orderSchema.pre("save", function (next) {
  if (this.payment === false) {
    this.expireAt = new Date(Date.now() + 30 * 60 * 1000); // expire in 30mins
  } else {
    // 🚀 properly remove field so TTL won't run
    this.set("expireAt", undefined, { strict: false });
  }
  next();
});

// Handle updates too (important when payment flips later)
orderSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.payment === true) {
    update.$unset = update.$unset || {};
    update.$unset.expireAt = 1; // remove expireAt if paid
  } else if (update.payment === false) {
    update.$set = update.$set || {};
    update.$set.expireAt = new Date(Date.now() + 30 * 60 * 1000); // expire in 30mins
  }

  next();
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
