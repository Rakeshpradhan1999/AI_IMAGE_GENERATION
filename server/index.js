import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db/index.js";
import PostRoute from "./routes/post.route.js";
import DalleRoute from "./routes/dalle.route.js";
import errorHandler from "./middleware/error.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res, next) => {
  res.send({
    message: "Welcome ",
  });
});

app.use("/api/v1/post", PostRoute);
app.use("/api/v1/dalle", DalleRoute);
app.use(errorHandler);

app.get("*", (req, res) => {
  res.status(404).send({
    data: {},
    message: "Wrong Route",
    ok: true,
  });
});

const startServer = () => {
  try {
    connectDb(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log("Server started");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
