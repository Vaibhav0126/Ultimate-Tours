import mongoose from "mongoose";

interface IItinerary {
  day: number;
  title: string;
  description: string;
}

interface IPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  location: string;
  category: "local" | "international";
  image: string;
  images: string[];
  features: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: IItinerary[];
  maxGroupSize: number;
  difficulty: string;
  bestTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const packageSchema = new mongoose.Schema<IPackage>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    category: {
      type: String,
      enum: ["local", "international"],
      required: true,
    },
    image: { type: String, required: true },
    images: [{ type: String }],
    features: [{ type: String }],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    itinerary: [itinerarySchema],
    maxGroupSize: { type: Number, required: true },
    difficulty: { type: String, required: true },
    bestTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Package =
  mongoose.models.Package || mongoose.model<IPackage>("Package", packageSchema);

export default Package;
export type { IPackage, IItinerary };
