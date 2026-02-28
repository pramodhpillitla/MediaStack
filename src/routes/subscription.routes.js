import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
   subscribeToChannel,
   unsubscribeFromChannel,
   getChannelSubscribers,
   getSubscribedChannels
} from "../controllers/subscription.controller.js";

const router = Router();

router.post("/:channelId", verifyJWT, subscribeToChannel);
router.delete("/:channelId", verifyJWT, unsubscribeFromChannel);

router.get("/channel/:channelId", getChannelSubscribers);
router.get("/user/:userId", verifyJWT, getSubscribedChannels);

export default router;