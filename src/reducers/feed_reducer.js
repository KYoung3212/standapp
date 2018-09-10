import types from '../actions/types';

const DEFAULT_STATE = {
    all: [],
    single: {},
    error: null
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_SINGLE_AUDIO:
            return {...state, single: action.payload.data}
        case types.LIST_ERROR:
            return {...state, single: {}, error: action.error}
        case types.GET_NEWSFEED:
            return {...state, single: {}, all: action.payload.data};
        default:
            return state;
    }
}