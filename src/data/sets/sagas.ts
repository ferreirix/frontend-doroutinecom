import { takeLatest } from 'redux-saga/effects'

import { ApiAction } from 'data/types'

import apiSaga from 'utils/apiSaga'
import constants from 'data/sets/constants'
import * as actions from 'data/sets/actions'

function* getSetsSaga(action: ApiAction) {
    yield* apiSaga(action, actions.getSetsSuccess, actions.getSetsFailure)
}

function* postSetSaga(action: ApiAction) {
    yield* apiSaga(action, actions.postSetSuccess, actions.postSetFailure)
}

function* putSetSaga(action: ApiAction) {
    yield* apiSaga(action, actions.putSetSuccess, actions.putSetFailure)
}

function* deleteSetSaga(action: ApiAction) {
    yield* apiSaga(action, actions.deleteSetSuccess, actions.deleteSetFailure)
}

export default [
    takeLatest(constants.SETS_GET_REQUEST, getSetsSaga),
    takeLatest(constants.SETS_PUT_REQUEST, putSetSaga),
    takeLatest(constants.SETS_POST_REQUEST, postSetSaga),
    takeLatest(constants.SETS_DELETE_REQUEST, deleteSetSaga)
]
