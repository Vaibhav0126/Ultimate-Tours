import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: function (this: any): boolean {
        return !this.googleId; // Password required only if not a Google user
      },
      minlength: 6,
    },
    dateOfBirth: {
      type: Date,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    // OTP verification fields
    emailOtp: {
      type: String,
    },
    otpCode: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    otpPurpose: {
      type: String,
      enum: ["registration", "forgot-password"],
    },
    otpAttempts: {
      type: Number,
      default: 0,
    },
    // Password reset fields
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
    // Google OAuth fields
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values while maintaining uniqueness
    },
    profileImage: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },
    wishlist: [
      {
        packageId: {
          type: String,
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    preferences: {
      travelType: String,
      budget: String,
      destinations: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ wishlist: 1 });
userSchema.index({ otpExpiry: 1 });
userSchema.index({ resetToken: 1 });
userSchema.index({ resetTokenExpiry: 1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
