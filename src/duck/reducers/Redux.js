export const types = {
    SET_SHOPPING_ITEM_COUNT: "SET_SHOPPING_ITEM_COUNT",
    SET_SHOPPING_ITEMS: "SET_SHOPPING_ITEMS",
    SET_ISVISIBLE_BASKET: "SET_ISVISIBLE_BASKET",
    SET_TOTAL_PRICE: "SET_TOTAL_PRICE",
    GLOBAL: "GLOBAL",
}

const DEFAULT_STATE = {
    shoppingItemCount: JSON.parse(localStorage.getItem('shoppingItemCount')),
    isVisibleBasket: false,
    shoppingItems: JSON.parse(localStorage.getItem('shoppingItems')),
    global: {},
    totalPrice: JSON.parse(localStorage.getItem('totalPrice'))
}

export const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.SET_SHOPPING_ITEM_COUNT:
            return {
                ...state,
                shoppingItemCount: action.payload.shoppingItemCount
            };
        case types.SET_SHOPPING_ITEMS:
            return {
                ...state,
                shoppingItems: action.payload.shoppingItems
            };
        case types.SET_ISVISIBLE_BASKET:
            return {
                ...state,
                isVisibleBasket: action.payload.isVisibleBasket
            };
        case types.SET_TOTAL_PRICE:
            return {
                ...state,
                totalPrice: action.payload.totalPrice
            };
        case types.GLOBAL:
            return {
                ...state,
                global: action.payload.global
            };
        default:
            return state;
    }
}
export const actions = ({
    setShoppingItemCount: (shoppingItemCount) => {
        return dispatch => dispatch({ type: types.SET_SHOPPING_ITEM_COUNT, payload: { shoppingItemCount } });
    },
    setShoppingItem: (shoppingItems) => {
        return dispatch => dispatch({ type: types.SET_SHOPPING_ITEMS, payload: { shoppingItems } });
    },
    setIsVisibleBasket: (isVisibleBasket) => {
        return dispatch => dispatch({ type: types.SET_ISVISIBLE_BASKET, payload: { isVisibleBasket } });
    },
    setTotalPrice: (totalPrice) => {
        return dispatch => dispatch({ type: types.SET_TOTAL_PRICE, payload: { totalPrice } });
    },
    setGlobal: (global) => {
        return dispatch => dispatch({ type: types.GLOBAL, payload: { global } });
    },
})