import * as React from 'react'
import { connect } from 'react-redux'

import { login, authUser } from 'data/user/actions'
import { showAlert } from 'data/ui/actions'

import Login from 'components/Auth/Login'

// interface Response {
//     error: { errors: string[] }
//     payload: { token: string }
// }

interface OwnProps {
}

interface StateProps {
}

interface DispatchProps {
    login: (data: {email: string, password: string}) => {}
    authUser: (token: string) => void
    showAlert: (type: string, message: string[]) => void
}

interface Props extends OwnProps, StateProps, DispatchProps {}

class LoginContainer extends React.Component<Props> {

    email: HTMLInputElement
    password: HTMLInputElement

    handleSubmit = (event: React.FormEvent<HTMLInputElement>): void => {
        event.preventDefault()

        this.props.login({
            email: this.email.value,
            password: this.password.value
        })

        // }).then((resp) => {
        //            if (resp.error) {
        //                this.password.value = ''
        //                this.props.showAlert('error', resp.error.errors)
        //            } else {
        //                this.props.authUser(resp.payload.token)
        //            }
        //        })
    }

    setRef = (ref: HTMLInputElement, name: 'email' | 'password'): void => {
        this[name] = ref
    }

    render() {
        return (
            <>
                <Login
                    handleSubmit={this.handleSubmit}
                    setRef={this.setRef}
                />
            </>
        )
    }
}

// const mapStateToProps = () => ({
// })

const mapDispatchToProps: DispatchProps = {
    login: login.request,
    authUser,
    showAlert
}

export default connect(null, mapDispatchToProps)(LoginContainer)