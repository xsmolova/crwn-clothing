import {createSelector} from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart=>cart.cartItems
);

// hidden value
export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

// Total quantity of cart items
export const selectCartItemsCount = createSelector(
     [selectCartItems],
     cartItems => cartItems.reduce(
         (acc, cartItem) =>
         acc + cartItem.quantity, 0
     )
);