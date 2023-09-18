import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupMessages } from "../../entities/groupMessages.entity";
import { GroupMessageService } from "./groupMessage.service";
import { GroupMessageController } from "./groupMessage.controller";
import { UserModule } from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([GroupMessages]), UserModule],
    providers: [GroupMessages, GroupMessageService],
    controllers: [GroupMessageController],
    exports: [GroupMessageService]
})
export class GroupMessageModule { }
