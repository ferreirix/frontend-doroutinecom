import faker from 'faker'

import {
    goTo,
    expectSelectorToContainText,
    expectSelectOptionToBe,
    expectCheckboxToBe,
    selectOption,
    expectElementToBeOfLength
} from './utils'

let page

beforeAll(async () => {
    page = await global.__BROWSER__.newPage()
    await page.setViewport({ width: 1200, height: 800})
}, global.TIMEOUT)

describe('auth', async () => {
    test('user can register', async () => {
        await goTo(page, '/register')
        await page.click('input[id=name]')
        await page.type('input[id=name]', global.USER.name)
        await page.click('input[id=email]')
        await page.type('input[id=email]', global.USER.email)
        await page.click('input[id=password]')
        await page.type('input[id=password]', global.USER.password)
        await page.click('input[id=passwordConfirmation]')
        await page.type('input[id=passwordConfirmation]', global.USER.password)
        await page.click('button[type=submit]')
        await expectSelectorToContainText(page, '.routines', 'Routines')
    }, global.TIMEOUT)

    test('user can logout', async () => {
        await goTo(page, '/settings')
        await page.waitForSelector('.logout')
        await page.click('.logout')
        await expectSelectorToContainText(page, '.login', 'Login')
    }, global.TIMEOUT)

    test('user can request forgotten password email', async () => {
        await goTo(page, '/login')
        await page.waitForSelector('.login')
        await page.click('.login-password-forgotten a')
        await page.waitForSelector('.password-forgotten')
        await page.click('input[id=email]')
        await page.type('input[id=email]', global.USER.email)
        await page.click('button[type=submit]')
        await page.waitForSelector('.alert')
        await expectSelectorToContainText(page, '.alert', 'A password reset email has been sent.')
    }, global.TIMEOUT)

    test('user can\'t register with same email', async () => {
        await goTo(page, '/register')
        await page.waitForSelector('.register')
        await page.click('input[id=email]')
        await page.type('input[id=email]', global.USER.email)
        await page.click('button[type=submit]')
        await page.waitForSelector('.alert')
        await expectSelectorToContainText(page, '.alert', 'The email has already been taken. ')
    }, global.TIMEOUT)

    test('user can login', async () => {
        await goTo(page, '/login')
        await page.click('input[id=email]')
        await page.type('input[id=email]', global.USER.email)
        await page.click('input[id=password]')
        await page.type('input[id=password]', global.USER.password)
        await page.click('button[type=submit]')
        await expectSelectorToContainText(page, '.routines', 'Routines')
    }, global.TIMEOUT)
})

describe('routines creation', async () => {
    test('create a routine', async () => {
        await goTo(page, '/')
        await page.waitForSelector('.routines')
        await page.click('.routines-button-create button')
        await page.waitForSelector('.routine-single')
    }, global.TIMEOUT)

    test('create multiple routines', async () => {
        await goTo(page, '/')
        await page.waitForSelector('.routines')
        await page.click('.routines-button-create button')
        await page.waitForSelector('.routine-single')
        await goTo(page, '/')
        await page.waitForSelector('.routines')
        await expectElementToBeOfLength(page, '.routine', 2)
    }, global.TIMEOUT)

    test('update a routine', async () => {
        await page.click('.routines-button-create button')
        await page.waitForSelector('.routine-single')
        await page.click('.routine-single input')
        await page.type('.routine-single input', global.ROUTINE.name)
        await page.waitFor(1000)
        await selectOption(page, '.routine-single select[name=weightMeasure]', global.ROUTINE.weightMeasure)
        await page.waitFor(1000)
    }, global.TIMEOUT)

    test('create a lift', async () => {
        await page.click('.lifts-button-create button')
        await page.waitForSelector('.lift')
        await page.click('.lift input[name=name]')
        await page.type('.lift input[name=name]', global.LIFT.name)
        await page.waitFor(1000)
        await page.click('.lift input[name=rm]')
        await page.type('.lift input[name=rm]', global.LIFT.rm)
        await page.waitFor(1000)
    }, global.TIMEOUT)

    test('create multiple lifts', async () => {
        await page.click('.lifts-button-create button')
        await page.waitFor(1000)
        await expectElementToBeOfLength(page, '.lift', 2)
    }, global.TIMEOUT)

    test('create a workout', async () => {
        await page.click('.workouts-button-create button')
        await page.waitForSelector('.workout')
        await page.click('.workout input[name=name]')
        await page.type('.workout input[name=name]', global.WORKOUT.name)
        await page.waitFor(1000)
        await page.click('.workout-checkbox')
        await page.waitFor(1000)
        await page.click('.workout textarea[name=notes]')
        await page.type('.workout textarea[name=notes]', global.WORKOUT.notes)
        await page.waitFor(1000)
    }, global.TIMEOUT)

    test('create multiple workouts', async () => {
        await page.click('.workouts-button-create button')
        await page.waitFor(1000)
        await expectElementToBeOfLength(page, '.workouts-column', 2)
    }, global.TIMEOUT)

    test('create a exercise', async () => {
        await page.click('.exercises-button-create button')
        await page.waitForSelector('.exercise')
        await selectOption(page, '.exercise select', global.LIFT.name)
        await page.waitFor(1000)
    }, global.TIMEOUT)

    test('create multiple exercises', async () => {
        await page.click('.exercises-button-create button')
        await page.waitFor(1000)
        await expectElementToBeOfLength(page, '.exercise', 2)
    }, global.TIMEOUT)

    test('create a set', async () => {
        await page.click('.sets-button-create button')
        await page.waitForSelector('.set')
        await page.click('.set input[name=weight]')
        await page.type('.set input[name=weight]', global.SET.weight)
        await page.waitFor(1000)
        await page.click('.set input[name=reps]')
        await page.type('.set input[name=reps]', global.SET.reps)
        await page.waitFor(1000)
        await page.click('.set-checkbox')
        await page.waitFor(1000)
    }, global.TIMEOUT)

    test('create multiple sets', async () => {
        await page.click('.sets-button-create button')
        await page.waitFor(1000)
        await expectElementToBeOfLength(page, '.set', 2)
    }, global.TIMEOUT)

    test('create a block', async () => {
        await page.click('.workouts-blocks-button-create button')
        await page.waitForSelector('.no-data')
        await page.click('.workouts-button-create button')
        await page.waitFor(1000)
    }, global.TIMEOUT)
})

