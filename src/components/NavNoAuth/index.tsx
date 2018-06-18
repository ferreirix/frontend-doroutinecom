import * as React from 'react'
import { NavLink } from 'react-router-dom'

import LogoFullSvg from 'media/logo-full.svg'

import './style.scss'

const NavNoAuth: React.SFC<{}> = () => (
    <nav className="nav-no-auth">
        <div className="nav-no-auth-logo">
            <LogoFullSvg />
        </div>
        <div className="nav-no-auth-links">
            <NavLink
                to="/login"
                className="nav-no-auth-link"
                activeClassName="nav-no-auth-link--active"
            >
                Log In
            </NavLink>
            <NavLink
                to="/register"
                className="nav-no-auth-link"
                activeClassName="nav-no-auth-link--active"
            >
                Sign In
            </NavLink>
        </div>
    </nav>
)

export default NavNoAuth
