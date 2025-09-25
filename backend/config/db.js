import mongoose from "mongoose";
import orderModel from "../models/orderModel.js"; // import here

export const connectDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://umbraobi:Umbra2984@cluster0.brgwbvu.mongodb.net/food-del"
    )
    .then(async () => {
      console.log("✅ DB Connected");

      // Cleanup ALL unpaid orders immediately at startup
      try {
        const result = await orderModel.deleteMany({ payment: false });
        if (result.deletedCount > 0) {
          console.log(
            ` Startup Cleanup: Removed ${result.deletedCount} unpaid orders`
          );
        }
      } catch (err) {
        console.error("Startup cleanup error:", err);
      }

      //  Keep cleaning every 10 seconds
      setInterval(async () => {
        try {
          const res = await orderModel.deleteMany({ payment: false });
          if (res.deletedCount > 0) {
            console.log(
              `🧹 Interval Cleanup: Removed ${res.deletedCount} unpaid orders`
            );
          }
        } catch (err) {
          console.error("Interval cleanup error:", err);
        }
      }, 10 * 1000); // every 10 secs
    });
};
