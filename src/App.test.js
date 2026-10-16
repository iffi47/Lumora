import {render,screen,fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {MemoryRouter} from 'react-router-dom';
import {rootReducers} from './store/root-reducer';
import App from './App';
import {SHOP_DATA} from './shop-data';
import {fetchCategoriesSuccess} from './store/categories/categories.action';
function setup(path='/'){
 const store=createStore(rootReducers);
 store.dispatch(fetchCategoriesSuccess(SHOP_DATA));
 render(<Provider store={store}><MemoryRouter initialEntries={[path]}><App/></MemoryRouter></Provider>);
 return store;
}
beforeEach(()=>{localStorage.clear();window.scrollTo=jest.fn();});
test('finds products through search and adds them to the bag',()=>{
 const store=setup();
 fireEvent.change(screen.getByRole('textbox',{name:'Search products'}),{target:{value:'headphones'}});
 fireEvent.submit(screen.getByRole('textbox',{name:'Search products'}).closest('form'));
 expect(screen.getByRole('heading',{name:'Results for “headphones”'})).toBeInTheDocument();
 expect(screen.getAllByRole('article')).toHaveLength(1);
 fireEvent.click(screen.getByRole('button',{name:'Add to bag'}));
 expect(store.getState().cart.cartItems[0].quantity).toBe(1);
 fireEvent.click(screen.getByRole('button',{name:'Shopping bag, 1 items'}));
 fireEvent.click(screen.getByRole('link',{name:/View your bag/}));
 fireEvent.click(screen.getByRole('button',{name:'Increase Everyday Wireless Headphones quantity'}));
 expect(store.getState().cart.cartItems[0].quantity).toBe(2);
 fireEvent.click(screen.getByRole('button',{name:'Remove Everyday Wireless Headphones'}));
 expect(screen.getByRole('heading',{name:'Room for something lovely.'})).toBeInTheDocument();
});
test('saves favorites and removes them from the saved list',()=>{
 setup('/shop');
 fireEvent.click(screen.getByRole('button',{name:'Save Classic Leather Watch to favorites'}));
 fireEvent.click(screen.getAllByRole('link',{name:'Your favorites'})[0]);
 expect(screen.getAllByRole('article')).toHaveLength(1);
 expect(screen.getByRole('heading',{name:'Classic Leather Watch'})).toBeInTheDocument();
 fireEvent.click(screen.getByRole('button',{name:'Remove Classic Leather Watch from favorites'}));
 expect(screen.getByRole('heading',{name:'Make room for your favorites'})).toBeInTheDocument();
});
test('filters a category and sorts its products',()=>{
 setup('/shop/home-decor');
 expect(screen.getAllByRole('article')).toHaveLength(3);
 fireEvent.change(screen.getByRole('combobox',{name:'Sort by'}),{target:{value:'low'}});
 expect(screen.getAllByRole('article')[0]).toHaveTextContent('Botanical Living Planter');
});
test('sale only includes discounted products',()=>{
 setup('/shop?deals=true');
 expect(screen.getAllByRole('article')).toHaveLength(3);
 expect(screen.queryByRole('heading',{name:'Classic Leather Watch'})).not.toBeInTheDocument();
});
