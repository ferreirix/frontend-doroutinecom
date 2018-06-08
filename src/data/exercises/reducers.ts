import { IExercisesState, IExercisesAction } from 'data/exercises/types'

import constants from 'data/exercises/constants'
import { statusConstants } from 'data/constants'
import * as utils from 'data/utils'

const initialState: Readonly<IExercisesState> = {
    fetchStatus: statusConstants.STATUS_NONE,
    entitiesStatus: {},
    entities: [],
    error: null
}

const exercises = (
    state = initialState,
    action: IExercisesAction
): IExercisesState => {
    switch (action.type) {
        case constants.EXERCISES_GET_REQUEST:
            return utils.request(state)

        case constants.EXERCISES_GET_SUCCESS:
            return utils.getSuccess(state, action.payload)

        case constants.EXERCISES_GET_FAILURE:
            return utils.failure(state, action.error)

        case constants.EXERCISES_POST_REQUEST:
            return utils.request(state)

        case constants.EXERCISES_POST_SUCCESS:
            return utils.postSuccess(state, action.payload)

        case constants.EXERCISES_POST_FAILURE:
            return utils.failure(state, action.error)

        case constants.EXERCISES_PUT_REQUEST:
            return utils.putRequest(state, action.id)

        case constants.EXERCISES_PUT_SUCCESS:
            return utils.putSuccess(state, action.payload)

        case constants.EXERCISES_PUT_FAILURE:
            return utils.failure(state, action.error)

        case constants.EXERCISES_DELETE_REQUEST:
            return utils.deleteRequest(state, action.id)

        case constants.EXERCISES_DELETE_SUCCESS:
            return utils.deleteSuccess(state, action.payload.id)

        case constants.EXERCISES_DELETE_FAILURE:
            return utils.failure(state, action.error)

        default:
            return state
    }
}

export default exercises
