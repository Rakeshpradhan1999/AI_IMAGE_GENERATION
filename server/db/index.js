import mongoose from "mongoose";

export const connectDb = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => {
      console.log(err);
    });
};
