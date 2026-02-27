import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import videoRouter from "./routes/video.routes.js";
import likeRouter from "./routes/like.routes.js";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN||"*",
    credentials:true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//routes importing 
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users",userRouter);
// so this basically creates a link something like http://localhost:8000/api/v1/users/registerUser ... cool isn't it?!

app.use("/api/v1/videos", videoRouter);

app.use("/api/v1/likes", likeRouter);


export {app};