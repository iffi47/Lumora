import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCatalogCategories,
  selectCatalogProducts,
} from "../../store/categories/categories.selector";
import CatalogStatus from "../../components/lumora/catalog-status";
import ProductCard from "../../components/product-card/product-card.component";
import { useFavorites } from "../../contexts/favorites.context";
export default function Shop({ saved = false }) {
  const categories = useSelector(selectCatalogCategories),
    products = useSelector(selectCatalogProducts);
  const location = useLocation(),
    [params] = useSearchParams(),
    [sort, setSort] = useState("featured"),
    { favorites } = useFavorites();
  const category = decodeURIComponent(location.pathname.split("/")[2] || ""),
    query = params.get("q") || "",
    deals = params.has("deals"),
    fresh = params.has("new");
  const current = categories.find((c) => c.slug === category);
  let visible = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!saved || favorites.includes(p.id)) &&
      (!query ||
        `${p.name} ${p.category}`
          .toLowerCase()
          .includes(query.toLowerCase())) &&
      (!deals || p.oldPrice) &&
      (!fresh || p.badge === "New"),
  );
  if (sort === "low") visible.sort((a, b) => a.price - b.price);
  if (sort === "high") visible.sort((a, b) => b.price - a.price);
  if (sort === "name") visible.sort((a, b) => a.name.localeCompare(b.name));
  const title = saved
    ? "Your lovely little list"
    : query
      ? `Results for “${query}”`
      : deals
        ? "Little luxuries, less"
        : fresh
          ? "A fresh perspective"
          : current
            ? current.name
            : "Find your everyday";
  return (
    <div className="page-width collection-page">
      <div className="page-intro">
        <span className="eyebrow">
          {saved ? "Saved with love" : "The Lumora collection"}
        </span>
        <h1>{title}</h1>
        <p>
          {saved
            ? "Keep your favorites close. Come back when the moment feels right."
            : "Thoughtful finds for your home, your rituals, and everything in between."}
        </p>
      </div>
      <CatalogStatus />
      <div id="categories" className="collection-toolbar">
        <div className="category-filters">
          <Link
            className={
              !category && !deals && !fresh && !saved ? "selected" : ""
            }
            to="/shop"
          >
            All finds
          </Link>
          {categories.map((c) => (
            <Link
              className={category === c.slug ? "selected" : ""}
              key={c.slug}
              to={`/shop/${c.slug}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
        <div className="sort-row">
          <span>
            {visible.length} lovely {visible.length === 1 ? "find" : "finds"}
          </span>
          <label>
            Sort by{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </div>
      {visible.length ? (
        <div className="product-grid collection-products">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>✦</span>
          <h2>
            {saved ? "Make room for your favorites" : "No finds just yet"}
          </h2>
          <p>
            {saved
              ? "Tap the heart on any piece to save it here."
              : "Try a different search or explore the full collection."}
          </p>
          <Link className="button" to="/shop">
            Explore the collection →
          </Link>
        </div>
      )}
    </div>
  );
}
