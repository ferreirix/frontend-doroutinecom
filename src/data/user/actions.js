import { CALL_API } from 'middleware/api'
import * as types from 'data/user/types'
import { shouldFetch } from 'data/shared'
import debounceUpdate from 'utils/debounceUpdate'

const getUser = () => ({
    [CALL_API]: {
        types: [
            types.USER_FETCH_REQUEST,
            types.USER_FETCH_SUCCESS,
            types.USER_FETCH_FAILURE
        ],
        endpoint: 'user',
        method: 'get'
    }
})

export const fetchUser = (force = false) => (dispatch, getState) => {
    return (force || shouldFetch(types.NAME, getState())) && dispatch(getUser())
}


// const postUser = (data) => ({
//     [CALL_API]: {
//         types: [
//             types.USER_POST_REQUEST,
//             types.USER_POST_SUCCESS,
//             types.USER_POST_FAILURE
//         ],
//         endpoint: 'user',
//         method: 'post',
//         data
//     }
// })

// export const createUser = (data) => (dispatch, getState) => {
//     return dispatch(postUser(data))
// }

const putUser = (id, data) => ({
    [CALL_API]: {
        types: [
            types.USER_PUT_REQUEST,
            types.USER_PUT_SUCCESS,
            types.USER_PUT_FAILURE
        ],
        endpoint: 'user',
        method: 'put',
        data
    }
})

export const updateUser = (id, data) => (dispatch, getState) => {
    return debounceUpdate(() => dispatch(putUser(id, data)))
}

// const deleteUser = () => ({
//     [CALL_API]: {
//         types: [
//             types.USER_DELETE_REQUEST,
//             types.USER_DELETE_SUCCESS,
//             types.USER_DELETE_FAILURE
//         ],
//         endpoint: 'user',
//         method: 'delete'
//     }
// })

// export const removeUser = () => (dispatch, getState) => {
//     return dispatch(deleteUser())
// }

const loginUserAction = ({email, password}) => ({
    [CALL_API]: {
        types: [
            types.USER_LOGIN_REQUEST,
            types.USER_LOGIN_SUCCESS,
            types.USER_LOGIN_FAILURE
        ],
        endpoint: 'login',
        method: 'post',
        data: {
            email,
            password
        }
    }
})

export const loginUser = ({email, password}) => (dispatch, getState) => {
    return dispatch(loginUserAction({email, password}))
}

const registerUserAction = ({name, email, password, passwordConfirmation}) => ({
    [CALL_API]: {
        types: [
            types.USER_REGISTER_REQUEST,
            types.USER_REGISTER_SUCCESS,
            types.USER_REGISTER_FAILURE
        ],
        endpoint: 'register',
        method: 'post',
        data: {
            name,
            email,
            password,
            passwordConfirmation
        }
    }
})

export const registerUser = ({name, email, password, passwordConfirmation}) => (dispatch, getState) => {
    return dispatch(registerUserAction({name, email, password, passwordConfirmation}))
}

const authUserAction = () => ({
    type: types.USER_AUTH
})

export const authUser = (token, history, location) => (dispatch, getState) => {
    localStorage.setItem('token', token)

    dispatch(authUserAction())

    history.push(
        (location.state && location.state.from) ?
        location.state.from :
        '/'
    )
}

const logoutUserAction = () => ({
    type: types.USER_LOGOUT
})

export const logoutUser = (history) => (dispatch, getState) => {
    localStorage.removeItem('token')

    dispatch(logoutUserAction())

    history.push('/login')
}
