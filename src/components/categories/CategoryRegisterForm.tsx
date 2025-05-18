import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, TextField, FormGroup, FormControlLabel, Checkbox, Chip, Typography } from '@mui/material';

type CategoryFormProps = {
  initialValues?: {
    name: string;
    description: string;
  };
  mode: 'create' | 'edit';
  onSubmit: (formData: { name: string; description: string }) => void;
};

const CategoryRegisterForm: React.FC<CategoryFormProps> = ({
  initialValues = { name: '', description: '' },
  onSubmit,
  mode,
}) => {
  const [formState, setFormState] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof formState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const { name, description } = formState;

    if (!name.trim()) {
      setError('カテゴリ名は必須です');
      setLoading(false);
      return;
    }

    try {
      onSubmit({ name: name.trim(), description: description.trim() });
    } catch (err) {
      setError('カテゴリの登録に失敗しました');
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 400, m: 'auto', mt: 5 }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="category-name">カテゴリ名<span style={{ color: 'red' }}> *</span></InputLabel>
        <OutlinedInput
          id="category-name"
          value={formState.name}
          onChange={handleChange('name')}
          label="カテゴリ名"
        />
        <FormHelperText>カテゴリの名前を入力してください</FormHelperText>
      </FormControl>

      <TextField
        id="category-description"
        label="説明"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={formState.description}
        onChange={handleChange('description')}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
        {loading ? '登録中...' : mode === 'create' ? '登録' : '更新'}
      </Button>
    </Box>
  );
};

export default CategoryRegisterForm;
