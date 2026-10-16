// import "./cart-dropdown.styles.scss";
import { CartDropDownContainer, EmptyMessage, CartItems } from "./cart-dropdown.styles";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

export default function CartDropdown() {
  const cartItems = useSelector(selectCartItems);
  // const { cartItems, addItemToCart } = useContext(CartContext);
  return(
    <>
      <CartDropDownContainer>
        <CartItems>
          {cartItems.length ? cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          )) : (<EmptyMessage>No Items</EmptyMessage>)}
          <Button>Checkout</Button>
        </CartItems>
      </CartDropDownContainer>
    </>
  )
}