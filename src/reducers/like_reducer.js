import types from '../actions/types';

const DEFAULT_STATE = {
    all: [],
    single: {},
    error: null
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        default: 
            return state;
    }
}