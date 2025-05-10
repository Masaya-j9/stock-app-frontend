export function extractItemPayload(formData: FormData) {
  const name = formData.get('name')?.toString() ?? '';
  const quantity = Number(formData.get('quantity') ?? 1);
  const description = formData.get('description')?.toString() ?? '';

  // 複数カテゴリが選択される場合
  const categoryIds = formData
    .getAll('categoryIds')
    .filter((id): id is string => typeof id === 'string') // stringだけ通す
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id)); // 整数だけ通す

  return {
    name,
    quantity,
    description,
    categoryIds,
  };
}
