import { RouterConstant } from "@/constants/RouterConst";

export function formatSendTime(time: string) {
    if (!time) return ""
    try {
        return new Date(time).toISOString()
    }
    catch (_) {
        return ""
    }
}

export const generateInviteLink = (roomName: string): string => {
    const baseUrl = window.location.origin;
    const encodedName = encodeURIComponent(roomName.trim());
    return `${baseUrl}${RouterConstant.BASE_NAME ? RouterConstant.BASE_NAME : ""}/g/${encodedName}`;
};