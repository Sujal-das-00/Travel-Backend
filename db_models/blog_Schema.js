import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: { 
    type: String,
    default: null,
  }, image_id:{
    type:String,
    default:null
  }
});

const blogSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    blogId:{
      type: String,
      required: true,
      trim: true,
    },
    packageCategory: {
      type: String,
      required: true,
      trim: true,
    },
    displayText: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    image_id:{
    type:String,
    default:null
  },
    sections: {
      type: [sectionSchema], // array of sections
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one section is required",
      },
    },
  },
  { timestamps: true }
);
export default mongoose.model("Package", blogSchema,"blogs");
