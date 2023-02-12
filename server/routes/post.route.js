import express from "express";
import { getAllPost, uploadPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/uploadPost", uploadPost);
router.get("/all", getAllPost);

export default router;
