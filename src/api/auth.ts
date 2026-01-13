import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const SERVER_URL = process.env.SERVER_URL

export const authApi = new Map([
    {
        name: "get-description",
        handle: async (username: string) => {
            return await axios.get(`${SERVER_URL}/get-description?username=${username}`).then(response => {
                try {
                    const data = response.data
                    return JSON.parse(data) as { result: boolean, description: string }
                }
                catch (_) {
                    return { result: false, description: "" }
                }
            })
        }
    },
    {
        name: "register",
        handle: async (username: string) => {
            return await axios.post(`${SERVER_URL}/create`, { username }).then(response => {
                try {
                    return JSON.parse(response.data) as { result: boolean }
                }
                catch (_) {
                    return { result: false }
                }
            })
        }
    },
    {
        name: "update-description",
        handle: async (username: string, description: string) => {
            return await axios.post(`${SERVER_URL}/update-description`, { username, description }).then(response => {
                try {
                    return JSON.parse(response.data) as { result: boolean, description: string }
                }
                catch (_) {
                    return { result: false, description: "" }
                }
            })
        }
    }
].map(e => [e.name, e.handle]))

