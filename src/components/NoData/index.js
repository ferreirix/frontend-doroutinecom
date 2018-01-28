import React from 'react'

import Button from 'components/Button'

import './style.css'

const NoData = ({buttonText, text, create}) => (
    <div className="no-data">
        {text}
    </div>
)

export default NoData
