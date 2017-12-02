import React from 'react'

import withForm from 'components/Form/withForm'
import Input from 'components/Form/Input'

const Form = () => (
    <Input
        name="name"
        placeholder="Name..."
        alignCenter
        darkBg
    />
)
export default withForm(Form)