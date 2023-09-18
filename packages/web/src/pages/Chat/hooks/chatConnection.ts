import { io, Socket } from "socket.io-client";
import { ToServer_Message } from "chat-room-types";
import { formatDateToYYYYMMDDHHMMSS } from "../../../utils/formatDate.ts";

// 和聊天服务器交互的核心逻辑
export function useChatConnection(query: { userId: number, groupId: number }) {
    const chatSocket: Socket = io(import.meta.env.VITE_WS_CHAT_URL, {
        query: query,
        transports: ['websocket']
    });

    function send(msg: string, date: Date) {
        const data: ToServer_Message = {
            sender: query.userId,
            message: msg,
            time: formatDateToYYYYMMDDHHMMSS(date)
        }
        chatSocket.emit('message', data);
    }
    return { chatSocket, send }
}

