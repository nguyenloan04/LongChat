import { RouterBase } from "@/constants/RouterBase"

export function formatSendTime(time: string) {
    if (!time) return ""
    try {
        return new Date(new Date(time).getTime() + 7 * 60 * 60 * 1000).toISOString()
    }
    catch (_) {
        return ""
    }
}

export function generateInviteLink(roomName: string): string {
    return `${window.location.origin}${RouterBase.BASE_NAME ? RouterBase.BASE_NAME : ""}/g/${encodeURIComponent(roomName)}`
}