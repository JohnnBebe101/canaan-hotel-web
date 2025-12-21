const required = [
  "SESSION_SECRET",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
];

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing env var: ${key}`);
  }
});
