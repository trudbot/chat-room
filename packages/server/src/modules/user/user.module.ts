import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../entities/user.entity";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {Group} from "../../entities/group.entity";
import {UserGroup} from "../../entities/userGroup.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Group, UserGroup])],
    providers: [User, UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
