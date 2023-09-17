import {Controller, Get, Query} from "@nestjs/common";
import {Group_messageService} from "./group_message.service";

@Controller()
export class Group_messageController {
    constructor(private readonly group_messageService: Group_messageService) {}
    @Get('/messages')
    async getGroupMessage(@Query() query: {groupId: number}) {
        const res = await this.group_messageService.queryGroupMessages(query.groupId);
        return res;
    }
}
