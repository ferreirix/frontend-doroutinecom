import * as React from 'react'
import { connect } from 'react-redux'

import { IPasswordForgottenData } from 'data/user/types'

import { passwordForgottenUser } from 'data/user/actions'
import { showAlert } from 'data/ui/actions'

import PasswordForgotten from 'components/Auth/PasswordForgotten'
import TopNav from 'components/TopNav'

interface IOwnProps {
}

interface IStateProps {
}

interface IDispatchProps {
    passwordForgottenUser: (data: IPasswordForgottenData) => void
    showAlert: () => void
}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

class PasswordForgottenContainer extends React.Component<IProps> {

    email: HTMLInputElement

    handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()

        this.props.passwordForgottenUser({
            email: this.email.value
        })
        // .then((resp) => {
        //     if (resp.error) {
        //         this.props.showAlert('error', resp.error.errors)
        //     } else {
        //         this.props.showAlert('success', 'A password reset email has been sent.')
        //     }
        // })
    }

    setRef = (ref: HTMLInputElement, name: 'email') => {
        this[name] = ref
    }

    render() {
        return (
            <>
                <TopNav
                    title="Password Forgotten"
                />
                <PasswordForgotten
                    handleSubmit={this.handleSubmit}
                    setRef={this.setRef}
                />
            </>
        )
    }
}

// const mapStateToProps = (state, props) => ({
// })

const mapDispatchToProps: IDispatchProps = {
    passwordForgottenUser,
    showAlert
}

export default connect(null, mapDispatchToProps)(PasswordForgottenContainer)
