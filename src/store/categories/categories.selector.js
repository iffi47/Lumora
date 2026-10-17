import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategoriesMap = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories,
);
export const selectCategories = createSelector(
  [selectCategoriesMap],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {}),
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading,
);
export const selectCatalogCategories = createSelector(
  [selectCategoriesMap],
  (categories) =>
    [...categories]
      .sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
      .map((category) => ({
        slug: category.title.toLowerCase(),
        name: category.name || category.title,
        image: category.image || category.items?.[0]?.imageUrl,
      })),
);
export const selectCatalogProducts = createSelector(
  [selectCategoriesMap],
  (categories) =>
    categories
      .flatMap((category) =>
        (category.items || []).map((item) => ({
          ...item,
          category: category.title.toLowerCase(),
        })),
      )
      .sort((a, b) =>
        String(a.id).localeCompare(String(b.id), undefined, { numeric: true }),
      ),
);
export const selectCategoriesError = (state) => state.categories.error;
