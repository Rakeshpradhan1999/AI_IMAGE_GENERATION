import express from "express";

import { createImage } from "../controllers/dalle.controller.js";

const router = express.Router();

router.post("/create", createImage);

export default router;
