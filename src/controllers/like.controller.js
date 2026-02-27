import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const likeVideo = asyncHandler(async (req, res) => {
   const { videoId } = req.params;

   const video = await Video.findById(videoId);
   if (!video) {
      throw new ApiError(404, "Video not found");
   }

   const existingLike = await Like.findOne({
      video: videoId,
      likedBy: req.user._id
   });

   if (existingLike) {
      throw new ApiError(400, "You already liked this video");
   }

   await Like.create({
      video: videoId,
      likedBy: req.user._id
   });

   await Video.findByIdAndUpdate(videoId, {
      $inc: { likes: 1 }
   });

   return res.status(201).json(
      new ApiResponse(201, {}, "Video liked")
   );
});

export const unlikeVideo = asyncHandler(async (req, res) => {
   const { videoId } = req.params;

   const deletedLike = await Like.findOneAndDelete({
      video: videoId,
      likedBy: req.user._id
   });

   if (!deletedLike) {
      throw new ApiError(400, "You have not liked this video");
   }

   await Video.findByIdAndUpdate(videoId, {
      $inc: { likes: -1 }
   });

   return res.status(200).json(
      new ApiResponse(200, {}, "Video unliked")
   );
});

export const getVideoLikes = asyncHandler(async (req, res) => {
   const { videoId } = req.params;

   const totalLikes = await Like.countDocuments({ video: videoId });

   let isLiked = false;

   if (req.user) {
      const existingLike = await Like.findOne({
         video: videoId,
         likedBy: req.user._id
      });
      isLiked = !!existingLike;
   }

   return res.status(200).json(
      new ApiResponse(200, {
         totalLikes,
         isLiked
      }, "Like info fetched")
   );
});