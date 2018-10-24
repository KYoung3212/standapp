import types from '../actions/types'

const DEFAULT_STATE = {
    auth: false,
    error: '', 
    all: '', 
    avatar: '',
    userInfo: '', 
    id: ''
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.ADD_AVATAR:
            return {...state, avatar: action.payload}
        case types.ADD_NEW_USER:
            return {...state, auth: true, userInfo: action.payload}
        case types.GET_USER_ID:
            return {...state, id: action.payload}
        case types.RETRIEVE_AVATARS:
            return {...state, all: action.payload.data}
        case types.AUTH_ERROR:
            return {...state,  auth: false, error: action.error}
        case types.SIGN_UP:
        case types.LOG_IN:
            return {...state, auth: true}
        case types.LOG_OUT:
          return {...state, auth: false, error: '' }
        default:
            return state
    }
}