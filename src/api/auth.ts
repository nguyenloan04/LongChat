import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const authApi = {
    getDescription: async (username: string) => {
        return await axios.get(`${SERVER_URL}/get-description?username=${username}`).then(response => {
            try {
                const data = response.data
                return JSON.parse(data) as { result: boolean, description: string }
            }
            catch (_) {
                return { result: false, description: "" }
            }
        })
    },
    register: async (username: string) => {
        return await axios.post(`${SERVER_URL}/create`, { username }).then(response => {
            try {
                return JSON.parse(response.data) as { result: boolean }
            }
            catch (_) {
                return { result: false }
            }
        })
    },
    updateDescription: async (username: string, description: string) => {
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
