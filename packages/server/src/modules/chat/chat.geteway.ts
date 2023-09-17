import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io'
import {UserService} from "../user/user.service";
import {ChatService} from "./chat.service";
import {Group_messageService} from "../group_message/group_message.service";
import {ToServer_Message, ToClient_Message, ToClient_Join, ToClient_Leave} from "chat-room-types";
import {UnreadGateway} from "../unread/unread.gateway";

// chat模块的websocket网关
// 主要做的的群组消息转发
@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    namespace: 'chat'
})
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly userService: UserService,
        private readonly chatService: ChatService,
        private readonly group_messageService: Group_messageService,
        private readonly unreadGateway: UnreadGateway,
    ) {}

    // 建立连接时， 根据groupId参数加入对应群组
    async handleConnection(client: Socket, ...args: any[]) {
        const groupId = client.handshake.query.groupId;
        const userId = client.handshake.query.userId;
        if (groupId && typeof groupId === "string" && typeof userId === "string" && userId) {
            this.chatService.joinRoom(client, groupId);
            client.join(groupId);
            const msg: ToClient_Join = {
                actor: await this.userService.findUserById(parseInt(userId))
            }
            this.server.to(groupId).emit('join', msg);
        }
    }

    async handleDisconnect(client: Socket) {
        if (client.handshake.query.userId && typeof client.handshake.query.userId === "string")
        this.server.to(this.chatService.getRoom(client)).emit('leave', {
            actor: await this.userService.findUserById(parseInt(client.handshake.query.userId))
        })
        this.chatService.leaveRoom(client);
    }

    // 群聊消息事件， 向群组中所有连接转发
    @SubscribeMessage('message')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: ToServer_Message
    ) {
        const group = this.chatService.getRoom(client);
        await this.group_messageService.addMessage({
            sender_id: data.sender,
            sending_time: data.time,
            message: data.message,
            group_id: parseInt(group)
        });
        const msg: ToClient_Message = {
            message: data.message,
            actor: await this.userService.findUserById(data.sender),
            time: data.time
        }
        this.server.to(group).emit('message', msg);

        // 未读消息推送
        this.unreadGateway.newMessageRemind(parseInt(group));
    }
}
