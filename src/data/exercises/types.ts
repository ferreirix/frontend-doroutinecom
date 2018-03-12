import { IStateMap, IActionMap, IDataRequestMap } from 'data/types'

export interface IExercise {
    id: number
    userId: number
    liftId: number | null
    workoutId: number | null
    routineId: number | null
    order: number | null
    createdAt: string
    updatedAt: string
}

export interface IFormatedExercise extends IExercise {
}

export type IExercisesState = IStateMap<IExercise>

export type IExercisesAction = IActionMap<IExercise>

export type IExerciseRequestData = IDataRequestMap<IExercise>

export interface IExerciseActionArgs {
    post: (data?: IExerciseRequestData) => void
    put: (id: number, data: IExerciseRequestData, resolve?: () => void, reject?: () => void) => void
    delete: (id: number) => void
}
