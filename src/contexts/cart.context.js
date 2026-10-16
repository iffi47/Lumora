import { createContext } from "react";
import { useReducer } from "react";
import { createAction } from "../utlis/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
 //find if cartItems contain productToAdd
 const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);
 //if found increment quantity
 if (existingCartItem) {
  return cartItems.map((cartItem) =>
   cartItem.id === productToAdd.id
    ? { ...cartItem, quantity: cartItem.quantity + 1 }
    : cartItem,
  );
 }
 //return new CartItems if not existed in the current cartItems array;
 return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems, cartItemToRemove) => {
 const existingCartItem = cartItems.find(
  (item) => item.id === cartItemToRemove.id,
 );
 // check if quantity is equal to 1, if it is remove that item from the cart
 if (existingCartItem.quantity === 1) {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
 }

 // return back cartitems with matching cart item with reduced quantity
 return cartItems.map((cartItem) =>
  cartItem.id === cartItemToRemove.id
   ? { ...cartItem, quantity: cartItem.quantity - 1 }
   : cartItem,
 );
};

const clearCartItem = (cartItems, cartItemToClear) =>
 cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const CART_ACTION_TYPES = {
 SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
 SET_CART_ITEMS: "SET_CART_ITEMS",
 SET_CART_COUNT: "SET_CART_COUNT",
 SET_CART_TOTAL: "SET_CART_TOTAL",
};
const INITIAL_STATE = {
 isCartOpen: false,
 cartItems: [],
 cartCount: 0,
 cartTotal: 0,
};

const cartReducer = (state, action) => {
 const { type, payload } = action;

 switch (type) {
  case CART_ACTION_TYPES.SET_CART_ITEMS:
   return {
    ...state,
    ...payload,
   };
  case CART_ACTION_TYPES.SET_IS_CART_OPEN:
   return {
    ...state,
    isCartOpen: payload,
   };
  default:
   throw new Error(`Unhandled type ${type} in cartReducer`);
 }
};

export const CartContext = createContext({
 isCartOpen: false,
 setIsCartOpen: () => null,
 cartItems: [],
 addItemToCart: () => null,
 cartCount: 0,
 clearItemFromCart: () => null,
 //  addItemToCart: () => null,
 removeItemToCart: () => null,
 cartTotal: 0,
});

export const CartProvider = ({ children }) => {
 const [{ isCartOpen, cartCount, cartTotal, cartItems }, dispatch] = useReducer(
  cartReducer,
  INITIAL_STATE,
 );
 const updateCartItemsReducer = (cartItems) => {
  const newCartCount = cartItems.reduce(
   (total, cartItem) => total + cartItem.quantity,
   0,
  );

  const newCartTotal = cartItems.reduce(
   (total, cartItem) => total + cartItem.quantity * cartItem.price,
   0,
  );

  const payload = {
   cartItems,
   cartCount: newCartCount,
   cartTotal: newCartTotal,
  };

  dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
 };

 //  useEffect(() => {
 //   const newCartCount = cartItems.reduce(
 //    (total, cartItem) => total + cartItem.quantity,
 //    0,
 //   );
 //   const newCartTotal = cartItems.reduce(
 //    (total, cartItem) => total + cartItem.quantity * cartItem.price,
 //    0,
 //   );
 //   setCartCount(newCartCount);
 //   setCartTotal(newCartTotal);
 //  }, [cartItems]);
 //  const toggleCart = () => {
 //   setIsCart((prev) => {
 //    return !prev;
 //   });
 //   //  console.log(isCartOpen);
 //   return isCartOpen;
 //  };
 const addItemToCart = (productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  updateCartItemsReducer(newCartItems);
 };

 const removeItemToCart = (cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  updateCartItemsReducer(newCartItems);
 };

 const clearItemFromCart = (cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  updateCartItemsReducer(newCartItems);
 };

 const setIsCartOpen = (boolean) => {
  dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));
 };

 const value = {
  isCartOpen,
  setIsCartOpen,
  addItemToCart,
  removeItemToCart,
  clearItemFromCart,
  cartItems,
  cartCount,
  cartTotal,
 };

 return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
