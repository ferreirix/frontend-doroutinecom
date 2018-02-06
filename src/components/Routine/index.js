import React from 'react'

import AutoSaveForm from 'components/AutoSaveForm'
import Field from 'components/Field'

import './style.css'

const Routine = ({children, routine, update}) => (
    <div className="routine">
        <div className="routine-form">
            <AutoSaveForm
                initialValues={routine}
                update={update}
                render={({values}) => (
                    <Field
                        label="Name"
                        id={`name${values.id}`}
                        name="name"
                        placeholder="Type your routine name"
                    />
                )}
            />
        </div>
        {children}
        <div className="routine-form">
            <AutoSaveForm
                initialValues={routine}
                update={update}
                render={({values}) => (
                    <Field
                        component="textarea"
                        label="Additional Notes"
                        id={`notes${values.id}`}
                        name="notes"
                        placeholder="Type any extra exercises or annotations"
                    />
                )}
            />
        </div>
    </div>
)

export default Routine