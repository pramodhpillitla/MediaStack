import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadVideo = asyncHandler(async (req, res) => {
   
   const { title, description } = req.body;

   if (!title || !description) {
      throw new ApiError(400, "Title and description are required");
   }

   const videoLocalPath = req.files?.video?.[0]?.path;
   const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

   if (!videoLocalPath) {
      throw new ApiError(400, "Video file is required");
   }

   if (!thumbnailLocalPath) {
      throw new ApiError(400, "Thumbnail is required");
   }

   const videoUpload = await uploadOnCloudinary(videoLocalPath);
   const thumbnailUpload = await uploadOnCloudinary(thumbnailLocalPath);

   if (!videoUpload) {
      throw new ApiError(500, "Video upload failed");
   }

   const video = await Video.create({
      title,
      description,
      videoURL: videoUpload.secure_url,
      thumbnail: thumbnailUpload.secure_url,
      duration: videoUpload.duration,
      owner: req.user._id
   });

   return res
      .status(201)
      .json(new ApiResponse(201, video, "Video uploaded successfully"));
});
