import {useDispatch,useSelector} from 'react-redux';
import {selectCategoriesError,selectCategoriesIsLoading} from '../../store/categories/categories.selector';
import {fetchCategoriesStart} from '../../store/categories/categories.action';
export default function CatalogStatus(){
 const dispatch=useDispatch(),loading=useSelector(selectCategoriesIsLoading),error=useSelector(selectCategoriesError);
 if(loading)return <p role="status">Loading the collection…</p>;
 if(error)return <div role="alert"><p>We couldn’t load the collection. Please try again.</p><button className="button" onClick={()=>dispatch(fetchCategoriesStart())}>Retry</button></div>;
 return null;
}
