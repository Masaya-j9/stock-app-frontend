"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container, Typography } from "@mui/material";
import ItemForm from "@/components/items/ItemForm";
import { editItemAction } from "@/app/items/[id]/edit/actions";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ErrorType } from "@/types/errors";
import { Items as Item } from "@/types/items";

const EditItemPage = ({ saveItem }: { saveItem: Item | null }) => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [item, setItem] = useState<Item | null>(saveItem);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleCategoryChange = (selectedIds: number[]) => {
    setSelectedCategoryIds(selectedIds);
  };

  const handleSubmit = async (formData: {
    name: string;
    quantity: number;
    description: string;
    categoryIds: number[];
  }) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("quantity", formData.quantity.toString());
      formDataToSend.append("description", formData.description);

      // categoryIdsを配列として送信
      formData.categoryIds.forEach((id) => {
        formDataToSend.append("categoryIds", id.toString());
      });

      const result = await editItemAction(id, formDataToSend);
      if (result.error) {
        setErrorType("update");
        setErrorMessage(
          typeof result.error.message === "string"
            ? result.error.message
            : JSON.stringify(result.error.message)
        );
        return;
      }

      router.push(`/items/${id}`);
    } catch (error: any) {
      setErrorType("update");
      setErrorMessage("更新に失敗しました");
    }
  };

  // 1. 初回マウント時 or id変更時にlocalStorageからの復元を試みる
  useEffect(() => {
    const fetchData = async () => {
      const savedItem = localStorage.getItem("editingItem");
      if (savedItem) {
        try {
          const parsedItem = JSON.parse(savedItem);
          if (parsedItem.id === Number(id)) {
            setItem(parsedItem);
            const categoryIds =
              parsedItem.itemCategories?.map((cat: any) => cat.id) ?? [];
            setSelectedCategoryIds(categoryIds);
            return;
          }
        } catch (e) {
          console.error("localStorageのJSONパース失敗", e);
        }
      }

      // localStorageになかった場合はsaveItemを使用
      if (saveItem) {
        setItem(saveItem);
        const categoryIds =
          saveItem.itemsCategories?.map((cat) => cat.id) ?? [];
        setSelectedCategoryIds(categoryIds);
      } else {
        setItem(null);
        setSelectedCategoryIds([]);
        setErrorType("notFoundItem");
      }
    };

    fetchData();
  }, [id, saveItem]);

  if (errorType === "notFoundItem") {
    return <ErrorMessage type="notFoundItem" />;
  }

  if (!item) {
    console.log("itemが空です。saveItem:", saveItem);
    return <p>読み込み中...</p>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        アイテム編集画面
      </Typography>
      {errorType && <ErrorMessage type={errorType} message={errorMessage} />}
      <ItemForm
        initialValues={{
          name: item.name,
          quantity: item.quantity,
          description: item.description ?? "",
        }}
        mode="edit"
        onSubmit={handleSubmit}
        onCategoryChange={handleCategoryChange}
        initialSelectedCategoryIds={selectedCategoryIds}
      />
    </Container>
  );
};

export default EditItemPage;
