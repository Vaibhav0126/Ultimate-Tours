import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    packageId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    adminResponse: {
      type: String,
      trim: true,
    },
    travelDate: {
      type: Date,
    },
    travelExperience: {
      accommodation: { type: Number, min: 1, max: 5 },
      transportation: { type: Number, min: 1, max: 5 },
      guide: { type: Number, min: 1, max: 5 },
      value: { type: Number, min: 1, max: 5 },
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
ratingSchema.index({ packageId: 1 });
ratingSchema.index({ userId: 1 });
ratingSchema.index({ rating: 1 });
ratingSchema.index({ isApproved: 1 });
ratingSchema.index({ createdAt: -1 });

// Compound index for package ratings
ratingSchema.index({ packageId: 1, isApproved: 1, rating: 1 });

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

export default Rating;
