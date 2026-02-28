import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const subscribeToChannel = asyncHandler(async (req, res) => {
   const { channelId } = req.params;

   if (channelId === req.user._id.toString()) {
      throw new ApiError(400, "You cannot subscribe to yourself");
   }

   const existing = await Subscription.findOne({
      subscriber: req.user._id,
      channel: channelId
   });

   if (existing) {
      throw new ApiError(400, "Already subscribed");
   }

   await Subscription.create({
      subscriber: req.user._id,
      channel: channelId
   });

   return res.status(201).json(
      new ApiResponse(201, {}, "Subscribed successfully")
   );
});

export const unsubscribeFromChannel = asyncHandler(async (req, res) => {
   const { channelId } = req.params;

   const deleted = await Subscription.findOneAndDelete({
      subscriber: req.user._id,
      channel: channelId
   });

   if (!deleted) {
      throw new ApiError(400, "Not subscribed to this channel");
   }

   return res.status(200).json(
      new ApiResponse(200, {}, "Unsubscribed successfully")
   );
});

export const getChannelSubscribers = asyncHandler(async (req, res) => {
   const { channelId } = req.params;

   const subscribers = await Subscription.find({ channel: channelId })
      .populate("subscriber", "username fullName avatar");

   return res.status(200).json(
      new ApiResponse(200, {
         totalSubscribers: subscribers.length,
         subscribers
      }, "Subscribers fetched")
   );
});

export const getSubscribedChannels = asyncHandler(async (req, res) => {
   const { userId } = req.params;

   const subscriptions = await Subscription.find({
      subscriber: userId
   }).populate("channel", "username fullName avatar");

   return res.status(200).json(
      new ApiResponse(200, {
         totalSubscriptions: subscriptions.length,
         subscriptions
      }, "Subscribed channels fetched")
   );
});