const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(data) {
  if (!data.email || typeof data.email !== "string" || !EMAIL_REGEX.test(data.email.trim())) {
    return "Valid email address is required";
  }
  if (!data.password || typeof data.password !== "string" || data.password.trim().length === 0) {
    return "Password is required";
  }
  return null;
}
