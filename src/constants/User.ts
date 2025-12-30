//Do not save passwd
export interface User {
    username: string,
    avatar: string,
    displayName: string,
    banner: {
        type: string,
        content: string,
    },
    description: string,
}