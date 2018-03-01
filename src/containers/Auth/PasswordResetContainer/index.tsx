import * as React from 'react'
import { connect } from 'react-redux'

import { passwordResetUser } from 'data/user/actions'
import { showAlert } from 'data/ui/actions'

import PasswordReset from 'components/Auth/PasswordReset'
import TopNav from 'components/TopNav'

interface IOwnProps {
    token: string
}

interface IStateProps {
}

interface IDispatchProps {
    passwordResetUser: (data: {
        token: string,
        email: string,
        password: string,
        passwordConfirmation: string
    }) => void
    showAlert: () => void
}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

class PasswordResetContainer extends React.Component<IProps> {

    email: HTMLInputElement
    password: HTMLInputElement
    passwordConfirmation: HTMLInputElement

    handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()

        this.props.passwordResetUser({
            token: this.props.token,
            email: this.email.value,
            password: this.password.value,
            passwordConfirmation: this.passwordConfirmation.value
        })
        // .then((resp) => {
        //     if (resp.error) {
        //         this.password.value = ''
        //         this.passwordConfirmation.value = ''
        //         this.props.showAlert('error', resp.error.errors)
        //     } else {
        //         this.props.showAlert('success', 'Your password has been reset, login again.')
        //     }
        // })
    }

    setRef = (ref: HTMLInputElement, name: 'name' | 'email' | 'password' | 'passwordConfirmation') => {
        this[name] = ref
    }

    render() {
        return (
            <>
                <TopNav
                    title="Password Reset"
                />
                <PasswordReset
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
    passwordResetUser,
    showAlert,
}

export default connect(null, mapDispatchToProps)(PasswordResetContainer)
