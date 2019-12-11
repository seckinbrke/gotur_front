export const types = {
    SET_SHOPPING_ITEM_COUNT: "SET_SHOPPING_ITEM_COUNT",
}

const DEFAULT_STATE = {
    shoppingItemCount: 0,
}

export const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.SET_SHOPPING_ITEM_COUNT:
            return {
                ...state,
                shoppingItemCount: action.payload.shoppingItemCount
            };
        default:
            return state;
    }
}
export const actions = ({
    setShoppingItemCount: (shoppingItemCount) => {
        return dispatch => dispatch({ type: types.SET_SHOPPING_ITEM_COUNT, payload: { shoppingItemCount } });
    },
})