export interface MessageContent {
    type: "chat" | "sticker" | "attachment"
    content: string,
    attachment: string[]
}