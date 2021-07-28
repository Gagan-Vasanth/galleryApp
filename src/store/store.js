import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import galleryReducer from '../reducers/galleryReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    auth: authReducer,
    gallery: galleryReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));