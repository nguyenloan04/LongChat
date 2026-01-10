import type { MessageContent } from "@/types/MessageContent";

//Extract from raw json into MessageContent object
export function extractMessageContent(rawMessage: string): MessageContent | null {
    try {
        return JSON.parse(rawMessage) as MessageContent
    }
    catch (_) {
        return null
    }
}
