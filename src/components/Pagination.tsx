// components/Pagination.tsx
"use client";

import { Pagination } from "@mui/material";

type PageProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const CustomPagination = ({ currentPage, totalPages, onPageChange }: PageProps) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(_, page) => onPageChange(page)}
      color="primary"
      shape="rounded"
      showFirstButton
      showLastButton
    />
  );
};

export default CustomPagination;
