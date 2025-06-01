const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteItem = async (id: string | number): Promise<void> => {
  const numericId = typeof id === 'string' ? Number(id) : id;
  const res = await fetch(`${API_URL}/items/${numericId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('削除に失敗しました');
  }
};