import {WebSocketGateway} from "@nestjs/websockets";
import {Module} from "@nestjs/common";
import {ChatService} from "./chat.service";
import {ChatGateway} from "./chat.geteway";
import {UserModule} from "../user/user.module";
import {Group_messageModule} from "../group_message/group_message.module";
import {UnreadModule} from "../unread/unread.module";

@WebSocketGateway()
@Module({
    imports: [UserModule, Group_messageModule, UnreadModule],
    providers: [ChatService, ChatGateway]
})
export class ChatModule{}
