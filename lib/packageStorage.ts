import packagesData from "@/data/packages.json";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Package {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
}

export interface PackagesData {
  local: Package[];
  international: Package[];
}

const STORAGE_KEY = "ultimate_tours_packages";

export function getPackages(): PackagesData {
  if (typeof window === "undefined") {
    return packagesData as PackagesData;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading packages from localStorage:", error);
  }

  return packagesData as PackagesData;
}

export function savePackages(packages: PackagesData): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
  } catch (error) {
    console.error("Error saving packages to localStorage:", error);
  }
}

export function addPackage(
  packageData: Package,
  type: "local" | "international"
): void {
  const packages = getPackages();
  packages[type].push(packageData);
  savePackages(packages);
}

export function updatePackage(
  packageData: Package,
  type: "local" | "international"
): void {
  const packages = getPackages();
  const index = packages[type].findIndex((pkg) => pkg.id === packageData.id);
  if (index !== -1) {
    packages[type][index] = packageData;
    savePackages(packages);
  }
}

export function deletePackage(
  packageId: string,
  type: "local" | "international"
): void {
  const packages = getPackages();
  packages[type] = packages[type].filter((pkg) => pkg.id !== packageId);
  savePackages(packages);
}
