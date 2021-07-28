const initialState = {
    gallery_info: []
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'GALLERY_INFO_REQUEST': return {
            ...state,
        }
        case 'GALLERY_INFO_SUCCESS': return {
            gallery_info: action.payload
        }
        case 'GALLERY_INFO_FALIURE': return {
            ...state,
            error: action.payload.error
        }
        default: return state;
    }
}

export default reducer;