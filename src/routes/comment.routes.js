import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, getVideoComment} from "../controllers/comment.controller.js";

const router = Router();

//get comments for a video
router.get("/:videoId", getVideoComment);

//add comment
router.post("/:videoId",verifyJWT, addComment);

//delete comment
router.delete("/:videoId",verifyJWT, deleteComment);

export default router;