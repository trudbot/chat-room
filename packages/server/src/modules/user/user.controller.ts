import {Controller, Get, HttpException, HttpStatus, Param, Req} from "@nestjs/common";
import {UserService} from "./user.service";
import {Group} from "chat-room-types";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get('groups')
    async getUserGroups(@Req() req: {query: {id: number}}): Promise<Group[]> {
        const res =  await this.userService.findAllGroupsOfUser(req.query.id);
        if (!res) {
            throw new HttpException('Authentication failed. Invalid username', HttpStatus.UNAUTHORIZED);
        }
        console.log(res)
        return res;
    }

    @Get('info')
    async getUserInfo(@Req() req: {query: {name: string}}) {
        const res =  await this.userService.findUser(req.query.name);
        if (!res) {
            throw new HttpException('Authentication failed. Invalid username or password.', HttpStatus.UNAUTHORIZED);
        }
        return res;
    }
}
