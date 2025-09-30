import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Tiêu đề bài viết là bắt buộc"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Nội dung bài viết là bắt buộc"],
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
