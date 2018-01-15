import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import history from 'utils/history'
import { createRoutine, updateRoutine, removeRoutine } from 'data/routines/actions'
import { routineBySlugSelector } from 'data/routines/selectors'
import { STATUS_LOADED } from 'data/utils'

import LiftsContainer from 'containers/LiftsContainer'
import WorkoutsBlocksContainer from 'containers/WorkoutsBlocksContainer'
// import GraphContainer from 'containers/GraphContainer'

import RoutineSingle from 'components/Routines/RoutineSingle'

class RoutineContainer extends Component {

    static propTypes = {
        routineSlug: PropTypes.string.isRequired,

        routine: PropTypes.object,
        isStatusLoaded: PropTypes.bool.isRequired,

        createRoutine: PropTypes.func.isRequired,
        updateRoutine: PropTypes.func.isRequired,
        removeRoutine: PropTypes.func.isRequired,
    }

    componentDidMount() {
        if (this.props.isStatusLoaded && !this.props.routine) {
            history.push('/')
        }
    }

    handleRemove = () => {
        if (window.confirm('Are you sure you want to delete this routine?')) {
            this.props.removeRoutine(this.props.routine.id)
                .then(() => {
                    history.push('/')
                })
        }
    }

    render() {
        return this.props.routine ?
            <Fragment>
                <RoutineSingle
                    routine={this.props.routine}
                    update={this.props.updateRoutine}
                    remove={this.handleRemove}
                >
                    <LiftsContainer routineId={this.props.routine.id} routine={this.props.routine} />
                    <WorkoutsBlocksContainer routineId={this.props.routine.id} />
                </RoutineSingle>
                {/*<GraphContainer routineId={this.props.routine.id} />*/}
            </Fragment>
        : null
    }
}

const mapStateToProps = (state, props) => ({
    routine: routineBySlugSelector(props.routineSlug)(state),
    isStatusLoaded: state.routines.fetchStatus === STATUS_LOADED,
})

const mapDispatchToProps = {
    createRoutine,
    updateRoutine,
    removeRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineContainer)
