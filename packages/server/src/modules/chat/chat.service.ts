import {Injectable} from "@nestjs/common";
import {Socket} from 'socket.io'
@Injectable()
export class ChatService {
    private room: Map<string, string> = new Map<string, string>();

    joinRoom(client: Socket, groupId: string) {
        if (this.room.has(client.id)) {
            return;
        }
        client.join(groupId);
        this.room.set(client.id, groupId);
    }

    leaveRoom(client: Socket) {
        this.room.delete(client.id);
    }

    getRoom(client: Socket) {
        return this.room.get(client.id);
    }
}
