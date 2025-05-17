export function parseApiError(message: string | undefined) {
  if (!message) return null;
  const lines = message.split("\n");
  const lastLine = lines[lines.length - 1];
  try {
    return JSON.parse(lastLine);
  } catch {
    return null;
  }
}