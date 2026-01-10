import type { MessageContent } from "@/types/MessageContent";
import { MarkdownComponent } from "simple-customize-markdown-converter/react"


export function displayMessageContent(message: MessageContent) {
    if (message.attachment.length === 0) {

    }
    return (
        <MarkdownComponent content={message.content} />
    )
}