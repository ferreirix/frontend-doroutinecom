import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { removeAlert } from 'data/ui/actions'

import Alert from 'components/Alert'

class Layout extends Component {

    static propTypes = {
        alert: PropTypes.shape({
            type: PropTypes.string.isRequired,
            message: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.array,
                PropTypes.object,
                PropTypes.bool
            ]).isRequired
        }),
        removeAlert: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)

        this.props.alert && this.props.removeAlert()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.alert && nextProps.alert === this.props.alert) {
            this.props.removeAlert()
        }
    }

    render() {
        return (
            <Fragment>
                <Helmet>
                    {this.props.header}
                </Helmet>
                <main className="container">
                    {this.props.alert &&
                        <Alert
                            type={this.props.alert.type}
                            message={this.props.alert.message}
                        />
                    }
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}


const mapStateToProps = (state, props) => ({
    alert: state.ui.alert
})

const mapDispatchToProps = {
    removeAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
