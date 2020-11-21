export const addItemToCart = (cartItems, cartItemToAdd) => {

    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if(existingCartItem){
        //returns a new array
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
            ?   {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
            );
    }

    return[...cartItems, {...cartItemToAdd, quantity: 1}]

}