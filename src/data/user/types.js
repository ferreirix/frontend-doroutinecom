import PropTypes from 'prop-types'

export const UserType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    apiToken: PropTypes.string.isRequired,
    weightMeasure: PropTypes.string.isRequired,
    startOfWeek: PropTypes.string.isRequired,
    dateFormat: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
})
