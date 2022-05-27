module.exports = {
    port: 2000,
    jwt: {
        Secret: "developmt@DEV",
        options: { expiresIn: 365 * 60 * 60 * 24 } // 365 days
    },
    db: {
        mongo: {
            uri: "mongodb://localhost:27017/NeoSoftAssignement",
            options: {
                user: '',
                pass: ''
            }
        }
    },
    baseUrl: 'http://localhost:' + 2000,
}


