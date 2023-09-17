import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Group_messages} from "../../entities/group_messages.entity";
import {Group_messageService} from "./group_message.service";
import {Group_messageController} from "./group_message.controller";
import {UserModule} from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Group_messages]), UserModule],
    providers: [Group_messages, Group_messageService],
    controllers: [Group_messageController],
    exports: [Group_messageService]
})
export class Group_messageModule{}
