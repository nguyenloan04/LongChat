import type {MessageContent} from "@/types/MessageContent";

//Extract from raw json into MessageContent object
export function extractMessageContent(rawMessage: string): MessageContent | null {
    // try {
    //     const parsed = JSON.parse(rawMessage);
    //     // check for structure
    //     if (typeof parsed === 'object' && parsed !== null) {
    //         if (parsed.type || parsed.content || parsed.attachment) {
    //             return parsed as MessageContent;
    //         }
    //     }
    //
    //     return {
    //         type: "chat",
    //         content: String(rawMessage),
    //         attachment: []
    //     };
    // } catch (error) {
    //     return {
    //         type: "chat",
    //         content: String(rawMessage),
    //         attachment: []
    //     };
    // }
    if (!rawMessage) {
        return { type: "chat", content: "", attachment: [] };
    }

    try {
        const parsed = JSON.parse(rawMessage);

        if (typeof parsed === 'object' && parsed !== null) {
            if (parsed.type || parsed.content || parsed.attachment) {
                return parsed as MessageContent;
            }
        }

        return {
            type: "chat",
            content: String(rawMessage),
            attachment: []
        };
    } catch (error) {
        return {
            type: "chat",
            content: String(rawMessage),
            attachment: []
        };
    }
}

/**
 * Wrap content to json in order to send to server
 * @param content
 * @param attachment
 * @param type
 */
export function createMessagePayload(
    content: string,
    attachment: string[] = [],
    type: "chat" | "sticker" | "attachment" = "chat"
): string {
    const messageObj: MessageContent = {
        type: type,
        content: content,
        attachment: attachment
    };
    return JSON.stringify(messageObj);
}
