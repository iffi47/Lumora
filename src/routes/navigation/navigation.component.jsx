import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import {
  selectCartCount,
  selectCartItems,
  selectIsCartOpen,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { signOutStart } from "../../store/user/user.action";
import { FavoritesProvider } from "../../contexts/favorites.context";
import Icon from "../../components/lumora/icon";
import monogram from "../../assets/images/Elegant L Monogram with Botanical Leaf.png";
export default function Navigation() {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    location = useLocation();
  const user = useSelector(selectCurrentUser),
    count = useSelector(selectCartCount),
    items = useSelector(selectCartItems),
    total = useSelector(selectCartTotal),
    open = useSelector(selectIsCartOpen);
  const [menu, setMenu] = useState(false),
    [query, setQuery] = useState("");
  useEffect(() => {
    setMenu(false);
    dispatch(setIsCartOpen(false));
    window.scrollTo(0, 0);
  }, [location.pathname, location.search, dispatch]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        dispatch(setIsCartOpen(false));
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [dispatch]);
  return (
    <FavoritesProvider>
      <a
        className="skip-link"
        href="#main">
        Skip to content
      </a>
      <div className="announcement">
        A little beauty. A brighter everyday.{" "}
        <span>
          Discover the new collection <span aria-hidden="true">→</span>
        </span>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="icon-button mobile-menu"
            aria-label="Toggle navigation"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}>
            <Icon name={menu ? "close" : "menu"} />
          </button>
          <Link
            className="brand"
            to="/"
            aria-label="Lumora home">
            <span className="brand-mark">
              <img
                src={monogram}
                alt=""
              />
            </span>
            Lumora<span className="brand-star">✦</span>
          </Link>
          <nav
            className={menu ? "main-nav is-open" : "main-nav"}
            aria-label="Main navigation">
            <NavLink
              to="/"
              end>
              Home
            </NavLink>
            <NavLink
              to="/shop"
              end>
              Shop
            </NavLink>
            <Link to="/shop#categories">Categories</Link>
            <Link
              className={location.search.includes("deals=true") ? "active" : ""}
              to="/shop?deals=true">
              Deals
            </Link>
            <NavLink to="/about">Our story</NavLink>
          </nav>
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
            }}>
            <Icon
              name="search"
              size={18}
            />
            <input
              aria-label="Search products"
              placeholder="Search for something lovely…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <div className="header-actions">
            {user ? (
              <button
                className="icon-button"
                aria-label="Sign out"
                title="Sign out"
                onClick={() => dispatch(signOutStart())}>
                <Icon name="user" />
              </button>
            ) : (
              <Link
                className="icon-button"
                to="/auth"
                aria-label="My account">
                <Icon name="user" />
              </Link>
            )}
            <Link
              className="icon-button"
              to="/favorites"
              aria-label="Your favorites">
              <Icon name="heart" />
            </Link>
            <button
              className="icon-button bag-button"
              aria-label={`Shopping bag, ${count} items`}
              aria-expanded={open}
              onClick={() => dispatch(setIsCartOpen(!open))}>
              <Icon name="bag" />
              <span className="cart-count">{count}</span>
            </button>
          </div>
          {open && (
            <aside
              className="mini-cart"
              aria-label="Shopping bag">
              <div className="section-heading">
                <h2>Your bag</h2>
                <button
                  className="icon-button"
                  aria-label="Close bag"
                  onClick={() => dispatch(setIsCartOpen(false))}>
                  <Icon
                    name="close"
                    size={18}
                  />
                </button>
              </div>
              <div className="mini-cart-items">
                {items.length ? (
                  items.map((item) => (
                    <div
                      className="mini-cart-item"
                      key={item.id}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                      />
                      <div>
                        {item.name}
                        <small>
                          {item.quantity} × ${item.price.toFixed(2)}
                        </small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>A little room for something lovely.</p>
                )}
              </div>
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <Link
                className="button"
                to="/checkout">
                View your bag{" "}
                <Icon
                  name="arrow"
                  size={17}
                />
              </Link>
            </aside>
          )}
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <Link
              className="brand"
              to="/">
              Lumora<span className="brand-star">✦</span>
            </Link>
            <p>
              Thoughtful finds. Simple pleasures.
              <br />A brighter kind of everyday.
            </p>
          </div>
          <div>
            <h3>Find your everyday</h3>
            <Link to="/shop">Shop all</Link>
            <Link to="/shop?new=true">New arrivals</Link>
            <Link to="/shop?deals=true">Little luxuries, less</Link>
          </div>
          <div>
            <h3>Make yourself at home</h3>
            <Link to="/about">Our story</Link>
            <Link to="/favorites">Your favorites</Link>
            <Link to="/auth">Your account</Link>
          </div>
          <div className="footer-note">
            <Icon
              name="leaf"
              size={30}
            />
            <h3>Less ordinary. More you.</h3>
            <p>Considered essentials for the way you live.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Lumora. Made for everyday living.</span>
          <span>
            Lifestyle for a brighter everyday <span aria-hidden="true">✦</span>
          </span>
        </div>
      </footer>
    </FavoritesProvider>
  );
}
