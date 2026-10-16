import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCatalogCategories, selectCatalogProducts } from "../../store/categories/categories.selector";
import CatalogStatus from "../../components/lumora/catalog-status";
import ProductCard from "../../components/product-card/product-card.component";
import Icon from "../../components/lumora/icon";
const lifestyleImage = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85";
export default function Home() {
 const categories = useSelector(selectCatalogCategories);
 const products = useSelector(selectCatalogProducts);
 return (
  <div className="home-page page-width">
   <section className="hero">
    <img
     className="hero-photo"
     src={lifestyleImage}
     alt="A calm, sunlit living space with natural textures and warm neutral furnishings"
    />
    <div className="hero-shade" />
    <div className="hero-content">
     <span className="eyebrow">A fresh perspective</span>
     <h1>
      Elevate your
      <br />
      <em>everyday.</em>
     </h1>
     <p>
      Thoughtfully chosen pieces for a<br className="desktop-break" /> more
      beautiful, balanced life.
     </p>
     <Link
      className="button"
      to="/shop">
      Discover the collection{" "}
      <Icon
       name="arrow"
       size={18}
      />
     </Link>
     <div className="hero-footnote">
      <span /> Beautiful things. Thoughtfully found.
     </div>
    </div>
    <div className="hero-caption">
     Good things.
     <br />
     Brighter days.<span>✦</span>
    </div>
    <span className="hero-index">THE EVERYDAY COLLECTION — 01</span>
   </section>
   <CatalogStatus />
   <section
    className="category-section"
    aria-label="Shop by category">
    <div className="category-list">
     {categories.map((c) => (
      <Link
       className="category-tile"
       to={`/shop/${c.slug}`}
       key={c.slug}>
       <div>
        <img
         src={c.image}
         alt=""
         loading="lazy"
        />
       </div>
       <span>{c.name}</span>
      </Link>
     ))}
    </div>
   </section>
   <section
    className="promotions"
    aria-label="Featured collections">
    <Link
     to="/shop?deals=true"
     className="sale-banner">
     <div>
      <span className="eyebrow">Little luxuries. Lovely prices.</span>
      <h2>A little more sunshine.</h2>
      <p>Everyday favorites, now for less.</p>
      <span className="pill-link">
       Shop the sale{" "}
       <Icon
        name="arrow"
        size={16}
       />
      </span>
     </div>
     <img
      src={'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85'}
      alt="Warm-toned sunglasses for sunny days"
     />
    </Link>
    <Link
     to="/shop/home-decor"
     className="home-banner">
     <img
      src={'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=700&q=85'}
      alt="A cozy accent chair"
     />
     <div>
      <span className="eyebrow">Make room for calm</span>
      <h2>
       Your space.
       <br />
       Your sanctuary.
      </h2>
      <span className="text-link">
       Shop home{" "}
       <Icon
        name="arrow"
        size={15}
       />
      </span>
     </div>
    </Link>
   </section>
   <section className="bestsellers">
    <div className="section-heading">
     <div>
      <span className="eyebrow">The pieces you love</span>
      <h2>Everyday favorites</h2>
      <p>A few good things, handpicked for you.</p>
     </div>
     <Link
      className="text-link"
      to="/shop">
      View all{" "}
      <Icon
       name="arrow"
       size={16}
      />
     </Link>
    </div>
    <div className="product-grid home-products">
     {products.slice(0, 6).map((p) => (
      <ProductCard
       key={p.id}
       product={p}
      />
     ))}
    </div>
   </section>
   <section className="brand-story">
    <span className="eyebrow">The Lumora way</span>
    <h2>
     A little intention.
     <br />A lot of everyday joy.
    </h2>
    <p>
     We believe the things you surround yourself with should feel as good as
     they look. Discover considered pieces that bring warmth to your home and
     ease to your day.
    </p>
    <Link
     className="text-link"
     to="/about">
     Get to know us{" "}
     <Icon
      name="arrow"
      size={17}
     />
    </Link>
   </section>
   <div className="benefits">
    {[
     ["leaf", "Thoughtfully selected", "Good design, in every detail."],
     ["truck", "Delivered with care", "From our collection to your home."],
     ["return", "Everyday versatility", "Pieces to make your own."],
     ["shield", "A personal touch", "A little thought goes a long way."],
    ].map(([icon, title, body]) => (
     <div key={icon}>
      <Icon
       name={icon}
       size={27}
      />
      <div>
       <h3>{title}</h3>
       <p>{body}</p>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}
