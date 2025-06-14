import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useArticlesStore = create(
  persist(
    (set, get) => ({
      // Initial state
      articles: [],
      categories: [],
      currentPage: 1,
      totalPages: 1,
      totalArticles: 0,
      isLoading: false,
      error: null,
      filters: {
        category: "",
        search: "",
        page: 1,
        limit: 9,
      },

      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Fetch all articles
      fetchArticles: async (params = {}) => {
        try {
          set({ isLoading: true, error: null });

          const currentFilters = get().filters;
          const queryParams = { ...currentFilters, ...params };

          const searchParams = new URLSearchParams();
          Object.keys(queryParams).forEach((key) => {
            if (queryParams[key] !== "" && queryParams[key] !== null) {
              searchParams.append(key, queryParams[key]);
            }
          });

          const response = await fetch(
            `https://test-fe.mysellerpintar.com/api/articles?${searchParams.toString()}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();

            set({
              articles: data.articles || data.data || [],
              currentPage: data.page || data.page || 1,
              totalPages: Math.ceil(data.total / data.limit) || 1,
              totalArticles: data.total || data.count || 0,
              isLoading: false,
              filters: { ...get().filters, ...params },
            });

            return data;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          set({
            error: error.message || "Failed to fetch articles",
            isLoading: false,
          });
          throw error;
        }
      },

      // Fetch categories
      fetchCategories: async () => {
        try {
          const response = await fetch(
            "https://test-fe.mysellerpintar.com/api/categories",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            set({ categories: data.categories || data.data || [] });
            return data;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error("Failed to fetch categories:", error);
          set({ categories: [] });
        }
      },

      // Search articles
      searchArticles: async (searchTerm) => {
        const filters = { ...get().filters, search: searchTerm, page: 1 };
        return get().fetchArticles(filters);
      },

      // Filter by category
      filterByCategory: async (category) => {
        const filters = { ...get().filters, category, page: 1 };
        return get().fetchArticles(filters);
      },

      // Change page
      changePage: async (page) => {
        const filters = { ...get().filters, page };
        return get().fetchArticles(filters);
      },

      // Reset filters
      resetFilters: () => {
        const defaultFilters = {
          category: "",
          search: "",
          page: 1,
          limit: 9,
        };
        set({ filters: defaultFilters });
        return get().fetchArticles(defaultFilters);
      },

      // Update filters
      updateFilters: (newFilters) => {
        const updatedFilters = { ...get().filters, ...newFilters };
        set({ filters: updatedFilters });
        return get().fetchArticles(updatedFilters);
      },

      // Get article by ID
      getArticleById: (id) => {
        const articles = get().articles;
        return articles.find((article) => article.id === id);
      },

      // Fetch single article
      fetchArticleById: async (id) => {
        try {
          set({ isLoading: true, error: null });

          const response = await fetch(
            `https://test-fe.mysellerpintar.com/api/articles/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            set({ isLoading: false });
            return data.article || data.data;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          set({
            error: error.message || "Failed to fetch article",
            isLoading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: "articles-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        categories: state.categories,
        filters: state.filters,
      }),
    }
  )
);
