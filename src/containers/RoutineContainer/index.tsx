import * as React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import history from 'utils/history'
import { now } from 'utils/date'
import { updateRoutine, removeRoutine } from 'data/routines/actions'
import { createWorkout } from 'data/workouts/actions'
import { routineSelector } from 'data/routines/selectors'
import { STATUS_LOADED, STATUS_DELETING } from 'data/utils'
import { fetchWorkoutsData } from 'data/globals'

import { RootState } from 'data/types'
import { FormatedRoutine } from 'data/routines/types'

import ExercisesContainer from 'containers/ExercisesContainer'

import Routine from 'components/Routine'
import TopNav from 'components/TopNav'

interface OwnProps {
    routineId: number
}

interface StateProps {
    routine: FormatedRoutine
    isStatusLoaded: boolean
    isDeleting: boolean
}

interface DispatchProps {
    updateRoutine: () => void
    removeRoutine: (id: number) => void
    createWorkout: (data: {routineId: number, startedAt: string}) => void
    fetchWorkoutsData: () => void
}

interface Props extends OwnProps, StateProps, DispatchProps {}

class RoutineContainer extends React.Component<Props> {

    componentDidMount() {
        if (this.props.isStatusLoaded && !this.props.routine) {
            history.replace('/routines')
        }
    }

    handleRemove = () => {
        if (window.confirm('Are you sure you want to delete this routine?')) {
            this.props.removeRoutine(this.props.routine.id)
                // .then(() => {
                //     history.push('/routines')
                // })
        }
    }

    handleCreateWorkout = () => {
        this.props.createWorkout({
            routineId: this.props.routine.id,
            startedAt: now()
        })
        // .then((resp) => {
        //     this.props.fetchWorkoutsData()
        //         .then(() => {
        //             history.push(`/workouts/${resp.payload.id}`)
        //         })
        // })
    }

    render() {
        return this.props.routine ? (
            <>
                {this.props.routine.name &&
                    <Helmet><title>{this.props.routine.name}</title></Helmet>
                }
                <TopNav
                    title="Routine"
                    left={{
                        to: '/routines'
                    }}
                    rightLabel="Start Workout"
                    right={{
                        onClick: this.handleCreateWorkout,
                        className: 'routine-button-create-workout'
                    }}
                />
                <Routine
                    routine={this.props.routine}
                    update={this.props.updateRoutine}
                >
                    <ExercisesContainer
                        routineId={this.props.routine.id}
                    />
                </Routine>
                {!this.props.routine.program &&
                    <TopNav
                        rightLabel="Delete Routine"
                        right={{
                            onClick: this.handleRemove,
                            danger: true,
                            disabled: this.props.isDeleting,
                            className: 'routine-button-remove'
                        }}
                    />
                }
            </>
        ) : null
    }
}

const mapStateToProps = (state: RootState, props: OwnProps): StateProps => ({
    routine: routineSelector(props.routineId)(state),
    isStatusLoaded: state.routines.fetchStatus === STATUS_LOADED,
    isDeleting: state.routines.entitiesStatus[props.routineId] === STATUS_DELETING
})

const mapDispatchToProps: DispatchProps = {
    updateRoutine,
    removeRoutine,
    createWorkout,
    fetchWorkoutsData
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineContainer)