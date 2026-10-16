import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {selectCartItems} from '../../store/cart/cart.selector';
import {addItemToCart} from '../../store/cart/cart.action';
import {useFavorites} from '../../contexts/favorites.context';
import Icon from '../lumora/icon';
export default function ProductCard({product}){
 const dispatch=useDispatch(),items=useSelector(selectCartItems),{favorites,toggleFavorite}=useFavorites();
 const [added,setAdded]=useState(false);
 return <article className="product-card"><div className="product-image"><img src={product.imageUrl} alt={product.name} loading="lazy"/>{product.badge&&<span className={`product-badge ${product.badge==='New'?'badge-new':''}`}>{product.badge}</span>}<button className={`favorite-button ${favorites.includes(product.id)?'is-saved':''}`} aria-label={`${favorites.includes(product.id)?'Remove':'Save'} ${product.name} ${favorites.includes(product.id)?'from':'to'} favorites`} aria-pressed={favorites.includes(product.id)} onClick={()=>toggleFavorite(product.id)}><Icon name="heart" size={18}/></button><button className="add-to-bag" onClick={()=>{dispatch(addItemToCart(items,product));setAdded(true);}}><Icon name="bag" size={16}/>{added?'Add another':'Add to bag'}<span className="sr-only" aria-live="polite">{added?`${product.name} added to bag`:''}</span></button></div><div className="product-info"><h3>{product.name}</h3><div className="product-price">${product.price.toFixed(2)} {product.oldPrice&&<del>${product.oldPrice.toFixed(2)}</del>}</div><div className="rating"><span aria-label="Rated 4.5 out of 5">★★★★<span className="half-star">★</span></span><small>({product.rating})</small></div></div></article>;
}
