import { fetchCategories } from "@/lib/category/fetchCategories";
import { CategoryResponse } from "@/types/categories";
import { vi, expect, it, describe, beforeEach, afterEach } from "vitest";

describe("fetchCategories", () => {
  const API_URL = "http://localhost:4000";
  const page = 1;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_URL = API_URL;
    vi.resetAllMocks();
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_API_URL;
  });

  it("should fetch categories and return a CategoryResponse", async () => {
    const mockResponse: CategoryResponse = {
      count: 2,
      categories: [
        {
          id: 1,
          name: "Category 1",
          description: "Description for category 1",
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
        {
          id: 2,
          name: "Category 2",
          description: "Description for category 2",
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
      ],
    };

    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    } as Response);

    const expectedUrl = `${API_URL}/categories?pages=${page}`;
    const result = await fetchCategories(page);

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
      next: { revalidate: 0 },
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when the fetch fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    await expect(fetchCategories(page)).rejects.toThrow(
      "Failed to fetch categories: 500 Internal Server Error"
    );
  });
});
