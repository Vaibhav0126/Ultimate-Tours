import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ultimate-tours";

// Track connection state
let isConnected = false;
let connectionPromise: Promise<typeof mongoose> | null = null;

async function dbConnect() {
  // If already connected, return immediately
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // If connection is in progress, wait for it
  if (connectionPromise) {
    return connectionPromise;
  }

  // If there's an existing connection but it's not ready, disconnect first
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
  }

  try {
    console.log("Connecting to MongoDB...");

    // Create connection promise
    connectionPromise = mongoose.connect(MONGODB_URI, {
      bufferCommands: true, // Enable buffering to queue operations until connected
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    // Wait for connection
    await connectionPromise;

    isConnected = true;
    console.log("Connected to MongoDB");

    // Handle connection events
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      isConnected = false;
      connectionPromise = null;
    });

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
      isConnected = false;
      connectionPromise = null;
    });

    return mongoose;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    connectionPromise = null;
    throw error;
  }
}

export default dbConnect;
