import { combineReducers } from 'redux';
import likeReducer from './like_reducer';
import feedReducer from './feed_reducer';
import userReducer from './user_reducer';
import { reducer as formReducer } from 'redux-form';
import commentReducer from './comment_reducer';

const rootReducer = combineReducers ({
    comment: commentReducer,
    like: likeReducer,
    feed: feedReducer,
    form: formReducer,
    user: userReducer
})

export default rootReducer;