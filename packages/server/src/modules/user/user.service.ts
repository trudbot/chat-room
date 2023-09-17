import {Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {User_group} from "../../entities/user_group.entity";
import {Group} from "../../entities/group.entity";
import {UserInfo} from "chat-room-types";
import {Group as GroupType} from 'chat-room-types'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(User_group)
        private readonly user_groupRepository: Repository<User_group>,
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>
    ) {}

    deletePassword(data: User): UserInfo {
        if (!data) {
            return undefined;
        }
        return {
            name: data.name,
            id: data.id
        }
    }

    async findUser(name: string): Promise<UserInfo> {
        return this.deletePassword(await this.userRepository.createQueryBuilder('user').where('user.name = :name', {name: name}).getOne());
    }

    async findUserById(id: number): Promise<UserInfo> {
        return this.deletePassword(await this.userRepository.createQueryBuilder('user').where('user.id = :id', {id: id}).getOne());
    }

    async findAllGroupsOfUser(id: number): Promise<GroupType[]> {
        return await this.user_groupRepository.createQueryBuilder('user_group')
            .where('user_group.user_id = :id', {id: id})
            .leftJoinAndSelect(Group, 'group', 'user_group.group_id = group.group_id')
            .select("group.group_id as group_id, group.group_name as group_name")
            .getRawMany();
    }
}
