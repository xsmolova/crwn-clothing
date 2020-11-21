import {combineReducers} from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

//create root reducer object
export default combineReducers({
    user: userReducer,
    cart: cartReducer
});