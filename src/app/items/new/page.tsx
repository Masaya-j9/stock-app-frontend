"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography } from "@mui/material";
import ItemForm from "@/components/items/ItemForm";
import { registerItemAction } from "./actions";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ErrorType } from "@/types/errors";

const RegisterItemPage = () => {
  const router = useRouter();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleCategoryChange = (selectedIds: number[]) => {
    setSelectedCategoryIds(selectedIds);
  };

  const handleErrorResponse = (error: {
    statusCode: number;
    message: string;
  }) => {
    if (error.statusCode === 409) {
      setErrorType("conflict");
      setErrorMessage(error.message);
      return true;
    }

    if (error.statusCode === 400) {
      setErrorType("validation");
      setErrorMessage(error.message);
      return true;
    }

    return false;
  };

  const handleSubmit = async (formData: {
    name: string;
    quantity: number;
    description: string;
  }) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("quantity", formData.quantity.toString());
      formDataToSend.append("description", formData.description);
      formDataToSend.append("categoryIds", JSON.stringify(selectedCategoryIds));

      selectedCategoryIds.forEach((id) => {
        formDataToSend.append("categoryIds", id.toString());
      });

      const result = await registerItemAction(formDataToSend);
      console.log("result:", result);

      if (result.error && handleErrorResponse(result.error)) {
        return;
      }

      console.log("アイテムが登録されました");
      router.push("/items");
    } catch (error: any) {
      setErrorType("create");
    }
  };
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        アイテム登録画面
      </Typography>
      {errorType && <ErrorMessage type={errorType} />}
      <ItemForm
        mode="create"
        onSubmit={handleSubmit}
        onCategoryChange={handleCategoryChange}
      />
    </Container>
  );
};

export default RegisterItemPage;
