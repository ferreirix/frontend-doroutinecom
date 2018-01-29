import React from 'react'

import Transition from 'components/Transition'
import Button from 'components/Button'
import Label from 'components/Form/Label'

import './style.css'

const Sets = ({children, create, exerciseId}) => (
    <div className="sets">
        <div className="sets-header">
            <div className="set-header-item"><Label>Set</Label></div>
            <div className="set-header-item"><Label>Reps</Label></div>
            <div className="set-header-item"><Label>Kg</Label></div>
        </div>
        {children}
    </div>
)

export default Sets
