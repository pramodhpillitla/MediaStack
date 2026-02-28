import mongoose, {Schema, model} from "mongoose";


const commentSchema = new Schema({
    video:{
        type: Schema.Types.ObjectId,
        ref : "Video",
        required : true,
        index : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    content:{
        type : String,
        required : true,
        trim : true
    }
},{timestamps:true});

export const Comment = model("Comment", commentSchema);
