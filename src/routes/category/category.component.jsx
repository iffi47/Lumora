// import "./category.styles.jsx";
import { CategoryContainer, Title } from "./category.styles";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import { selectCategories, selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";

export default function Category() {
  const { category } = useParams();
  // const { categories } = useContext(CategoriesContext);
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading)
  const [products, setProducts] = useState(categories[category]);
  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories])
  return (
    <>
      <Title>{category.toLocaleUpperCase()}</Title>
      {isLoading ? <Spinner /> : <CategoryContainer>
        {products && products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CategoryContainer>}

    </>
  )
}