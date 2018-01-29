import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createSet, updateSet, removeSet } from 'data/sets/actions'
import { setsSelector } from 'data/sets/selectors'
import { routineByIdSelector } from 'data/routines/selectors'
import { STATUS_DELETING } from 'data/utils'

import SetsEdit from 'components/SetsEdit/SetsEdit'
import SetEdit from 'components/SetsEdit/SetEdit'

class SetsEditContainer extends Component {

    static propTypes = {
        routineId: PropTypes.number.isRequired,
        exerciseId: PropTypes.number.isRequired,

        sets: PropTypes.array.isRequired,
        routine: PropTypes.object.isRequired,
        entitiesStatus: PropTypes.object.isRequired,

        createSet: PropTypes.func.isRequired,
        updateSet: PropTypes.func.isRequired,
        removeSet: PropTypes.func.isRequired,
    }

    render() {
        return (
            <SetsEdit
                create={this.props.createSet}
                exerciseId={this.props.exerciseId}
            >
                {this.props.sets.map((set, i) => (
                    <SetEdit
                        key={set.id}
                        i={i}
                        set={set}
                        routine={this.props.routine}
                        update={this.props.updateSet}
                        remove={this.props.removeSet}
                        isDeleting={this.props.entitiesStatus[set.id] === STATUS_DELETING}
                    />
                ))}
            </SetsEdit>
        )
    }
}

const mapStateToProps = (state, props) => ({
    sets: setsSelector(props.exerciseId, props.routineId)(state),
    routine: routineByIdSelector(props.routineId)(state),
    entitiesStatus: state.sets.entitiesStatus
})

const mapDispatchToProps = {
    createSet,
    updateSet,
    removeSet
}


export default connect(mapStateToProps, mapDispatchToProps)(SetsEditContainer)
