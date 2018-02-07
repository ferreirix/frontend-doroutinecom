import { createSelector } from 'reselect'

import moment from 'utils/moment'
import { formatDuration, longDateFormat } from 'utils/date'
import Workout from 'data/workouts/schema'

const formatWorkout = (workout) => Workout({
    ...workout,
    duration: workout.completedAt && formatDuration(workout.startedAt, workout.completedAt),
    day: workout.completedAt && moment(workout.completedAt).format(longDateFormat)
})

export const workoutSelector = (id) => createSelector(
    [
        (state) => state.workouts.entities
    ],
    (workouts) => {
        if (workouts.length > 0) {
            const workout = workouts.find((workout) => (workout.id === id))
            return workout ? formatWorkout(workout) : null
        }
        return null
    }
)

export const workoutsSelector = createSelector(
    [
        (state) => state.workouts.entities
    ],
    (workouts) => workouts
        .map((workout) => formatWorkout(workout))
)

export const completedWorkoutsSelector = createSelector(
    [
        workoutsSelector
    ],
    (workouts) => workouts.filter((workout) => (workout.completedAt))
        .sort((a, b) => (moment(b.completedAt) - moment(a.completedAt)))
)

export const pendingWorkoutsSelector = createSelector(
    [
        workoutsSelector
    ],
    (workouts) => workouts.filter((workout) => (!workout.completedAt))
        .sort((a, b) => (moment(b.startedAt) - moment(a.startedAt)))
)

// const startWeek = moment().startOf('week')
// const endWeek = moment().endOf('week')
// const range = moment().range(startWeek, endWeek)

// export const workoutsCompletedCurrentWeekSelector = createSelector(
//     [
//         completedWorkoutsSelector
//     ],
//     (workouts) => {
//         let amount = 0

//         workouts.forEach((workout) => {
//             if (range.contains(moment(workout.completedAt))) {
//                 amount = amount + 1
//             }
//         })

//         return amount
//     }
// )
