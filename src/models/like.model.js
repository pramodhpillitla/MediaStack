import mongoose, { Schema, model } from "mongoose";

const likeSchema = new Schema(
    {
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
            required: true,
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

likeSchema.index({video:1, likedBy : 1}, {unique : true});

export const Like = model("Like", likeSchema);
