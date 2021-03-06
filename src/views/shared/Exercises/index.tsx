import * as React from 'react'
import { connect } from 'react-redux'

import { RootState } from 'data/types'
import {
    postExercise,
    putExercise,
    deleteExercise
} from 'data/exercises/actions'
import {
    exercisesRoutineSelector,
    exercisesWorkoutSelector
} from 'data/exercises/selectors'
import { liftsSelector } from 'data/lifts/selectors'
import { statusConstants } from 'data/constants'
import NoData from 'components/NoData'
import NavBar from 'components/NavBar'
import AutoSaveForm from 'components/AutoSaveForm'
import Button from 'components/Button'
import Select from 'components/AutoSaveForm/Select'
import Sets from 'views/shared/Sets'
import {
    Exercise,
    ExerciseTransition,
    ExercisesButtonCreate,
    ExerciseButtonDelete,
    ExerciseLift
} from './style'

interface OwnProps {
    id: number
    entity: 'routine' | 'workout'
}

type Props = OwnProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps

interface State {
    isRemoveButtonsVisible: boolean
}

class Exercises extends React.Component<Props, State> {
    public readonly state = {
        isRemoveButtonsVisible: this.props.entity === 'routine' ? true : false
    }

    private handleToggleRemoveButtons = () => {
        this.setState((prevState) => ({
            isRemoveButtonsVisible: !prevState.isRemoveButtonsVisible
        }))
    }

    private handleCreate = () => {
        let key: string

        if (this.props.entity === 'routine') {
            key = 'routineId'
        } else {
            key = 'workoutId'
        }

        this.props.postExercise({
            [key]: this.props.id
        })
    }

    public render() {
        return (
            <>
                <NavBar title="Exercises" />
                <div key={this.props.id}>
                    <ExerciseTransition e2e="exercise">
                        {this.props.exercises.length > 0 ? (
                            this.props.exercises.map((exercise, i) => (
                                <Exercise key={exercise.id}>
                                    <AutoSaveForm
                                        update={this.props.putExercise}
                                        initialValues={exercise}
                                        render={({ values }) => (
                                            <ExerciseLift>
                                                <Select
                                                    id="liftId"
                                                    name="liftId"
                                                    options={this.props.lifts}
                                                    defaultOptionMessage="Select a lift"
                                                    noOptionsMessage="No lift created."
                                                    data-e2e="exercise-lift-select"
                                                />
                                                {values.liftId ? (
                                                    <Button
                                                        to={`/lifts/${
                                                            values.liftId
                                                        }`}
                                                    >
                                                        Info
                                                    </Button>
                                                ) : (
                                                    <Button to="/lifts">
                                                        Create
                                                    </Button>
                                                )}
                                            </ExerciseLift>
                                        )}
                                    />
                                    <Sets
                                        exerciseId={exercise.id}
                                        liftId={exercise.liftId}
                                        isWorkout={
                                            this.props.entity === 'workout'
                                        }
                                        isRemoveButtonsVisible={
                                            this.state.isRemoveButtonsVisible
                                        }
                                        toggleRemoveButtons={
                                            this.handleToggleRemoveButtons
                                        }
                                    />
                                    {this.state.isRemoveButtonsVisible && (
                                        <ExerciseButtonDelete>
                                            <Button
                                                icon="remove"
                                                danger={true}
                                                onClick={() =>
                                                    this.props.deleteExercise(
                                                        exercise.id
                                                    )
                                                }
                                                disabled={
                                                    this.props.entitiesStatus[
                                                        exercise.id
                                                    ] ===
                                                    statusConstants.STATUS_DELETING
                                                }
                                                title="Delete Exercise"
                                            />
                                        </ExerciseButtonDelete>
                                    )}
                                </Exercise>
                            ))
                        ) : (
                            <NoData text="No exercises created." />
                        )}
                    </ExerciseTransition>
                </div>
                <ExercisesButtonCreate>
                    <Button
                        data-e2e="exercises-button-create"
                        onClick={this.handleCreate}
                    >
                        Add Exercise
                    </Button>
                </ExercisesButtonCreate>
            </>
        )
    }
}

const mapStateToProps = (state: RootState, props: OwnProps) => ({
    exercises:
        props.entity === 'routine'
            ? exercisesRoutineSelector(props.id)(state)
            : props.entity === 'workout'
                ? exercisesWorkoutSelector(props.id)(state)
                : [],
    lifts: liftsSelector(state),
    entitiesStatus: state.exercises.entitiesStatus
})

const mapDispatchToProps = {
    postExercise,
    putExercise,
    deleteExercise
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Exercises)
