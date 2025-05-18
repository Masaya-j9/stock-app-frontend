'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography } from '@mui/material';
import CategoryRegisterForm from '@/components/categories/CategoryRegisterForm';
import { registerCategoryAction } from './actions';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ErrorType } from '@/types/errors';

const RegisterCategoryPage = () => {
  const router = useRouter();
  const [errorType, setErrorType] = useState<ErrorType | null>(null);

  const handleErrorResponse = (error: { statusCode: number; message: string }) => {
    if (error.statusCode === 409) {
      setErrorType('conflict');
      return true;
    }

    if (error.statusCode === 400) {
      setErrorType('validation');
      return true;
    }

    return false;
  };

  const handleSubmit = async (formData: { name: string; description: string }) => {
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);

      const result = await registerCategoryAction(data);

      if (result.error && handleErrorResponse(result.error)) {
        return;
      }

      console.log('カテゴリが登録されました');
      router.push('/categories');
    } catch (error) {
      setErrorType('create');
    }
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        カテゴリ登録画面
      </Typography>
      {errorType && <ErrorMessage type={errorType} />}
      <CategoryRegisterForm mode="create" onSubmit={handleSubmit} />
    </Container>
  );
};

export default RegisterCategoryPage;