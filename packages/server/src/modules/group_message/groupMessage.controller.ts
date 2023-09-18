import { Controller, Get, Query } from "@nestjs/common";
import { GroupMessageService } from "./groupMessage.service";

@Controller()
export class GroupMessageController {
    constructor(private readonly group_messageService: GroupMessageService) { }
    @Get('/messages')
    async getGroupMessage(@Query() query: { groupId: number }) {
        const res = await this.group_messageService.queryGroupMessages(query.groupId);
        console.log(res);
        return res;
    }
}
