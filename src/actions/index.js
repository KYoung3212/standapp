import types from './types'
import axios from 'axios';

export const addNewUser = (username, password, email) => async dispatch => {
    try {
        const resp = await axios.post('/api/stand_app.php', {
            username: username,
            password: password,
            email: email
        }, {
            params: {
                action: 'add_new_user'
            }
        })
        dispatch({
            type: types.ADD_NEW_USER,
            payload: {
                username: username,
                password: password,
                email: email
            }
        })
        return {
            type: types.ADD_NEW_USER,
            payload: resp
        }
    } catch (err) {
        dispatch({
            type: types.LIST_ERROR,
            error: 'Failed to add user item'
        });
    }
}

export const addAvatar = (token, avatar) => async dispatch => {
    try {
        const resp = await axios.post('/api/stand_app.php', 
            {
                token: token,
                avatar: avatar
            },
            {
                params: {
                    action: 'add_avatar'
                }
            }
        )
        dispatch ({
            type: types.ADD_AVATAR, 
            payload: avatar
        });
        return {
            type: types.ADD_AVATAR,
            payload: resp
        }
    } catch (err) {
        dispatch({
            type: types.LIST_ERROR,
            error: 'No item found'
        });
    }
}

export function deletePost (audio_name) {
    const resp = axios.delete('/api/stand_app.php?action=delete_post', {
        data:{
            audio_name:audio_name
        }
    })
    return {
        type: types.DELETE_POST,
        payload: resp
    }
}

export function getNewsfeed () {
    const resp = axios.get('/api/stand_app.php', {
        params: {
            action: 'get_all'
        }
    })
    return {
        type: types.GET_NEWSFEED,
        payload: resp
    }
}

export function getUserPosts (user_id) {
    const resp = axios.post('/api/stand_app.php', {
        user_id: user_id
    }, {
        params: {
            action: 'get_user_posts'
        }
    })
    return {
        type: types.GET_USER_POSTS,
        payload: resp
    }
}

export function getSingleAudio (audio_id) {
    const resp = axios.post('/api/stand_app.php', {
        audio_id: audio_id
    }, {
        params: {
            action: 'get_single_audio'
        }
    })
    return {
        type: types.GET_SINGLE_AUDIO,
        payload: resp
    }
}

export const getUserID = (token) => async dispatch => {
    const resp = await axios.post('/api/stand_app.php', { 
        token: token
    }, {
        params: {
            action: types.GET_USER_ID
        }
    })
    dispatch({
        type: types.GET_USER_ID,
        payload: resp
    })
    return {
        type: types.GET_USER_ID,
        payload: resp
    }
}

export function likeAudio (audioID, userID) {
    const resp = axios.post('/api/stand_app.php', {
        audio_id: audioID,
        id: userID
    },{
        params: {
            action: types.LIKE_AUDIO
        }
    });
    return {
        type: types.LIKE_AUDIO,
        payload: resp
    }
}

export const logIn = (token) => async dispatch => {
    if (localStorage.getItem('token')) {
        localStorage.setItem('token', token);
        dispatch(
            { type: types.LOG_IN }
        );
    } else {
        dispatch({
            type: types.AUTH_ERROR,
            error: 'Please sign up with Google Plus'
        })
    }
}

export function retrieveAvatars () {
    try {
        const resp = axios.get('/api/stand_app.php', {
            params: {
                action: 'retrieve_avatars'
            }
        })
        return {
            type: types.RETRIEVE_AVATARS,
            payload: resp
        }
    } catch (err) {
        
    }
}

export function unlikeAudio (audioID, userID) {
    const resp = axios.post('/api/stand_app.php', {
        audio_id: audioID,
        id: userID
    },{
        params: {
            action: types.UNLIKE_AUDIO
        }
    });
    return {
        type: types.UNLIKE_AUDIO,
        payload: resp
    }
}