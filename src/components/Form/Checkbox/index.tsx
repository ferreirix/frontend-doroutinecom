import * as React from 'react'
import * as classNames from 'classnames'

const tickIcon = require('media/tick.svg')

import './style.css'

interface ICheckboxProps {
    id: string
    name: string
    checked: boolean
    className?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.SFC<ICheckboxProps> = (props) => {

    const {
        id,
        name,
        className,
        checked,
        onChange
    } = props

    return (
        <>
            <span
                className={classNames(
                    'checkbox-tick',
                    checked && 'checkbox-tick--checked'
                )}
            >
                {checked && <img src={tickIcon} alt="Checkbox" />}
            </span>
            <input
                id={id}
                name={name}
                checked={checked}
                type="checkbox"
                className={classNames(
                    'checkbox',
                    className
                )}
                onChange={onChange}
            />
        </>
    )
}

export default Checkbox
