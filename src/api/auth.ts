// import dotenv from 'dotenv'
// dotenv.config()

// const SERVER_URL = process.env.SERVER_URL

export const authApi = new Map([
    {
        name: "login",
        handle: () => {
        }
    },
    {
        name: "register",
        handle: () => {

        }
    },
].map(e => [e.name, e.handle]))

