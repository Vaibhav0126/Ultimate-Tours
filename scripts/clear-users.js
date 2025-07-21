const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/ultimate-tours";
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// User schema (simplified for deletion)
const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Clear all users
const clearAllUsers = async () => {
  try {
    console.log("🗑️  Starting to clear all users...");

    // Count users before deletion
    const userCount = await User.countDocuments();
    console.log(`📊 Found ${userCount} users in database`);

    if (userCount === 0) {
      console.log("✅ No users found. Database is already clean.");
      return;
    }

    // Delete all users
    const result = await User.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} users successfully`);

    // Verify deletion
    const remainingUsers = await User.countDocuments();
    console.log(`📊 Remaining users: ${remainingUsers}`);

    if (remainingUsers === 0) {
      console.log(
        "✅ All users have been successfully removed from the database!"
      );
    } else {
      console.log("⚠️  Some users might still exist in the database");
    }
  } catch (error) {
    console.error("❌ Error clearing users:", error);
  }
};

// Main function
const main = async () => {
  console.log("🚀 Starting user cleanup process...");

  await connectDB();
  await clearAllUsers();

  console.log("🏁 User cleanup process completed");
  process.exit(0);
};

// Handle errors
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});

// Run the script
main();
