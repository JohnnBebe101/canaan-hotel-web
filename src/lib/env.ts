export function validateEnv() {
  const required = [
    "SESSION_SECRET",
    "ADMIN_USERNAME",
    "ADMIN_PASSWORD",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn("⚠ Missing environment variables:", missing);
  }
}
