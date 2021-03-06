import * as store from 'store'

import { UserState, UserAction } from 'data/user/types'

import constants from 'data/user/constants'
import { statusConstants } from 'data/constants'

const initialState: Readonly<UserState> = {
    status: statusConstants.STATUS_NONE,
    isAuth: !!store.get('token'),
    entity: null,
    error: null
}

const user = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case constants.USER_GET_REQUEST:
            return {
                ...state,
                status: statusConstants.STATUS_LOADING
            }

        case constants.USER_GET_SUCCESS:
            return {
                ...state,
                status: statusConstants.STATUS_LOADED,
                entity: {
                    ...state.entity,
                    ...action.payload
                }
            }

        case constants.USER_GET_FAILURE:
            return {
                ...state,
                status: statusConstants.STATUS_FAILED,
                error: action.error
            }

        case constants.USER_PUT_REQUEST:
            return {
                ...state,
                status: statusConstants.STATUS_LOADING
            }

        case constants.USER_PUT_SUCCESS:
            return {
                ...state,
                status: statusConstants.STATUS_LOADED,
                entity: {
                    ...state.entity,
                    ...action.payload
                }
            }

        case constants.USER_PUT_FAILURE:
            return {
                ...state,
                status: statusConstants.STATUS_FAILED,
                error: action.error
            }

        case constants.USER_AUTH:
            return {
                ...state,
                isAuth: true
            }

        case constants.USER_UNAUTH:
            return {
                ...state,
                isAuth: false
            }

        default:
            return state
    }
}

export default user
