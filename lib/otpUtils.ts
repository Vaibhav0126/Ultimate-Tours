import crypto from "crypto";

// Generate a 6-digit OTP
export const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

// Calculate OTP expiry time
export const getOTPExpiry = (): Date => {
  const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || "10");
  return new Date(Date.now() + expiryMinutes * 60 * 1000);
};

// Check if OTP is expired
export const isOTPExpired = (expiryTime: Date): boolean => {
  return new Date() > expiryTime;
};

// Validate OTP format (6 digits)
export const isValidOTPFormat = (otp: string): boolean => {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
};

// Generate random secure token for password reset (if needed later)
export const generateSecureToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

// Hash OTP for secure storage (optional additional security)
export const hashOTP = (otp: string): string => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

// Verify hashed OTP
export const verifyHashedOTP = (
  inputOTP: string,
  hashedOTP: string
): boolean => {
  const inputHash = hashOTP(inputOTP);
  return inputHash === hashedOTP;
};

// Rate limiting helper - check if user has exceeded max attempts
export const hasExceededMaxAttempts = (attempts: number): boolean => {
  const maxAttempts = parseInt(process.env.MAX_OTP_ATTEMPTS || "3");
  return attempts >= maxAttempts;
};

// Calculate time until next OTP request (for rate limiting)
export const getTimeUntilNextRequest = (lastRequestTime: Date): number => {
  const cooldownMinutes = parseInt(process.env.OTP_COOLDOWN_MINUTES || "1");
  const nextRequestTime = new Date(
    lastRequestTime.getTime() + cooldownMinutes * 60 * 1000
  );
  const now = new Date();
  return Math.max(
    0,
    Math.ceil((nextRequestTime.getTime() - now.getTime()) / 1000)
  );
};

// Save OTP to database (for any purpose: registration, forgot-password, etc.)
export const saveOTP = async (
  email: string,
  otp: string,
  purpose: string = "registration"
) => {
  const dbConnect = (await import("@/lib/mongodb")).default;
  const User = (await import("@/models/User")).default;

  await dbConnect();

  const hashedOTP = hashOTP(otp);
  const expiryTime = getOTPExpiry();

  await User.updateOne(
    { email: email.toLowerCase() },
    {
      $set: {
        otpCode: hashedOTP,
        otpExpiry: expiryTime,
        otpPurpose: purpose,
        otpAttempts: 0,
      },
    },
    { upsert: true }
  );

  console.log(`💾 OTP saved for ${email} (${purpose})`);
};
export const getNextOTPRequestTime = (lastRequestTime: Date): Date => {
  const cooldownMinutes = 1; // 1 minute cooldown between OTP requests
  return new Date(lastRequestTime.getTime() + cooldownMinutes * 60 * 1000);
};
