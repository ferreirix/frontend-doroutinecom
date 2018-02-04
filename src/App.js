import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchAppData } from 'data/globals'

import Routes from 'Routes'
import ErrorApp from 'components/ErrorApp'
import Nav from 'components/Nav'
import NavNoAuth from 'components/NavNoAuth'
import Loading from 'components/Loading'
import Head from 'components/Head'
import Offline from 'components/Offline'

class App extends Component {

    static propTypes = {
        isAuth: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isServerError: PropTypes.bool.isRequired,
        isOffline: PropTypes.bool.isRequired,

        fetchAppData: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        if (props.isAuth) {
            props.fetchAppData()
        }

        this.isTouchDevice = 'ontouchstart' in document.documentElement
    }

    state = {
        isErrorApp: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isServerError && nextProps.isServerError !== this.props.isServerError) {
            this.setState({ isErrorApp: true })
        }
    }

    componentDidCatch(error, info) {
        this.setState({ isErrorApp: true })
    }

    render() {
        if (this.props.isOffline) return (<Offline />)

        return (
            <Fragment>
                <Head />
                {this.props.isAuth ?
                    <Nav
                        isTouchDevice={this.isTouchDevice}
                    /> :
                    <NavNoAuth />
                }
                {this.props.isLoading ?
                    <Loading /> :
                    this.state.isErrorApp ?
                        <ErrorApp /> :
                        <Fragment>
                            <Routes isAuth={this.props.isAuth} />
                        </Fragment>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state, props) => ({
    isAuth: state.user.isAuth,
    isLoading: state.ui.isLoading,
    isServerError: state.ui.isServerError,
    isOffline: state.ui.isOffline
})

const mapDispatchToProps = {
    fetchAppData
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
