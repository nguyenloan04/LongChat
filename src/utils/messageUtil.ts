export function formatSendTime(time: string) {
    if (!time) return ""
    try {
        return new Date(time).toISOString()
    }
    catch (_) {
        return ""
    }
}