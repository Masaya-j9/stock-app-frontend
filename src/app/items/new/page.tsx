'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography } from '@mui/material';
import ItemRegisterForm from '@/components/items/ItemRegisterForm';
import { registerItemAction } from './actions';

const RegisterItemPage = () => {
  const router = useRouter();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const handleCategoryChange = (selectedIds: number[]) => {
    setSelectedCategoryIds(selectedIds);
  };

  const handleSubmit = async (formData: { name: string; quantity: number; description: string }) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('quantity', formData.quantity.toString());
      formDataToSend.append('description', formData.description);
      formDataToSend.append('categoryIds', JSON.stringify(selectedCategoryIds)); // カテゴリIDを追加

      selectedCategoryIds.forEach((id) => {
        formDataToSend.append('categoryIds', id.toString());
      });

      await registerItemAction(formDataToSend);
      console.log('アイテムが登録されました');
      router.push('/items');
    } catch (error) {
      console.error('アイテムの登録に失敗しました', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        アイテム登録画面
      </Typography>
      <ItemRegisterForm mode="create" onSubmit={handleSubmit} onCategoryChange={handleCategoryChange} />
    </Container>
  );
};

export default RegisterItemPage;
