export function validateProject(data) {
  if (!data.title || typeof data.title !== "string" || data.title.trim().length === 0) {
    return "Project title is required";
  }
  if (!data.description || typeof data.description !== "string" || data.description.trim().length === 0) {
    return "Project description is required";
  }
  return null;
}
