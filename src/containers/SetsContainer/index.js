import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateSet } from 'data/sets/actions'
import { setsSelector } from 'data/sets/selectors'
import { routineByIdSelector } from 'data/routines/selectors'

import Sets from 'components/Sets/Sets'
import Set from 'components/Sets/Set'

class SetsEditContainer extends Component {

    static propTypes = {
        routineId: PropTypes.number.isRequired,
        exerciseId: PropTypes.number.isRequired,

        sets: PropTypes.array.isRequired,
        routine: PropTypes.object.isRequired,

        updateSet: PropTypes.func.isRequired,
    }

    render() {
        return (
            <Sets
                create={this.props.createSet}
                exerciseId={this.props.exerciseId}
            >
                {this.props.sets.map((set, i) => (
                    <Set
                        key={set.id}
                        i={i}
                        set={set}
                        routine={this.props.routine}
                        update={this.props.updateSet}
                    />
                ))}
            </Sets>
        )
    }
}

const mapStateToProps = (state, props) => ({
    sets: setsSelector(props.exerciseId, props.routineId)(state),
    routine: routineByIdSelector(props.routineId)(state),
})

const mapDispatchToProps = {
    updateSet,
}


export default connect(mapStateToProps, mapDispatchToProps)(SetsEditContainer)
