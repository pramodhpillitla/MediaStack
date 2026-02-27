import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadVideo } from "../controllers/video.controller.js";
import {getVideoById} from "../controllers/video.controller.js";
import { getAllVideos } from "../controllers/video.controller.js";
import { getVideosByUser } from "../controllers/video.controller.js";
import { updateVideo } from "../controllers/video.controller.js";
import { deleteVideo } from "../controllers/video.controller.js";

const router = Router();

router.post(
   "/",
   verifyJWT,
   upload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 }
   ]),
   uploadVideo
);


router.get("/",getAllVideos);
router.get("/user/:userId", getVideosByUser);
router.get("/:videoId", getVideoById);

router.patch("/:videoId", verifyJWT, upload.single("thumbnail"), updateVideo);

router.delete("/:videoId", verifyJWT, deleteVideo);


export default router;
