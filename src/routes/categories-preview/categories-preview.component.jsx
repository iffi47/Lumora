// import { useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategories, selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";

export default function CategoriesPreview() {
  // const { categories } = useContext(CategoriesContext)
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <div>
      {isLoading ? <Spinner /> : Object.keys(categories).map((title) => {
        const products = categories[title]
        return (<CategoryPreview key={title} title={title} products={products} />)
      })}
    </div>
  );
}