import {WebSocketGateway} from "@nestjs/websockets";
import {Module} from "@nestjs/common";
import {ChatService} from "./chat.service";
import {ChatGateway} from "./chat.geteway";
import {UserModule} from "../user/user.module";
import {GroupMessageModule} from "../group_message/groupMessage.module";
import {UnreadModule} from "../unread/unread.module";

@WebSocketGateway()
@Module({
    imports: [UserModule, GroupMessageModule, UnreadModule],
    providers: [ChatService, ChatGateway]
})
export class ChatModule{}
