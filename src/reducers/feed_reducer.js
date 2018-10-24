import types from '../actions/types';

const DEFAULT_STATE = {
    all: [],
    single: {},
    user: [],
    error: null
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_USER_POSTS:
            return {...state, user: action.payload.data};
        case types.DELETE_POST:
            return {...state};
        case types.LIST_ERROR:
            return {...state, error: action.error}
        case types.GET_NEWSFEED:
            return {...state, all: action.payload.data};
        default:
            return state;
    }
}