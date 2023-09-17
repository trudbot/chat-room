import {WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {UserService} from "../user/user.service";
import {Group} from "chat-room-types";

// unread命名空间用于向客户端推送未读消息数量
@WebSocketGateway({
    cors: {
        origin: '*'
    },
    namespace: 'unread'
})
export class UnreadGateway {
    constructor(
        private readonly userService: UserService
    ) {}
    @WebSocketServer()
    server: Server;

    iterateAllGroup(client: Socket, callback: (e: Group) => void) {
        const userId = client.handshake.query.userId;
        if (typeof userId === "string" && userId) {
            this.userService.findAllGroupsOfUser(parseInt(userId)).then(groups => {
                groups.forEach(e => {
                    callback(e);
                })
            })
        }
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.iterateAllGroup(client, (e) => {
            client.join(e.group_id.toString())
        })
    }

    handleDisconnect(client: Socket) {
        this.iterateAllGroup(client, (e) => {
            client.leave(e.group_id.toString())
        });
    }

    newMessageRemind(groupId: number) {
        this.server.to(groupId.toString()).emit('remind', groupId);
    }
}
