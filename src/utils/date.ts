import store from 'store'

import moment from 'utils/moment'

export const serverDateFormat = 'YYYY-MM-DD HH:mm:ss'

export const timeFormat = 'HH:mm:ss'

let dateFormat: string

if (store.get('dateFormat') === 'DD/MM/YYYY') {
    dateFormat = 'D/M/YYYY'
} else if (store.get('dateFormat') === 'MM/DD/YYYY') {
    dateFormat = 'MM/DD/YYYY'
} else {
    dateFormat = 'YYYY/M/D'
}

export { dateFormat }

// https://stackoverflow.com/questions/27360102/locale-and-specific-date-format-with-moment-js
export const dayMonthFormat = dateFormat
    .replace(/Y/g, '')
    .replace(/^\W|\W$|\W\W/, '')

const localeData = moment.localeData() // update when app with multiple languages
export const longDateFormat = `dddd - ${localeData.longDateFormat('ll')}`

export const now = () => {
    return moment().format(serverDateFormat)
}

export const formatDuration = (started: string, completed: string) => {
    const startTime = moment(started)
    const endTime = moment(completed)
    const duration = moment.duration(endTime.diff(startTime))
    const hours = parseInt('' + duration.asHours(), 10)
    const minutes = parseInt('' + duration.asMinutes(), 10) - hours * 60

    let format = minutes + ' ' + (minutes === 1 ? 'minute' : 'minutes')

    if (hours > 0) {
        format =
            hours + ' ' + (hours === 1 ? 'hour' : 'hours') + ' and ' + format
    }

    return !(hours < 0) && !(minutes < 0) ? format : null
}
