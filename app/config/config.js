module.exports = {
    port :process.env.PORT || 8080,
    jwt: {
        Secret: "developmt@DEV",
        options: { expiresIn: 365 * 60 * 60 * 24 } // 365 days
    },
    db: {
        mongo: {
            uri: "mongodb+srv://cluster0.1mxtg9l.mongodb.net/Arish",
            options: {
                user: 'arish',
                pass: 'Mumbai@222'
            }
        }
    },
    baseUrl: 'http://localhost:' + 2000,
}


