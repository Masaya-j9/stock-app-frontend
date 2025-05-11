import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, TextField, FormGroup, FormControlLabel, Checkbox, Chip, Typography } from '@mui/material';
import { fetchCategories } from '@/lib/category/fetchCategories';
import { CategoryResponse } from '@/types/categories';

type ItemFormProps = {
  initialValues?: {
    name: string;
    quantity: number;
    description: string;
  };
  mode: 'create' | 'edit';
  onSubmit: (formData: {
    name: string;
    quantity: number;
    description: string;
    categoryIds: number[];
  }) => void;
  onCategoryChange: (selectedCategoryIds: number[]) => void;
};

const ItemRegisterForm: React.FC<ItemFormProps> = ({
  initialValues = { name: '', quantity: 1, description: '' },
  onSubmit,
  mode,
  onCategoryChange,
}) => {
  const [formState, setFormState] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData: CategoryResponse = await fetchCategories(1);
        const transformedCategories = categoriesData.categories.map((category) => ({
          id: category.id,
          name: category.name,
        }));
        setCategories(transformedCategories);
      } catch (error) {
        setError('カテゴリの取得に失敗しました');
      }
    };
    fetchData();
  }, []);

  // フォームの入力値を管理する関数
  const handleChange = (field: keyof typeof formState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = field === 'quantity' ? Number(event.target.value) : event.target.value;
    setFormState((prev) => ({ ...prev, [field]: newValue }));
  };

  // カテゴリのチェックボックスの状態を管理するための関数
  const handleLabelToggle = (categoryId: number) => {
    setSelectedCategoryIds((prevSelectedCategoryIds) =>
      prevSelectedCategoryIds.includes(categoryId)
        ? prevSelectedCategoryIds.filter((id) => id !== categoryId)
        : [...prevSelectedCategoryIds, categoryId]
    );
  };

  useEffect(() => {
    onCategoryChange(selectedCategoryIds);
  }, [selectedCategoryIds, onCategoryChange]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { name, quantity, description } = formState;
      onSubmit({ name, quantity, description, categoryIds: selectedCategoryIds });
    } catch (err) {
      setError('アイテムの登録に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 400, m: 'auto', mt: 5 }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="item-name">物品名<span style={{ color: 'red' }}> *</span></InputLabel>
        <OutlinedInput
          id="item-name"
          value={formState.name}
          onChange={handleChange('name')}
          label="物品名"
        />
        <FormHelperText>物品の名前を入力してください</FormHelperText>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="item-quantity">数量<span style={{ color: 'red' }}> *</span></InputLabel>
        <OutlinedInput
          id="item-quantity"
          type="number"
          value={formState.quantity}
          onChange={handleChange('quantity')}
          label="数量"
          inputProps={{ min: 1 }}
        />
        <FormHelperText>在庫の数を入力してください</FormHelperText>
      </FormControl>

      <TextField
        id="item-description"
        label="説明"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={formState.description}
        onChange={handleChange('description')}
      />

      <FormControl fullWidth margin="normal">
        <Typography>カテゴリー</Typography>
        <FormGroup>
          {categories?.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  checked={selectedCategoryIds.includes(category.id)}
                  onChange={() => handleLabelToggle(category.id)}
                  name={category.name}
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>
      </FormControl>

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
        {loading ? '登録中...' : mode === 'create' ? '登録' : '更新'}
      </Button>
    </Box>
  );
};

export default ItemRegisterForm;
