import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createExercise, updateExercise } from 'data/exercises/actions'
import { exercisesSelector } from 'data/exercises/selectors'
import { liftsSelector } from 'data/lifts/selectors'

import SetsContainer from 'containers/HomeContainer/SetsContainer'
import Button from 'components/Button'
import Select from 'components/Select'

import './style.css'

import withForm from 'components/Form'

const exerciseForm = ({errors, values, lifts}) => (
    <Select
        name="liftId"
        options={lifts}
        value={values.liftId}
        errors={errors.liftId}
        defaultOptionMessage="Select a lift..."
        noOptionsMessage="No lift created, create one on the top of this page."
    />
)

const ExerciseForm = withForm(exerciseForm)

class ExercisesContainer extends Component {

    static propTypes = {
        workoutId: PropTypes.number.isRequired,

        exercises: PropTypes.array.isRequired,
        lifts: PropTypes.array.isRequired,

        createExercise: PropTypes.func.isRequired,
        updateExercise: PropTypes.func.isRequired,
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {this.props.exercises.length > 0 && this.props.exercises.map((exercise, i) => (
                    <div key={i} className="block-workout-lifts">
                        <div className="block-workout-lift-name">
                            <ExerciseForm
                                update={this.props.updateExercise}
                                entity={exercise}
                                lifts={this.props.lifts}
                            />
                        </div>
                        <SetsContainer exerciseId={exercise.id} />
                    </div>
                ))}
                <div className="exercise-button">
                    <Button onClick={() => this.props.createExercise(this.props.workoutId)}>New exercise</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    exercises: exercisesSelector(props.workoutId)(state),
    lifts: liftsSelector(state)
})

const mapDispatchToProps = {
    createExercise,
    updateExercise
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesContainer)
