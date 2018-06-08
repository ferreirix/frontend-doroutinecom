import { IApiFailure } from 'data/types'
import { ILift, ILiftRequestData } from 'data/lifts/types'

import constants from 'data/lifts/constants'

// get
export const getLifts = () => ({
    type: constants.LIFTS_GET_REQUEST as constants.LIFTS_GET_REQUEST,
    method: 'get',
    endpoint: 'lifts'
})

export const getLiftsSuccess = (payload: ILift[]) => ({
    type: constants.LIFTS_GET_SUCCESS as constants.LIFTS_GET_SUCCESS,
    payload
})

export const getLiftsFailure = (payload: IApiFailure) => ({
    type: constants.LIFTS_GET_FAILURE as constants.LIFTS_GET_FAILURE,
    error: payload
})

// post
export const postLift = (data?: ILiftRequestData) => ({
    type: constants.LIFTS_POST_REQUEST as constants.LIFTS_POST_REQUEST,
    method: 'post',
    endpoint: 'lifts',
    data
})

export const postLiftSuccess = (payload: ILift) => ({
    type: constants.LIFTS_POST_SUCCESS as constants.LIFTS_POST_SUCCESS,
    payload
})

export const postLiftFailure = (payload: IApiFailure) => ({
    type: constants.LIFTS_POST_FAILURE as constants.LIFTS_POST_FAILURE,
    error: payload
})

// put
export const putLift = (
    id: number,
    data: ILiftRequestData,
    resolve?: () => void,
    reject?: () => void
) => ({
    type: constants.LIFTS_PUT_REQUEST as constants.LIFTS_PUT_REQUEST,
    method: 'put',
    endpoint: `lifts/${id}`,
    id,
    data,
    resolve,
    reject
})

export const putLiftSuccess = (payload: ILift) => ({
    type: constants.LIFTS_PUT_SUCCESS as constants.LIFTS_PUT_SUCCESS,
    payload
})

export const putLiftFailure = (payload: IApiFailure) => ({
    type: constants.LIFTS_PUT_FAILURE as constants.LIFTS_PUT_FAILURE,
    error: payload
})

// delete
export const deleteLift = (id: number) => ({
    type: constants.LIFTS_DELETE_REQUEST as constants.LIFTS_DELETE_REQUEST,
    method: 'delete',
    endpoint: `lifts/${id}`,
    id
})

export const deleteLiftSuccess = (payload: ILift) => ({
    type: constants.LIFTS_DELETE_SUCCESS as constants.LIFTS_DELETE_SUCCESS,
    payload
})

export const deleteLiftFailure = (payload: IApiFailure) => ({
    type: constants.LIFTS_DELETE_FAILURE as constants.LIFTS_DELETE_FAILURE,
    error: payload
})