describe('routine is saved on reload', async () => {
    test('routine is saved', async () => {
        await page.reload()

        await page.waitForSelector('.routine-single')
        await expectSelectorToContainText(page, '.routine-single', global.ROUTINE.name)
        await expectSelectOptionToBe(page, '.routine-single select[name=weightMeasure]', global.ROUTINE.weightMeasure)
    }, global.TIMEOUT)

    test('lift is saved', async () => {
        await expectSelectorToContainText(page, '.lift-name', global.LIFT.name)
        await expectSelectorToContainText(page, '.lift-rm', global.LIFT.rm)
    }, global.TIMEOUT)

    test('workout is saved', async () => {
        await expectSelectorToContainText(page, '.workout', global.WORKOUT.name)
        await expectSelectorToContainText(page, '.workout', global.WORKOUT.notes)
        await expectCheckboxToBe(page, '.workout input[name=isCompleted]', true)
    }, global.TIMEOUT)

    test('exercise is saved', async () => {
        await expectSelectOptionToBe(page, '.exercise select', global.LIFT.name)
    }, global.TIMEOUT)

    test('set is saved', async () => {
        await expectSelectorToContainText(page, '.set-weight', global.SET.weight)
        await expectSelectorToContainText(page, '.set-reps', global.SET.reps)
        await expectCheckboxToBe(page, '.set input[name=isCompleted]', true)
    }, global.TIMEOUT)

    test('block is saved', async () => {
        await expectElementToBeOfLength(page, '.workouts-blocks-tab', 2)
    }, global.TIMEOUT)
})

describe('routine shows validation errors', async () => {
    test('lift rm', async () => {
        await page.click('.lift input[name=rm]')
        await page.type('.lift input[name=rm]', '33')
        await page.waitFor(1000)
        await expectSelectorToContainText(page, '.lift', 'format is invalid')
    }, global.TIMEOUT)

    test('set weight', async () => {
        await page.click('.set input[name=weight]')
        await page.type('.set input[name=weight]', '.333')
        await page.waitFor(1000)
        await expectSelectorToContainText(page, '.set', 'format is invalid')
    }, global.TIMEOUT)
})

describe('routine deletion', async () => {
    test('sets can be deleted', async () => {
        await page.click('.set-button-remove button')
        await page.waitFor(2000)
        await expectElementToBeOfLength(page, '.set', 1)
    }, global.TIMEOUT)

    test('exercises can be deleted', async () => {
        await page.click('.exercise-button-remove button')
        await page.waitFor(2000)
        await expectElementToBeOfLength(page, '.exercise', 1)
    }, global.TIMEOUT)

    test('workouts can be deleted', async () => {
        await page.click('.workout-button-remove button')
        await page.waitFor(2000)
        await expectElementToBeOfLength(page, '.workouts-column', 1)
    }, global.TIMEOUT)

    test('lifts can be deleted', async () => {
        await page.click('.lift-button-remove button')
        await page.waitFor(2000)
        await expectElementToBeOfLength(page, '.lift', 1)
    }, global.TIMEOUT)

    test('routines can be deleted', async () => {
        page.on('dialog', async dialog => {
            await dialog.accept()
        })
        await page.click('.routine-single-button-remove button')
        await page.waitForSelector('.routines')
        await expectElementToBeOfLength(page, '.routine', 2)
    }, global.TIMEOUT)
})

describe('settings', async () => {
    test('update user', async () => {
        await goTo(page, '/settings')
        await page.waitForSelector('.settings')
        await page.click('#name')
        await page.type('#name', 'updated')
        await page.waitFor(1000)
        await page.click('#email')
        await page.type('#email', 'updated')
        await page.waitFor(1000)
    }, global.TIMEOUT)

    test('user info is saved on reload', async () => {
        await page.reload()

        await expectSelectorToContainText(page, '.settings', global.USER.name + 'updated')
        await expectSelectorToContainText(page, '.settings', global.USER.email + 'updated')
    }, global.TIMEOUT)
})