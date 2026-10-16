const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(data) {
  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    return "Name is required";
  }
  if (!data.email || typeof data.email !== "string" || !EMAIL_REGEX.test(data.email.trim())) {
    return "Valid email address is required";
  }
  const body = data.message || data.content;
  if (!body || typeof body !== "string" || body.trim().length === 0) {
    return "Message content is required";
  }
  return null;
}
