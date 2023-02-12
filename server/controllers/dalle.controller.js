import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import ErrorResponse from "../utils/errorResponse.js";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export const createImage = async (req, res, next) => {
  const { prompt } = req.body;
  if (!prompt) return next(new ErrorResponse("Prompt required", 400));
  try {
    const apiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "256x256",
      response_format: "b64_json",
    });
    // console.log(apiRespons);

    const image = apiResponse.data.data[0].b64_json;
    res.status(200).json({
      data: { image },
      message: "Image created successfully",
      ok: true,
    });
  } catch (error) {
    next(error);
  }
};
