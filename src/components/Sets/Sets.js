import React from 'react'

import ButtonIcon from 'components/ButtonIcon'

import './style.css'

const Sets = ({children, createSet, exerciseId}) => (
    <div className="sets-container">
        {children}
        <div className="sets-button-create">
            <ButtonIcon plus onClick={() => createSet(exerciseId)} />
        </div>
    </div>
)

export default Sets
