import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addComment = asyncHandler(async (req, res) => {
   const { videoId } = req.params;
   const { content } = req.body;

   if (!content || content.trim() === "") {
      throw new ApiError(400, "Comment content is required");
   }

   const video = await Video.findById(videoId);
   if (!video) {
      throw new ApiError(404, "Video not found");
   }

   const comment = await Comment.create({
      video: videoId,
      owner: req.user._id,
      content
   });

   return res.status(201).json(
      new ApiResponse(201, comment, "Comment added")
   );
});

export const getVideoComments = asyncHandler(async (req, res) => {
   const { videoId } = req.params;

   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;

   const skip = (page - 1) * limit;

   const comments = await Comment.find({ video: videoId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("owner", "username fullName avatar");

   const totalComments = await Comment.countDocuments({ video: videoId });

   return res.status(200).json(
      new ApiResponse(200, {
         comments,
         currentPage: page,
         totalPages: Math.ceil(totalComments / limit),
         totalComments
      }, "Comments fetched")
   );
});

export const deleteComment = asyncHandler(async (req, res) => {
   const { commentId } = req.params;

   const comment = await Comment.findById(commentId);

   if (!comment) {
      throw new ApiError(404, "Comment not found");
   }

   if (comment.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Not allowed to delete this comment");
   }

   await Comment.findByIdAndDelete(commentId);

   return res.status(200).json(
      new ApiResponse(200, {}, "Comment deleted")
   );
});