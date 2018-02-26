import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import history from 'utils/history'
import configureStore from 'store/configureStore'
import registerServiceWorker from 'utils/registerServiceWorker'
import ScrollToTop from 'components/ScrollToTop'

import App from 'App'

import 'styles/global.css'

const store = configureStore()

render(
    <Provider store={store}>
        <Router history={history}>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </Router>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker()