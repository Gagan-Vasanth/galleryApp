import { authConstants } from "../actions/authConstants";

const initialState = {
    name: '',
    uid: '',
    authenticating: false,
    authenticated: false,
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case `${authConstants.USER_LOGIN}_REQUEST`: return {
            ...state,
            authenticating: true
        }
        case `${authConstants.USER_LOGIN}_SUCCESS`: return {
            ...state,
            name: action.payload.name,
            uid: action.payload.uid,
            authenticating: false,
            authenticated: true
        }   
        case `${authConstants.USER_LOGIN}_FAILURE`: return {
            ...state,
            authenticating: false,
            authenticated: false,
            error: action.payload.error
        }   
        case `${authConstants.USER_LOGOUT}_REQUEST`: return {
            ...state,
            authenticating: true
        }
        case `${authConstants.USER_LOGOUT}_SUCCESS`: return initialState;
        default: return state;
    }
};

export default reducer;