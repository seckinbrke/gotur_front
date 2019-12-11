export const types = {
    SET_SHOPPING_ITEM_COUNT: "SET_SHOPPING_ITEM_COUNT",
    SET_SHOPPING_ITEMS: "SET_SHOPPING_ITEMS"
}

const DEFAULT_STATE = {
    shoppingItemCount: 0,
    shoppingItems: []
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
})