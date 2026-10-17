import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemToCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";
import Icon from "../../components/lumora/icon";
export default function Checkout() {
  const dispatch = useDispatch(),
    items = useSelector(selectCartItems),
    total = useSelector(selectCartTotal);
  return (
    <div className="page-width bag-page">
      <div className="page-intro">
        <span className="eyebrow">Good things, gathered</span>
        <h1>Your shopping bag</h1>
        <p>A few lovely things to brighten your everyday.</p>
      </div>
      {items.length ? (
        <div className="bag-layout">
          <div className="bag-items">
            {items.map((item) => (
              <article className="bag-item" key={item.id}>
                <img src={item.imageUrl} alt={item.name} />
                <div className="bag-item-details">
                  <h2>{item.name}</h2>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity-control">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => dispatch(removeItemToCart(items, item))}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => dispatch(addItemToCart(items, item))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="bag-item-end">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  <button
                    className="text-button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => dispatch(clearItemFromCart(items, item))}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
            <Link className="text-link" to="/shop">
              ← Keep exploring
            </Link>
          </div>
          <aside className="order-summary">
            <span className="eyebrow">Your everyday edit</span>
            <h2>Bag summary</h2>
            <div>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div>
              <span>Shipping & taxes</span>
              <span>Not calculated</span>
            </div>
            <div className="summary-total">
              <strong>Subtotal</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <p className="checkout-note">
              <Icon name="bag" size={18} />
              Your bag is saved on this device. Online payment is not available
              in this storefront yet.
            </p>
            <Link className="button" to="/shop">
              Continue shopping <Icon name="arrow" size={16} />
            </Link>
          </aside>
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="bag" size={42} />
          <h2>Room for something lovely.</h2>
          <p>Your next everyday favorite is waiting to be found.</p>
          <Link className="button" to="/shop">
            Discover the collection <Icon name="arrow" size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}
