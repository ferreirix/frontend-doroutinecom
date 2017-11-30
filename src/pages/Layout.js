import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { mount } from 'data/actions'
import { fetchUser } from 'data/user/actions'
import { fetchRoutines } from 'data/routines/actions'
import { fetchWorkouts } from 'data/workouts/actions'
import { fetchExercises } from 'data/exercises/actions'
import { fetchLifts } from 'data/lifts/actions'
import { fetchSets } from 'data/sets/actions'
import { logoutUser } from 'data/user/actions'
import { displayLoading } from 'data/ui/actions'
import { removeLoading } from 'data/ui/actions'

import ErrorApp from 'components/ErrorApp'
import Nav from 'components/Nav'
import Loading from 'components/Loading'

import 'scss/global.css'

class Layout extends Component {

    static propTypes = {
        header: PropTypes.node.isRequired,
        loader: PropTypes.func.isRequired,

        isFetchRequired: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,

        mount: PropTypes.func.isRequired,
        fetchUser: PropTypes.func.isRequired,
        fetchRoutines: PropTypes.func.isRequired,
        fetchWorkouts: PropTypes.func.isRequired,
        fetchExercises: PropTypes.func.isRequired,
        fetchLifts: PropTypes.func.isRequired,
        fetchSets: PropTypes.func.isRequired,
        logoutUser: PropTypes.func.isRequired,
        displayLoading: PropTypes.func.isRequired,
        removeLoading: PropTypes.func.isRequired
    }

    state = {
        hasError: false
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
    }

    componentWillMount() {
        this.props.mount()

        if (this.props.isFetchRequired && this.props.isAuthenticated) {
            this.fetchData()
        }

        if (!this.props.isAuthenticated) {
            this.props.removeLoading()
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('PROPS')
        if (this.props.isFetchRequired &&
            nextProps.isAuthenticated &&
            (nextProps.isAuthenticated !== this.props.isAuthenticated)) {
            this.fetchData()
        }
    }

    fetchData = () => {
        this.props.displayLoading()

        axios.all([
            this.props.fetchUser(),
            this.props.fetchRoutines(),
            this.props.fetchWorkouts(),
            this.props.fetchExercises(),
            this.props.fetchLifts(),
            this.props.fetchSets()
        ]).then(axios.spread(() => {
            this.props.removeLoading()
        }))
    }

    handleLogoutUser = (event) => {
        event.preventDefault()

        this.props.logoutUser()
            .then(() => {
                this.props.history.push('/login')
            })
    }

    render() {
        const Container = Loadable({
            loader: this.props.loader,
            loading: Loading,
        })

        return (
            <Fragment>
                <Helmet>
                    {this.props.header}
                </Helmet>
                <Nav
                    isAuthenticated={this.props.isAuthenticated}
                    logoutUser={this.handleLogoutUser}
                />
                {this.props.isLoading ?
                    <Loading show /> :
                    <div className="container">
                        {this.state.hasError ?
                            <ErrorApp /> :
                            <Container />
                        }
                    </div>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state, props) => ({
    isFetchRequired: !!(state.user.fetchStatus !== 'LOADED'),
    isAuthenticated: !!(state.user.entity.apiToken || localStorage.getItem('token')),
    isLoading: state.ui.isLoading
})

const mapDispatchToProps = {
    mount,
    fetchUser,
    fetchRoutines,
    fetchWorkouts,
    fetchExercises,
    fetchLifts,
    fetchSets,
    logoutUser,
    displayLoading,
    removeLoading
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
