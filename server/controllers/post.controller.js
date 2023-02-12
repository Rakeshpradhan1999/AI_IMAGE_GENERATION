import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/PostSchema.js";
import ErrorResponse from "../utils/errorResponse.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadPost = async (req, res, next) => {
  const { name, prompt, image } = req.body;
  try {
    // console.log(req.body);
    if (!name || !prompt || !image) {
      return next(new ErrorResponse("Invalid Params", 400));
    }
    const photoUrl = await cloudinary.uploader.upload(image);

    const newPost = await Post.create({
      name,
      prompt,
      image: photoUrl.url,
    });

    res.status(200).json({
      data: { post: newPost },
      message: "Post uploaded successfully",
      ok: true,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllPost = async (req, res, next) => {
  try {
    const allPost = await Post.find({});
    res.status(200).json({
      data: { allPost },
      message: "Posts Fetched successfully",
      ok: true,
    });
  } catch (error) {
    next(error);
  }
};
