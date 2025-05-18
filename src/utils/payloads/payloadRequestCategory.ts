export function extractCategoryPayload(formData: FormData) {
  const name = formData.get('name')?.toString() ?? '';
  const description = formData.get('description')?.toString() ?? '';

  return {
    name,
    description,
  };
}