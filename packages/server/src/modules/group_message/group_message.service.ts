import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Group_messages} from "../../entities/group_messages.entity";
import {Repository} from "typeorm";
import {User} from "../../entities/user.entity";
import {UserService} from "../user/user.service";

@Injectable()
export class Group_messageService {
    @InjectRepository(Group_messages)
    private readonly group_messageRepository: Repository<Group_messages>;

    constructor(private readonly userService: UserService) {}

    async addMessage(data) {
        await this.group_messageRepository.createQueryBuilder()
            .insert()
            .into(Group_messages)
            .values([data])
            .execute();
    }

    async queryGroupMessages(groupId: number) {
        return (await this.group_messageRepository.createQueryBuilder('msg')
            .where('msg.group_id = :id', {id: groupId})
            .leftJoinAndSelect(User, 'user', `user.id = msg.sender_id`)
            .getRawMany())
            .map(e => {
                return {
                    actor: {
                        name: e.user_name,
                        id: e.user_id
                    },
                    message: e.msg_message,
                    time: e.msg_sending_time
                }
            });
    }
}
