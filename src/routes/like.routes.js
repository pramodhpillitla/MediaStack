import { Router } from "express";
import { optionalAuth, verifyJWT } from "../middlewares/auth.middleware.js";
import {
   likeVideo,
   unlikeVideo,
   getVideoLikes
} from "../controllers/like.controller.js";

const router = Router();

// Get like info (public + personalized)
router.get("/:videoId", optionalAuth, getVideoLikes);

// Like video
router.post("/:videoId", verifyJWT, likeVideo);

// Unlike video
router.delete("/:videoId", verifyJWT, unlikeVideo);

export default router;