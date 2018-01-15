import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './style.css'

const InputWithItem = ({children, className, item, type, ...rest}) => (
    <div
        className={classNames(
            'input-wrapper',
            type === 'stacked' && 'input-wrapper--stacked',
            className
        )}
        {...rest}
    >
        {children}
        <div className="input-item">
            {item}
        </div>
    </div>
)

InputWithItem.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    item: PropTypes.any
}

export default InputWithItem
