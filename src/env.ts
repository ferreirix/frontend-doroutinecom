const env = {
    development: {
        API_URL: 'http://192.168.10.10/api',
        APP_URL: 'http://localhost:3000',
        HOME_URL: 'http://localhost:8001'
    },
    production: {
        API_URL: 'https://app.doroutine.com/public/api',
        APP_URL: 'https://app.doroutine.com',
        HOME_URL: 'https://doroutine.com'
    }
}

export default env[process.env.NODE_ENV!]
