// import { useContext } from "react";
// import {ReactComponent as ShoppingIcon} from "../../assets/images/shopping-bag.svg";
// import "./cart-icon.styles.scss";
import { useSelector } from "react-redux";
import { Shopping, CartIconContainer, ItemCount } from "./cart-icon.styles";
import { selectCartCount } from "../../store/cart/cart.selector";
// import { CartContext } from "../../contexts/cart.context";

export default function CartIcon({ onClick }) {
  const cartCount = useSelector(selectCartCount);
  // const { cartCount } = useContext(CartContext)
  return(
    <>
      <CartIconContainer onClick={onClick}>
        <Shopping />
        <ItemCount>
          {cartCount}
        </ItemCount>
      </CartIconContainer>
    </>
  )
}