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

export const getVideoById = asyncHandler(async (req, res) => {
   const { videoId } = req.params;

   if (!videoId) {
      throw new ApiError(400, "Video ID is required");
   }

   const video = await Video.findById(videoId).populate(
      "owner",
      "username fullName avatar"
   );

   if (!video) {
      throw new ApiError(404, "Video not found");
   }

   // increment views
   video.views += 1;
   await video.save({ validateBeforeSave: false });

   return res
      .status(200)
      .json(new ApiResponse(200, video, "Video fetched successfully"));
});

export const getAllVideos = asyncHandler(async (req, res) => {
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;

   const skip = (page - 1) * limit;

   const videos = await Video.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("owner", "username fullName avatar");

   const totalVideos = await Video.countDocuments({ isPublished: true });

   return res.status(200).json(
      new ApiResponse(200, {
         videos,
         currentPage: page,
         totalPages: Math.ceil(totalVideos / limit),
         totalVideos
      }, "Videos fetched successfully")
   );
});

export const getVideosByUser = asyncHandler(async (req, res) => {
   const { userId } = req.params;

   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;

   const skip = (page - 1) * limit;

   const videos = await Video.find({
      owner: userId,
      isPublished: true
   })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

   const totalVideos = await Video.countDocuments({
      owner: userId,
      isPublished: true
   });

   return res.status(200).json(
      new ApiResponse(200, {
         videos,
         currentPage: page,
         totalPages: Math.ceil(totalVideos / limit),
         totalVideos
      }, "User videos fetched successfully")
   );
});