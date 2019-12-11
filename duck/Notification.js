export const types = {
    SET_NOTIFICATION_COUNT: "SET_NOTIFICATION_COUNT",
    SCROLL_UP: "SCROLL_UP",
    SET_PROFILE_PHOTO: "SET_PROFILE_PHOTO",
}

const DEFAULT_STATE = {
    notificationCount: 0,
    scrollUp: false,
    profilePhoto: null,
}

export const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.SET_NOTIFICATION_COUNT:
            return {
                ...state,
                notificationCount: action.payload.notificationCount
            };
        case types.SCROLL_UP:
            return {
                ...state,
                scrollUp: action.payload.scrollUp
            };
        case types.SET_PROFILE_PHOTO:
            return {
                ...state,
                profilePhoto: action.payload.profilePhoto
            };
        default:
            return state;
    }
}
export const actions = ({
    setNotificationCount: (notificationCount) => {
        return dispatch => dispatch({ type: types.SET_NOTIFICATION_COUNT, payload: { notificationCount } });
    },
    setProfilePhoto: (profilePhoto) => {
        return dispatch => dispatch({ type: types.SET_PROFILE_PHOTO, payload: { profilePhoto } });
    },
    setScrollUp: (scrollUp) => {
        return dispatch => dispatch({ type: types.SCROLL_UP, payload: { scrollUp } });
    }
})