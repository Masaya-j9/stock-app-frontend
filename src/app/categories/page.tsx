import { fetchCategories } from "@/lib/category/fetchCategories";
import { Metadata } from "next";
import { Container, Typography } from "@mui/material";
import CategoryList from "./CategoryList";

export const metadata: Metadata = {
  title: "カテゴリ一覧",
};

type PageProps = {
  searchParams: { page?: string };
};

export default async function CategoriesPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page ?? "1");
  const categoryResponse = await fetchCategories(page);
  const categories = categoryResponse.categories;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        カテゴリ一覧（{page}ページ目）
      </Typography>
      <CategoryList categories={categories} />
    </Container>
  );
}
